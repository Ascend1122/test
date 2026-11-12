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
  const GRAPH = __GRAPH_JSON__;

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
