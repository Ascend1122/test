// ==UserScript==
// @name         昇腾代码仓生态导航 (Ascend Repo Navigator)
// @namespace    ascend-repo-map
// @version      1.0.0
// @description  在 GitHub / Gitcode / Gitee 的昇腾相关仓库页面注入侧边导航：自动识别当前仓所属产品，一键跳转 12 大软件产品全部代码仓（含跨平台地址）
// @author       ascend-repo-map
// @match        https://github.com/*
// @match        https://gitcode.com/*
// @match        https://gitee.com/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  // 图谱数据由 ascend-repo-map/data/ascend-repo-graph.json 注入
  const GRAPH = {"products":[{"id":"cann","name":"CANN","category":"异构计算架构","docUrl":"https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/latest/index/index.html","groups":[{"name":"算子库","repos":[{"name":"ops-nn","desc":"神经网络类计算算子库（G-Star）","urls":{"gitcode":"https://gitcode.com/cann/ops-nn"}},{"name":"ops-math","desc":"数学类基础计算算子库（G-Star）","urls":{"gitcode":"https://gitcode.com/cann/ops-math"}},{"name":"ops-transformer","desc":"Transformer 类大模型算子库（G-Star）","urls":{"gitcode":"https://gitcode.com/cann/ops-transformer"}},{"name":"ops-cv","desc":"图像处理、目标检测算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-cv"}},{"name":"ops-tensor","desc":"张量类计算基础算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-tensor"}},{"name":"ops-blas","desc":"高性能线性代数与轻量 GEMM 算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-blas"}},{"name":"ops-fft","desc":"FFT 类计算基础算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-fft"}},{"name":"ops-sparse","desc":"高性能稀疏矩阵计算算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-sparse"}},{"name":"ops-solver","desc":"高级数值求解算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-solver"}},{"name":"ops-rand","desc":"随机数生成算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-rand"}},{"name":"ops-gnn","desc":"图神经网络（GNN）算子库，支持 PYG/DGL","urls":{"gitcode":"https://gitcode.com/cann/ops-gnn"}},{"name":"ops-collections","desc":"高性能容器模板库（static_map/dynamic_map/set 等）","urls":{"gitcode":"https://gitcode.com/cann/ops-collections"}},{"name":"ops-ras","desc":"RAS 相关算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-ras"}},{"name":"opbase","desc":"算子库基础框架，提供公共依赖与基础调度能力","urls":{"gitcode":"https://gitcode.com/cann/opbase"}},{"name":"ops-test-kit","desc":"TTK 全链路自动化算子测试框架","urls":{"gitcode":"https://gitcode.com/cann/ops-test-kit"}},{"name":"ops-multimodal-fusion","desc":"基于 AscendC 的 PyTorch 自定义多模态算子库","urls":{"gitcode":"https://gitcode.com/cann/ops-multimodal-fusion"}},{"name":"multimodal-ops","desc":"多模态 AI 算子库（编码/融合/几何/扩散）","urls":{"gitcode":"https://gitcode.com/cann/multimodal-ops"}},{"name":"ops-tilelang","desc":"TileLang 高性能算子仓","urls":{"gitcode":"https://gitcode.com/cann/ops-tilelang"}},{"name":"gauss-splat","desc":"3D Gaussian Splatting 渲染加速库","urls":{"gitcode":"https://gitcode.com/cann/gauss-splat"}},{"name":"cann-ops","desc":"Gitee 时代的开发者共建算子仓（已迁移 Gitcode）","urls":{"gitee":"https://gitee.com/ascend/cann-ops"},"status":"legacy"}]},{"name":"领域加速库","repos":[{"name":"ascend-transformer-boost","desc":"Transformer 加速库（ATB），高性能融合算子","urls":{"gitcode":"https://gitcode.com/cann/ascend-transformer-boost"}},{"name":"sip","desc":"高性能信号处理算子加速库","urls":{"gitcode":"https://gitcode.com/cann/sip"}},{"name":"ascend-boost-comm","desc":"算子公共平台：南向对接算子库、北向支撑加速库","urls":{"gitcode":"https://gitcode.com/cann/ascend-boost-comm"}},{"name":"elec-ops-inspection","desc":"电力装备巡检算子库（电力 SIG）","urls":{"gitcode":"https://gitcode.com/cann/elec-ops-inspection"}},{"name":"elec-ops-prediction","desc":"电力负荷预测算子库（电力 SIG）","urls":{"gitcode":"https://gitcode.com/cann/elec-ops-prediction"}},{"name":"elec-ops-simulation","desc":"电力仿真求解算子库（电力 SIG）","urls":{"gitcode":"https://gitcode.com/cann/elec-ops-simulation"}},{"name":"oil-gas-ops-prospect","desc":"油气勘探算子库（地震成像/FWI）","urls":{"gitcode":"https://gitcode.com/cann/oil-gas-ops-prospect"}},{"name":"bio-ops-molecule","desc":"生命科学分子模拟算子库","urls":{"gitcode":"https://gitcode.com/cann/bio-ops-molecule"}},{"name":"mat-chem-sim-pred","desc":"材料化学仿真与预测领域计算层","urls":{"gitcode":"https://gitcode.com/cann/mat-chem-sim-pred"}},{"name":"crypto","desc":"密码学高性能算子库（密码 SIG）","urls":{"gitcode":"https://gitcode.com/cann/crypto"}},{"name":"its-stable-llm","desc":"交通大模型训练稳定性分析（transportation SIG）","urls":{"gitcode":"https://gitcode.com/cann/its-stable-llm"}},{"name":"its-matrix-computation","desc":"GEMM 分块策略自动优化（transportation SIG）","urls":{"gitcode":"https://gitcode.com/cann/its-matrix-computation"}},{"name":"its-trip","desc":"交通大模型智能决策闭环（transportation SIG）","urls":{"gitcode":"https://gitcode.com/cann/its-trip"}}]},{"name":"通信库","repos":[{"name":"hccl","desc":"集合通信库 Huawei Collective Communication Library","urls":{"gitcode":"https://gitcode.com/cann/hccl"}},{"name":"hcomm","desc":"HCCL 的通信基础库（通信域/通信资源管理）","urls":{"gitcode":"https://gitcode.com/cann/hcomm"}},{"name":"hixl","desc":"昇腾单边通信库 Huawei Xfer Library","urls":{"gitcode":"https://gitcode.com/cann/hixl"}},{"name":"shmem","desc":"基于 OpenSHMEM 的多机多卡内存通信库","urls":{"gitcode":"https://gitcode.com/cann/shmem"}},{"name":"asc-comm","desc":"通算融合场景统一高性能数据面","urls":{"gitcode":"https://gitcode.com/cann/asc-comm"}},{"name":"catccos","desc":"计算-通信融合算子模板库","urls":{"gitcode":"https://gitcode.com/cann/catccos"}}]},{"name":"图引擎","repos":[{"name":"ge","desc":"Graph Engine 图编译器与执行器（支持 PyTorch/TF/ONNX 前端）","urls":{"gitcode":"https://gitcode.com/cann/ge"}},{"name":"metadef","desc":"Ascend 元数据定义（MetaDef）","urls":{"gitcode":"https://gitcode.com/cann/metadef"}},{"name":"graph-autofusion","desc":"自动融合组件（SuperKernel/Autofuse）","urls":{"gitcode":"https://gitcode.com/cann/graph-autofusion"}},{"name":"triton-inference-server-ge-backend","desc":"Triton Inference Server 的 GE 后端（模型服务化）","urls":{"gitcode":"https://gitcode.com/cann/triton-inference-server-ge-backend"}}]},{"name":"编程语言与模板","repos":[{"name":"asc-devkit","desc":"Ascend C 算子程序开发语言（核心）","urls":{"gitcode":"https://gitcode.com/cann/asc-devkit"}},{"name":"pyasc","desc":"Ascend C 的 Python 编程接口","urls":{"gitcode":"https://gitcode.com/cann/pyasc"}},{"name":"pypto","desc":"PyPTO 并行 Tensor/Tile 编程范式","urls":{"gitcode":"https://gitcode.com/cann/pypto"}},{"name":"pto-isa","desc":"PTO 虚拟指令集架构","urls":{"gitcode":"https://gitcode.com/cann/pto-isa"}},{"name":"pypto-gym","desc":"PyPTO 算子与模型样例仓","urls":{"gitcode":"https://gitcode.com/cann/pypto-gym"}},{"name":"pypto-vscode","desc":"PyPTO 全流程辅助 VSCode 工具","urls":{"gitcode":"https://gitcode.com/cann/pypto-vscode"}},{"name":"atvoss","desc":"Vector 算子库模板（Ascend C Templates for VOSS）","urls":{"gitcode":"https://gitcode.com/cann/atvoss"}},{"name":"atvc","desc":"Vector 算子模板头文件集合","urls":{"gitcode":"https://gitcode.com/cann/atvc"}},{"name":"catlass","desc":"NPU 高性能矩阵乘模板库（类 CUTLASS）","urls":{"gitcode":"https://gitcode.com/cann/catlass"}},{"name":"asc-stl","desc":"Ascend C 编程标准库","urls":{"gitcode":"https://gitcode.com/cann/asc-stl"}},{"name":"asnumpy","desc":"昇腾 NPU 原生 NumPy（哈工大共建）","urls":{"gitcode":"https://gitcode.com/cann/asnumpy"}},{"name":"asnumpy-docs","desc":"asnumpy 文档仓","urls":{"gitcode":"https://gitcode.com/cann/asnumpy-docs"}},{"name":"AscendNPU-IR","desc":"基于 MLIR 的昇腾亲和算子编译中间表示","urls":{"gitcode":"https://gitcode.com/Ascend/AscendNPU-IR","github":"https://github.com/Ascend/AscendNPU-IR"}}]},{"name":"运行时与驱动","repos":[{"name":"runtime","desc":"CANN 运行时与维测组件","urls":{"gitcode":"https://gitcode.com/cann/runtime"}},{"name":"driver","desc":"基础驱动与资源管理调度","urls":{"gitcode":"https://gitcode.com/cann/driver"}}]},{"name":"工具","repos":[{"name":"asc-tools","desc":"Ascend C 配套调试工具","urls":{"gitcode":"https://gitcode.com/cann/asc-tools"}},{"name":"oam-tools","desc":"故障定位工具（故障收集/报错分析）","urls":{"gitcode":"https://gitcode.com/cann/oam-tools"}},{"name":"npu-simulator","desc":"NPUSim SoC 级芯片仿真工具","urls":{"gitcode":"https://gitcode.com/cann/npu-simulator"}},{"name":"cann-spack-package","desc":"Spack 包管理配置","urls":{"gitcode":"https://gitcode.com/cann/cann-spack-package"}},{"name":"cann-local-lm","desc":"端边侧轻量大模型推理（LLM/VLM）","urls":{"gitcode":"https://gitcode.com/cann/cann-local-lm"}}]},{"name":"AI 辅助开发","repos":[{"name":"cannbot","desc":"CANNBot 智能体主仓","urls":{"gitcode":"https://gitcode.com/cann/cannbot"}},{"name":"cannbot-skills","desc":"CANNBot Skills 模块仓（G-Star）","urls":{"gitcode":"https://gitcode.com/cann/cannbot-skills"}},{"name":"cannbot-dsl","desc":"CANNBot-DSL 复杂算子示例集","urls":{"gitcode":"https://gitcode.com/cann/cannbot-dsl"}},{"name":"cannbot-sentry","desc":"Agent 工作流质量哨兵","urls":{"gitcode":"https://gitcode.com/cann/cannbot-sentry"}},{"name":"cannbot-knowledge","desc":"CANN 知识仓（知识卡/检索）","urls":{"gitcode":"https://gitcode.com/cann/cannbot-knowledge"}},{"name":"cann-bench","desc":"CANN 领域 AI 能力评测平台","urls":{"gitcode":"https://gitcode.com/cann/cann-bench"}},{"name":"model-agent","desc":"昇腾模型 Agent（查适配/调优/部署）","urls":{"gitcode":"https://gitcode.com/Ascend/model-agent","github":"https://github.com/Ascend/msmodeling"}}]},{"name":"学习与样例","repos":[{"name":"cann-learning-hub","desc":"CANN 学习中心（教程/示例/在线运行）","urls":{"gitcode":"https://gitcode.com/cann/cann-learning-hub"}},{"name":"cann-samples","desc":"CANN 高性能实战样例与调优知识库","urls":{"gitcode":"https://gitcode.com/cann/cann-samples"}},{"name":"cann-recipes-infer","desc":"LLM/多模态推理优化样例","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-infer"}},{"name":"cann-recipes-train","desc":"LLM/多模态训练优化样例","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-train"}},{"name":"cann-recipes-docs","desc":"训推性能优化技术文档","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-docs"}},{"name":"cann-recipes-spatial-intelligence","desc":"空间智能业务样例","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-spatial-intelligence"}},{"name":"cann-recipes-embodied-ai","desc":"具身智能业务样例","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-embodied-ai"}},{"name":"cann-recipes-harmony-infer","desc":"鸿蒙端侧推理部署样例","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-harmony-infer"}},{"name":"multimodal-benchmark","desc":"多模态算子/模型自动化工具链与评测基准","urls":{"gitcode":"https://gitcode.com/cann/multimodal-benchmark"}},{"name":"multimodal-samples","desc":"多模态模型集合（自动驾驶/AIGC）","urls":{"gitcode":"https://gitcode.com/cann/multimodal-samples"}},{"name":"cann-launch-camp","desc":"启航营高校活动作品仓","urls":{"gitcode":"https://gitcode.com/cann/cann-launch-camp"}},{"name":"cann-ops-competitions","desc":"竞赛/开源课题/社区任务仓","urls":{"gitcode":"https://gitcode.com/cann/cann-ops-competitions"}},{"name":"cann-outreach","desc":"产业活动与会议客户体验作品仓","urls":{"gitcode":"https://gitcode.com/cann/cann-outreach"}}]},{"name":"框架后端（CANN 组织内）","repos":[{"name":"tensorflow","desc":"Huawei Ascend TensorFlow Adapter","urls":{"gitcode":"https://gitcode.com/cann/tensorflow"}},{"name":"xla-npu","desc":"XLA 昇腾后端（对接 JAX）","urls":{"gitcode":"https://gitcode.com/cann/xla-npu"}},{"name":"torchtitan-npu","desc":"TorchTitan 昇腾扩展（CANN 组织）","urls":{"gitcode":"https://gitcode.com/cann/torchtitan-npu"}}]},{"name":"社区与基础设施","repos":[{"name":"community","desc":"CANN 社区治理章程/组织/规范","urls":{"gitcode":"https://gitcode.com/cann/community"}},{"name":"infrastructure","desc":"CANN 基础设施团队公开信息","urls":{"gitcode":"https://gitcode.com/cann/infrastructure"}},{"name":"docs","desc":"CANN 公共文档","urls":{"gitcode":"https://gitcode.com/cann/docs"}},{"name":"manifest","desc":"repo 工具多仓同步配置","urls":{"gitcode":"https://gitcode.com/cann/manifest"}},{"name":"release-management","desc":"CANN 版本发布管理","urls":{"gitcode":"https://gitcode.com/cann/release-management"}},{"name":"cmake","desc":"公共编译/打包/安装脚本","urls":{"gitcode":"https://gitcode.com/cann/cmake"}},{"name":"cannlab","desc":"CANNLab 免费在线算力平台","urls":{"gitcode":"https://gitcode.com/org/cann/cannlab"}}]}]},{"id":"pytorch","name":"Ascend for PyTorch (torch-npu)","category":"AI框架","docUrl":"https://www.hiascend.com/document/detail/zh/Pytorch/01Pytorch%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html","groups":[{"name":"核心组件","repos":[{"name":"pytorch","desc":"TorchNPU：PyTorch 昇腾适配插件（核心）","urls":{"gitcode":"https://gitcode.com/Ascend/pytorch","github":"https://github.com/Ascend/pytorch","gitee":"https://gitee.com/ascend/pytorch"},"giteeStatus":"legacy"},{"name":"op-plugin","desc":"TorchNPU 算子适配插件","urls":{"gitcode":"https://gitcode.com/Ascend/op-plugin","github":"https://github.com/Ascend/op-plugin","gitee":"https://gitee.com/ascend/op-plugin"},"giteeStatus":"legacy"},{"name":"torchair","desc":"TorchNPU 图模式能力扩展库（G-Star）","urls":{"gitcode":"https://gitcode.com/Ascend/torchair","github":"https://github.com/Ascend/torchair","gitee":"https://gitee.com/ascend/torchair"},"giteeStatus":"legacy"}]},{"name":"生态适配","repos":[{"name":"apex","desc":"NVIDIA Apex 昇腾适配","urls":{"gitcode":"https://gitcode.com/Ascend/apex","github":"https://github.com/Ascend/apex"}},{"name":"vision","desc":"Torchvision 昇腾适配插件","urls":{"gitcode":"https://gitcode.com/Ascend/vision","github":"https://github.com/Ascend/vision"}},{"name":"transformers","desc":"HuggingFace Transformers 昇腾适配","urls":{"gitcode":"https://gitcode.com/Ascend/transformers","github":"https://github.com/Ascend/transformers"}},{"name":"ltc","desc":"PyTorch Lazy Tensor Core 昇腾后端","urls":{"gitcode":"https://gitcode.com/Ascend/ltc","github":"https://github.com/Ascend/ltc"}},{"name":"torchcomms_npu","desc":"分布式通信算子库","urls":{"gitcode":"https://gitcode.com/Ascend/torchcomms_npu","github":"https://github.com/Ascend/torchcomms_npu"}},{"name":"fbgemm-ascend","desc":"推荐系统高性能 PyTorch NPU 算子库","urls":{"gitcode":"https://gitcode.com/Ascend/fbgemm-ascend","github":"https://github.com/Ascend/fbgemm-ascend"}},{"name":"torchao-ascend","desc":"TorchAO 昇腾扩展","urls":{"gitcode":"https://gitcode.com/Ascend/torchao-ascend"}},{"name":"torchtitan-ascend","desc":"TorchTitan 昇腾适配版本","urls":{"gitcode":"https://gitcode.com/Ascend/torchtitan-ascend"}},{"name":"FSDPTurbo","desc":"NPU 亲和的 FSDP 增强特性","urls":{"gitcode":"https://gitcode.com/Ascend/FSDPTurbo"}},{"name":"FSDPTraining","desc":"FSDP2 大规模分布式训练最佳实践","urls":{"gitcode":"https://gitcode.com/Ascend/FSDPTraining"}},{"name":"torchft-ascend","desc":"torchft 容错训练昇腾适配","urls":{"gitcode":"https://gitcode.com/Ascend/torchft-ascend"}},{"name":"TransferQueue","desc":"异步高性能流式数据引擎","urls":{"gitcode":"https://gitcode.com/Ascend/TransferQueue","github":"https://github.com/Ascend/TransferQueue"}},{"name":"Tensorpipe","desc":"TensorPipe 昇腾适配","urls":{"gitcode":"https://gitcode.com/Ascend/Tensorpipe","github":"https://github.com/Ascend/Tensorpipe"}},{"name":"pytorch-ecosystem","desc":"Ascend for PyTorch 生态活动官方仓","urls":{"gitcode":"https://gitcode.com/Ascend/pytorch-ecosystem"}},{"name":"perf-reference-ascend","desc":"基础性能测试参考设计","urls":{"gitcode":"https://gitcode.com/Ascend/perf-reference-ascend"}}]},{"name":"编译器相关 fork","repos":[{"name":"llvm-project","desc":"LLVM 昇腾功能 fork（支撑 AscendNPU-IR）","urls":{"gitcode":"https://gitcode.com/Ascend/llvm-project"}},{"name":"torch-mlir","desc":"torch-mlir 昇腾 fork","urls":{"gitcode":"https://gitcode.com/Ascend/torch-mlir"}},{"name":"libdevice","desc":"libdevice 昇腾实现","urls":{"gitcode":"https://gitcode.com/Ascend/libdevice"}},{"name":"monarch_npu","desc":"monarch NPU 适配","urls":{"gitcode":"https://gitcode.com/Ascend/monarch_npu"}},{"name":"taco","desc":"Torch Ascend Custom Operators","urls":{"gitcode":"https://gitcode.com/Ascend/taco"}}]}]},{"id":"tensorflow","name":"Ascend for TensorFlow","category":"AI框架","docUrl":"https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/01TensorFlow%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/index.html","groups":[{"name":"适配器","repos":[{"name":"tensorflow","desc":"Huawei Ascend TensorFlow Adapter（活跃主仓）","urls":{"gitcode":"https://gitcode.com/cann/tensorflow","gitee":"https://gitee.com/ascend/tensorflow"},"giteeStatus":"legacy"}]}]},{"id":"mindstudio","name":"MindStudio","category":"全流程开发工具链","docUrl":"https://www.hiascend.com/document/detail/zh/mindstudio/latest/index.html","groups":[{"name":"三大工具套件","repos":[{"name":"msit","desc":"msIT 推理工具链：模型压缩、调试调优","urls":{"gitcode":"https://gitcode.com/Ascend/msit","github":"https://github.com/Ascend/msit","gitee":"https://gitee.com/ascend/msit"},"giteeStatus":"legacy"},{"name":"mstt","desc":"msTT 训练工具链：分析迁移、精度调试、性能调优","urls":{"gitcode":"https://gitcode.com/Ascend/mstt","github":"https://github.com/Ascend/mstt","gitee":"https://gitee.com/ascend/mstt"},"giteeStatus":"legacy"},{"name":"msot","desc":"msOT 算子工具链：异常检测、算子调试、性能调优","urls":{"gitcode":"https://gitcode.com/Ascend/msot","github":"https://github.com/Ascend/msot"}}]},{"name":"性能调优","repos":[{"name":"msprof","desc":"msProf 模型调优工具（性能数据采集解析）","urls":{"gitcode":"https://gitcode.com/Ascend/msprof","github":"https://github.com/Ascend/msprof"}},{"name":"msprof-analyze","desc":"性能分析工具（瓶颈识别）","urls":{"gitcode":"https://gitcode.com/Ascend/msprof-analyze","github":"https://github.com/Ascend/msprof-analyze"}},{"name":"mspti","desc":"msPTI Profiling Tools Interface","urls":{"gitcode":"https://gitcode.com/Ascend/mspti","github":"https://github.com/Ascend/mspti"}},{"name":"msserviceprofiler","desc":"推理服务化性能数据采集工具","urls":{"gitcode":"https://gitcode.com/Ascend/msserviceprofiler","github":"https://github.com/Ascend/msserviceprofiler"}},{"name":"msopprof","desc":"算子 Profiler 工具","urls":{"gitcode":"https://gitcode.com/Ascend/msopprof","github":"https://github.com/Ascend/msopprof"}},{"name":"msmonitor","desc":"一站式在线监控工具","urls":{"gitcode":"https://gitcode.com/Ascend/msmonitor","github":"https://github.com/Ascend/msmonitor"}},{"name":"msinsight","desc":"大模型可视化调优（MindStudio-Insight）","urls":{"gitcode":"https://gitcode.com/Ascend/msinsight","github":"https://github.com/Ascend/msinsight"}},{"name":"msmodeling","desc":"建模寻优工具（部署策略评估）","urls":{"gitcode":"https://gitcode.com/Ascend/msmodeling","github":"https://github.com/Ascend/msmodeling"}}]},{"name":"精度与调试","repos":[{"name":"msprobe","desc":"全场景精度工具链（MindStudio-Probe）","urls":{"gitcode":"https://gitcode.com/Ascend/msprobe","github":"https://github.com/Ascend/msprobe"}},{"name":"msdebug","desc":"Debugger 调试器","urls":{"gitcode":"https://gitcode.com/Ascend/msdebug","github":"https://github.com/Ascend/msdebug"}},{"name":"msmemscope","desc":"整网内存调试调优工具","urls":{"gitcode":"https://gitcode.com/Ascend/msmemscope","github":"https://github.com/Ascend/msmemscope"}},{"name":"mssanitizer","desc":"内存/精度消毒器","urls":{"gitcode":"https://gitcode.com/Ascend/mssanitizer","github":"https://github.com/Ascend/mssanitizer"}},{"name":"msopgen","desc":"算子工程生成器","urls":{"gitcode":"https://gitcode.com/Ascend/msopgen","github":"https://github.com/Ascend/msopgen"}},{"name":"msopcom","desc":"算子公共组件","urls":{"gitcode":"https://gitcode.com/Ascend/msopcom","github":"https://github.com/Ascend/msopcom"}},{"name":"msoptuner","desc":"算子调优器","urls":{"gitcode":"https://gitcode.com/Ascend/msoptuner","github":"https://github.com/Ascend/msoptuner"}},{"name":"mskl","desc":"Kernel Launcher","urls":{"gitcode":"https://gitcode.com/Ascend/mskl","github":"https://github.com/Ascend/mskl"}},{"name":"mskpp","desc":"Kernel 性能预测","urls":{"gitcode":"https://gitcode.com/Ascend/mskpp","github":"https://github.com/Ascend/mskpp"}},{"name":"msmodelslim","desc":"模型量化压缩工具（ModelSlim）","urls":{"gitcode":"https://gitcode.com/Ascend/msmodelslim","github":"https://github.com/Ascend/msmodelslim"}},{"name":"mstx","desc":"Tools Extension Library","urls":{"gitcode":"https://gitcode.com/Ascend/mstx","github":"https://github.com/Ascend/mstx"}},{"name":"mscommreport","desc":"HCCL 中断类问题自动分析","urls":{"gitcode":"https://gitcode.com/Ascend/mscommreport"}},{"name":"msagent","desc":"MindStudio 智能体（性能/精度自动分析）","urls":{"gitcode":"https://gitcode.com/Ascend/msagent","github":"https://github.com/Ascend/msagent"}},{"name":"msboost","desc":"推理训练极致性能加速工具","urls":{"gitcode":"https://gitcode.com/Ascend/msboost"}},{"name":"ATK","desc":"MindStudio-ATK","urls":{"gitcode":"https://gitcode.com/Ascend/ATK"}},{"name":"ascendc-kernelgen-data","desc":"AscendC 算子代码生成训练数据集","urls":{"gitcode":"https://gitcode.com/Ascend/ascendc-kernelgen-data"}}]}]},{"id":"mindspeed","name":"MindSpeed","category":"应用使能","docUrl":"https://www.hiascend.com/document/detail/zh/MindSpeed/latest/index.html","groups":[{"name":"训练套件","repos":[{"name":"MindSpeed","desc":"MindSpeed Core 大模型加速库","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed","github":"https://github.com/Ascend/MindSpeed","gitee":"https://gitee.com/ascend/MindSpeed"},"giteeStatus":"legacy"},{"name":"MindSpeed-LLM","desc":"LLM 分布式训练框架（G-Star）","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-LLM","github":"https://github.com/Ascend/MindSpeed-LLM","gitee":"https://gitee.com/ascend/MindSpeed-LLM"},"giteeStatus":"legacy"},{"name":"MindSpeed-MM","desc":"多模态大模型训练套件（G-Star）","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-MM","github":"https://github.com/Ascend/MindSpeed-MM","gitee":"https://gitee.com/ascend/MindSpeed-MM"},"giteeStatus":"legacy"},{"name":"MindSpeed-RL","desc":"强化学习加速框架","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-RL","github":"https://github.com/Ascend/MindSpeed-RL"}},{"name":"MindSpeed-Core-MS","desc":"MindSpore + MindSpeed 连接组件","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-Core-MS","github":"https://github.com/Ascend/MindSpeed-Core-MS"}},{"name":"MindSpeed-Ops","desc":"训练业务自定义算子实现","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-Ops"}},{"name":"MindSpeed-Bridge","desc":"基于 NVIDIA Megatron-Bridge 的训练适配框架","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-Bridge"}},{"name":"MindSpeed-Agent","desc":"MindSpeed 系列套件开发 Agent","urls":{"gitcode":"https://gitcode.com/Ascend/MindSpeed-Agent"}}]},{"name":"Megatron 生态","repos":[{"name":"Megatron-LM","desc":"NVIDIA Megatron-LM 昇腾 fork","urls":{"gitcode":"https://gitcode.com/Ascend/Megatron-LM","github":"https://github.com/Ascend/Megatron-LM"}},{"name":"MegatronAdaptor","desc":"Megatron-LM 昇腾基础适配","urls":{"gitcode":"https://gitcode.com/Ascend/MegatronAdaptor"}}]},{"name":"RL 相关","repos":[{"name":"slime-ascend","desc":"slime（RL rollout 框架）昇腾适配","urls":{"gitcode":"https://gitcode.com/Ascend/slime-ascend"}},{"name":"AgentSDK","desc":"Aura Agentic RL 训推框架（详见 MindSDK）","urls":{"gitcode":"https://gitcode.com/Ascend/AgentSDK","github":"https://github.com/Ascend/AgentSDK"}}]}]},{"id":"mindie","name":"MindIE","category":"应用使能","docUrl":"https://www.hiascend.com/document/detail/zh/mindie/latest/index.html","groups":[{"name":"推理引擎","repos":[{"name":"MindIE-LLM","desc":"大语言模型推理引擎","urls":{"gitcode":"https://gitcode.com/Ascend/MindIE-LLM","github":"https://github.com/Ascend/MindIE-LLM"}},{"name":"MindIE-Turbo","desc":"LLM 推理引擎加速插件库","urls":{"gitcode":"https://gitcode.com/Ascend/MindIE-Turbo","github":"https://github.com/Ascend/MindIE-Turbo"}},{"name":"FlashGen","desc":"多模态生成训推加速套件","urls":{"gitcode":"https://gitcode.com/Ascend/FlashGen"}}]},{"name":"服务化框架","repos":[{"name":"MindIE-Motor","desc":"推理集群管理框架（Python）","urls":{"gitcode":"https://gitcode.com/Ascend/MindIE-Motor","github":"https://github.com/Ascend/MindIE-Motor"}},{"name":"MindIE-Motor-CPP","desc":"推理集群管理框架（C++）","urls":{"gitcode":"https://gitcode.com/Ascend/MindIE-Motor-CPP"}},{"name":"MindIE-PyMotor","desc":"通用模型推理服务化框架（GitHub 镜像）","urls":{"github":"https://github.com/Ascend/MindIE-PyMotor"}},{"name":"text-embeddings-inference","desc":"TEI 昇腾 fork（向量/嵌入推理）","urls":{"gitcode":"https://gitcode.com/Ascend/text-embeddings-inference","github":"https://github.com/Ascend/text-embeddings-inference"}}]},{"name":"多模态生成","repos":[{"name":"MindIE-SD","desc":"视图/多模态生成推理套件（vLLM Omni、Diffusers 等）","urls":{"gitcode":"https://gitcode.com/Ascend/MindIE-SD","github":"https://github.com/Ascend/MindIE-SD"}}]},{"name":"性能组件","repos":[{"name":"MoonEP","desc":"MoonEP 负载均衡昇腾版本","urls":{"gitcode":"https://gitcode.com/Ascend/MoonEP","github":"https://github.com/Ascend/MoonEP"}},{"name":"HierarchicalKV-ascend","desc":"推荐系统高性能 KV 存储加速库","urls":{"gitcode":"https://gitcode.com/Ascend/HierarchicalKV-ascend","github":"https://github.com/Ascend/HierarchicalKV-ascend"}},{"name":"memcache","desc":"高性能分布式 KVCache（对接 vllm-ascend/sglang/MindIE）","urls":{"gitcode":"https://gitcode.com/Ascend/memcache","github":"https://github.com/Ascend/memcache"}}]}]},{"id":"mindsdk","name":"MindSDK","category":"应用使能","docUrl":"https://www.hiascend.com/document/detail/zh/mindsdk/latest/index.html","groups":[{"name":"行业 SDK","repos":[{"name":"VisionSDK","desc":"图片/视频视觉分析 SDK","urls":{"gitcode":"https://gitcode.com/Ascend/VisionSDK","github":"https://github.com/Ascend/VisionSDK"}},{"name":"MultimodalSDK","desc":"大模型推理预处理多模态加速","urls":{"gitcode":"https://gitcode.com/Ascend/MultimodalSDK","github":"https://github.com/Ascend/MultimodalSDK"}},{"name":"IndexSDK","desc":"向量特征检索引擎（类 Faiss）","urls":{"gitcode":"https://gitcode.com/Ascend/IndexSDK","github":"https://github.com/Ascend/IndexSDK"}},{"name":"RecSDK","desc":"大规模推荐训推加速库","urls":{"gitcode":"https://gitcode.com/Ascend/RecSDK","github":"https://github.com/Ascend/RecSDK"}},{"name":"DrivingSDK","desc":"自动驾驶/具身智能训练加速套件","urls":{"gitcode":"https://gitcode.com/Ascend/DrivingSDK","github":"https://github.com/Ascend/DrivingSDK"}},{"name":"AgentSDK","desc":"Aura Agentic RL 训推一体框架","urls":{"gitcode":"https://gitcode.com/Ascend/AgentSDK","github":"https://github.com/Ascend/AgentSDK"}},{"name":"RAGSDK","desc":"大模型知识增强（RAG）开发套件","urls":{"gitcode":"https://gitcode.com/Ascend/RAGSDK","github":"https://github.com/Ascend/RAGSDK"}},{"name":"MindInferenceService","desc":"模型推理服务（快速部署）","urls":{"gitcode":"https://gitcode.com/Ascend/MindInferenceService","github":"https://github.com/Ascend/MindInferenceService"}},{"name":"OMSDK","desc":"智能边缘硬件管理平台 SDK（详见 MindEdge）","urls":{"gitcode":"https://gitcode.com/Ascend/OMSDK","github":"https://github.com/Ascend/OMSDK"}}]},{"name":"检索与推荐组件","repos":[{"name":"faiss","desc":"Faiss 昇腾 fork（NPU 向量检索加速）","urls":{"gitcode":"https://gitcode.com/Ascend/faiss"}},{"name":"ops-rec","desc":"推荐系统高性能融合算子仓","urls":{"gitcode":"https://gitcode.com/Ascend/ops-rec"}}]},{"name":"参考应用","repos":[{"name":"mindsdk-referenceapps","desc":"MindSDK 参考应用","urls":{"gitcode":"https://gitcode.com/Ascend/mindsdk-referenceapps"}},{"name":"DeepSelect","desc":"端到端行业参考应用","urls":{"github":"https://github.com/Ascend/DeepSelect"}},{"name":"mindxsdk-referenceapps","desc":"MindX SDK 参考应用（遗留）","urls":{"github":"https://github.com/Ascend/mindxsdk-referenceapps"}}]}]},{"id":"mindcluster","name":"MindCluster","category":"应用使能","docUrl":"https://www.hiascend.com/document/detail/zh/mindcluster/latest/index.html","groups":[{"name":"集群组件","repos":[{"name":"mind-cluster","desc":"MindCluster 组件代码仓（ClusterSched/Ascend Docker Runtime/npu-exporter 等）","urls":{"gitcode":"https://gitcode.com/Ascend/mind-cluster","github":"https://github.com/Ascend/mind-cluster"}},{"name":"ascend-deployer","desc":"Ascend Deployer 一键安装部署","urls":{"gitcode":"https://gitcode.com/Ascend/ascend-deployer"}},{"name":"mindcluster-deploy","desc":"MindCluster 部署样例库","urls":{"gitcode":"https://gitcode.com/Ascend/mindcluster-deploy","github":"https://github.com/Ascend/mindcluster-deploy"}},{"name":"memfabric_hybrid","desc":"内存池化基础软件（DRAM/显存混合池化）","urls":{"gitcode":"https://gitcode.com/Ascend/memfabric_hybrid","github":"https://github.com/Ascend/memfabric_hybrid"}},{"name":"MindCluster-AscendNPUBurn","desc":"芯片/链路硬件故障压测","urls":{"gitcode":"https://gitcode.com/Ascend/MindCluster-AscendNPUBurn"}},{"name":"workload_analysis","desc":"负载分析工具","urls":{"github":"https://github.com/Ascend/workload_analysis"}},{"name":"slurm-atlas-plugin","desc":"Slurm Atlas 插件","urls":{"github":"https://github.com/Ascend/slurm-atlas-plugin"}},{"name":"Ascend-CI","desc":"Ascend CI 基础设施","urls":{"github":"https://github.com/Ascend/Ascend-CI"}}]}]},{"id":"mindedge","name":"MindEdge","category":"应用使能","docUrl":"https://www.hiascend.com/document/detail/zh/mindedge/latest/index.html","groups":[{"name":"边缘组件","repos":[{"name":"MEF","desc":"轻量化端边云协同框架（边缘节点/容器应用管理）","urls":{"gitcode":"https://gitcode.com/Ascend/MEF","github":"https://github.com/Ascend/MEF"}},{"name":"OMSDK","desc":"边缘硬件管理平台 SDK（Edge Management System）","urls":{"gitcode":"https://gitcode.com/Ascend/OMSDK","github":"https://github.com/Ascend/OMSDK"}},{"name":"cann-local-lm","desc":"端边侧轻量 LLM/VLM 推理（CANN 组织，跨链）","urls":{"gitcode":"https://gitcode.com/cann/cann-local-lm"}},{"name":"cann-recipes-harmony-infer","desc":"鸿蒙端侧推理部署样例（CANN 组织，跨链）","urls":{"gitcode":"https://gitcode.com/cann/cann-recipes-harmony-infer"}}]}]},{"id":"vllm-ascend","name":"vLLM-Ascend","category":"三方资源","docUrl":"https://vllm-ascend.readthedocs.io/en/latest/","groups":[{"name":"主仓与上游","repos":[{"name":"vllm-ascend","desc":"vLLM on Ascend NPU 社区插件（活跃主仓）","urls":{"github":"https://github.com/vllm-project/vllm-ascend"}},{"name":"vllm","desc":"vLLM 上游框架","urls":{"github":"https://github.com/vllm-project/vllm"}}]}]},{"id":"triton","name":"Triton","category":"三方资源","docUrl":"https://triton-ascend.readthedocs.io/zh-cn/latest/index.html","groups":[{"name":"主仓与历史地址","repos":[{"name":"triton-ascend","desc":"Triton 语言与编译器昇腾后端（活跃主仓，已迁 GitHub）","urls":{"github":"https://github.com/triton-lang/triton-ascend"}},{"name":"triton-ascend (gitcode)","desc":"Gitcode 历史仓（已归档，README 指向 GitHub 新仓）","urls":{"gitcode":"https://gitcode.com/Ascend/triton-ascend"},"status":"archived"},{"name":"triton-ascend (gitee)","desc":"Gitee 历史仓","urls":{"gitee":"https://gitee.com/ascend/triton-ascend"},"status":"legacy"}]},{"name":"周边仓","repos":[{"name":"Triton-distributed-ascend","desc":"基于 Triton 的分布式计算框架（计算通信重叠）","urls":{"gitcode":"https://gitcode.com/Ascend/Triton-distributed-ascend"}},{"name":"triton-ascend-kernels","desc":"Triton-Ascend Kernel 集合仓","urls":{"gitcode":"https://gitcode.com/Ascend/triton-ascend-kernels"}},{"name":"triton-ascend-ops","desc":"Triton-Ascend 算子实验仓","urls":{"github":"https://github.com/Ascend/triton-ascend-ops"}},{"name":"triton-inference-server-ge-backend","desc":"Triton Inference Server GE 后端（CANN 组织，跨链）","urls":{"gitcode":"https://gitcode.com/cann/triton-inference-server-ge-backend"}},{"name":"tilelang-ascend","desc":"TileLang 昇腾后端（相关语言生态）","urls":{"github":"https://github.com/tile-ai/tilelang-ascend/tree/ascendc_pto"}}]}]},{"id":"sglang","name":"SGLang","category":"三方资源","docUrl":"https://docs.sglang.io/docs/hardware-platforms/ascend-npus/getting-started/installation","groups":[{"name":"上游与昇腾仓","repos":[{"name":"sglang","desc":"SGLang 上游框架（原生支持昇腾 A2/A3/950）","urls":{"github":"https://github.com/sgl-project/sglang"}},{"name":"sglang (Ascend fork)","desc":"昇腾侧 SGLang 维护开发 fork","urls":{"github":"https://github.com/Ascend/sglang"}},{"name":"ascend-sglang","desc":"SGLang 昇腾辅助仓","urls":{"github":"https://github.com/Ascend/ascend-sglang"}},{"name":"sgl-sglang","desc":"SGLang 昇腾辅助仓","urls":{"github":"https://github.com/Ascend/sgl-sglang"}}]}]}]};

  const PLAT_HOSTS = { 'github.com': 'github', 'gitcode.com': 'gitcode', 'gitee.com': 'gitee' };
  const PLAT_LABEL = { gitcode: 'Gitcode', github: 'GitHub', gitee: 'Gitee' };
  const STATUS_LABEL = { archived: '已归档', legacy: '已停维', migrated: '已迁移' };
  const ORG_HOME = {
    'cann': 'cann', 'ascend': 'ascend', 'triton-lang': 'triton',
    'vllm-project': 'vllm-ascend', 'sgl-project': 'sglang'
  };

  // ---------- 索引 ----------
  const byPath = new Map(); // 'owner/name' -> repoRef

  function parseOwnerRepo(url) {
    const m = String(url).match(/^https?:\/\/[^/]+\/([^/]+)\/([^/?#]+)/);
    if (!m) return null;
    if (m[1] === 'org') return null; // 组织页链接，非仓库
    return { owner: m[1], name: m[2] };
  }

  (function buildIndex() {
    for (const product of GRAPH.products || []) {
      for (const group of product.groups || []) {
        for (const repo of group.repos || []) {
          const urls = repo.urls || {};
          for (const url of Object.values(urls)) {
            const parsed = parseOwnerRepo(url);
            if (!parsed) continue;
            const key = (parsed.owner + '/' + parsed.name).toLowerCase();
            if (!byPath.has(key)) {
              byPath.set(key, { product, group, repo });
            }
          }
        }
      }
    }
  })();

  function primaryUrl(repo) {
    const urls = repo.urls || {};
    const first = Object.values(urls)[0];
    return first || '';
  }

  // ---------- 当前页面识别 ----------
  function detect() {
    const host = location.hostname.replace(/^www\./, '');
    if (!PLAT_HOSTS[host]) return null;
    const segs = location.pathname.split('/').filter(Boolean);
    if (segs.length < 2) {
      // 组织首页：识别产品
      const orgKey = (segs[0] || '').toLowerCase();
      const pid = ORG_HOME[orgKey];
      return { type: 'org', org: segs[0], productId: pid || null };
    }
    const key = (segs[0] + '/' + segs[1]).toLowerCase();
    const ref = byPath.get(key);
    if (ref) return { type: 'repo', ref };
    // fork/镜像场景：owner 不同但同名
    const nameKey = segs[1].toLowerCase();
    for (const [k, v] of byPath) {
      if (k.split('/')[1] === nameKey && k.split('/')[0] === 'ascend') {
        return { type: 'repo', ref: v, guessed: true };
      }
    }
    return { type: 'unknown', owner: segs[0], name: segs[1] };
  }

  // ---------- UI ----------
  let panel, btn, currentCard, listWrap, filterInput;
  let visible = false;

  const CSS = `
    #arn-btn{position:fixed;right:0;top:38%;z-index:2147483600;writing-mode:vertical-rl;
      background:linear-gradient(180deg,#c7000b,#8a0009);color:#fff;font:600 13px/1 sans-serif;
      padding:12px 6px;border-radius:8px 0 0 8px;cursor:pointer;box-shadow:-2px 2px 8px rgba(0,0,0,.35);
      letter-spacing:2px;user-select:none}
    #arn-btn:hover{filter:brightness(1.15)}
    #arn-panel{position:fixed;right:0;top:0;bottom:0;width:348px;z-index:2147483601;
      background:#171923;color:#dcdde1;font:13px/1.5 -apple-system,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif;
      box-shadow:-4px 0 24px rgba(0,0,0,.5);display:flex;flex-direction:column;
      border-left:1px solid #2c2f3a}
    #arn-panel a{color:#7ab7ff;text-decoration:none}
    #arn-panel a:hover{text-decoration:underline}
    #arn-head{padding:12px 14px;background:#1f2230;border-bottom:1px solid #2c2f3a;display:flex;align-items:center;gap:8px}
    #arn-head b{font-size:14px;color:#fff}
    #arn-close{margin-left:auto;cursor:pointer;color:#8a8f9e;font-size:18px;padding:0 6px;border:none;background:none}
    #arn-close:hover{color:#fff}
    #arn-filter{margin:8px 12px;padding:6px 10px;border-radius:6px;border:1px solid #2c2f3a;
      background:#12141c;color:#dcdde1;font-size:12px;outline:none}
    #arn-filter:focus{border-color:#c7000b}
    #arn-body{flex:1;overflow-y:auto;padding:4px 0 16px}
    #arn-body::-webkit-scrollbar{width:6px}
    #arn-body::-webkit-scrollbar-thumb{background:#2c2f3a;border-radius:3px}
    .arn-card{margin:10px 12px;padding:10px 12px;border:1px solid #2c2f3a;border-radius:8px;background:#1c1f29}
    .arn-card .t{color:#fff;font-weight:600;font-size:13px}
    .arn-card .m{color:#8a8f9e;font-size:11px;margin-top:2px}
    .arn-plats{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
    .arn-plats a{font-size:11px;padding:2px 8px;border:1px solid #2c2f3a;border-radius:10px;color:#7ab7ff}
    .arn-plats a.archived,.arn-plats a.legacy{color:#8a8f9e;border-style:dashed}
    .arn-plats .arn-cur{border-color:#c7000b;color:#ff9d9d;font-weight:600}
    .arn-prod{margin:10px 0 0;border-left:2px solid #2c2f3a}
    .arn-prod.cur{border-left-color:#c7000b}
    .arn-prod summary{cursor:pointer;padding:6px 12px;color:#fff;font-weight:600;font-size:13px;list-style:none;user-select:none}
    .arn-prod summary::-webkit-details-marker{display:none}
    .arn-prod summary .cat{color:#8a8f9e;font-weight:400;font-size:11px;margin-left:6px}
    .arn-prod summary .doc{float:right;font-size:11px;font-weight:400}
    .arn-grp{margin:2px 0 6px;padding:0 12px;color:#9aa0ae;font-size:11px;font-weight:600}
    .arn-chips{display:flex;flex-wrap:wrap;gap:5px;padding:0 12px 8px}
    .arn-chip{font-size:11.5px;padding:2px 9px;border-radius:10px;background:#232735;color:#c6cad4;
      border:1px solid transparent;white-space:nowrap}
    .arn-chip:hover{border-color:#7ab7ff;color:#7ab7ff;text-decoration:none}
    .arn-chip.cur{border-color:#c7000b;color:#ff9d9d;background:#2a1418}
    .arn-chip.archived,.arn-chip.legacy{color:#6b7080;background:#1d2029}
    .arn-foot{padding:8px 14px;font-size:11px;color:#6b7080;border-top:1px solid #2c2f3a}
    .hidden{display:none !important}
  `;

  function ensureUI() {
    if (panel) return;
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    btn = document.createElement('div');
    btn.id = 'arn-btn';
    btn.textContent = '昇腾生态';
    btn.title = '昇腾软件生态代码仓导航';
    btn.addEventListener('click', () => { visible = !visible; panel.classList.toggle('hidden', !visible); render(); });
    document.body.appendChild(btn);

    panel = document.createElement('div');
    panel.id = 'arn-panel';
    panel.className = 'hidden';
    panel.innerHTML = [
      '<div id="arn-head"><b>🧭 昇腾软件生态导航</b><span id="arn-close">✕</span></div>',
      '<input id="arn-filter" placeholder="过滤仓库 / 产品…（如 triton、ops、msit）"/>',
      '<div id="arn-body"></div>',
      '<div class="arn-foot">数据源：ascend-repo-map · 12 大软件产品 · <a href="https://www.hiascend.com/zh/document" target="_blank">昇腾文档站</a></div>'
    ].join('');
    document.body.appendChild(panel);
    panel.querySelector('#arn-close').addEventListener('click', () => {
      visible = false; panel.classList.add('hidden');
    });
    filterInput = panel.querySelector('#arn-filter');
    listWrap = panel.querySelector('#arn-body');
    filterInput.addEventListener('input', render);
  }

  function chipA(repo, currentName) {
    const url = primaryUrl(repo);
    const cls = ['arn-chip'];
    if (repo.status && STATUS_LABEL[repo.status]) cls.push(repo.status);
    if (currentName && repo.name.toLowerCase() === currentName) cls.push('cur');
    const a = document.createElement('a');
    a.className = cls.join(' ');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = repo.name + (repo.status && STATUS_LABEL[repo.status] ? '·' + STATUS_LABEL[repo.status] : '');
    a.title = repo.desc || repo.name;
    return a;
  }

  function buildCurrentCard(info) {
    const div = document.createElement('div');
    if (info.type !== 'repo') return div;
    const { product, group, repo } = info.ref;
    const urls = repo.urls || {};
    div.className = 'arn-card';
    const title = document.createElement('div');
    title.className = 't';
    title.textContent = '📍 ' + repo.name + ' — ' + product.name + ' → ' + group.name;
    const meta = document.createElement('div');
    meta.className = 'm';
    meta.textContent = repo.desc || '';
    const plats = document.createElement('div');
    plats.className = 'arn-plats';
    const curPlat = PLAT_HOSTS[location.hostname.replace(/^www\./, '')];
    for (const [plat, url] of Object.entries(urls)) {
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      const st = (plat === 'gitee' && repo.giteeStatus) ? repo.giteeStatus : repo.status;
      a.textContent = PLAT_LABEL[plat] + (st && STATUS_LABEL[st] ? '·' + STATUS_LABEL[st] : '');
      if (st && STATUS_LABEL[st]) a.classList.add(st);
      if (plat === curPlat) a.classList.add('arn-cur');
      plats.appendChild(a);
    }
    div.appendChild(title);
    div.appendChild(meta);
    div.appendChild(plats);
    return div;
  }

  function render() {
    if (!visible || !listWrap) return;
    ensureUI();
    const info = detect();
    const kw = (filterInput.value || '').trim().toLowerCase();
    listWrap.innerHTML = '';
    listWrap.appendChild(buildCurrentCard(info));

    const currentName = info.type === 'repo' ? info.ref.repo.name.toLowerCase() : null;
    const curPid = info.type === 'org' ? info.productId : (info.type === 'repo' ? info.ref.product.id : null);

    for (const product of GRAPH.products || []) {
      const pname = product.name.toLowerCase();
      const pmatch = !kw || pname.indexOf(kw) >= 0;
      const det = document.createElement('details');
      det.className = 'arn-prod' + (product.id === curPid ? ' cur' : '');
      const open = product.id === curPid || !!kw;
      if (open) det.open = true;
      const sum = document.createElement('summary');
      const cat = document.createElement('span');
      cat.className = 'cat';
      cat.textContent = product.category;
      const docA = document.createElement('a');
      docA.className = 'doc';
      docA.href = product.docUrl || 'https://www.hiascend.com/zh/document';
      docA.target = '_blank';
      docA.rel = 'noopener';
      docA.textContent = '文档';
      sum.textContent = (product.id === curPid ? '⭐ ' : '') + product.name;
      sum.appendChild(cat);
      sum.appendChild(docA);
      det.appendChild(sum);

      let anyVisible = false;
      for (const group of product.groups || []) {
        const gname = group.name.toLowerCase();
        const chips = document.createElement('div');
        chips.className = 'arn-chips';
        let chipCount = 0;
        for (const repo of group.repos || []) {
          const rmatch = !kw || (repo.name.toLowerCase().indexOf(kw) >= 0 ||
            (repo.desc || '').toLowerCase().indexOf(kw) >= 0 || pmatch || gname.indexOf(kw) >= 0);
          if (!rmatch) continue;
          chips.appendChild(chipA(repo, currentName));
          chipCount++;
        }
        if (chipCount > 0) {
          anyVisible = true;
          const gdiv = document.createElement('div');
          gdiv.className = 'arn-grp';
          gdiv.textContent = group.name;
          det.appendChild(gdiv);
          det.appendChild(chips);
        }
      }
      if (kw && !anyVisible && !pmatch) continue;
      listWrap.appendChild(det);
    }
  }

  // ---------- SPA 路由监听 ----------
  let lastHref = location.href;
  setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      render();
    }
  }, 900);

  ensureUI();
})();
