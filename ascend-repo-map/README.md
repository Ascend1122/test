# 昇腾软件产品代码仓串联方案（ascend-repo-map）

将昇腾 12 大软件产品（文档站口径）及其二级产品/组件的开源代码仓串联起来：
**在任何平台访问任一昇腾代码仓时，都能一键跳转到其他产品的代码仓**（例：从 CANN 算子库 ops-nn 跳到 Triton-Ascend 主仓）。

## 一、调研结论（图谱数据的事实基础）

| 结论 | 说明 |
|---|---|
| **12 大软件产品口径** | 异构计算架构（CANN）、AI框架（Ascend for PyTorch / Ascend for TensorFlow）、全流程开发工具链（MindStudio）、应用使能（MindSpeed / MindIE / MindSDK / MindCluster / MindEdge）、三方资源（vLLM-Ascend / Triton / SGLang） |
| **代码分布三平台** | **Gitcode**（昇腾社区新家，`gitcode.com/CANN` 92 仓 + `gitcode.com/Ascend` 109 仓）；**GitHub**（`github.com/Ascend` 110+ 仓 + `triton-lang`、`vllm-project`、`sgl-project` 等三方组织）；**Gitee**（遗留平台，2025.8 起整体迁移，多数仓停维） |
| **关键迁移事实** | ① Gitee → Gitcode（[官方迁移指引](https://gitcode.com/Ascend/discussions/1)），如 cann-ops 已迁 `gitcode.com/CANN`；② triton-ascend 已从 Gitcode 迁 **`github.com/triton-lang/triton-ascend`**（Gitcode 仓已归档）；③ vLLM-Ascend 主仓在 `github.com/vllm-project/vllm-ascend`；④ SGLang 上游已原生支持昇腾，另有 `github.com/Ascend/sglang` 维护 fork |
| **图谱规模** | 12 产品 → 34 个二级产品/组件分组 → **207 个仓库条目**（含跨平台地址与迁移状态）+ 12 个相关生态仓 |

数据源：`data/ascend-repo-graph.json`（**唯一事实来源**，本次逐仓核对 Gitcode/GitHub/Gitee 官方组织页与昇腾文档站 llms.txt 生成）。

## 二、三种串联方案（供选择，可组合）

### 方案 1：结构化图谱数据（基础设施层）

- 文件：`data/ascend-repo-graph.json`
- 内容：`产品 → 二级产品/组件分组 → 仓库（名称/简介/各平台 URL/迁移状态）`，附产品间 `related` 关联、Gitee 遗留迁移指针。
- 价值：任何工具（导航页、CI 校验、看板、检索）都以它为数据源，一次维护多处生效。
- 用法：直接 `json.load`；或按需裁剪字段。

### 方案 2（附带产物）：导航 Hub 页

- 文件：`readme-snippet/hub.md`（由 `generate_snippets.py --hub` 生成）
- 内容：523 行完整导航页，12 产品 34 组 207 仓全量链接，含跨平台地址与状态标注。
- 价值：作为"中转站"托管到任一仓库/网站后，即可作为生态入口页使用。

### 方案 3：各仓 README 互链补丁（官方推荐、长期形态）

- 工具：`readme-snippet/generate_snippets.py`
- 做法：为每个仓生成一段统一的「🧭 昇腾软件生态代码仓导航」片段插入该仓 README——
  - 标注本仓所属产品/组件；
  - 列出本仓跨平台地址（Gitcode / GitHub / Gitee 含停维标注）；
  - 12 产品速览表（每个产品 4 个核心仓直链）；
  - 本产品全部仓库详表（本仓高亮）；
  - 片段用 `<!-- ASCEND-REPO-NAV:START/END -->` 注释包裹，图谱更新后可幂等重刷。
- 用法：
  ```bash
  cd ascend-repo-map/readme-snippet
  python generate_snippets.py --repo triton-ascend            # 打印单个仓片段
  python generate_snippets.py --repo ops-nn > snippet.md      # CANN 算子库片段
  python generate_snippets.py --repo torch-npu                # 内置别名映射到 Ascend/pytorch
  python generate_snippets.py --all                           # 批量生成 198 个仓片段到 out/
  ```
- 示例：`readme-snippet/examples/`（triton-ascend、cann-ops-nn、torch-npu、MindSpeed-LLM 四个成品）。
- 落地要求：需要各仓 Committer 合入 README 变更（可由各产品团队批量提 PR）。

### 方案 4：浏览器油猴脚本（个人即时生效、零改动仓库）

- 文件：`userscript/ascend-repo-nav.user.js`（数据由 `build_userscript.py` 从图谱注入）
- 做法：浏览器装 Tampermonkey/Violentmonkey → 导入该脚本。在 GitHub / Gitcode / Gitee 任意页面右侧出现「昇腾生态」按钮，点开侧栏：
  - **自动识别当前仓**：显示其所属产品/组件、简介、**跨平台跳转地址**（当前平台高亮，归档/停维仓有标注）；
  - **12 产品全图导航**：按产品分组列出全部 200+ 仓库，当前仓高亮定位；
  - 支持关键字过滤（如输入 triton 直达 Triton 仓）；
  - 支持 GitHub/Gitcode SPA 路由变化自动刷新。
- 效果示例：访问 `gitcode.com/cann/ops-nn`（CANN 算子库）→ 点开侧栏 → Triton 分组 → 一键跳 `github.com/triton-lang/triton-ascend`。
- 无需任何仓库权限，安装即用；数据更新时重跑 `build_userscript.py` 重新导入。

### 方案对比

| 维度 | 方案1 图谱数据 | 方案3 README 互链 | 方案4 油猴脚本 |
|---|---|---|---|
| 生效范围 | 工具/平台集成 | 所有访问者（仓内可见） | 仅安装者 |
| 是否需要仓库权限 | 否 | **需要（各仓 PR）** | 否 |
| 落地速度 | 即时 | 慢（跨 200 仓协调） | 即时 |
| 维护成本 | 单点维护图谱 | 图谱更新后批量重刷片段 | 重跑构建脚本 |
| 适合阶段 | 基础设施（必选） | 长期官方形态 | 个人/过渡期效率工具 |

> 建议组合：**方案 1（数据底座）+ 方案 3（长期目标）**，方案 4 作为方案 3 全面落地前的即时过渡。

## 三、目录结构

```
ascend-repo-map/
├── README.md                          # 本说明
├── data/
│   └── ascend-repo-graph.json         # ★ 12 产品代码仓图谱（唯一数据源）
├── readme-snippet/
│   ├── generate_snippets.py           # 片段/Hub 生成器（方案 2/3）
│   ├── hub.md                         # 完整导航 Hub 页
│   ├── examples/                      # 4 个仓的成品片段示例
│   └── out/                           # --all 批量产物（198 个仓）
└── userscript/
    ├── ascend-repo-nav.template.js    # 油猴脚本模板（逻辑）
    ├── build_userscript.py            # 图谱 → 油猴脚本构建器（方案 4）
    ├── ascend-repo-nav.user.js        # ★ 即装即用的成品脚本
    └── smoke_test.js                  # 识别逻辑冒烟测试（node smoke_test.js）
```

## 四、数据维护

1. 修改 `data/ascend-repo-graph.json`（新增仓库/修正地址）；
2. 重刷产物：`python readme-snippet/generate_snippets.py --all`、`--hub`，`python userscript/build_userscript.py`；
3. 跑 `node userscript/smoke_test.js` 验证识别逻辑。

## 五、调研方式备注

- 昇腾文档站产品分类：hiascend.com `/zh/document`（分类见页首）+ 站点 `llms.txt`；
- 仓库清单：Gitcode `gitcode.com/org/CANN/repos`（5 页 92 仓）与 `gitcode.com/org/Ascend/repos`（6 页 109 仓）全量枚举、GitHub `github.com/Ascend`（4 页 110+ 仓）全量枚举、Gitee 抽样核对迁移状态；
- 特殊仓逐一核实：triton-ascend（Gitcode 归档→GitHub 迁移）、vllm-ascend、sglang 双仓、ascend-deployer（仅 Gitcode）、hcomm/amct（CANN 组织页列出）。
