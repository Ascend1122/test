// smoke_test.js — 验证油猴脚本核心逻辑（索引构建 + URL 识别）
const fs = require('fs');

const src = fs.readFileSync(__dirname + '/ascend-repo-nav.user.js', 'utf8');
const m = src.match(/const GRAPH = (\{.*?\});\r?\n/s);
if (!m) { console.error('FAIL: 未找到 GRAPH 数据'); process.exit(1); }
const GRAPH = JSON.parse(m[1]);

const byPath = new Map();
function parseOwnerRepo(url) {
  const mm = String(url).match(/^https?:\/\/[^/]+\/([^/]+)\/([^/?#]+)/);
  if (!mm) return null;
  if (mm[1] === 'org') return null;
  return { owner: mm[1], name: mm[2] };
}
for (const p of GRAPH.products) {
  for (const g of p.groups || []) {
    for (const r of g.repos || []) {
      for (const url of Object.values(r.urls || {})) {
        const parsed = parseOwnerRepo(url);
        if (!parsed) continue;
        const key = (parsed.owner + '/' + parsed.name).toLowerCase();
        if (!byPath.has(key)) byPath.set(key, { p: p.id, g: g.name, r: r.name });
      }
    }
  }
}

const cases = [
  ['https://github.com/Ascend/pytorch', 'ascend/pytorch', 'pytorch'],
  ['https://github.com/triton-lang/triton-ascend/tree/main', 'triton-lang/triton-ascend', 'triton'],
  ['https://gitcode.com/cann/ops-nn', 'cann/ops-nn', 'cann'],
  ['https://gitcode.com/Ascend/triton-ascend', 'ascend/triton-ascend', 'triton'],
  ['https://gitee.com/ascend/cann-ops', 'ascend/cann-ops', 'cann'],
  ['https://github.com/vllm-project/vllm-ascend', 'vllm-project/vllm-ascend', 'vllm-ascend'],
  ['https://github.com/Ascend/sglang', 'ascend/sglang', 'sglang'],
  ['https://github.com/Ascend/MindIE-LLM', 'ascend/mindie-llm', 'mindie'],
  ['https://gitcode.com/Ascend/mstt', 'ascend/mstt', 'mindstudio'],
  ['https://github.com/pytorch/pytorch', 'pytorch/pytorch', null], // 上游不应误匹配
  ['https://github.com/torvalds/linux', 'torvalds/linux', null],    // 无关仓库
];

let fail = 0;
for (const [url, key, expectPid] of cases) {
  const hit = byPath.get(key);
  const gotPid = hit ? hit.p : null;
  const ok = gotPid === expectPid;
  if (!ok) fail++;
  console.log((ok ? 'PASS' : 'FAIL') + '  ' + url.padEnd(55) + ' → ' + (gotPid || '未识别'));
}
console.log('索引条目总数:', byPath.size);
if (fail) { console.error(fail + ' 个用例失败'); process.exit(1); }
console.log('ALL PASS');
