#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_snippets.py — 基于 ascend-repo-graph.json 生成各仓库 README 的
"昇腾生态代码仓导航" 互链片段，以及一份完整的导航 Hub 页面。

用法：
  1. 为某个仓库生成定制片段（插入该仓 README）：
     python generate_snippets.py --repo triton-ascend
     python generate_snippets.py --repo ops-nn --platform gitcode
     python generate_snippets.py --repo pytorch --alias torch-npu

  2. 生成完整 Hub 导航页（hub.md，可作为中转站/入口页）：
     python generate_snippets.py --hub

  3. 批量为图谱中所有主仓生成片段（输出到 ./out/ 目录）：
     python generate_snippets.py --all

数据源：../data/ascend-repo-graph.json（唯一事实来源，更新图谱后重新生成即可）
"""
import argparse
import io
import json
import os
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
GRAPH_PATH = os.path.normpath(os.path.join(HERE, "..", "data", "ascend-repo-graph.json"))

PLATFORM_LABEL = {"gitcode": "Gitcode", "github": "GitHub", "gitee": "Gitee"}
STATUS_LABEL = {
    "archived": "已归档",
    "legacy": "已停维",
    "migrated": "已迁移",
}

BANNER = "ASCEND-REPO-NAV"

# 常用别名 → 图谱仓库名（社区惯用叫法兜底，可按需扩充）
BUILTIN_ALIASES = {
    "torch-npu": "pytorch",
    "torchnpu": "pytorch",
    "ascend-pytorch": "pytorch",
    "ascend-for-pytorch": "pytorch",
    "tf-adapter": "tensorflow",
    "tf_npu-adapter": "tensorflow",
    "atb": "ascend-transformer-boost",
    "megatron": "Megatron-LM",
    "ms-mstt": "mstt",
}


def load_graph():
    with open(GRAPH_PATH, encoding="utf-8") as f:
        return json.load(f)


def primary_url(repo):
    """返回仓库的主平台地址（urls 中第一个键值）。"""
    urls = repo.get("urls", {})
    for url in urls.values():
        return url
    return ""


def repo_label(repo, current=None):
    """仓库名 + 状态角标的 markdown 片段（仅整体 status，不含 giteeStatus）。"""
    label = repo["name"]
    if current and repo["name"] == current:
        label = "**{}（本仓）**".format(label)
    status = repo.get("status")
    if status and status in STATUS_LABEL:
        label = "{}（{}）".format(label, STATUS_LABEL[status])
    url = primary_url(repo)
    if url:
        return "[{}]({})".format(label, url)
    return label


def normalize(name):
    return name.lower().strip()


def build_index(graph):
    """仓库名 → (product, group, repo) 的索引；同名以先出现为准；注册内置别名。"""
    index = {}
    for product in graph["products"]:
        for group in product.get("groups", []):
            for repo in group["repos"]:
                key = normalize(repo["name"])
                index.setdefault(key, (product, group, repo))
    for alias, target in BUILTIN_ALIASES.items():
        if normalize(target) in index:
            index.setdefault(normalize(alias), index[normalize(target)])
    return index


def product_line(product, current_product_id):
    """其他产品的压缩行：产品名 + 前 4 个主仓链接。"""
    links = []
    seen = set()
    for group in product.get("groups", []):
        for repo in group["repos"]:
            if repo.get("status") in ("archived", "legacy", "migrated"):
                continue
            key = normalize(repo["name"])
            if key in seen:
                continue
            seen.add(key)
            links.append(repo_label(repo))
            if len(links) >= 4:
                break
        if len(links) >= 4:
            break
    name = "**{}**".format(product["name"])
    if product["id"] == current_product_id:
        name = "➡ **{}**".format(product["name"])
    doc = product.get("docUrl", "")
    head = "[{}]({})".format(name, doc) if doc else name
    return "| {} | {} |".format(head, " · ".join(links))


def generate_hub(graph):
    """生成完整导航 Hub 页面。"""
    lines = []
    lines.append("# 昇腾软件产品代码仓导航 Hub")
    lines.append("")
    lines.append("> 覆盖昇腾 12 大软件产品（文档站口径）及其二级产品/组件的开源代码仓。")
    lines.append("> 数据源：`data/ascend-repo-graph.json`（由本目录脚本重新生成）。")
    lines.append("> 平台说明：**Gitcode** 为昇腾社区新家；**GitHub** 为三方仓/镜像主阵地；Gitee 为遗留平台（多数已停维）。")
    lines.append("")
    lines.append("## 快速入口")
    lines.append("")
    lines.append("| 产品 | 文档 | 代码组织 |")
    lines.append("|---|---|---|")
    for p in graph["products"]:
        orgs = " · ".join(u for u in p.get("orgs", {}).values())
        doc = "[文档]({})".format(p["docUrl"]) if p.get("docUrl") else "—"
        lines.append("| **{}**（{}） | {} | {} |".format(p["name"], p["category"], doc, orgs or "—"))
    lines.append("")
    for p in graph["products"]:
        lines.append("---")
        lines.append("")
        lines.append("## {}（{}）".format(p["name"], p["category"]))
        lines.append("")
        if p.get("docUrl"):
            lines.append("📚 产品文档：{} ｜ 🏠 社区入口：{}".format(
                "[{}]({})".format(p["docUrl"], p["docUrl"]),
                "[{}]({})".format(p.get("portalUrl") or p["docUrl"], p.get("portalUrl") or p["docUrl"])))
            lines.append("")
        for group in p.get("groups", []):
            lines.append("### {}".format(group["name"]))
            lines.append("")
            lines.append("| 仓库 | 说明 | 地址 |")
            lines.append("|---|---|---|")
            for repo in group["repos"]:
                urls = repo.get("urls", {})
                url_cells = []
                first = True
                for plat, url in urls.items():
                    if first and repo.get("status") in STATUS_LABEL:
                        tag = "（{}）".format(STATUS_LABEL[repo["status"]])
                    elif plat == "gitee" and repo.get("giteeStatus") in STATUS_LABEL:
                        tag = "（{}）".format(STATUS_LABEL[repo["giteeStatus"]])
                    else:
                        tag = ""
                    first = False
                    url_cells.append("[{}]({}){}".format(PLATFORM_LABEL.get(plat, plat), url, tag))
                lines.append("| {} | {} | {} |".format(
                    repo["name"], repo.get("desc", ""), " / ".join(url_cells)))
            lines.append("")
        if p.get("related"):
            lines.append("**关联产品**：" + " · ".join(p["related"]))
            lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## 相关生态（非 12 产品口径）")
    lines.append("")
    lines.append("| 仓库 | 说明 | 地址 |")
    lines.append("|---|---|---|")
    for repo in graph.get("relatedEcosystem", []):
        urls = repo.get("urls", {})
        cells = " / ".join("[{}]({})".format(PLATFORM_LABEL.get(k, k), u) for k, u in urls.items())
        lines.append("| {} | {} | {} |".format(repo["name"], repo.get("desc", ""), cells))
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Gitee 遗留说明")
    lines.append("")
    lines.append(graph["giteeLegacy"]["description"])
    lines.append("")
    lines.append("迁移指引：{}".format(graph["giteeLegacy"]["migrationGuide"]))
    lines.append("")
    return "\n".join(lines)


def generate_snippet(graph, index, repo_name, alias=None, out_path=None):
    """为指定仓库生成 README 导航片段。"""
    key = normalize(alias or repo_name)
    if key not in index:
        sys.exit("错误：图谱中找不到仓库 '{}'，请检查 data/ascend-repo-graph.json".format(alias or repo_name))
    product, group, repo = index[key]

    other_products = [p for p in graph["products"] if p["id"] != product["id"]]

    lines = []
    lines.append("<!-- {}:START 由 ascend-repo-map 生成，请勿手工修改；更新图谱后重新生成 -->".format(BANNER))
    lines.append("## 🧭 昇腾软件生态代码仓导航")
    lines.append("")
    lines.append("本仓属于昇腾文档站 12 大软件产品中的 **{}（{}）→ {}**，下方链接可直达其余产品的代码仓。".format(
        product["name"], product["category"], group["name"]))
    lines.append("")
    urls = repo.get("urls", {})
    if len(urls) > 1:
        cells = []
        for plat, url in urls.items():
            tag = ""
            if plat == "gitee" and repo.get("giteeStatus") in STATUS_LABEL:
                tag = "（{}）".format(STATUS_LABEL[repo["giteeStatus"]])
            cells.append("[{}]({}){}".format(PLATFORM_LABEL.get(plat, plat), url, tag))
        lines.append("本仓各平台地址：" + " ｜ ".join(cells))
        lines.append("")
    lines.append("**全部产品速览**（产品详情见各产品文档/组织页）：")
    lines.append("")
    lines.append("| 产品 | 核心代码仓 |")
    lines.append("|---|---|")
    for p in other_products:
        lines.append(product_line(p, product["id"]))
    lines.append("")
    own_lines = []
    for g in product.get("groups", []):
        if g["name"] == group["name"]:
            repos = " · ".join(repo_label(r, current=repo["name"]) for r in g["repos"])
            own_lines.append("- **{}（本组）**：{}".format(g["name"], repos))
        else:
            repos = " · ".join(repo_label(r) for r in g["repos"])
            own_lines.append("- {}：{}".format(g["name"], repos))
    lines.append("**{} · {} 全部仓库**：".format(product["name"], product.get("fullName", "")))
    lines.append("")
    lines.extend(own_lines)
    lines.append("")
    lines.append("📚 [{} 产品文档]({}) ｜ 🗺 [完整代码仓图谱](../../tree/master/ascend-repo-map/data/ascend-repo-graph.json)".format(
        product["name"], product.get("docUrl") or product.get("portalUrl", "https://www.hiascend.com/zh/document")))
    lines.append("")
    lines.append("<!-- {}:END -->".format(BANNER))
    text = "\n".join(lines)

    if out_path:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text + "\n")
        print("已写入 {}".format(out_path))
    return text


def generate_all(graph, index):
    out_dir = os.path.join(HERE, "out")
    os.makedirs(out_dir, exist_ok=True)
    seen = set()
    count = 0
    for product in graph["products"]:
        for group in product.get("groups", []):
            for repo in group["repos"]:
                key = normalize(repo["name"])
                if key in seen or repo.get("status") in ("archived", "legacy", "migrated"):
                    continue
                seen.add(key)
                safe = re.sub(r"[^0-9A-Za-z_.-]+", "_", key).strip("_")
                fname = safe + ".md"
                generate_snippet(graph, index, repo["name"],
                                 out_path=os.path.join(out_dir, fname))
                count += 1
    print("共为 {} 个仓库生成片段，输出目录：{}".format(count, out_dir))


def main():
    parser = argparse.ArgumentParser(description="生成昇腾代码仓 README 导航片段 / Hub 页")
    parser.add_argument("--repo", help="仓库短名（如 triton-ascend / ops-nn / torch-npu）")
    parser.add_argument("--alias", help="自定义别名映射 alias:graph-name，如 --alias torch-npu:pytorch")
    parser.add_argument("--hub", action="store_true", help="生成完整 Hub 导航页 hub.md")
    parser.add_argument("--all", action="store_true", help="为图谱中所有主仓生成片段")
    args = parser.parse_args()

    graph = load_graph()
    index = build_index(graph)
    if args.alias and ":" in args.alias:
        alias, target = args.alias.split(":", 1)
        if normalize(target) in index:
            index[normalize(alias)] = index[normalize(target)]
        else:
            sys.exit("错误：图谱中找不到别名目标 '{}'".format(target))

    if args.hub:
        hub = generate_hub(graph)
        out = os.path.join(HERE, "..", "..", "hub.md")
        out = os.path.normpath(os.path.join(HERE, "hub.md"))
        with open(out, "w", encoding="utf-8") as f:
            f.write(hub + "\n")
        print("已写入 {}".format(out))
    elif args.all:
        generate_all(graph, index)
    elif args.repo:
        text = generate_snippet(graph, index, args.repo, alias=args.alias)
        print(text)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
