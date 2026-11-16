#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_userscript.py — 读取 ../data/ascend-repo-graph.json，
将其压缩后注入 ascend-repo-nav.template.js，产出最终 ascend-repo-nav.user.js。

用法：python build_userscript.py
（图谱更新后重跑本脚本即可同步油猴脚本数据）
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
GRAPH_PATH = os.path.normpath(os.path.join(HERE, "..", "data", "ascend-repo-graph.json"))
TEMPLATE_PATH = os.path.join(HERE, "ascend-repo-nav.template.js")
OUT_PATH = os.path.join(HERE, "ascend-repo-nav.user.js")


def slim(graph):
    """瘦身：只保留油猴脚本需要的字段。"""
    out = {
        "products": [
            {
                "id": p["id"],
                "name": p["name"],
                "category": p.get("category", ""),
                "docUrl": p.get("docUrl", ""),
                "groups": [
                    {
                        "name": g["name"],
                        "repos": [
                            {
                                "name": r["name"],
                                "desc": r.get("desc", ""),
                                "urls": r.get("urls", {}),
                                **({"status": r["status"]} if r.get("status") else {}),
                                **({"giteeStatus": r["giteeStatus"]} if r.get("giteeStatus") else {}),
                            }
                            for r in g["repos"]
                        ],
                    }
                    for g in p.get("groups", [])
                ],
            }
            for p in graph["products"]
        ]
    }
    return out


def main():
    with open(GRAPH_PATH, encoding="utf-8") as f:
        graph = json.load(f)
    with open(TEMPLATE_PATH, encoding="utf-8") as f:
        template = f.read()
    data = json.dumps(slim(graph), ensure_ascii=False, separators=(",", ":"))
    result = template.replace("__GRAPH_JSON__", data, 1)
    assert "__GRAPH_JSON__" not in result, "模板占位符未被替换"
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(result)
    print("已生成 {}（内嵌 {} 个产品 / {:.1f} KB 数据）".format(
        OUT_PATH, len(graph["products"]), len(data.encode("utf-8")) / 1024))


if __name__ == "__main__":
    main()
