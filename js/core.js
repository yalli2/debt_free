/* ZERO MOMENTUM — 공통 모듈: 저장소 · 실시간(라이브 룸) · 부채 계산 엔진 · 차트 도우미 */
(function(){
'use strict';
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SERIES = ['#2a78d6','#eb6834','#1baf7a','#eda100','#e87ba4','#008300','#6250d6','#e34948'];

/* ---------- 저장소 ---------- */
const store = {
  get(k,d){ try{ const v=localStorage.getItem('zm_'+k); return v==null?d:JSON.parse(v);}catch(e){return d;} },
  set(k,v){ try{ localStorage.setItem('zm_'+k,JSON.stringify(v)); }catch(e){} }
};

/* ---------- 개인 부채 데이터 (대시보드 & 실습 공용) ---------- */
const DEFAULT_DATA = {currency:'KRW', debts:[], extra:0, strategy:'snowball', payments:[], ef:{goal:1000000,saved:0}, startDate:null, milestones:{}};
function getData(){ const d=store.get('data',null); return Object.assign(JSON.parse(JSON.stringify(DEFAULT_DATA)), d||{}); }
function setData(d){ store.set('data',d); }
function uid(){ return Math.random().toString(36).slice(2,10); }

/* ---------- 숫자 형식 ---------- */
function fmt(n,cur){
  cur = cur || getData().currency || 'KRW';
  n = Number(n)||0;
  if(cur==='USD') return '$'+n.toLocaleString('en-US',{maximumFractionDigits:0});
  return '₩'+Math.round(n).toLocaleString('ko-KR');
}
function fmtShort(n,cur){
  cur = cur || getData().currency || 'KRW'; n=Number(n)||0;
  if(cur==='USD') return n>=1000?'$'+(n/1000).toFixed(n>=10000?0:1)+'k':'$'+Math.round(n);
  if(Math.abs(n)>=1e8) return (n/1e8).toFixed(1)+'억';
  if(Math.abs(n)>=1e4) return Math.round(n/1e4).toLocaleString()+'만';
  return Math.round(n).toLocaleString();
}
function monthLabel(offset, start){
  const d = start? new Date(start) : new Date(); d.setDate(1); d.setMonth(d.getMonth()+offset);
  return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0');
}

/* ---------- 부채 상환 시뮬레이션 (스노우볼 / 애벌랜치) ----------
   매달: 이자 가산 → 모든 부채 최소상환 → 남은 예산(=최소상환 합계 + 추가금)을
   전략 순서의 첫 번째 남은 부채에 몰아주기(롤오버). 총 월 상환액은 일정하게 유지 */
function simulate(debts, extra, strategy, maxMonths=480){
  const ds = debts.filter(d=>+d.balance>0).map(d=>({id:d.id,name:d.name,b:+d.balance,apr:+d.apr||0,min:+d.min||0}));
  const budget = ds.reduce((s,d)=>s+d.min,0) + (+extra||0);
  const order = [...ds].sort(strategy==='avalanche' ? (a,b)=>b.apr-a.apr||a.b-b.b : (a,b)=>a.b-b.b||b.apr-a.apr).map(d=>d.id);
  const rows=[], payoff={}, interestBy={}; let totalInterest=0, m=0;
  ds.forEach(d=>interestBy[d.id]=0);
  const snap = ()=>{ const o={}; ds.forEach(d=>o[d.id]=Math.max(0,d.b)); return o; };
  rows.push({m:0,bal:snap(),total:ds.reduce((s,d)=>s+d.b,0),paid:0,interest:0,target:order[0],pay:{}});
  let stuck=false;
  while(ds.some(d=>d.b>0.5) && m<maxMonths){
    m++; let left=budget, monthInt=0; const pay={};
    ds.forEach(d=>{ pay[d.id]=0; if(d.b>0){ const i=d.b*d.apr/100/12; d.b+=i; monthInt+=i; interestBy[d.id]+=i; } });
    ds.forEach(d=>{ if(d.b>0){ const p=Math.min(d.min,d.b,left); d.b-=p; left-=p; pay[d.id]+=p; } });
    let target=null;
    for(const id of order){ const d=ds.find(x=>x.id===id); if(d.b>0.5){ if(!target) target=id; const p=Math.min(d.b,left); d.b-=p; left-=p; pay[d.id]+=p; if(left<=0) break; } }
    ds.forEach(d=>{ if(d.b<=0.5 && payoff[d.id]==null){ payoff[d.id]=m; d.b=0; } });
    totalInterest+=monthInt;
    const total=ds.reduce((s,d)=>s+d.b,0);
    rows.push({m,bal:snap(),total,paid:budget-left,interest:monthInt,target,pay});
    if(m>24 && total>=rows[m-12].total){ stuck=true; break; }
  }
  // 집중 상환 시작 시점(앞선 부채가 끝난 달)
  const focus={}; let prev=0;
  order.forEach(id=>{ focus[id]=prev; if(payoff[id]!=null) prev=Math.max(prev,payoff[id]); });
  return {rows, months:stuck?Infinity:m, payoff, order, totalInterest, interestBy, budget, focus, stuck: stuck || ds.some(d=>d.b>0.5)};
}

/* ---------- 차트 도우미 (Chart.js) ---------- */
const charts = new WeakMap();
function chart(canvas, cfg){
  if(!window.Chart){ return null; }
  const old = charts.get(canvas); if(old) old.destroy();
  Chart.defaults.font.family = 'Pretendard, sans-serif';
  Chart.defaults.color = '#4a5566';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
  Chart.defaults.plugins.legend.labels.boxHeight = 12;
  Chart.defaults.plugins.tooltip.backgroundColor = '#16202e';
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.maintainAspectRatio = false;
  const c = new Chart(canvas, cfg); charts.set(canvas,c); return c;
}
const gridOpt = {color:'#eee8dc', drawTicks:false};

/* ---------- 토스트 ---------- */
function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200); }

