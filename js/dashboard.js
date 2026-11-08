/* ZERO MOMENTUM — 나의 부채 대시보드 */
(function(){
'use strict';
const {$, $$, esc, SERIES, getData, setData, uid, fmt, fmtShort, monthLabel, simulate, chart, gridOpt, toast} = ZM;
ZM.topbar('dash'); ZM.initRoomFromURL();
const TYPES=['신용카드','신용대출','학자금','자동차','주택담보','마이너스통장','가족·지인','기타'];
let D = getData();
const save=()=>{ setData(D); render(); };
const color=d=>SERIES[D.debts.indexOf(d)%8];

function sample(){
  D.currency='KRW'; D.strategy='snowball'; D.extra=200000; D.startDate=new Date().toISOString().slice(0,7);
  D.debts=[
    {id:uid(),name:'신용카드 (리볼빙)',type:'신용카드',balance:1800000,original:2500000,apr:18.9,min:90000,due:15},
    {id:uid(),name:'마이너스통장',type:'마이너스통장',balance:4200000,original:5000000,apr:8.2,min:60000,due:25},
    {id:uid(),name:'자동차 할부',type:'자동차',balance:9600000,original:15000000,apr:5.9,min:420000,due:10},
    {id:uid(),name:'카드론',type:'신용대출',balance:6500000,original:8000000,apr:15.5,min:200000,due:15},
    {id:uid(),name:'학자금 대출',type:'학자금',balance:12500000,original:16000000,apr:1.7,min:180000,due:30}];
  const t=new Date(); D.payments=[];
  for(let i=5;i>=1;i--){ const d=new Date(t.getFullYear(),t.getMonth()-i,15).toISOString().slice(0,10); D.payments.push({id:uid(),date:d,debtId:D.debts[0].id,amount:140000}); }
  D.ef={goal:1000000,saved:650000};
}

function render(){
  // controls
  $$('#strat button').forEach(b=>b.classList.toggle('on',b.dataset.s===D.strategy));
  $('#extra').value=D.extra||0; $('#cur').value=D.currency; $('#start').value=D.startDate||new Date().toISOString().slice(0,7);
  const cur=D.currency, debts=D.debts;
  renderTable();
  if(!debts.length){ $('#kpis').innerHTML=''; $('#body').innerHTML=`<div class="card empty"><div style="font-size:3rem">🧾</div><h3>아직 입력한 부채가 없습니다</h3><p class="muted">‘＋ 부채 추가’로 직접 입력하거나, ‘예시 데이터’로 대시보드를 미리 살펴보세요.<br>4장 <a href="lesson.html?ch=4">부채 스냅샷 워크시트</a>에서 입력한 내용도 여기에 나타납니다.</p></div>`; return; }
  const total=debts.reduce((s,d)=>s+(+d.balance||0),0), orig=debts.reduce((s,d)=>s+Math.max(+d.original||0,+d.balance||0),0);
  const mins=debts.reduce((s,d)=>s+(+d.min||0),0), wapr= total? debts.reduce((s,d)=>s+(+d.balance||0)*(+d.apr||0),0)/total:0;
  const S=simulate(debts,D.extra,D.strategy), O=simulate(debts,D.extra,D.strategy==='snowball'?'avalanche':'snowball'), M=simulate(debts,0,D.strategy);
  const prog= orig? (orig-total)/orig*100:0, start=(D.startDate||new Date().toISOString().slice(0,7))+'-01';
  const free = S.stuck? '계획 재검토 필요' : monthLabel(S.months,start);
  $('#kpis').innerHTML=`
   <div class="kpi accent"><div class="lbl">남은 총 부채</div><div class="val">${fmt(total,cur)}</div><div class="sub">${debts.length}건 · 처음 ${fmt(orig,cur)}</div></div>
   <div class="kpi"><div class="lbl">예상 DEBT-FREE</div><div class="val">${free}</div><div class="sub">${S.stuck?'최소상환액이 이자보다 작은 부채가 있어요':S.months+'개월 후 · '+(D.strategy==='snowball'?'스노우볼':'애벌랜치')}</div></div>
   <div class="kpi"><div class="lbl">월 상환 예산</div><div class="val">${fmt(S.budget,cur)}</div><div class="sub">최소상환 ${fmt(mins,cur)} + 추가 ${fmt(D.extra||0,cur)}</div></div>
   <div class="kpi"><div class="lbl">앞으로 낼 이자 (예상)</div><div class="val">${S.stuck?'-':fmt(S.totalInterest,cur)}</div><div class="sub">가중 평균 이자율 ${wapr.toFixed(1)}%</div></div>`;

  const extraSaved = (!M.stuck && !S.stuck) ? `추가 상환 ${fmt(D.extra||0,cur)} 덕분에 <b>${M.months-S.months}개월</b> 단축, 이자 <b>${fmt(M.totalInterest-S.totalInterest,cur)}</b> 절약` : '';
  const ef=D.ef||{goal:0,saved:0}, efp= ef.goal? Math.min(100,ef.saved/ef.goal*100):0;
  $('#body').innerHTML=`
  <div class="grid3" style="margin-top:18px">
    <div class="card"><h3>🍩 부채 구성</h3><div style="height:220px;position:relative"><canvas id="cDonut"></canvas><div id="donutMid" style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none"></div></div><div class="legend" id="lg1"></div></div>
    <div class="card"><h3>🎨 색칠 상환 차트</h3><p class="small muted" style="margin-top:-6px">칸 1개 = 처음 부채의 1%. 갚을수록 칠해집니다.</p><div class="colorgrid" id="cgrid"></div><div class="row" style="margin-top:10px"><span class="bigstat">${prog.toFixed(1)}%</span><span class="small">상환 완료 · ${fmt(orig-total,cur)}</span></div></div>
    <div class="card"><h3>🛟 비상금 트래커</h3><div style="height:150px;position:relative"><canvas id="cEf"></canvas><div style="position:absolute;inset:0;display:grid;place-items:center;padding-top:40px;text-align:center;pointer-events:none"><div><b style="font-size:1.4rem">${Math.round(efp)}%</b><div class="small">${fmt(ef.saved,cur)} / ${fmt(ef.goal,cur)}</div></div></div></div>
      <div class="row" style="margin-top:8px"><input type="number" id="efGoal" value="${ef.goal}" title="목표" style="flex:1" placeholder="목표"><input type="number" id="efSaved" value="${ef.saved}" title="현재" style="flex:1" placeholder="현재 모은 금액"></div><p class="small muted" style="margin:6px 0 0">왼쪽: 목표 · 오른쪽: 현재 모은 금액 (7장)</p></div>
  </div>
  <div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">📉 상환 로드맵 — 부채별 잔액 예측</h3><span class="small">${extraSaved}</span></div><div style="height:320px;margin-top:10px"><canvas id="cArea"></canvas></div><div class="legend" id="lg2"></div></div>
  <div class="grid2">
    <div class="card"><h3>🗓️ 완납 타임라인</h3><p class="small muted" style="margin-top:-6px">회색 = 최소상환만 하는 구간 · 색 = 스노우볼이 집중 공격하는 구간</p><div style="height:${Math.max(180,debts.length*48+60)}px"><canvas id="cGantt"></canvas></div></div>
    <div class="card"><h3>⚖️ 전략 비교</h3><div class="grid2" style="gap:10px"><div class="kpi" style="box-shadow:none"><div class="lbl">⛄ 스노우볼</div><div class="val" style="font-size:1.25rem">${D.strategy==='snowball'?S.months:O.months}개월</div><div class="sub">이자 ${fmt(D.strategy==='snowball'?S.totalInterest:O.totalInterest,cur)}</div></div><div class="kpi" style="box-shadow:none"><div class="lbl">🏔️ 애벌랜치</div><div class="val" style="font-size:1.25rem">${D.strategy==='avalanche'?S.months:O.months}개월</div><div class="sub">이자 ${fmt(D.strategy==='avalanche'?S.totalInterest:O.totalInterest,cur)}</div></div></div><div style="height:200px;margin-top:10px"><canvas id="cCmp"></canvas></div></div>
  </div>
  <div class="grid2">
    <div class="card"><h3>📅 이번 달 결제일 달력</h3><div class="cal" id="cal"></div></div>
    <div class="card"><h3>✍️ 상환 기록</h3>
      <div class="row"><input type="date" id="pDate" style="width:auto" value="${new Date().toISOString().slice(0,10)}"><select id="pDebt" style="width:auto;flex:1">${debts.map(d=>`<option value="${d.id}">${esc(d.name)}</option>`).join('')}</select><input type="number" id="pAmt" placeholder="금액" style="width:130px"><button class="btn sm" id="pAdd">기록</button></div>
      <div style="height:180px;margin-top:10px"><canvas id="cHist"></canvas></div>
      <div style="max-height:170px;overflow:auto;margin-top:8px"><table class="t"><tbody>${[...D.payments].sort((a,b)=>b.date.localeCompare(a.date)).map(p=>{const d=debts.find(x=>x.id===p.debtId);return `<tr><td class="small">${p.date}</td><td class="small">${esc(d?d.name:'(삭제됨)')}</td><td class="num">${fmt(p.amount,cur)}</td><td><button class="btn ghost sm" data-px="${p.id}">✕</button></td></tr>`}).join('')||'<tr><td class="small muted">아직 기록이 없습니다. 매달 데빗 데이트에 상환을 기록하세요.</td></tr>'}</tbody></table></div></div>
  </div>
  <div class="card"><h3>📆 월별 상환 계획표 (처음 24개월)</h3><div class="tbl-wrap" style="max-height:420px;overflow:auto"><table class="t"><thead><tr><th>월</th><th>집중 공격 대상</th><th class="num">총 상환</th><th class="num">이자</th><th class="num">남은 부채</th><th>이번 달 완납</th></tr></thead><tbody>${S.rows.slice(1,25).map(r=>{const t=debts.find(d=>d.id===r.target);const fin=debts.filter(d=>S.payoff[d.id]===r.m);return `<tr><td>${monthLabel(r.m-1,start)}</td><td>${t?`<span class="dot" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${color(t)};margin-right:6px"></span>${esc(t.name)}`:'-'}</td><td class="num">${fmt(r.paid,cur)}</td><td class="num">${fmt(r.interest,cur)}</td><td class="num"><b>${fmt(r.total,cur)}</b></td><td>${fin.map(d=>`<span class="pill math">🎉 ${esc(d.name)}</span>`).join(' ')}</td></tr>`}).join('')}</tbody></table></div></div>
  <div class="card"><h3>🏁 6개월 마일스톤</h3><div id="ms"></div><p class="small muted">체크는 <a href="lesson.html?ch=15">15장 6개월 체크인 플랜</a>에서 합니다.</p></div>`;

  // donut
  $('#donutMid').innerHTML=`<div><div class="small muted">총 부채</div><b style="font-size:1.2rem">${fmtShort(total,cur)}</b></div>`;
  chart($('#cDonut'),{type:'doughnut',data:{labels:debts.map(d=>d.name),datasets:[{data:debts.map(d=>d.balance),backgroundColor:debts.map(color),borderColor:'#fff',borderWidth:2}]},options:{cutout:'66%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.label}: ${fmt(c.raw,cur)} (${(c.raw/total*100).toFixed(1)}%)`}}}}});
  $('#lg1').innerHTML=debts.map(d=>`<span><i style="background:${color(d)}"></i>${esc(d.name)} ${(d.balance/total*100).toFixed(0)}%</span>`).join('');
  // color grid
  $('#cgrid').innerHTML=Array.from({length:100},(_,i)=>`<i class="${i<Math.floor(prog)?'on':''}" title="${i+1}%"></i>`).join('');
  // EF gauge
  chart($('#cEf'),{type:'doughnut',data:{labels:['모은 금액','남은 금액'],datasets:[{data:[ef.saved,Math.max(0,ef.goal-ef.saved)],backgroundColor:[SERIES[2],'#ece6da'],borderWidth:0}]},options:{rotation:-90,circumference:180,cutout:'72%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.label+': '+fmt(c.raw,cur)}}}}});
  $('#efGoal').onchange=e=>{ D.ef.goal=+e.target.value||0; save(); };
  $('#efSaved').onchange=e=>{ D.ef.saved=+e.target.value||0; save(); };
  // area
  const R=S.rows, labels=R.map(r=>monthLabel(r.m,start));
  chart($('#cArea'),{type:'line',data:{labels,datasets:debts.map(d=>({label:d.name,data:R.map(r=>Math.round(r.bal[d.id]||0)),borderColor:color(d),backgroundColor:color(d)+'cc',fill:true,borderWidth:1.5,pointRadius:0,stack:'b'}))},
    options:{interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw?c.dataset.label+': '+fmt(c.raw,cur):null,footer:c=>'합계: '+fmt(c.reduce((s,x)=>s+x.raw,0),cur)}}},scales:{y:{stacked:true,beginAtZero:true,grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,cur)}},x:{grid:{display:false},ticks:{maxTicksLimit:12}}}}});
  $('#lg2').innerHTML=debts.map(d=>`<span><i style="background:${color(d)}"></i>${esc(d.name)} — ${S.payoff[d.id]!=null?monthLabel(S.payoff[d.id],start)+' 완납':'미완납'}</span>`).join('');
  // gantt
  const ord=S.order.map(id=>debts.find(d=>d.id===id)).filter(Boolean);
  chart($('#cGantt'),{type:'bar',data:{labels:ord.map(d=>d.name),datasets:[
    {label:'최소상환',data:ord.map(d=>[0,Math.min(S.focus[d.id]||0,S.payoff[d.id]??S.months)]),backgroundColor:'#d9dee6',borderRadius:4,grouped:false,barThickness:22},
    {label:'집중 공격',data:ord.map(d=>[S.focus[d.id]||0,S.payoff[d.id]??S.rows.length]),backgroundColor:ord.map(color),borderRadius:4,grouped:false,barThickness:22}]},
    options:{indexAxis:'y',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${monthLabel(c.raw[0],start)} ~ ${monthLabel(c.raw[1],start)}`}}},scales:{x:{min:0,grid:gridOpt,border:{display:false},ticks:{callback:v=>monthLabel(v,start)}},y:{grid:{display:false}}}}});
  // compare
  const sn=D.strategy==='snowball'?S:O, av=D.strategy==='avalanche'?S:O;
  chart($('#cCmp'),{type:'line',data:{labels:Array.from({length:Math.max(sn.rows.length,av.rows.length)},(_,i)=>monthLabel(i,start)),datasets:[{label:'스노우볼',data:sn.rows.map(r=>r.total),borderColor:SERIES[1],borderWidth:2,pointRadius:0},{label:'애벌랜치',data:av.rows.map(r=>r.total),borderColor:SERIES[0],borderWidth:2,pointRadius:0}]},options:{interaction:{mode:'index',intersect:false},plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+fmt(c.raw,cur)}}},scales:{y:{beginAtZero:true,grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,cur)}},x:{grid:{display:false},ticks:{maxTicksLimit:8}}}}});
  // calendar
  const now=new Date(), y=now.getFullYear(), mo=now.getMonth(), first=new Date(y,mo,1).getDay(), last=new Date(y,mo+1,0).getDate();
  let cells=['일','월','화','수','목','금','토'].map(x=>`<div class="h">${x}</div>`).join('');
  for(let i=0;i<first;i++) cells+='<div style="background:transparent;border:0"></div>';
  for(let day=1;day<=last;day++){ const due=debts.filter(x=>Math.min(+x.due||0,last)===day); cells+=`<div class="${day===now.getDate()?'today':''}"><span class="d">${day}</span>${due.map(x=>`<span class="dot" style="background:${color(x)}" title="${esc(x.name)} ${fmt(x.min,cur)}">${esc(x.name)}</span>`).join('')}</div>`; }
  $('#cal').innerHTML=cells;
  // payments
  $('#pAdd').onclick=()=>{ const amt=+$('#pAmt').value; if(!(amt>0)) return toast('금액을 입력하세요'); const id=$('#pDebt').value; const d=D.debts.find(x=>x.id===id); D.payments.push({id:uid(),date:$('#pDate').value,debtId:id,amount:amt}); d.balance=Math.max(0,d.balance-amt); save(); toast(d.balance===0?`🎉 ${d.name} 완납! 스노우볼을 굴리세요`:'상환이 기록되었습니다'); };
  $$('[data-px]').forEach(b=>b.onclick=()=>{ const p=D.payments.find(x=>x.id===b.dataset.px); const d=D.debts.find(x=>x.id===p.debtId); if(d) d.balance+=p.amount; D.payments=D.payments.filter(x=>x!==p); save(); });
  const ps=[...D.payments].sort((a,b)=>a.date.localeCompare(b.date));
  if(ps.length){ let after=total; const pts=[]; for(let i=ps.length-1;i>=0;i--){ pts.unshift({x:ps[i].date,y:after}); after+=ps[i].amount; } pts.unshift({x:'시작',y:after});
    chart($('#cHist'),{type:'line',data:{labels:pts.map(p=>p.x),datasets:[{label:'실제 남은 부채',data:pts.map(p=>p.y),borderColor:SERIES[2],backgroundColor:'rgba(27,175,122,.12)',fill:true,borderWidth:2,pointRadius:4,pointBackgroundColor:'#fff',pointBorderWidth:2}]},options:{plugins:{legend:{display:false},title:{display:true,text:'실제 상환 추이 (기록 기준)'},tooltip:{callbacks:{label:c=>fmt(c.raw,cur)}}},scales:{y:{grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,cur)}},x:{grid:{display:false}}}}}); }
  else $('#cHist').parentElement.innerHTML='<div class="small muted" style="padding:20px 0">상환을 기록하면 실제 추이 그래프가 그려집니다.</div>';
  // milestones
  const ms=D.milestones||{}; const n=Object.values(ms).filter(Boolean).length;
  $('#ms').innerHTML=`<div class="row">${[1,2,3,4,5,6].map(m=>{const k=[0,1,2].filter(j=>ms[m+'-'+j]).length;return `<div style="text-align:center;flex:1;min-width:70px"><div style="font-size:1.6rem">${k===3?'🏆':k>0?'⏳':'⚪'}</div><div class="small"><b>${m}개월</b> ${k}/3</div></div>`}).join('')}</div><div class="progressbar" style="margin-top:8px"><i style="width:${n/18*100}%"></i></div>`;
}

function renderTable(){
  const cur=D.currency;
  $('#tbl').innerHTML=`<thead><tr><th></th><th>이름</th><th>종류</th><th class="num">현재 잔액</th><th class="num">처음 금액</th><th class="num">이자율%</th><th class="num">최소상환</th><th class="num">납부일</th><th>진척</th><th></th></tr></thead><tbody>${D.debts.map(d=>{const o=Math.max(+d.original||0,+d.balance||0), p=o?(o-d.balance)/o*100:0;return `<tr data-id="${d.id}"><td><i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${color(d)}"></i></td><td><input data-k="name" value="${esc(d.name)}" style="min-width:130px"></td><td><select data-k="type" style="min-width:118px">${TYPES.map(t=>`<option ${t===d.type?'selected':''}>${t}</option>`).join('')}</select></td><td><input data-k="balance" type="number" value="${d.balance}" style="text-align:right;min-width:110px"></td><td><input data-k="original" type="number" value="${d.original||d.balance}" style="text-align:right;min-width:110px"></td><td><input data-k="apr" type="number" step="0.1" value="${d.apr}" style="text-align:right;width:76px"></td><td><input data-k="min" type="number" value="${d.min}" style="text-align:right;min-width:90px"></td><td><input data-k="due" type="number" min="1" max="31" value="${d.due||''}" style="text-align:right;width:62px"></td><td style="min-width:90px"><div class="progressbar" style="height:8px"><i style="width:${p}%"></i></div><span class="small">${p.toFixed(0)}%</span></td><td><button class="btn ghost sm" data-del>✕</button></td></tr>`}).join('')}</tbody>${D.debts.length?`<tfoot><tr><td></td><td colspan="2">합계</td><td class="num">${fmt(D.debts.reduce((s,d)=>s+(+d.balance||0),0),cur)}</td><td class="num">${fmt(D.debts.reduce((s,d)=>s+Math.max(+d.original||0,+d.balance||0),0),cur)}</td><td></td><td class="num">${fmt(D.debts.reduce((s,d)=>s+(+d.min||0),0),cur)}</td><td colspan="3"></td></tr></tfoot>`:''}`;
  $$('#tbl tr[data-id]').forEach(tr=>{ const d=D.debts.find(x=>x.id===tr.dataset.id);
    $$('[data-k]',tr).forEach(i=>i.onchange=()=>{ const k=i.dataset.k; d[k]=(k==='name'||k==='type')?i.value:+i.value; if(k==='balance'&&(+d.original||0)<d.balance) d.original=d.balance; save(); });
    $('[data-del]',tr).onclick=()=>{ if(confirm(`'${d.name}'을(를) 삭제할까요?`)){ D.debts=D.debts.filter(x=>x!==d); save(); } }; });
}

$$('#strat button').forEach(b=>b.onclick=()=>{ D.strategy=b.dataset.s; save(); });
$('#extra').onchange=e=>{ D.extra=+e.target.value||0; save(); };
$('#cur').onchange=e=>{ D.currency=e.target.value; save(); };
$('#start').onchange=e=>{ D.startDate=e.target.value; save(); };
$('#add').onclick=()=>{ D.debts.push({id:uid(),name:'새 부채',type:'기타',balance:0,original:0,apr:0,min:0,due:15}); save(); };
$('#sample').onclick=()=>{ if(D.debts.length && !confirm('현재 데이터를 예시 데이터로 바꿀까요?')) return; sample(); save(); };
$('#reset').onclick=()=>{ if(!confirm('대시보드의 모든 데이터를 지울까요?')) return; D=JSON.parse(JSON.stringify({currency:'KRW',debts:[],extra:0,strategy:'snowball',payments:[],ef:{goal:1000000,saved:0},startDate:null,milestones:{}})); save(); };
$('#exp').onclick=()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(D,null,2)],{type:'application/json'})); a.download='my-debt-dashboard.json'; a.click(); };
$('#imp').onchange=e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ D=Object.assign(getData(),JSON.parse(r.result)); save(); toast('가져오기 완료'); }catch(err){ toast('파일을 읽을 수 없습니다'); } }; r.readAsText(f); };
render();
})();
