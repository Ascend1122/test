# 最新动态

本文介绍了 Triton-Ascend 文档的最新上线新增、变更动态，欢迎体验。

## 2026 年 10 月

| 序号 | 更新点 | 更新说明 | 相关文档 |
|------|--------|----------|----------|
| 1 | Triton-Ascend 3.6.0 正式版本发布。 | 对齐上游 Triton 3.6.0 版本，同步编译器前端与 IR 变更；配套 PyTorch 2.10.0、TorchNPU 2.10.0.post7、CANN 9.2.0；新增 `max_autotune` 装饰器，支持笛卡尔积展开机制批量生成候选配置；支持通过 SHMEM v1.7.0 进行核间通信。 | [版本说明](./release_note.md)、[max_autotune 使用指南](./max_autotune_guide.md) |
| 2 | Triton-Ascend 3.2.2.post2 补丁版本发布。 | 修复 3.2.2 版本中的已知问题，新增对 CANN 9.2.0 与 TorchNPU 2.10.0.post7 的配套支持。 | [版本说明](./release_note.md) |
| 3 | 新增 Ascend 950PR&950DT 系列产品支持。 | Triton-Ascend 新增对 Ascend 950PR 与 950DT 系列产品的支持，覆盖编译、运行与自动调优全流程。环境变量与编译选项参考表已补充 950 列说明。 | [环境变量与编译选项](./environment_variable_and_compiler_options_reference.md)、[安装指南](./installation_guide.md) |

## 2026 年 09 月

| 序号 | 更新点 | 更新说明 | 相关文档 |
|------|--------|----------|----------|
| 1 | 新增文档质量自动化审查机制。 | PR 提交后，Doc Quality Review 与 OpenCodeReview 工作流自动对 `docs/zh` 下的 Markdown/RST 文档进行质量检测，包括链接有效性、术语一致性、拼写错误等，并以行内评论形式反馈修改建议。 | [贡献指南](./community/CONTRIBUTING_zh.md) |

## 2026 年 07 月

| 序号 | 更新点 | 更新说明 | 相关文档 |
|------|--------|----------|----------|
| 1 | Triton-Ascend 3.2.2 正式版本发布。 | 配套 CANN 9.1.0、TorchNPU 2.7.1.post8；优化编译器后端指令调度策略，提升 Cube 算子性能；修复自动调优在多输入 shape 场景下的配置缓存问题。 | [版本说明](./release_note.md) |

## 2026 年 05 月

| 序号 | 更新点 | 更新说明 | 相关文档 |
|------|--------|----------|----------|
| 1 | Triton-Ascend 3.2.1 正式版本发布。 | 配套 CANN 9.0.0、TorchNPU 2.7.1；解决社区 Triton 与 Triton-Ascend 共存安装覆盖问题，Triton-Ascend 通过将 Triton 声明为安装依赖来缓解冲突。 | [版本说明](./release_note.md)、[FAQ](./FAQ.md) |
| 2 | 新增 GPU Triton 算子迁移指南。 | 提供 GPU 与 NPU 平台的架构差异分析、详细迁移步骤和常见问题。 | [算子迁移](./migration_guide/index.md)、[架构差异分析](./migration_guide/architecture_difference.md)、[GPU Triton 算子迁移](./migration_guide/migrate_from_gpu.md) |

## 2026 年 01 月

| 序号 | 更新点 | 更新说明 | 相关文档 |
|------|--------|----------|----------|
| 1 | Triton-Ascend 3.2.0 正式版本发布。 | 基于 Triton 3.2.0，适配华为 Ascend NPU 架构；配套 CANN 8.5.0、TorchNPU 2.6.0、PyTorch 2.6.0；提供快速安装、源码安装及镜像安装三种方式；支持 Atlas A2 系列产品与 Atlas A3 系列产品。 | [版本说明](./release_note.md)、[安装指南](./installation_guide.md)、[快速入门](./quick_start.md) |
| 2 | 新增架构设计与核心特性文档。 | 介绍 Triton-Ascend 逻辑架构、核心组件（Ascend language extension、compiler、driver）及编译流程（Triton IR → Linalg IR → AscendNPU IR → kernel*.o）。 | [架构设计与核心特性](./architecture_design_and_core_features.md) |
| 3 | 新增算子开发指南。 | 发布完整的算子开发指南体系，涵盖通用开发原则（多核任务并行、片上内存管理、访存优化、Tiling 与 Autotune）、Vector 算子开发、Cube 算子开发、CV 融合算子开发。 | [算子开发指南](./programming_guide/index.md)、[Vector 算子](./programming_guide/vector_operator.md)、[Cube 算子](./programming_guide/cube_operator.md)、[CV 融合算子](./programming_guide/cv_fusion_operator.md) |
| 4 | 新增 autotune 自动调优指南。 | 介绍 Triton-Ascend 推荐的 autotune 用法、`configs=[]` 自动 Tiling 模式的适用边界，以及何时回到手写 `triton.Config`。 | [autotune 使用指南](./autotune_guide.md)、[autotune 样例](./examples/06_autotune_example.md) |
| 5 | 新增算子调试与调优指南。 | 发布算子调试与调优指南体系，涵盖调试方法、性能分析、精度分析、UB Overflow 处理、do_bench_npu 使用指南。 | [算子调试与调优](./debug_guide/index.md)、[调试指南](./debug_guide/debugging.md)、[性能分析](./debug_guide/profiling.md)、[精度分析](./debug_guide/precision.md)、[do_bench_npu 使用指南](./debug_guide/do_bench_npu_guide.md) |
| 6 | 新增典型算子样例库。 | 发布 9 个典型算子样例，覆盖向量加法、Fused Softmax、Layer Norm、Fused Attention、矩阵乘法、Autotune、精度比对、max_autotune、Costmodel 等场景。 | [典型算子样例](./examples/index.md) |
| 7 | 新增环境变量与编译选项参考。 | 提供编译、运行、调试和自动调优配置的查阅入口，说明各配置项的用途、默认值及 A2/A3、950 支持情况。 | [环境变量与编译选项](./environment_variable_and_compiler_options_reference.md) |
| 8 | 新增 Libdevice 开发者手册。 | 介绍 SIMT 编译模式下 Libdevice API 的使用方法与算子开发实践。 | [Libdevice 开发者手册](./libdevice/libdevice_developer_guide.md) |
| 9 | 新增社区治理文档体系。 | 发布贡献指南、贡献者公约、治理机制、技术例会、Maintainers 列表、安全声明及 Roadmap 指南。 | [贡献指南](./community/CONTRIBUTING_zh.md)、[治理机制](./community/GOVERNANCE_zh.md)、[Roadmap 指南](./community/roadmap_guide.md) |