/* ---------- 실시간 라이브 룸 ----------
   강사가 만든 방 코드로 수강생 응답을 실시간 공유합니다.
   전송/수신은 공개 pub-sub 서비스 ntfy.sh (설정·가입 불필요, 12시간 보관)를 사용하고,
   같은 브라우저 탭끼리는 BroadcastChannel 로도 전달합니다. 개인 부채 데이터는 절대 전송하지 않습니다. */
const LIVE = {
  me: store.get('me', null) || (()=>{ const m={u:uid(),n:''}; store.set('me',m); return m; })(),
  room: '', msgs: [], seen: new Set(), subs: new Set(), es:null, bc:null, status:'off',
  topic(){ return 'dainedu-zeromomentum-'+this.room.toLowerCase(); },
  setRoom(code){
    code = (code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);
    this.room = code; store.set('room',code); this.connect(); this.emit();
  },
  setNick(n){ this.me.n = (n||'').trim().slice(0,16); store.set('me',this.me); this.emit(); },
  connect(){
    if(this.es){ this.es.close(); this.es=null; }
    if(this.bc){ this.bc.close(); this.bc=null; }
    this.msgs=[]; this.seen=new Set();
    if(!this.room){ this.status='off'; this.loadLocal(); return; }
    this.status='connecting';
    try{ this.bc = new BroadcastChannel('zm-'+this.room); this.bc.onmessage = e=>this.add(e.data); }catch(e){}
    this.loadLocal();
    try{
      const es = new EventSource('https://ntfy.sh/'+this.topic()+'/sse?since=all');
      es.onopen = ()=>{ this.status='live'; this.emit(); };
      es.onerror = ()=>{ this.status = es.readyState===2 ? 'offline' : 'connecting'; this.emit(); };
      es.onmessage = e=>{ try{ const j=JSON.parse(e.data); if(j.event && j.event!=='message') return; if(!j.message) return; this.add(JSON.parse(j.message)); }catch(err){} };
      this.es = es;
    }catch(e){ this.status='offline'; }
    this.emit();
  },
  localKey(){ return 'sent_'+(this.room||'_solo'); },
  loadLocal(){ (store.get(this.localKey(),[])||[]).forEach(m=>this.add(m,true)); },
  add(m, silent){
    if(!m || !m.mid || this.seen.has(m.mid)) return;
    this.seen.add(m.mid); this.msgs.push(m);
    if(!silent) this.emit(m); else this.emit();
  },
  send(activity, value){
    const m = {mid:uid()+Date.now().toString(36), a:activity, u:this.me.u, n:this.me.n||'익명', v:value, t:Date.now()};
    const mine = store.get(this.localKey(),[]); mine.push(m); store.set(this.localKey(), mine.slice(-300));
    this.add(m);
    if(this.room){
      try{ this.bc && this.bc.postMessage(m); }catch(e){}
      fetch('https://ntfy.sh/'+this.topic(), {method:'POST', body: JSON.stringify(m)}).catch(()=>{ this.status='offline'; this.emit(); });
    }
    return m;
  },
  of(activity){ return this.msgs.filter(m=>m.a===activity); },
  latestPerUser(activity){ const o=new Map(); this.of(activity).sort((a,b)=>a.t-b.t).forEach(m=>o.set(m.u,m)); return [...o.values()]; },
  mine(activity){ return this.latestPerUser(activity).find(m=>m.u===this.me.u); },
  people(){ const o=new Map(); this.msgs.forEach(m=>o.set(m.u,m.n)); return o; },
  on(fn){ this.subs.add(fn); return ()=>this.subs.delete(fn); },
  emit(m){ this.subs.forEach(fn=>{ try{fn(m);}catch(e){console.error(e);} }); }
};

