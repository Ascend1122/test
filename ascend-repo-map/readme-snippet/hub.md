# 昇腾软件产品代码仓导航 Hub

> 覆盖昇腾 12 大软件产品（文档站口径）及其二级产品/组件的开源代码仓。
> 数据源：`data/ascend-repo-graph.json`（由本目录脚本重新生成）。
> 平台说明：**Gitcode** 为昇腾社区新家；**GitHub** 为三方仓/镜像主阵地；Gitee 为遗留平台（多数已停维）。

## 快速入口

| 产品 | 文档 | 代码组织 |
|---|---|---|
| **CANN**（异构计算架构） | [文档](https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/latest/index/index.html) | https://gitcode.com/CANN |
| **Ascend for PyTorch (torch-npu)**（AI框架） | [文档](https://www.hiascend.com/document/detail/zh/Pytorch/01Pytorch%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **Ascend for TensorFlow**（AI框架） | [文档](https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html) | https://gitcode.com/cann · https://gitee.com/ascend |
| **MindStudio**（全流程开发工具链） | [文档](https://www.hiascend.com/document/detail/zh/mindstudio/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **MindSpeed**（应用使能） | [文档](https://www.hiascend.com/document/detail/zh/MindSpeed/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **MindIE**（应用使能） | [文档](https://www.hiascend.com/document/detail/zh/mindie/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **MindSDK**（应用使能） | [文档](https://www.hiascend.com/document/detail/zh/mindsdk/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **MindCluster**（应用使能） | [文档](https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **MindEdge**（应用使能） | [文档](https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html) | https://gitcode.com/Ascend · https://github.com/Ascend |
| **vLLM-Ascend**（三方资源） | [文档](https://vllm-ascend.readthedocs.io/en/latest/) | https://github.com/vllm-project |
| **Triton**（三方资源） | [文档](https://triton-ascend.readthedocs.io/zh-cn/latest/index.html) | https://github.com/triton-lang |
| **SGLang**（三方资源） | [文档](https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation) | https://github.com/sgl-project |

---

## CANN（异构计算架构）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/latest/index/index.html](https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/latest/index/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cann](https://www.hiascend.com/cann)

### 算子库

| 仓库 | 说明 | 地址 |
|---|---|---|
| ops-nn | 神经网络类计算算子库（G-Star） | [Gitcode](https://gitcode.com/cann/ops-nn) |
| ops-math | 数学类基础计算算子库（G-Star） | [Gitcode](https://gitcode.com/cann/ops-math) |
| ops-transformer | Transformer 类大模型算子库（G-Star） | [Gitcode](https://gitcode.com/cann/ops-transformer) |
| ops-cv | 图像处理、目标检测算子库 | [Gitcode](https://gitcode.com/cann/ops-cv) |
| ops-tensor | 张量类计算基础算子库 | [Gitcode](https://gitcode.com/cann/ops-tensor) |
| ops-blas | 高性能线性代数与轻量 GEMM 算子库 | [Gitcode](https://gitcode.com/cann/ops-blas) |
| ops-fft | FFT 类计算基础算子库 | [Gitcode](https://gitcode.com/cann/ops-fft) |
| ops-sparse | 高性能稀疏矩阵计算算子库 | [Gitcode](https://gitcode.com/cann/ops-sparse) |
| ops-solver | 高级数值求解算子库 | [Gitcode](https://gitcode.com/cann/ops-solver) |
| ops-rand | 随机数生成算子库 | [Gitcode](https://gitcode.com/cann/ops-rand) |
| ops-gnn | 图神经网络（GNN）算子库，支持 PYG/DGL | [Gitcode](https://gitcode.com/cann/ops-gnn) |
| ops-collections | 高性能容器模板库（static_map/dynamic_map/set 等） | [Gitcode](https://gitcode.com/cann/ops-collections) |
| ops-ras | RAS 相关算子库 | [Gitcode](https://gitcode.com/cann/ops-ras) |
| opbase | 算子库基础框架，提供公共依赖与基础调度能力 | [Gitcode](https://gitcode.com/cann/opbase) |
| ops-test-kit | TTK 全链路自动化算子测试框架 | [Gitcode](https://gitcode.com/cann/ops-test-kit) |
| ops-multimodal-fusion | 基于 AscendC 的 PyTorch 自定义多模态算子库 | [Gitcode](https://gitcode.com/cann/ops-multimodal-fusion) |
| multimodal-ops | 多模态 AI 算子库（编码/融合/几何/扩散） | [Gitcode](https://gitcode.com/cann/multimodal-ops) |
| ops-tilelang | TileLang 高性能算子仓 | [Gitcode](https://gitcode.com/cann/ops-tilelang) |
| gauss-splat | 3D Gaussian Splatting 渲染加速库 | [Gitcode](https://gitcode.com/cann/gauss-splat) |
| cann-ops | Gitee 时代的开发者共建算子仓（已迁移 Gitcode） | [Gitee](https://gitee.com/ascend/cann-ops)（已停维） |

### 领域加速库

| 仓库 | 说明 | 地址 |
|---|---|---|
| ascend-transformer-boost | Transformer 加速库（ATB），高性能融合算子 | [Gitcode](https://gitcode.com/cann/ascend-transformer-boost) |
| sip | 高性能信号处理算子加速库 | [Gitcode](https://gitcode.com/cann/sip) |
| ascend-boost-comm | 算子公共平台：南向对接算子库、北向支撑加速库 | [Gitcode](https://gitcode.com/cann/ascend-boost-comm) |
| elec-ops-inspection | 电力装备巡检算子库（电力 SIG） | [Gitcode](https://gitcode.com/cann/elec-ops-inspection) |
| elec-ops-prediction | 电力负荷预测算子库（电力 SIG） | [Gitcode](https://gitcode.com/cann/elec-ops-prediction) |
| elec-ops-simulation | 电力仿真求解算子库（电力 SIG） | [Gitcode](https://gitcode.com/cann/elec-ops-simulation) |
| oil-gas-ops-prospect | 油气勘探算子库（地震成像/FWI） | [Gitcode](https://gitcode.com/cann/oil-gas-ops-prospect) |
| bio-ops-molecule | 生命科学分子模拟算子库 | [Gitcode](https://gitcode.com/cann/bio-ops-molecule) |
| mat-chem-sim-pred | 材料化学仿真与预测领域计算层 | [Gitcode](https://gitcode.com/cann/mat-chem-sim-pred) |
| crypto | 密码学高性能算子库（密码 SIG） | [Gitcode](https://gitcode.com/cann/crypto) |
| its-stable-llm | 交通大模型训练稳定性分析（transportation SIG） | [Gitcode](https://gitcode.com/cann/its-stable-llm) |
| its-matrix-computation | GEMM 分块策略自动优化（transportation SIG） | [Gitcode](https://gitcode.com/cann/its-matrix-computation) |
| its-trip | 交通大模型智能决策闭环（transportation SIG） | [Gitcode](https://gitcode.com/cann/its-trip) |

### 通信库

| 仓库 | 说明 | 地址 |
|---|---|---|
| hccl | 集合通信库 Huawei Collective Communication Library | [Gitcode](https://gitcode.com/cann/hccl) |
| hcomm | HCCL 的通信基础库（通信域/通信资源管理） | [Gitcode](https://gitcode.com/cann/hcomm) |
| hixl | 昇腾单边通信库 Huawei Xfer Library | [Gitcode](https://gitcode.com/cann/hixl) |
| shmem | 基于 OpenSHMEM 的多机多卡内存通信库 | [Gitcode](https://gitcode.com/cann/shmem) |
| asc-comm | 通算融合场景统一高性能数据面 | [Gitcode](https://gitcode.com/cann/asc-comm) |
| catccos | 计算-通信融合算子模板库 | [Gitcode](https://gitcode.com/cann/catccos) |

### 图引擎

| 仓库 | 说明 | 地址 |
|---|---|---|
| ge | Graph Engine 图编译器与执行器（支持 PyTorch/TF/ONNX 前端） | [Gitcode](https://gitcode.com/cann/ge) |
| metadef | Ascend 元数据定义（MetaDef） | [Gitcode](https://gitcode.com/cann/metadef) |
| graph-autofusion | 自动融合组件（SuperKernel/Autofuse） | [Gitcode](https://gitcode.com/cann/graph-autofusion) |
| triton-inference-server-ge-backend | Triton Inference Server 的 GE 后端（模型服务化） | [Gitcode](https://gitcode.com/cann/triton-inference-server-ge-backend) |

### 编程语言与模板

| 仓库 | 说明 | 地址 |
|---|---|---|
| asc-devkit | Ascend C 算子程序开发语言（核心） | [Gitcode](https://gitcode.com/cann/asc-devkit) |
| pyasc | Ascend C 的 Python 编程接口 | [Gitcode](https://gitcode.com/cann/pyasc) |
| pypto | PyPTO 并行 Tensor/Tile 编程范式 | [Gitcode](https://gitcode.com/cann/pypto) |
| pto-isa | PTO 虚拟指令集架构 | [Gitcode](https://gitcode.com/cann/pto-isa) |
| pypto-gym | PyPTO 算子与模型样例仓 | [Gitcode](https://gitcode.com/cann/pypto-gym) |
| pypto-vscode | PyPTO 全流程辅助 VSCode 工具 | [Gitcode](https://gitcode.com/cann/pypto-vscode) |
| atvoss | Vector 算子库模板（Ascend C Templates for VOSS） | [Gitcode](https://gitcode.com/cann/atvoss) |
| atvc | Vector 算子模板头文件集合 | [Gitcode](https://gitcode.com/cann/atvc) |
| catlass | NPU 高性能矩阵乘模板库（类 CUTLASS） | [Gitcode](https://gitcode.com/cann/catlass) |
| asc-stl | Ascend C 编程标准库 | [Gitcode](https://gitcode.com/cann/asc-stl) |
| asnumpy | 昇腾 NPU 原生 NumPy（哈工大共建） | [Gitcode](https://gitcode.com/cann/asnumpy) |
| asnumpy-docs | asnumpy 文档仓 | [Gitcode](https://gitcode.com/cann/asnumpy-docs) |
| AscendNPU-IR | 基于 MLIR 的昇腾亲和算子编译中间表示 | [Gitcode](https://gitcode.com/Ascend/AscendNPU-IR) / [GitHub](https://github.com/Ascend/AscendNPU-IR) |

### 运行时与驱动

| 仓库 | 说明 | 地址 |
|---|---|---|
| runtime | CANN 运行时与维测组件 | [Gitcode](https://gitcode.com/cann/runtime) |
| driver | 基础驱动与资源管理调度 | [Gitcode](https://gitcode.com/cann/driver) |

### 工具

| 仓库 | 说明 | 地址 |
|---|---|---|
| asc-tools | Ascend C 配套调试工具 | [Gitcode](https://gitcode.com/cann/asc-tools) |
| oam-tools | 故障定位工具（故障收集/报错分析） | [Gitcode](https://gitcode.com/cann/oam-tools) |
| npu-simulator | NPUSim SoC 级芯片仿真工具 | [Gitcode](https://gitcode.com/cann/npu-simulator) |
| cann-spack-package | Spack 包管理配置 | [Gitcode](https://gitcode.com/cann/cann-spack-package) |
| cann-local-lm | 端边侧轻量大模型推理（LLM/VLM） | [Gitcode](https://gitcode.com/cann/cann-local-lm) |

### AI 辅助开发

| 仓库 | 说明 | 地址 |
|---|---|---|
| cannbot | CANNBot 智能体主仓 | [Gitcode](https://gitcode.com/cann/cannbot) |
| cannbot-skills | CANNBot Skills 模块仓（G-Star） | [Gitcode](https://gitcode.com/cann/cannbot-skills) |
| cannbot-dsl | CANNBot-DSL 复杂算子示例集 | [Gitcode](https://gitcode.com/cann/cannbot-dsl) |
| cannbot-sentry | Agent 工作流质量哨兵 | [Gitcode](https://gitcode.com/cann/cannbot-sentry) |
| cannbot-knowledge | CANN 知识仓（知识卡/检索） | [Gitcode](https://gitcode.com/cann/cannbot-knowledge) |
| cann-bench | CANN 领域 AI 能力评测平台 | [Gitcode](https://gitcode.com/cann/cann-bench) |
| model-agent | 昇腾模型 Agent（查适配/调优/部署） | [Gitcode](https://gitcode.com/Ascend/model-agent) / [GitHub](https://github.com/Ascend/msmodeling) |

### 学习与样例

| 仓库 | 说明 | 地址 |
|---|---|---|
| cann-learning-hub | CANN 学习中心（教程/示例/在线运行） | [Gitcode](https://gitcode.com/cann/cann-learning-hub) |
| cann-samples | CANN 高性能实战样例与调优知识库 | [Gitcode](https://gitcode.com/cann/cann-samples) |
| cann-recipes-infer | LLM/多模态推理优化样例 | [Gitcode](https://gitcode.com/cann/cann-recipes-infer) |
| cann-recipes-train | LLM/多模态训练优化样例 | [Gitcode](https://gitcode.com/cann/cann-recipes-train) |
| cann-recipes-docs | 训推性能优化技术文档 | [Gitcode](https://gitcode.com/cann/cann-recipes-docs) |
| cann-recipes-spatial-intelligence | 空间智能业务样例 | [Gitcode](https://gitcode.com/cann/cann-recipes-spatial-intelligence) |
| cann-recipes-embodied-ai | 具身智能业务样例 | [Gitcode](https://gitcode.com/cann/cann-recipes-embodied-ai) |
| cann-recipes-harmony-infer | 鸿蒙端侧推理部署样例 | [Gitcode](https://gitcode.com/cann/cann-recipes-harmony-infer) |
| multimodal-benchmark | 多模态算子/模型自动化工具链与评测基准 | [Gitcode](https://gitcode.com/cann/multimodal-benchmark) |
| multimodal-samples | 多模态模型集合（自动驾驶/AIGC） | [Gitcode](https://gitcode.com/cann/multimodal-samples) |
| cann-launch-camp | 启航营高校活动作品仓 | [Gitcode](https://gitcode.com/cann/cann-launch-camp) |
| cann-ops-competitions | 竞赛/开源课题/社区任务仓 | [Gitcode](https://gitcode.com/cann/cann-ops-competitions) |
| cann-outreach | 产业活动与会议客户体验作品仓 | [Gitcode](https://gitcode.com/cann/cann-outreach) |

### 框架后端（CANN 组织内）

| 仓库 | 说明 | 地址 |
|---|---|---|
| tensorflow | Huawei Ascend TensorFlow Adapter | [Gitcode](https://gitcode.com/cann/tensorflow) |
| xla-npu | XLA 昇腾后端（对接 JAX） | [Gitcode](https://gitcode.com/cann/xla-npu) |
| torchtitan-npu | TorchTitan 昇腾扩展（CANN 组织） | [Gitcode](https://gitcode.com/cann/torchtitan-npu) |

### 社区与基础设施

| 仓库 | 说明 | 地址 |
|---|---|---|
| community | CANN 社区治理章程/组织/规范 | [Gitcode](https://gitcode.com/cann/community) |
| infrastructure | CANN 基础设施团队公开信息 | [Gitcode](https://gitcode.com/cann/infrastructure) |
| docs | CANN 公共文档 | [Gitcode](https://gitcode.com/cann/docs) |
| manifest | repo 工具多仓同步配置 | [Gitcode](https://gitcode.com/cann/manifest) |
| release-management | CANN 版本发布管理 | [Gitcode](https://gitcode.com/cann/release-management) |
| cmake | 公共编译/打包/安装脚本 | [Gitcode](https://gitcode.com/cann/cmake) |
| cannlab | CANNLab 免费在线算力平台 | [Gitcode](https://gitcode.com/org/cann/cannlab) |

**关联产品**：pytorch · tensorflow · mindstudio · mindspeed · mindie · triton · vllm-ascend · sglang

---

## Ascend for PyTorch (torch-npu)（AI框架）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/Pytorch/01Pytorch%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html](https://www.hiascend.com/document/detail/zh/Pytorch/01Pytorch%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/developer/software/ai-frameworks/pytorch](https://www.hiascend.com/cn/developer/software/ai-frameworks/pytorch)

### 核心组件

| 仓库 | 说明 | 地址 |
|---|---|---|
| pytorch | TorchNPU：PyTorch 昇腾适配插件（核心） | [Gitcode](https://gitcode.com/Ascend/pytorch) / [GitHub](https://github.com/Ascend/pytorch) / [Gitee](https://gitee.com/ascend/pytorch)（已停维） |
| op-plugin | TorchNPU 算子适配插件 | [Gitcode](https://gitcode.com/Ascend/op-plugin) / [GitHub](https://github.com/Ascend/op-plugin) / [Gitee](https://gitee.com/ascend/op-plugin)（已停维） |
| torchair | TorchNPU 图模式能力扩展库（G-Star） | [Gitcode](https://gitcode.com/Ascend/torchair) / [GitHub](https://github.com/Ascend/torchair) / [Gitee](https://gitee.com/ascend/torchair)（已停维） |

### 生态适配

| 仓库 | 说明 | 地址 |
|---|---|---|
| apex | NVIDIA Apex 昇腾适配 | [Gitcode](https://gitcode.com/Ascend/apex) / [GitHub](https://github.com/Ascend/apex) |
| vision | Torchvision 昇腾适配插件 | [Gitcode](https://gitcode.com/Ascend/vision) / [GitHub](https://github.com/Ascend/vision) |
| transformers | HuggingFace Transformers 昇腾适配 | [Gitcode](https://gitcode.com/Ascend/transformers) / [GitHub](https://github.com/Ascend/transformers) |
| ltc | PyTorch Lazy Tensor Core 昇腾后端 | [Gitcode](https://gitcode.com/Ascend/ltc) / [GitHub](https://github.com/Ascend/ltc) |
| torchcomms_npu | 分布式通信算子库 | [Gitcode](https://gitcode.com/Ascend/torchcomms_npu) / [GitHub](https://github.com/Ascend/torchcomms_npu) |
| fbgemm-ascend | 推荐系统高性能 PyTorch NPU 算子库 | [Gitcode](https://gitcode.com/Ascend/fbgemm-ascend) / [GitHub](https://github.com/Ascend/fbgemm-ascend) |
| torchao-ascend | TorchAO 昇腾扩展 | [Gitcode](https://gitcode.com/Ascend/torchao-ascend) |
| torchtitan-ascend | TorchTitan 昇腾适配版本 | [Gitcode](https://gitcode.com/Ascend/torchtitan-ascend) |
| FSDPTurbo | NPU 亲和的 FSDP 增强特性 | [Gitcode](https://gitcode.com/Ascend/FSDPTurbo) |
| FSDPTraining | FSDP2 大规模分布式训练最佳实践 | [Gitcode](https://gitcode.com/Ascend/FSDPTraining) |
| torchft-ascend | torchft 容错训练昇腾适配 | [Gitcode](https://gitcode.com/Ascend/torchft-ascend) |
| TransferQueue | 异步高性能流式数据引擎 | [Gitcode](https://gitcode.com/Ascend/TransferQueue) / [GitHub](https://github.com/Ascend/TransferQueue) |
| Tensorpipe | TensorPipe 昇腾适配 | [Gitcode](https://gitcode.com/Ascend/Tensorpipe) / [GitHub](https://github.com/Ascend/Tensorpipe) |
| pytorch-ecosystem | Ascend for PyTorch 生态活动官方仓 | [Gitcode](https://gitcode.com/Ascend/pytorch-ecosystem) |
| perf-reference-ascend | 基础性能测试参考设计 | [Gitcode](https://gitcode.com/Ascend/perf-reference-ascend) |

### 编译器相关 fork

| 仓库 | 说明 | 地址 |
|---|---|---|
| llvm-project | LLVM 昇腾功能 fork（支撑 AscendNPU-IR） | [Gitcode](https://gitcode.com/Ascend/llvm-project) |
| torch-mlir | torch-mlir 昇腾 fork | [Gitcode](https://gitcode.com/Ascend/torch-mlir) |
| libdevice | libdevice 昇腾实现 | [Gitcode](https://gitcode.com/Ascend/libdevice) |
| monarch_npu | monarch NPU 适配 | [Gitcode](https://gitcode.com/Ascend/monarch_npu) |
| taco | Torch Ascend Custom Operators | [Gitcode](https://gitcode.com/Ascend/taco) |

**关联产品**：cann · tensorflow · mindspeed · mindie · triton · vllm-ascend · sglang

---

## Ascend for TensorFlow（AI框架）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html](https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html](https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html)

### 适配器

| 仓库 | 说明 | 地址 |
|---|---|---|
| tensorflow | Huawei Ascend TensorFlow Adapter（活跃主仓） | [Gitcode](https://gitcode.com/cann/tensorflow) / [Gitee](https://gitee.com/ascend/tensorflow)（已停维） |

**关联产品**：cann · pytorch

---

## MindStudio（全流程开发工具链）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/mindstudio/latest/index.html](https://www.hiascend.com/document/detail/zh/mindstudio/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/developer/software/mindstudio](https://www.hiascend.com/cn/developer/software/mindstudio)

### 三大工具套件

| 仓库 | 说明 | 地址 |
|---|---|---|
| msit | msIT 推理工具链：模型压缩、调试调优 | [Gitcode](https://gitcode.com/Ascend/msit) / [GitHub](https://github.com/Ascend/msit) / [Gitee](https://gitee.com/ascend/msit)（已停维） |
| mstt | msTT 训练工具链：分析迁移、精度调试、性能调优 | [Gitcode](https://gitcode.com/Ascend/mstt) / [GitHub](https://github.com/Ascend/mstt) / [Gitee](https://gitee.com/ascend/mstt)（已停维） |
| msot | msOT 算子工具链：异常检测、算子调试、性能调优 | [Gitcode](https://gitcode.com/Ascend/msot) / [GitHub](https://github.com/Ascend/msot) |

### 性能调优

| 仓库 | 说明 | 地址 |
|---|---|---|
| msprof | msProf 模型调优工具（性能数据采集解析） | [Gitcode](https://gitcode.com/Ascend/msprof) / [GitHub](https://github.com/Ascend/msprof) |
| msprof-analyze | 性能分析工具（瓶颈识别） | [Gitcode](https://gitcode.com/Ascend/msprof-analyze) / [GitHub](https://github.com/Ascend/msprof-analyze) |
| mspti | msPTI Profiling Tools Interface | [Gitcode](https://gitcode.com/Ascend/mspti) / [GitHub](https://github.com/Ascend/mspti) |
| msserviceprofiler | 推理服务化性能数据采集工具 | [Gitcode](https://gitcode.com/Ascend/msserviceprofiler) / [GitHub](https://github.com/Ascend/msserviceprofiler) |
| msopprof | 算子 Profiler 工具 | [Gitcode](https://gitcode.com/Ascend/msopprof) / [GitHub](https://github.com/Ascend/msopprof) |
| msmonitor | 一站式在线监控工具 | [Gitcode](https://gitcode.com/Ascend/msmonitor) / [GitHub](https://github.com/Ascend/msmonitor) |
| msinsight | 大模型可视化调优（MindStudio-Insight） | [Gitcode](https://gitcode.com/Ascend/msinsight) / [GitHub](https://github.com/Ascend/msinsight) |
| msmodeling | 建模寻优工具（部署策略评估） | [Gitcode](https://gitcode.com/Ascend/msmodeling) / [GitHub](https://github.com/Ascend/msmodeling) |

### 精度与调试

| 仓库 | 说明 | 地址 |
|---|---|---|
| msprobe | 全场景精度工具链（MindStudio-Probe） | [Gitcode](https://gitcode.com/Ascend/msprobe) / [GitHub](https://github.com/Ascend/msprobe) |
| msdebug | Debugger 调试器 | [Gitcode](https://gitcode.com/Ascend/msdebug) / [GitHub](https://github.com/Ascend/msdebug) |
| msmemscope | 整网内存调试调优工具 | [Gitcode](https://gitcode.com/Ascend/msmemscope) / [GitHub](https://github.com/Ascend/msmemscope) |
| mssanitizer | 内存/精度消毒器 | [Gitcode](https://gitcode.com/Ascend/mssanitizer) / [GitHub](https://github.com/Ascend/mssanitizer) |
| msopgen | 算子工程生成器 | [Gitcode](https://gitcode.com/Ascend/msopgen) / [GitHub](https://github.com/Ascend/msopgen) |
| msopcom | 算子公共组件 | [Gitcode](https://gitcode.com/Ascend/msopcom) / [GitHub](https://github.com/Ascend/msopcom) |
| msoptuner | 算子调优器 | [Gitcode](https://gitcode.com/Ascend/msoptuner) / [GitHub](https://github.com/Ascend/msoptuner) |
| mskl | Kernel Launcher | [Gitcode](https://gitcode.com/Ascend/mskl) / [GitHub](https://github.com/Ascend/mskl) |
| mskpp | Kernel 性能预测 | [Gitcode](https://gitcode.com/Ascend/mskpp) / [GitHub](https://github.com/Ascend/mskpp) |
| msmodelslim | 模型量化压缩工具（ModelSlim） | [Gitcode](https://gitcode.com/Ascend/msmodelslim) / [GitHub](https://github.com/Ascend/msmodelslim) |
| mstx | Tools Extension Library | [Gitcode](https://gitcode.com/Ascend/mstx) / [GitHub](https://github.com/Ascend/mstx) |
| mscommreport | HCCL 中断类问题自动分析 | [Gitcode](https://gitcode.com/Ascend/mscommreport) |
| msagent | MindStudio 智能体（性能/精度自动分析） | [Gitcode](https://gitcode.com/Ascend/msagent) / [GitHub](https://github.com/Ascend/msagent) |
| msboost | 推理训练极致性能加速工具 | [Gitcode](https://gitcode.com/Ascend/msboost) |
| ATK | MindStudio-ATK | [Gitcode](https://gitcode.com/Ascend/ATK) |
| ascendc-kernelgen-data | AscendC 算子代码生成训练数据集 | [Gitcode](https://gitcode.com/Ascend/ascendc-kernelgen-data) |

**关联产品**：cann · pytorch · mindspeed · mindie

---

## MindSpeed（应用使能）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/MindSpeed/latest/index.html](https://www.hiascend.com/document/detail/zh/MindSpeed/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/developer/software/mindspeed](https://www.hiascend.com/cn/developer/software/mindspeed)

### 训练套件

| 仓库 | 说明 | 地址 |
|---|---|---|
| MindSpeed | MindSpeed Core 大模型加速库 | [Gitcode](https://gitcode.com/Ascend/MindSpeed) / [GitHub](https://github.com/Ascend/MindSpeed) / [Gitee](https://gitee.com/ascend/MindSpeed)（已停维） |
| MindSpeed-LLM | LLM 分布式训练框架（G-Star） | [Gitcode](https://gitcode.com/Ascend/MindSpeed-LLM) / [GitHub](https://github.com/Ascend/MindSpeed-LLM) / [Gitee](https://gitee.com/ascend/MindSpeed-LLM)（已停维） |
| MindSpeed-MM | 多模态大模型训练套件（G-Star） | [Gitcode](https://gitcode.com/Ascend/MindSpeed-MM) / [GitHub](https://github.com/Ascend/MindSpeed-MM) / [Gitee](https://gitee.com/ascend/MindSpeed-MM)（已停维） |
| MindSpeed-RL | 强化学习加速框架 | [Gitcode](https://gitcode.com/Ascend/MindSpeed-RL) / [GitHub](https://github.com/Ascend/MindSpeed-RL) |
| MindSpeed-Core-MS | MindSpore + MindSpeed 连接组件 | [Gitcode](https://gitcode.com/Ascend/MindSpeed-Core-MS) / [GitHub](https://github.com/Ascend/MindSpeed-Core-MS) |
| MindSpeed-Ops | 训练业务自定义算子实现 | [Gitcode](https://gitcode.com/Ascend/MindSpeed-Ops) |
| MindSpeed-Bridge | 基于 NVIDIA Megatron-Bridge 的训练适配框架 | [Gitcode](https://gitcode.com/Ascend/MindSpeed-Bridge) |
| MindSpeed-Agent | MindSpeed 系列套件开发 Agent | [Gitcode](https://gitcode.com/Ascend/MindSpeed-Agent) |

### Megatron 生态

| 仓库 | 说明 | 地址 |
|---|---|---|
| Megatron-LM | NVIDIA Megatron-LM 昇腾 fork | [Gitcode](https://gitcode.com/Ascend/Megatron-LM) / [GitHub](https://github.com/Ascend/Megatron-LM) |
| MegatronAdaptor | Megatron-LM 昇腾基础适配 | [Gitcode](https://gitcode.com/Ascend/MegatronAdaptor) |

### RL 相关

| 仓库 | 说明 | 地址 |
|---|---|---|
| slime-ascend | slime（RL rollout 框架）昇腾适配 | [Gitcode](https://gitcode.com/Ascend/slime-ascend) |
| AgentSDK | Aura Agentic RL 训推框架（详见 MindSDK） | [Gitcode](https://gitcode.com/Ascend/AgentSDK) / [GitHub](https://github.com/Ascend/AgentSDK) |

**关联产品**：cann · pytorch · mindstudio · mindie · vllm-ascend · sglang

---

## MindIE（应用使能）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/mindie/latest/index.html](https://www.hiascend.com/document/detail/zh/mindie/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/developer/software/mindie](https://www.hiascend.com/cn/developer/software/mindie)

### 推理引擎

| 仓库 | 说明 | 地址 |
|---|---|---|
| MindIE-LLM | 大语言模型推理引擎 | [Gitcode](https://gitcode.com/Ascend/MindIE-LLM) / [GitHub](https://github.com/Ascend/MindIE-LLM) |
| MindIE-Turbo | LLM 推理引擎加速插件库 | [Gitcode](https://gitcode.com/Ascend/MindIE-Turbo) / [GitHub](https://github.com/Ascend/MindIE-Turbo) |
| FlashGen | 多模态生成训推加速套件 | [Gitcode](https://gitcode.com/Ascend/FlashGen) |

### 服务化框架

| 仓库 | 说明 | 地址 |
|---|---|---|
| MindIE-Motor | 推理集群管理框架（Python） | [Gitcode](https://gitcode.com/Ascend/MindIE-Motor) / [GitHub](https://github.com/Ascend/MindIE-Motor) |
| MindIE-Motor-CPP | 推理集群管理框架（C++） | [Gitcode](https://gitcode.com/Ascend/MindIE-Motor-CPP) |
| MindIE-PyMotor | 通用模型推理服务化框架（GitHub 镜像） | [GitHub](https://github.com/Ascend/MindIE-PyMotor) |
| text-embeddings-inference | TEI 昇腾 fork（向量/嵌入推理） | [Gitcode](https://gitcode.com/Ascend/text-embeddings-inference) / [GitHub](https://github.com/Ascend/text-embeddings-inference) |

### 多模态生成

| 仓库 | 说明 | 地址 |
|---|---|---|
| MindIE-SD | 视图/多模态生成推理套件（vLLM Omni、Diffusers 等） | [Gitcode](https://gitcode.com/Ascend/MindIE-SD) / [GitHub](https://github.com/Ascend/MindIE-SD) |

### 性能组件

| 仓库 | 说明 | 地址 |
|---|---|---|
| MoonEP | MoonEP 负载均衡昇腾版本 | [Gitcode](https://gitcode.com/Ascend/MoonEP) / [GitHub](https://github.com/Ascend/MoonEP) |
| HierarchicalKV-ascend | 推荐系统高性能 KV 存储加速库 | [Gitcode](https://gitcode.com/Ascend/HierarchicalKV-ascend) / [GitHub](https://github.com/Ascend/HierarchicalKV-ascend) |
| memcache | 高性能分布式 KVCache（对接 vllm-ascend/sglang/MindIE） | [Gitcode](https://gitcode.com/Ascend/memcache) / [GitHub](https://github.com/Ascend/memcache) |

**关联产品**：cann · vllm-ascend · sglang · mindspeed · mindcluster

---

## MindSDK（应用使能）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/mindsdk/latest/index.html](https://www.hiascend.com/document/detail/zh/mindsdk/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/developer/software/mindsdk](https://www.hiascend.com/cn/developer/software/mindsdk)

### 行业 SDK

| 仓库 | 说明 | 地址 |
|---|---|---|
| VisionSDK | 图片/视频视觉分析 SDK | [Gitcode](https://gitcode.com/Ascend/VisionSDK) / [GitHub](https://github.com/Ascend/VisionSDK) |
| MultimodalSDK | 大模型推理预处理多模态加速 | [Gitcode](https://gitcode.com/Ascend/MultimodalSDK) / [GitHub](https://github.com/Ascend/MultimodalSDK) |
| IndexSDK | 向量特征检索引擎（类 Faiss） | [Gitcode](https://gitcode.com/Ascend/IndexSDK) / [GitHub](https://github.com/Ascend/IndexSDK) |
| RecSDK | 大规模推荐训推加速库 | [Gitcode](https://gitcode.com/Ascend/RecSDK) / [GitHub](https://github.com/Ascend/RecSDK) |
| DrivingSDK | 自动驾驶/具身智能训练加速套件 | [Gitcode](https://gitcode.com/Ascend/DrivingSDK) / [GitHub](https://github.com/Ascend/DrivingSDK) |
| AgentSDK | Aura Agentic RL 训推一体框架 | [Gitcode](https://gitcode.com/Ascend/AgentSDK) / [GitHub](https://github.com/Ascend/AgentSDK) |
| RAGSDK | 大模型知识增强（RAG）开发套件 | [Gitcode](https://gitcode.com/Ascend/RAGSDK) / [GitHub](https://github.com/Ascend/RAGSDK) |
| MindInferenceService | 模型推理服务（快速部署） | [Gitcode](https://gitcode.com/Ascend/MindInferenceService) / [GitHub](https://github.com/Ascend/MindInferenceService) |
| OMSDK | 智能边缘硬件管理平台 SDK（详见 MindEdge） | [Gitcode](https://gitcode.com/Ascend/OMSDK) / [GitHub](https://github.com/Ascend/OMSDK) |

### 检索与推荐组件

| 仓库 | 说明 | 地址 |
|---|---|---|
| faiss | Faiss 昇腾 fork（NPU 向量检索加速） | [Gitcode](https://gitcode.com/Ascend/faiss) |
| ops-rec | 推荐系统高性能融合算子仓 | [Gitcode](https://gitcode.com/Ascend/ops-rec) |

### 参考应用

| 仓库 | 说明 | 地址 |
|---|---|---|
| mindsdk-referenceapps | MindSDK 参考应用 | [Gitcode](https://gitcode.com/Ascend/mindsdk-referenceapps) |
| DeepSelect | 端到端行业参考应用 | [GitHub](https://github.com/Ascend/DeepSelect) |
| mindxsdk-referenceapps | MindX SDK 参考应用（遗留） | [GitHub](https://github.com/Ascend/mindxsdk-referenceapps) |

**关联产品**：cann · mindie · mindedge

---

## MindCluster（应用使能）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html](https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html](https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html)

### 集群组件

| 仓库 | 说明 | 地址 |
|---|---|---|
| mind-cluster | MindCluster 组件代码仓（ClusterSched/Ascend Docker Runtime/npu-exporter 等） | [Gitcode](https://gitcode.com/Ascend/mind-cluster) / [GitHub](https://github.com/Ascend/mind-cluster) |
| ascend-deployer | Ascend Deployer 一键安装部署 | [Gitcode](https://gitcode.com/Ascend/ascend-deployer) |
| mindcluster-deploy | MindCluster 部署样例库 | [Gitcode](https://gitcode.com/Ascend/mindcluster-deploy) / [GitHub](https://github.com/Ascend/mindcluster-deploy) |
| memfabric_hybrid | 内存池化基础软件（DRAM/显存混合池化） | [Gitcode](https://gitcode.com/Ascend/memfabric_hybrid) / [GitHub](https://github.com/Ascend/memfabric_hybrid) |
| MindCluster-AscendNPUBurn | 芯片/链路硬件故障压测 | [Gitcode](https://gitcode.com/Ascend/MindCluster-AscendNPUBurn) |
| workload_analysis | 负载分析工具 | [GitHub](https://github.com/Ascend/workload_analysis) |
| slurm-atlas-plugin | Slurm Atlas 插件 | [GitHub](https://github.com/Ascend/slurm-atlas-plugin) |
| Ascend-CI | Ascend CI 基础设施 | [GitHub](https://github.com/Ascend/Ascend-CI) |

**关联产品**：cann · mindie · mindedge

---

## MindEdge（应用使能）

📚 产品文档：[https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html](https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html](https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html)

### 边缘组件

| 仓库 | 说明 | 地址 |
|---|---|---|
| MEF | 轻量化端边云协同框架（边缘节点/容器应用管理） | [Gitcode](https://gitcode.com/Ascend/MEF) / [GitHub](https://github.com/Ascend/MEF) |
| OMSDK | 边缘硬件管理平台 SDK（Edge Management System） | [Gitcode](https://gitcode.com/Ascend/OMSDK) / [GitHub](https://github.com/Ascend/OMSDK) |
| cann-local-lm | 端边侧轻量 LLM/VLM 推理（CANN 组织，跨链） | [Gitcode](https://gitcode.com/cann/cann-local-lm) |
| cann-recipes-harmony-infer | 鸿蒙端侧推理部署样例（CANN 组织，跨链） | [Gitcode](https://gitcode.com/cann/cann-recipes-harmony-infer) |

**关联产品**：cann · mindcluster · mindsdk

---

## vLLM-Ascend（三方资源）

📚 产品文档：[https://vllm-ascend.readthedocs.io/en/latest/](https://vllm-ascend.readthedocs.io/en/latest/) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/dev-community/third-party/vllm](https://www.hiascend.com/cn/dev-community/third-party/vllm)

### 主仓与上游

| 仓库 | 说明 | 地址 |
|---|---|---|
| vllm-ascend | vLLM on Ascend NPU 社区插件（活跃主仓） | [GitHub](https://github.com/vllm-project/vllm-ascend) |
| vllm | vLLM 上游框架 | [GitHub](https://github.com/vllm-project/vllm) |

**关联产品**：cann · triton · sglang · mindie · mindspeed

---

## Triton（三方资源）

📚 产品文档：[https://triton-ascend.readthedocs.io/zh-cn/latest/index.html](https://triton-ascend.readthedocs.io/zh-cn/latest/index.html) ｜ 🏠 社区入口：[https://www.hiascend.com/cn/dev-community/third-party/triton](https://www.hiascend.com/cn/dev-community/third-party/triton)

### 主仓与历史地址

| 仓库 | 说明 | 地址 |
|---|---|---|
| triton-ascend | Triton 语言与编译器昇腾后端（活跃主仓，已迁 GitHub） | [GitHub](https://github.com/triton-lang/triton-ascend) |
| triton-ascend (gitcode) | Gitcode 历史仓（已归档，README 指向 GitHub 新仓） | [Gitcode](https://gitcode.com/Ascend/triton-ascend)（已归档） |
| triton-ascend (gitee) | Gitee 历史仓 | [Gitee](https://gitee.com/ascend/triton-ascend)（已停维） |

### 周边仓

| 仓库 | 说明 | 地址 |
|---|---|---|
| Triton-distributed-ascend | 基于 Triton 的分布式计算框架（计算通信重叠） | [Gitcode](https://gitcode.com/Ascend/Triton-distributed-ascend) |
| triton-ascend-kernels | Triton-Ascend Kernel 集合仓 | [Gitcode](https://gitcode.com/Ascend/triton-ascend-kernels) |
| triton-ascend-ops | Triton-Ascend 算子实验仓 | [GitHub](https://github.com/Ascend/triton-ascend-ops) |
| triton-inference-server-ge-backend | Triton Inference Server GE 后端（CANN 组织，跨链） | [Gitcode](https://gitcode.com/cann/triton-inference-server-ge-backend) |
| tilelang-ascend | TileLang 昇腾后端（相关语言生态） | [GitHub](https://github.com/tile-ai/tilelang-ascend/tree/ascendc_pto) |

**关联产品**：cann · pytorch · vllm-ascend · sglang

---

## SGLang（三方资源）

📚 产品文档：[https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation](https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation) ｜ 🏠 社区入口：[https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation](https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation)

### 上游与昇腾仓

| 仓库 | 说明 | 地址 |
|---|---|---|
| sglang | SGLang 上游框架（原生支持昇腾 A2/A3/950） | [GitHub](https://github.com/sgl-project/sglang) |
| sglang (Ascend fork) | 昇腾侧 SGLang 维护开发 fork | [GitHub](https://github.com/Ascend/sglang) |
| ascend-sglang | SGLang 昇腾辅助仓 | [GitHub](https://github.com/Ascend/ascend-sglang) |
| sgl-sglang | SGLang 昇腾辅助仓 | [GitHub](https://github.com/Ascend/sgl-sglang) |

**关联产品**：cann · vllm-ascend · triton · mindie · mindspeed

---

## 相关生态（非 12 产品口径）

| 仓库 | 说明 | 地址 |
|---|---|---|
| ModelZoo-PyTorch | 昇腾模型库（PyTorch） | [Gitcode](https://gitcode.com/Ascend/ModelZoo-PyTorch) / [Gitee](https://gitee.com/ascend/ModelZoo-PyTorch) |
| modelzoo | Ascend ModelZoo | [Gitcode](https://gitcode.com/Ascend/modelzoo) |
| modelzoo-GPL | GPL 协议模型库 | [Gitcode](https://gitcode.com/Ascend/modelzoo-GPL) |
| verl | 火山引擎 RL 训练框架（支持昇腾，三方） | [GitHub](https://github.com/vllm-project/verl) |
| LLaMA-Factory | LLaMA-Factory 微调框架（昇腾适配，三方） | [GitHub](https://github.com/hiyouga/LLaMA-Factory) |
| mindspore | 昇思 MindSpore AI 框架（独立社区，未列入本次 12 产品口径） | [GitHub](https://github.com/mindspore-ai/mindspore) / [Gitee](https://gitee.com/mindspore/mindspore) |
| community | Ascend 社区核心管理仓（组织权限/SIG） | [Gitcode](https://gitcode.com/Ascend/community) / [GitHub](https://github.com/Ascend/community) |
| docs | Ascend 社区通用文档仓 | [Gitcode](https://gitcode.com/Ascend/docs) / [GitHub](https://github.com/Ascend/docs) |
| EcoDevHub | 生态技术创新项目/外部案例沉淀仓 | [Gitcode](https://gitcode.com/Ascend/EcoDevHub) |
| solution-agent | 行业解决方案参考设计仓 | [Gitcode](https://gitcode.com/Ascend/solution-agent) |
| agent-skills | AI 辅助研发 Agent 技能仓 | [Gitcode](https://gitcode.com/Ascend/agent-skills) / [GitHub](https://github.com/Ascend/agent-skills) |
| samples | 昇腾样例仓（Gitee 遗留） | [Gitee](https://gitee.com/ascend/samples) |

---

## Gitee 遗留说明

Gitee ascend 组织为昇腾开源 1.0 时代主阵地，2025 年起社区整体迁往 Gitcode（华为系新家）与 GitHub（三方仓）。存量 Gitee 仓多数保留只读/停维状态，仅作历史指针。

迁移指引：https://gitcode.com/Ascend/discussions/1