/* 활동(Activity) 렌더러: choice | multi | scale | text | number | quiz | month */
function renderActivity(el, act, opts={}){
  const board = !!opts.board;
  el.classList.add('live');
  el.innerHTML = `
    <div class="live-head"><span class="tag">LIVE</span><span class="small muted">${esc(act.label||'함께 나누기')}</span><span class="cnt"></span></div>
    <div class="q">${esc(act.q)}</div>
    ${board?'':`<div class="input"></div>`}
    <div class="result"></div>`;
  const inp = $('.input',el), res=$('.result',el), cnt=$('.cnt',el);
  if(!board) buildInput(inp, act);
  const draw = ()=>{
    const msgs = (act.type==='text') ? LIVE.of(act.id).sort((a,b)=>a.t-b.t) : LIVE.latestPerUser(act.id);
    cnt.textContent = (LIVE.room? `방 ${LIVE.room} · `:'개인 모드 · ') + `응답 ${new Set(msgs.map(m=>m.u)).size}명`;
    drawResult(res, act, msgs, board);
  };
  draw(); const off=LIVE.on(m=>{ if(!el.isConnected){ off(); return; } if(!m || m.a===act.id) draw(); });
}
function buildInput(inp, act){
  const mine = LIVE.mine(act.id);
  const sentNote = '<span class="sent hidden">✓ 공유됨</span>';
  if(act.type==='choice' || act.type==='quiz'){
    inp.innerHTML = `<div class="opts">${act.options.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    const btns=$$('.opt',inp);
    if(mine) btns[mine.v]?.classList.add('sel');
    btns.forEach(b=>b.onclick=()=>{ btns.forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); LIVE.send(act.id,+b.dataset.i); });
  } else if(act.type==='multi'){
    inp.innerHTML = `<div class="opts">${act.options.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div><div class="row" style="margin-top:10px"><button class="btn sm send">선택 공유하기</button>${sentNote}</div>`;
    const btns=$$('.opt',inp);
    if(mine) mine.v.forEach(i=>btns[i]?.classList.add('sel'));
    btns.forEach(b=>b.onclick=()=>b.classList.toggle('sel'));
    $('.send',inp).onclick=()=>{ const v=btns.filter(b=>b.classList.contains('sel')).map(b=>+b.dataset.i); if(!v.length) return toast('하나 이상 선택해 주세요'); LIVE.send(act.id,v); $('.sent',inp).classList.remove('hidden'); };
  } else if(act.type==='scale'){
    const mn=act.min??1, mx=act.max??10, v0=mine?mine.v:Math.round((mn+mx)/2);
    inp.innerHTML = `<div class="row"><span class="small">${esc(act.minLabel||mn)}</span><input type="range" min="${mn}" max="${mx}" value="${v0}" style="flex:1"><span class="small">${esc(act.maxLabel||mx)}</span><b class="v" style="min-width:34px;text-align:center;font-size:1.3rem">${v0}</b><button class="btn sm send">공유</button>${sentNote}</div>`;
    const r=$('input',inp); r.oninput=()=>$('.v',inp).textContent=r.value;
    $('.send',inp).onclick=()=>{ LIVE.send(act.id,+r.value); $('.sent',inp).classList.remove('hidden'); };
  } else if(act.type==='text'){
    inp.innerHTML = `<div class="row"><input maxlength="${act.max||120}" placeholder="${esc(act.ph||'여기에 입력하세요')}" style="flex:1"><button class="btn sm send">붙이기</button></div>`;
    const i=$('input',inp), go=()=>{ const v=i.value.trim(); if(!v) return; LIVE.send(act.id,v); i.value=''; };
    $('.send',inp).onclick=go; i.onkeydown=e=>{ if(e.key==='Enter') go(); };
  } else if(act.type==='number'){
    inp.innerHTML = `<div class="row"><input type="number" min="0" step="${act.step||1}" placeholder="${esc(act.ph||'숫자')}" style="max-width:220px" value="${mine?mine.v:''}"><span>${esc(act.unit||'')}</span><button class="btn sm send">공유</button>${sentNote}</div>`;
    $('.send',inp).onclick=()=>{ const v=+$('input',inp).value; if(!(v>=0)) return; LIVE.send(act.id,v); $('.sent',inp).classList.remove('hidden'); };
  } else if(act.type==='month'){
    inp.innerHTML = `<div class="row"><input type="month" style="max-width:220px" value="${mine?mine.v:''}"><button class="btn sm send">공유</button>${sentNote}</div>`;
    $('.send',inp).onclick=()=>{ const v=$('input',inp).value; if(!v) return toast('년/월을 선택해 주세요'); LIVE.send(act.id,v); $('.sent',inp).classList.remove('hidden'); };
  }
}
function drawResult(res, act, msgs, board){
  if(!msgs.length){ res.innerHTML = `<div class="small muted">${board?'아직 응답이 없습니다. 수강생 화면에서 응답이 들어오면 바로 표시됩니다.':'첫 응답을 남겨 보세요. 같은 방 참여자의 응답이 실시간으로 여기에 모입니다.'}</div>`; return; }
  const h = board? 340 : 240;
  if(act.type==='choice' || act.type==='multi' || act.type==='quiz'){
    const counts = act.options.map(()=>0);
    msgs.forEach(m=>{ (Array.isArray(m.v)?m.v:[m.v]).forEach(i=>{ if(counts[i]!=null) counts[i]++; }); });
    let extra='';
    if(act.type==='quiz'){ const ok=msgs.filter(m=>m.v===act.answer).length; extra=`<div class="row" style="margin-bottom:8px"><span class="bigstat">${Math.round(ok/msgs.length*100)}%</span><span>정답률 (${ok}/${msgs.length}) · 정답: <b>${esc(act.options[act.answer])}</b></span></div>${act.explain?`<div class="callout small" style="margin-bottom:8px">${esc(act.explain)}</div>`:''}`; }
    res.innerHTML = extra+`<div style="height:${Math.max(140,act.options.length*(board?52:40))}px"><canvas></canvas></div>`;
    const colors = act.options.map((o,i)=> act.type==='quiz' ? (i===act.answer?'#1baf7a':'#c9cfd8') : SERIES[0]);
    chart($('canvas',res),{type:'bar',data:{labels:act.options,datasets:[{data:counts,backgroundColor:colors,borderRadius:4,barThickness:board?30:22}]},
      options:{indexAxis:'y',animation:{duration:300},plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+'명'}}},scales:{x:{beginAtZero:true,ticks:{precision:0},grid:gridOpt,border:{display:false}},y:{grid:{display:false},ticks:{font:{size:board?15:13,weight:600}}}}}});
  } else if(act.type==='scale'){
    const mn=act.min??1,mx=act.max??10, labels=[], counts=[];
    for(let i=mn;i<=mx;i++){ labels.push(String(i)); counts.push(0); }
    msgs.forEach(m=>counts[m.v-mn]++);
    const avg = msgs.reduce((s,m)=>s+m.v,0)/msgs.length;
    res.innerHTML = `<div class="row"><span class="bigstat">${avg.toFixed(1)}</span><span class="muted">평균 (${msgs.length}명)</span></div><div style="height:${h-60}px;margin-top:8px"><canvas></canvas></div>`;
    chart($('canvas',res),{type:'bar',data:{labels,datasets:[{data:counts,backgroundColor:SERIES[1],borderRadius:4}]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{title:c=>c[0].label+'점',label:c=>c.raw+'명'}}},scales:{y:{beginAtZero:true,ticks:{precision:0},grid:gridOpt,border:{display:false}},x:{grid:{display:false}}}}});
  } else if(act.type==='text'){
    const list = msgs.slice(-(board?80:40)).reverse();
    res.innerHTML = `<div class="notes">${list.map(m=>`<div class="note" ${board?'style="font-size:1.08rem;max-width:320px"':''}>${esc(m.v)}<b>— ${esc(m.n)}</b></div>`).join('')}</div>`;
  } else if(act.type==='number'){
    const vals = msgs.map(m=>m.v), sum=vals.reduce((a,b)=>a+b,0);
    res.innerHTML = `<div class="grid3" style="gap:10px"><div><div class="small muted">합계</div><div class="bigstat">${sum.toLocaleString()}</div><span class="small">${esc(act.unit||'')}</span></div><div><div class="small muted">평균</div><div class="bigstat">${Math.round(sum/vals.length).toLocaleString()}</div></div><div><div class="small muted">응답</div><div class="bigstat">${vals.length}</div><span class="small">명</span></div></div><div style="height:${h-50}px;margin-top:10px"><canvas></canvas></div>`;
    const sorted=[...msgs].sort((a,b)=>b.v-a.v).slice(0,20);
    chart($('canvas',res),{type:'bar',data:{labels:sorted.map(m=>m.n),datasets:[{data:sorted.map(m=>m.v),backgroundColor:SERIES[2],borderRadius:4}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:gridOpt,border:{display:false}},x:{grid:{display:false}}}}});
  } else if(act.type==='month'){
    const by={}; msgs.forEach(m=>{ by[m.v]=(by[m.v]||0)+1; });
    const keys=Object.keys(by).sort();
    res.innerHTML = `<div class="small muted">가장 빠른 목표: <b>${keys[0]}</b> · 가장 먼 목표: <b>${keys[keys.length-1]}</b></div><div style="height:${h-30}px;margin-top:8px"><canvas></canvas></div>`;
    chart($('canvas',res),{type:'bar',data:{labels:keys,datasets:[{data:keys.map(k=>by[k]),backgroundColor:SERIES[6],borderRadius:4}]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+'명이 이 달을 목표로'}}},scales:{y:{beginAtZero:true,ticks:{precision:0},grid:gridOpt,border:{display:false}},x:{grid:{display:false}}}}});
  }
}

/* ---------- 상단바 & 방 참여 ---------- */
function topbar(active){
  const base = document.body.dataset.base || '';
  const bar = document.createElement('header'); bar.className='topbar';
  bar.innerHTML = `<div class="wrap">
    <a class="brand" href="${base}index.html"><span class="logo">Z</span><span>ZERO MOMENTUM<small>제로 모멘텀 · 다인에듀</small></span></a>
    <nav class="topnav">
      <a href="${base}index.html" class="${active==='home'?'on':''}">홈</a>
      <a href="${base}lesson.html?ch=0" class="${active==='lesson'?'on':''}">챕터 실습</a>
      <a href="${base}dashboard.html" class="${active==='dash'?'on':''}">나의 부채 대시보드</a>
      <a href="${base}board.html" class="${active==='board'?'on':''}">강사 보드</a>
      <button class="roomchip off" id="roomchip"><span class="dot"></span><span class="lbl">방 참여</span></button>
    </nav></div>`;
  document.body.prepend(bar);
  const chip=$('#roomchip');
  const upd=()=>{ chip.classList.toggle('off',!LIVE.room); $('.dot',chip).classList.toggle('live',LIVE.status==='live'); $('.lbl',chip).textContent = LIVE.room ? `${LIVE.room} · ${LIVE.me.n||'닉네임?'}` : '방 참여'; };
  LIVE.on(upd); upd();
  chip.onclick=()=>joinModal();
}
function joinModal(force){
  const m=document.createElement('div'); m.className='modal';
  m.innerHTML=`<div class="box"><div class="kicker">LIVE ROOM</div><h2>실시간 수업 참여</h2>
   <p class="small muted">강사가 알려준 방 코드와 닉네임을 입력하면, 실습 응답이 같은 방 참여자들과 실시간으로 공유됩니다. (개인 부채 금액은 공유되지 않습니다)</p>
   <label>방 코드</label><input id="jr" placeholder="예: DEBT01" value="${esc(LIVE.room)}" style="text-transform:uppercase;margin:4px 0 10px">
   <label>닉네임</label><input id="jn" placeholder="예: 후안샘" value="${esc(LIVE.me.n)}" maxlength="16" style="margin:4px 0 16px">
   <div class="row"><button class="btn" id="jok">참여하기</button><button class="btn ghost" id="jsolo">혼자 실습(개인 모드)</button></div></div>`;
  document.body.appendChild(m);
  $('#jok',m).onclick=()=>{ const r=$('#jr',m).value.trim(), n=$('#jn',m).value.trim(); if(!r||!n) return toast('방 코드와 닉네임을 입력해 주세요'); LIVE.setNick(n); LIVE.setRoom(r); m.remove(); toast(`방 ${LIVE.room} 에 참여했습니다`); };
  $('#jsolo',m).onclick=()=>{ LIVE.setNick($('#jn',m).value.trim()); LIVE.setRoom(''); m.remove(); };
  if(!force) m.onclick=e=>{ if(e.target===m) m.remove(); };
}
function initRoomFromURL(){
  const p=new URLSearchParams(location.search);
  const r=p.get('room');
  if(r){ LIVE.room=r.toUpperCase(); store.set('room',LIVE.room); }
  else LIVE.room = store.get('room','') || '';
  LIVE.connect();
  if(r && !LIVE.me.n) setTimeout(()=>joinModal(true),300);
}

window.ZM = {$, $$, esc, SERIES, store, getData, setData, uid, fmt, fmtShort, monthLabel, simulate, chart, gridOpt, toast, LIVE, renderActivity, topbar, joinModal, initRoomFromURL};
})();
