/* ZERO MOMENTUM — 챕터 실습 페이지 */
(function(){
'use strict';
const {$, $$, esc, SERIES, store, getData, setData, uid, fmt, fmtShort, simulate, chart, gridOpt, toast, LIVE, renderActivity} = ZM;
const SARA = [
  {id:'s1',name:'신용카드 (Credit Card)',balance:1000,apr:19.9,min:85},
  {id:'s2',name:'개인대출 (Personal Loan)',balance:4000,apr:11,min:150},
  {id:'s3',name:'자동차 대출 (Car Loan)',balance:6000,apr:7.5,min:200},
  {id:'s4',name:'학자금 대출 (Student Loan)',balance:8500,apr:4.5,min:250}];
const KR = [
  {id:'k1',name:'신용카드',balance:1800000,apr:18.9,min:90000},
  {id:'k2',name:'마이너스통장',balance:4200000,apr:8.2,min:60000},
  {id:'k3',name:'자동차 할부',balance:9600000,apr:5.9,min:420000},
  {id:'k4',name:'카드론',balance:6500000,apr:15.5,min:200000},
  {id:'k5',name:'학자금 대출',balance:12500000,apr:1.7,min:180000}];
const usd = n=>'$'+Math.round(n).toLocaleString('en-US');

/* 공통: 저장되는 체크리스트 */
function checklist(el, key, items, opts={}){
  const st = store.get('t_'+key,{});
  el.innerHTML = `${opts.progress!==false?'<div class="row" style="margin-bottom:6px"><div class="progressbar" style="flex:1"><i></i></div><b class="pc small"></b></div>':''}<div class="checks">${items.map((t,i)=>`<label class="${st[i]?'on':''}"><input type="checkbox" data-i="${i}" ${st[i]?'checked':''}><span>${t}</span></label>`).join('')}</div>`;
  const upd=()=>{ const n=items.filter((_,i)=>st[i]).length; const bar=$('.progressbar i',el); if(bar){ bar.style.width=(n/items.length*100)+'%'; $('.pc',el).textContent=`${n}/${items.length}`; } };
  $$('input',el).forEach(c=>c.onchange=()=>{
    if(opts.max && c.checked && Object.values(st).filter(Boolean).length>=opts.max){ c.checked=false; return toast(`최대 ${opts.max}개까지 선택하세요`); }
    st[c.dataset.i]=c.checked; c.parentElement.classList.toggle('on',c.checked); store.set('t_'+key,st); upd(); opts.onchange&&opts.onchange(st); });
  upd(); return st;
}

const TOOLS = {
/* ---------- 0. 3M ---------- */
pillars(el){
  el.innerHTML = `<div class="pillars" style="margin:0">
   <div class="pillar m1"><span class="pill mind">1 · MINDSET</span><b>마인드셋</b><p class="small">나의 <b>Why</b>를 분명히 합니다. 강한 이유가 없으면 동기는 금방 사라집니다. 목표에 감정적으로 계속 몰입하게 돕는 단계.</p><p class="small muted">1·2·8장</p></div>
   <div class="pillar m2"><span class="pill math">2 · MATH</span><b>계산·계획</b><p class="small">숫자와 마주하고, 최적의 상환 전략을 고르고, 내 소득에 맞는 <b>맞춤 부채 공격 계획</b>을 세웁니다.</p><p class="small muted">3~6장</p></div>
   <div class="pillar m3"><span class="pill mom">3 · MOMENTUM</span><b>모멘텀</b><p class="small">계획을 진전으로 바꿉니다. 지출 추적, 낭비 줄이기, 자동화, 작은 승리 쌓기로 <b>빚이 더 빨리 줄어들게</b>.</p><p class="small muted">7·9~15장</p></div></div>`;
},
/* ---------- 1. 오해 vs 진실 ---------- */
mythFlip(el){
  const cards=[['빚이 있다는 건 내가 실패했다는 뜻이다','빚은 실패가 아닙니다. 상황과 선택이 쌓인 결과일 뿐, 당신의 가치를 말해주지 않습니다.'],
    ['빚이 있는 사람은 무책임하다','빚은 똑똑하고, 성실하고, 친절한 사람에게도 매일 일어납니다.'],
    ['나는 원래 돈 관리를 못하는 사람이다','돈 관리는 타고나는 재능이 아니라 배우는 기술입니다. 시스템이 있으면 누구나 할 수 있습니다.'],
    ['이 정도 빚이면 이미 늦었다','22살이든 52살이든, 금액이 얼마든 — 빠져나갈 길은 언제나 있습니다.']];
  el.innerHTML = `<p class="small muted">카드를 클릭하면 뒤집힙니다.</p><div class="grid2">${cards.map(c=>`<div class="flip"><div class="in"><div class="f"><span class="kicker">오해 MYTH</span><b style="font-size:1.08rem">“${c[0]}”</b></div><div class="b"><span class="kicker" style="color:var(--teal)">진실 TRUTH</span><span>${c[1]}</span></div></div></div>`).join('')}</div>`;
  $$('.flip',el).forEach(f=>f.onclick=()=>f.classList.toggle('on'));
},
pictogram(el){
  el.innerHTML = `<div class="grid2"><div><p>호주 통계청(ABS)에 따르면 <b>호주 가구의 73% 이상</b>이 어떤 형태로든 빚을 지고 있으며, <b>3명 중 1명</b>은 상환 때문에 재정적 스트레스를 겪는다고 합니다. 빚이 있는 것은 ‘예외’가 아니라 ‘보통’입니다.</p>
    <div class="row" style="gap:18px;margin-top:8px"><div><div class="bigstat" style="color:var(--coral)">73%</div><div class="small">빚이 있는 가구</div></div><div><div class="bigstat" style="color:var(--s7)">1/3</div><div class="small">상환 스트레스를 겪는 사람</div></div></div>
    <div class="row" style="margin-top:12px"><button class="btn sm" data-m="73">🏠 73% 가구 보기</button><button class="btn sm c" data-m="33">😟 1/3 스트레스 보기</button></div></div>
    <div><div class="pict"></div><p class="small muted">아이콘 1개 = 100명 중 1명</p></div></div>`;
  const p=$('.pict',el); p.innerHTML=Array.from({length:100},()=>'<span>🏠</span>').join('');
  const show=n=>{ const icon=n===73?'🏠':'😟'; $$('span',p).forEach((s,i)=>{ s.textContent=icon; s.classList.remove('on'); setTimeout(()=>{ if(i<n) s.classList.add('on'); }, i*12); }); };
  $$('[data-m]',el).forEach(b=>b.onclick=()=>show(+b.dataset.m)); show(73);
},
/* ---------- 2. Why ---------- */
whyBuilder(el){
  const items=['밤에 돈 걱정 없이 푹 자고 싶다','월급날만 기다리는 삶을 끝내고 싶다','내 집 마련 대출 자격을 갖추고 싶다','아이들에게 재정적으로 강한 모습을 보여주고 싶다','여행하고, 베풀고, 잘 살 자유를 원한다'];
  const st=store.get('t_why',{custom:'',a1:'',a2:'',a3:''});
  el.innerHTML=`<div class="grid2"><div><h4>✏️ 나의 Why 고르기</h4><div class="cl"></div><label>나에게 진짜인 것은? (직접 쓰기)</label><textarea rows="2" id="wc" placeholder="나만의 Why">${esc(st.custom)}</textarea></div>
   <div><h4>🔍 성찰 질문</h4>
   <label>빚에서 벗어나면 내 삶은 어떤 느낌이길 바라나요?</label><input id="w1" placeholder="예: 평온함? 힘이 남? 설렘? 자유?" value="${esc(st.a1)}" style="margin:4px 0 10px">
   <label>빚이 없으면 어떤 기회가 열릴까요?</label><input id="w2" placeholder="예: 집 구매, 창업, 이직, 더 많은 저축" value="${esc(st.a2)}" style="margin:4px 0 10px">
   <label>다시는 느끼고 싶지 않은 감정은?</label><input id="w3" placeholder="예: 고지서 열기가 두려움, 모임 거절, 뒤처진 느낌" value="${esc(st.a3)}" style="margin:4px 0 10px">
   <button class="btn y sm" id="wcard">🃏 나의 Why 카드 만들기</button></div></div><div id="wout" style="margin-top:14px"></div>`;
  checklist($('.cl',el),'whypick',items,{progress:false});
  const save=()=>{ st.custom=$('#wc',el).value; st.a1=$('#w1',el).value; st.a2=$('#w2',el).value; st.a3=$('#w3',el).value; store.set('t_why',st); };
  $$('textarea,input:not([type=checkbox])',el).forEach(i=>i.oninput=save);
  $('#wcard',el).onclick=()=>{ save(); const pick=store.get('t_whypick',{}); const whys=items.filter((_,i)=>pick[i]); if(st.custom) whys.push(st.custom);
    $('#wout',el).innerHTML=`<div class="card" style="background:var(--navy);color:#fff"><div class="kicker" style="color:var(--yellow)">MY WHY</div><h3 style="color:#fff">나는 무엇을 위해 자유로워지려 하는가</h3><ul class="clean">${whys.map(w=>`<li>${esc(w)}</li>`).join('')||'<li>위에서 Why를 골라 주세요</li>'}</ul>${st.a1?`<p>💭 빚 없는 내 삶의 느낌: <b>${esc(st.a1)}</b></p>`:''}${st.a2?`<p>🚪 열릴 기회: <b>${esc(st.a2)}</b></p>`:''}${st.a3?`<p>🚫 다시는 느끼지 않을 감정: <b>${esc(st.a3)}</b></p>`:''}<p class="small" style="opacity:.8">Why > Willpower · 힘들 때마다 이 카드로 돌아오세요.</p></div>`; };
},
/* ---------- 3. 건강검진 ---------- */
checkup(el){
  el.innerHTML=`<p>방해받지 않는 시간을 따로 떼어 두세요. 하나의 ‘경험’으로 만드는 겁니다.</p><div class="cl"></div><p class="small muted">체크가 끝나면 4장의 <b>부채 스냅샷 워크시트</b>로 넘어가세요.</p>`;
  checklist($('.cl',el),'checkup',['☕ 커피를 내리고, 차분한 음악을 틀고, 좋아하는 조용한 공간으로 간다','📅 모든 납부일과 자동이체 내역을 목록으로 정리한다','📊 현재 잔액, 이자율, 최소상환액을 확인한다','🔐 모든 대출·카드 계정의 로그인 정보를 한곳에 모은다','📨 이메일·우편·앱에서 최신 명세서를 모두 찾는다']);
},
/* ---------- 4. 스냅샷 ---------- */
snapshot(el){
  const draw=()=>{
    const d=getData(), cur=d.currency;
    el.innerHTML=`<div class="row" style="margin-bottom:10px"><span class="small muted">통화</span><select id="cur" style="width:auto"><option value="KRW" ${cur==='KRW'?'selected':''}>원 (₩)</option><option value="USD" ${cur==='USD'?'selected':''}>달러 ($)</option></select><span class="small muted" style="margin-left:auto">🔒 이 정보는 내 브라우저에만 저장되며 다른 참여자에게 공유되지 않습니다.</span></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th>부채 종류</th><th class="num">총 잔액</th><th class="num">이자율(%)</th><th class="num">최소상환액</th><th class="num">납부일</th><th></th></tr></thead>
    <tbody><tr style="color:var(--muted);font-style:italic"><td>예시: 신용카드</td><td class="num">${cur==='USD'?'$3,200':'₩3,200,000'}</td><td class="num">19.9%</td><td class="num">${cur==='USD'?'$95':'₩95,000'}</td><td class="num">매월 15일</td><td></td></tr>
    ${d.debts.map(x=>`<tr data-id="${x.id}"><td><input data-k="name" value="${esc(x.name)}"></td><td><input data-k="balance" type="number" value="${x.balance}" style="text-align:right"></td><td><input data-k="apr" type="number" step="0.1" value="${x.apr}" style="text-align:right;width:80px"></td><td><input data-k="min" type="number" value="${x.min}" style="text-align:right"></td><td><input data-k="due" type="number" min="1" max="31" value="${x.due||''}" style="text-align:right;width:70px"></td><td><button class="btn ghost sm del">✕</button></td></tr>`).join('')}
    </tbody><tfoot><tr><td>합계 TOTALS</td><td class="num">${fmt(d.debts.reduce((s,x)=>s+(+x.balance||0),0),cur)}</td><td class="num">${(()=>{const t=d.debts.reduce((s,x)=>s+(+x.balance||0),0);return t?(d.debts.reduce((s,x)=>s+(+x.balance||0)*(+x.apr||0),0)/t).toFixed(1)+'% (가중)':'-'})()}</td><td class="num">${fmt(d.debts.reduce((s,x)=>s+(+x.min||0),0),cur)}</td><td></td><td></td></tr></tfoot></table></div>
    <div class="row" style="margin-top:10px"><button class="btn sm" id="add">＋ 부채 추가</button><button class="btn ghost sm" id="sara">사라(Sara)의 예시 불러오기</button><a class="btn t sm" href="dashboard.html" style="margin-left:auto">📊 대시보드에서 보기</a></div>
    ${d.debts.length?'<div style="height:240px;margin-top:16px"><canvas></canvas></div>':''}`;
    $('#cur',el).onchange=e=>{ const dd=getData(); dd.currency=e.target.value; setData(dd); draw(); };
    $('#add',el).onclick=()=>{ const dd=getData(); dd.debts.push({id:uid(),name:'새 부채',type:'기타',balance:0,original:0,apr:0,min:0,due:15}); setData(dd); draw(); };
    $('#sara',el).onclick=()=>{ if(getData().debts.length && !confirm('현재 입력한 부채를 사라의 예시로 바꿀까요?')) return; const dd=getData(); dd.currency='USD'; dd.debts=SARA.map((s,i)=>({...s,id:uid(),type:['신용카드','신용대출','자동차','학자금'][i],original:s.balance,due:[15,1,10,25][i]})); dd.extra=95; setData(dd); draw(); };
    $$('tbody tr[data-id]',el).forEach(tr=>{
      $$('input',tr).forEach(i=>i.onchange=()=>{ const dd=getData(); const x=dd.debts.find(z=>z.id===tr.dataset.id); const k=i.dataset.k; x[k]= k==='name'?i.value:+i.value; if(k==='balance' && (!x.original || x.original<x.balance)) x.original=+i.value; setData(dd); draw(); });
      $('.del',tr).onclick=()=>{ const dd=getData(); dd.debts=dd.debts.filter(z=>z.id!==tr.dataset.id); setData(dd); draw(); };
    });
    const cv=$('canvas',el);
    if(cv){ const ds=[...d.debts].sort((a,b)=>b.balance-a.balance);
      chart(cv,{type:'bar',data:{labels:ds.map(x=>x.name),datasets:[{label:'잔액',data:ds.map(x=>x.balance),backgroundColor:ds.map(x=>SERIES[d.debts.indexOf(x)%8]),borderRadius:4,barThickness:22}]},options:{indexAxis:'y',plugins:{legend:{display:false},title:{display:true,text:'부채별 잔액 (나의 재정 거울)'},tooltip:{callbacks:{label:c=>fmt(c.raw,cur)+` · 이자 ${ds[c.dataIndex].apr}%`}}},scales:{x:{grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,cur)}},y:{grid:{display:false}}}}}); }
  };
  draw();
},
debtDate(el){
  el.innerHTML=`<div class="grid2"><div><p>이것은 귀찮은 일이 아니라 <b>미래의 나와의 데이트</b>입니다. 의도적이고 아늑하게 만들수록 끝까지 해낼 가능성이 커집니다.</p><ul class="clean"><li>🕯️ 촛불을 켜고 식탁에 앉아 좋아하는 음료 한 잔</li><li>🧣 담요와 간식, 차로 ‘아늑한 코너’ 만들기</li><li>🎵 집중을 돕는 “머니 리셋” 플레이리스트</li></ul><div class="quote">매달 같은 시간에 점검하고 리셋하세요. ‘월간 부(富) 체크인’이라고 생각하세요.</div></div><div><h4>데빗 데이트 준비 체크리스트</h4><div class="cl"></div></div></div>`;
  checklist($('.cl',el),'debtdate',['날짜를 정하고 캘린더에 블록한다','분위기를 고른다: 카페, 집, 차 한 잔 등','부채 스냅샷 워크시트를 준비(인쇄)한다','모든 부채 명세서를 모은다 (이메일, 우편, 앱)','좋아하는 펜·노트를 챙긴다']);
},
/* ---------- 5. 전략 ---------- */
styleQuiz(el){
  const qs=[['돈 문제를 볼 때 나는…','숫자와 효율이 먼저 보인다','감정과 스트레스가 먼저 느껴진다'],
    ['다이어트를 한다면…','장기 계획표를 꾸준히 따른다','첫 주에 체중이 빠져야 계속한다'],
    ['“이자를 30만 원 아낀다” vs “3개월 안에 빚 1개 완납”','이자 30만 원 절약이 더 끌린다','빚 1개 완납이 더 끌린다'],
    ['이전에 계획을 포기한 이유는 주로…','계획이 비효율적이라서','진전이 안 보여 지쳐서'],
    ['체크리스트 항목에 줄을 그을 때…','별 감흥 없다','짜릿하고 힘이 난다']];
  const st=store.get('t_style',{});
  el.innerHTML=`${qs.map((q,i)=>`<div style="margin:10px 0"><b>${i+1}. ${q[0]}</b><div class="opts" style="margin-top:6px"><button class="opt ${st[i]==='A'?'sel':''}" data-q="${i}" data-v="A">A. ${q[1]}</button><button class="opt ${st[i]==='B'?'sel':''}" data-q="${i}" data-v="B">B. ${q[2]}</button></div></div>`).join('')}<div class="res" style="margin-top:12px"></div>`;
  const res=()=>{ const a=Object.values(st).filter(v=>v==='A').length, b=Object.values(st).filter(v=>v==='B').length; if(a+b<qs.length){ $('.res',el).innerHTML=`<div class="small muted">${a+b}/${qs.length} 응답</div>`; return; }
    const ava=a>b; $('.res',el).innerHTML=`<div class="callout ${ava?'':'c'}"><div class="row"><span class="bigstat">${ava?'🏔️':'⛄'}</span><div><b style="font-size:1.15rem">${ava?'논리형 → 애벌랜치 추천':'추진력형 → 스노우볼 추천'}</b><div class="small">논리 ${a} : 추진력 ${b}</div></div></div><div class="progressbar" style="margin-top:10px"><i style="width:${a/qs.length*100}%;background:var(--teal)"></i></div></div>`; };
  $$('.opt',el).forEach(b=>b.onclick=()=>{ st[b.dataset.q]=b.dataset.v; store.set('t_style',st); $$(`.opt[data-q="${b.dataset.q}"]`,el).forEach(x=>x.classList.toggle('sel',x===b)); res(); });
  res();
},
compare(el){
  const d=getData(); const mine=d.debts.filter(x=>x.balance>0);
  let src = mine.length?'mine':'kr';
  el.innerHTML=`<div class="row"><div class="opts"><button class="opt" data-s="mine">내 부채 (${mine.length}건)</button><button class="opt" data-s="kr">한국형 예시 (₩)</button><button class="opt" data-s="sara">사라의 예시 ($)</button></div><label style="margin-left:auto">매달 추가 상환액</label><input id="ex" type="number" style="width:160px"></div>
  <div class="grid4" style="margin-top:14px" id="kp"></div><div style="height:300px;margin-top:14px"><canvas id="c1"></canvas></div><div class="legend"><span><i style="background:${SERIES[0]}"></i>애벌랜치 (높은 이자 순)</span><span><i style="background:${SERIES[1]}"></i>스노우볼 (작은 잔액 순)</span></div><div style="height:220px;margin-top:10px"><canvas id="c2"></canvas></div><p class="small muted" id="note"></p>`;
  const defEx={mine:d.extra||0,kr:200000,sara:95};
  const run=()=>{
    $$('.opt',el).forEach(b=>b.classList.toggle('sel',b.dataset.s===src));
    const debts=src==='mine'?mine:src==='kr'?KR:SARA, cur=src==='mine'?d.currency:src==='kr'?'KRW':'USD', extra=+$('#ex',el).value||0;
    if(!debts.length){ $('#kp',el).innerHTML='<div class="small muted">4장에서 부채를 먼저 입력하세요.</div>'; return; }
    const A=simulate(debts,extra,'avalanche'), S=simulate(debts,extra,'snowball');
    const mm=x=>x.stuck?'상환 불가':(x.months+'개월');
    $('#kp',el).innerHTML=`<div class="kpi"><div class="lbl">🏔️ 애벌랜치 기간</div><div class="val">${mm(A)}</div><div class="sub">총 이자 ${fmt(A.totalInterest,cur)}</div></div><div class="kpi"><div class="lbl">⛄ 스노우볼 기간</div><div class="val">${mm(S)}</div><div class="sub">총 이자 ${fmt(S.totalInterest,cur)}</div></div><div class="kpi"><div class="lbl">⛄ 첫 완납까지</div><div class="val">${Math.min(...Object.values(S.payoff))}개월</div><div class="sub">애벌랜치는 ${Math.min(...Object.values(A.payoff))}개월</div></div><div class="kpi accent"><div class="lbl">애벌랜치의 이자 절약</div><div class="val">${fmt(Math.max(0,S.totalInterest-A.totalInterest),cur)}</div><div class="sub">월 상환 예산 ${fmt(A.budget,cur)}</div></div>`;
    $('#note',el).textContent = A.order.join()===S.order.join() ? '※ 이 예시는 “잔액이 작은 빚 = 이자율이 높은 빚”이라 두 전략의 순서와 결과가 같습니다. 한국형 예시로 차이를 비교해 보세요.' : '두 선이 벌어지는 구간이 전략의 차이입니다. 스노우볼은 첫 완납이 빠르고, 애벌랜치는 총 이자가 적습니다.';
    const n=Math.max(A.rows.length,S.rows.length), labels=Array.from({length:n},(_,i)=>i+'개월');
    chart($('#c1',el),{type:'line',data:{labels,datasets:[{label:'애벌랜치',data:A.rows.map(r=>r.total),borderColor:SERIES[0],backgroundColor:SERIES[0],borderWidth:2,pointRadius:0,tension:.2},{label:'스노우볼',data:S.rows.map(r=>r.total),borderColor:SERIES[1],backgroundColor:SERIES[1],borderWidth:2,pointRadius:0,tension:.2}]},options:{interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},title:{display:true,text:'남은 총 부채 추이'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+fmt(c.raw,cur)}}},scales:{y:{beginAtZero:true,grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,cur)}},x:{grid:{display:false},ticks:{maxTicksLimit:12}}}}});
    chart($('#c2',el),{type:'bar',data:{labels:debts.map(x=>x.name),datasets:[{label:'애벌랜치 완납월',data:debts.map(x=>A.payoff[x.id]),backgroundColor:SERIES[0],borderRadius:4},{label:'스노우볼 완납월',data:debts.map(x=>S.payoff[x.id]),backgroundColor:SERIES[1],borderRadius:4}]},options:{plugins:{legend:{display:false},title:{display:true,text:'부채별 완납 시점 (몇 개월 차)'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw+'개월'}}},scales:{y:{beginAtZero:true,grid:gridOpt,border:{display:false}},x:{grid:{display:false}}}}});
  };
  $('#ex',el).value = defEx[src];
  $$('.opt',el).forEach(b=>b.onclick=()=>{ src=b.dataset.s; $('#ex',el).value=defEx[src]; run(); });
  $('#ex',el).oninput=run; run();
},
/* ---------- 6. 스노우볼 ---------- */
sortGame(el){
  const base=[{n:'자동차 할부',b:9800000,r:5.9},{n:'신용카드 A',b:1200000,r:19.9},{n:'학자금 대출',b:14500000,r:1.7},{n:'마이너스통장',b:3500000,r:8.5},{n:'신용카드 B',b:450000,r:16.5}];
  let mode='snowball', list=[...base].sort(()=>Math.random()-.5);
  const draw=()=>{
    el.innerHTML=`<div class="row"><div class="opts"><button class="opt ${mode==='snowball'?'sel':''}" data-m="snowball">⛄ 스노우볼 순서</button><button class="opt ${mode==='avalanche'?'sel':''}" data-m="avalanche">🏔️ 애벌랜치 순서</button></div><span class="small muted">↑↓ 버튼으로 공격 순서(1번=가장 먼저)를 맞춰 보세요</span></div>
    <ol class="sortlist" style="margin-top:10px">${list.map((x,i)=>`<li><span class="step-badge">${i+1}</span><b>${x.n}</b><span class="small muted">잔액 ${fmt(x.b,'KRW')} · 이자 ${x.r}%</span><span class="mv"><button class="btn ghost sm" data-u="${i}">↑</button><button class="btn ghost sm" data-d="${i}">↓</button></span></li>`).join('')}</ol>
    <div class="row"><button class="btn y sm" id="chk">정답 확인</button><button class="btn ghost sm" id="shuf">다시 섞기</button><span id="msg"></span></div>`;
    $$('[data-m]',el).forEach(b=>b.onclick=()=>{ mode=b.dataset.m; draw(); });
    $$('[data-u]',el).forEach(b=>b.onclick=()=>{ const i=+b.dataset.u; if(i>0){ [list[i-1],list[i]]=[list[i],list[i-1]]; draw(); } });
    $$('[data-d]',el).forEach(b=>b.onclick=()=>{ const i=+b.dataset.d; if(i<list.length-1){ [list[i+1],list[i]]=[list[i],list[i+1]]; draw(); } });
    $('#shuf',el).onclick=()=>{ list.sort(()=>Math.random()-.5); draw(); };
    $('#chk',el).onclick=()=>{ const right=[...list].sort(mode==='snowball'?(a,b)=>a.b-b.b:(a,b)=>b.r-a.r); const ok=right.every((x,i)=>x===list[i]);
      $('#msg',el).innerHTML= ok?'<b style="color:var(--good)">🎉 정답! '+(mode==='snowball'?'가장 작은 잔액부터':'가장 높은 이자율부터')+' 공격합니다.</b>':'<b style="color:var(--bad)">다시 해보세요 — '+(mode==='snowball'?'이자율은 무시하고 잔액만 보세요.':'잔액은 무시하고 이자율만 보세요.')+'</b>'; };
  };
  draw();
},
sara(el){
  const plan=[['1–2개월','신용카드',295,2],['3–13개월','개인대출',380,13],['14–25개월','자동차 대출',550,25],['26–37개월','학자금 대출',830,37]];
  el.innerHTML=`<div class="grid2"><div class="card" style="background:var(--yellow-soft);box-shadow:none"><div class="row"><span style="font-size:2.4rem">👩🏻</span><div><b style="font-size:1.1rem">사라(Sara)를 만나보세요</b><div class="small">세후 월 소득 <b>$3,700</b> · 예산을 짜고 나니 매달 <b>$780</b>를 빚 상환에 쓸 수 있어요.</div></div></div></div>
   <div class="tbl-wrap"><table class="t"><thead><tr><th>부채</th><th class="num">총 잔액</th><th class="num">이자율</th><th class="num">최소</th></tr></thead><tbody>${SARA.map(s=>`<tr><td>${s.name}</td><td class="num">${usd(s.balance)}</td><td class="num">${s.apr}%</td><td class="num">${usd(s.min)}</td></tr>`).join('')}</tbody></table></div></div>
   <h4 style="margin-top:16px">사라의 스노우볼은 이렇게 굴러갑니다</h4>
   <p class="small"><b>1–2개월:</b> 모든 빚의 최소상환 + 남는 <b>$295</b>를 신용카드에 집중 → <b>3개월차:</b> 신용카드 완납! 스노우볼이 개인대출로 굴러갑니다. 새 스노우볼 = $295 + $85 = <b>$380/월</b></p>
   <div class="tbl-wrap"><table class="t"><thead><tr><th>기간</th><th>목표 부채</th><th class="num">월 집중 상환액</th><th>완납 시점</th></tr></thead><tbody>${plan.map(p=>`<tr><td>${p[0]}</td><td>${p[1]}</td><td class="num"><b>${usd(p[2])}</b></td><td>${p[3]}개월 차 ✅</td></tr>`).join('')}</tbody></table></div>
   <div style="height:230px;margin-top:14px"><canvas id="g1"></canvas></div>
   <div class="legend"><span><i style="background:#d9dee6"></i>최소상환만 하는 구간</span><span><i style="background:${SERIES[1]}"></i>스노우볼 집중 공격 구간</span></div>
   <p class="small muted">※ 교재 표는 이자를 단순화한 예시입니다. 실제 이자를 반영한 계산은 5장 시뮬레이터에서 ‘사라의 예시’로 확인해 보세요.</p>`;
  const starts=[0,2,13,25];
  chart($('#g1',el),{type:'bar',data:{labels:plan.map(p=>p[1]+' ('+usd(p[2])+')'),datasets:[
    {label:'최소상환 구간',data:plan.map((p,i)=>[0,starts[i]]),backgroundColor:'#d9dee6',borderRadius:4,grouped:false,barThickness:22},
    {label:'집중 공격',data:plan.map((p,i)=>[starts[i],p[3]]),backgroundColor:SERIES[1],borderRadius:4,grouped:false,barThickness:22}]},
    options:{indexAxis:'y',plugins:{legend:{display:false},title:{display:true,text:'사라의 부채 타임라인 (개월) — 눈덩이가 커질수록 기간이 비슷하게 유지됩니다'},tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw[0]+'~'+c.raw[1]+'개월'}}},scales:{x:{min:0,max:38,grid:gridOpt,border:{display:false},title:{display:true,text:'개월'}},y:{grid:{display:false}}}}});
},
/* ---------- 7. 비상금 ---------- */
efFinder(el){
  const st=store.get('t_ef',{goal:1000000,items:[0,0,0,0,0,0]});
  const ideas=['📺 안 쓰는 구독·멤버십 해지','👕 안 쓰는 물건·옷 중고 판매','🍱 이번 달 배달·외식 줄이기','🧾 포인트·캐시백·환급금 현금화','🛒 무지출 주간 챌린지','💼 단기 부업·추가 근무'];
  el.innerHTML=`<p><b>Action Prompt:</b> 지금 바로 해지할 수 있는 구독이나 멤버십이 있나요? 팔 수 있는 물건은? 이번 달 배달·외식을 줄일 수 있나요? 계획을 적는 순간 힘이 생깁니다.</p>
  <div class="grid2"><div><label>나의 스타터 비상금 목표 (원)</label><input id="goal" type="number" value="${st.goal}" style="margin:4px 0 12px">
   ${ideas.map((t,i)=>`<div class="row" style="margin:6px 0"><span style="flex:1">${t}</span><input type="number" data-i="${i}" value="${st.items[i]||''}" placeholder="0" style="width:140px;text-align:right"></div>`).join('')}
   <button class="btn t sm" id="toDash" style="margin-top:8px">대시보드 비상금 목표로 저장</button></div>
   <div><div style="height:240px;position:relative"><canvas></canvas><div id="mid" style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none"></div></div><div id="msg" class="small" style="text-align:center;margin-top:6px"></div></div></div>`;
  const run=()=>{ st.goal=+$('#goal',el).value||0; $$('[data-i]',el).forEach(i=>st.items[i.dataset.i]=+i.value||0); store.set('t_ef',st);
    const sum=st.items.reduce((a,b)=>a+b,0), pct=st.goal?Math.min(100,sum/st.goal*100):0;
    $('#mid',el).innerHTML=`<div><div class="bigstat">${Math.round(pct)}%</div><div class="small">${fmt(sum,'KRW')} / ${fmt(st.goal,'KRW')}</div></div>`;
    $('#msg',el).innerHTML= pct>=100?'🎉 스타터 비상금 확보 계획 완성! 이제 빚을 공격할 준비가 됐습니다.':`목표까지 ${fmt(Math.max(0,st.goal-sum),'KRW')} 남았어요`;
    chart($('canvas',el),{type:'doughnut',data:{labels:[...ideas.map(t=>t.slice(2)),'남은 금액'],datasets:[{data:[...st.items,Math.max(0,st.goal-sum)],backgroundColor:[...SERIES.slice(0,6),'#ece6da'],borderColor:'#fff',borderWidth:2}]},options:{cutout:'70%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.label+': '+fmt(c.raw,'KRW')}}}}});
  };
  $$('input',el).forEach(i=>i.oninput=run);
  $('#toDash',el).onclick=()=>{ const d=getData(); d.ef.goal=st.goal; setData(d); toast('대시보드 비상금 목표가 저장되었습니다'); };
  run();
},
/* ---------- 8. 셀프 이미지 ---------- */
becoming(el){
  const base=['나는 자신 있게 돈을 결정하는 사람이 되어가고 있다','나는 죄책감 없이 저축하고, 목적 있게 쓰는 사람이 되어가고 있다','나는 꾸준하고, 차분하며, 통제할 줄 아는 사람이 되어가고 있다','나는 한 번에 하나의 강력한 선택으로 빚에서 자유로워지고 있다'];
  const st=store.get('t_becoming',{mine:[]});
  const draw=()=>{ el.innerHTML=`<p class="small muted">아래 확언을 소리 내어 반복하고, 나만의 버전을 써 보세요.</p><ul class="clean">${base.map(b=>`<li>${b}</li>`).join('')}</ul>
    <div class="row" style="margin-top:8px"><span style="font-weight:800">나는</span><input id="bi" placeholder="예: 매달 데빗 데이트를 지키는" style="flex:1"><span style="font-weight:800">사람이 되어가고 있다</span><button class="btn sm" id="ba">추가</button></div>
    <div class="notes" style="margin-top:12px">${st.mine.map((m,i)=>`<div class="note">나는 <b style="display:inline;font-size:1rem;color:var(--ink)">${esc(m)}</b> 사람이 되어가고 있다 <button class="btn ghost sm" data-x="${i}" style="padding:0 6px">✕</button></div>`).join('')}</div>`;
    $('#ba',el).onclick=()=>{ const v=$('#bi',el).value.trim(); if(!v) return; st.mine.push(v); store.set('t_becoming',st); draw(); };
    $$('[data-x]',el).forEach(b=>b.onclick=()=>{ st.mine.splice(+b.dataset.x,1); store.set('t_becoming',st); draw(); }); };
  draw();
},
reframe(el){
  const st=store.get('t_reframe',[{o:'나는 돈 관리에 최악이야',n:'나는 돈 관리를 배우는 중이고, 매달 나아지고 있어'},{o:'나는 절대 앞서 나갈 수 없어',n:'작은 승리가 쌓여 나는 매달 앞으로 가고 있어'}]);
  const draw=()=>{ el.innerHTML=`<p>2분만 성찰해 보세요. 내가 나에게 반복해 온 ‘돈 꼬리표’는 무엇인가요? 그 목소리는 어디서 왔고, 정말 내 것인가요? 대신 무엇을 듣고 믿고 싶나요?</p>
    <div class="tbl-wrap"><table class="t"><thead><tr><th>😞 내가 붙여 온 꼬리표</th><th></th><th>💪 새롭게 바꾼 문장</th><th></th></tr></thead><tbody>${st.map((r,i)=>`<tr><td><input data-i="${i}" data-k="o" value="${esc(r.o)}"></td><td>→</td><td><input data-i="${i}" data-k="n" value="${esc(r.n)}"></td><td><button class="btn ghost sm" data-x="${i}">✕</button></td></tr>`).join('')}</tbody></table></div><button class="btn sm" id="ra" style="margin-top:8px">＋ 줄 추가</button>`;
    $$('input',el).forEach(i=>i.oninput=()=>{ st[i.dataset.i][i.dataset.k]=i.value; store.set('t_reframe',st); });
    $$('[data-x]',el).forEach(b=>b.onclick=()=>{ st.splice(+b.dataset.x,1); store.set('t_reframe',st); draw(); });
    $('#ra',el).onclick=()=>{ st.push({o:'',n:''}); store.set('t_reframe',st); draw(); }; };
  draw();
},
confidence(el){
  const habits=['7일간 모든 지출 기록하기','충동구매에 “아니오” 한 번 말하기','겁먹지 않고 계좌 잔액 확인하기','매일 돈 관련 성공 3가지 적기','5분 “부(富)의 의식” 만들기 (음악 + 계획)','거울 앞에서 “나는 되어가고 있다” 소리 내어 말하기'];
  el.innerHTML=`<p class="small muted">이번 주에 실천할 습관 <b>3개</b>를 고르고, 하루하루 체크하세요.</p><div class="cl"></div><div id="wk" style="margin-top:12px"></div>`;
  const days=['월','화','수','목','금','토','일'];
  const drawWeek=st=>{ const chosen=habits.map((h,i)=>[h,i]).filter(x=>st[x[1]]); const w=store.get('t_confweek',{});
    $('#wk',el).innerHTML = chosen.length?`<div class="tbl-wrap"><table class="t"><thead><tr><th>습관</th>${days.map(d=>`<th style="text-align:center">${d}</th>`).join('')}</tr></thead><tbody>${chosen.map(([h,i])=>`<tr><td class="small">${h}</td>${days.map((d,j)=>`<td style="text-align:center"><input type="checkbox" data-k="${i}-${j}" ${w[i+'-'+j]?'checked':''} style="width:18px;height:18px;accent-color:var(--teal)"></td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
    $$('[data-k]',el).forEach(c=>c.onchange=()=>{ w[c.dataset.k]=c.checked; store.set('t_confweek',w); }); };
  const st=checklist($('.cl',el),'confidence',habits,{max:3,progress:false,onchange:drawWeek}); drawWeek(st);
},
/* ---------- 9. 자동화 ---------- */
labelMaker(el){
  el.innerHTML=`<div class="grid2"><div><label>금융기관/대출명</label><input id="lb" placeholder="예: ○○카드, △△은행 신용대출" style="margin:4px 0 8px"><label>추가 상환 금액</label><input id="la" type="number" placeholder="예: 300000" style="margin:4px 0 8px"><label>요청 방식</label><select id="lm" style="margin-top:4px"><option>앱·인터넷뱅킹 메모</option><option>고객센터 요청 문구</option><option>English (해외 대출)</option></select></div>
   <div><div class="card" style="box-shadow:none;background:var(--yellow-soft)"><div class="kicker">라벨 문구</div><p id="lout" style="font-weight:700;font-size:1.05rem;white-space:pre-line"></p><button class="btn sm" id="lc">📋 복사</button></div></div></div>`;
  const run=()=>{ const b=$('#lb',el).value||'○○', a=+$('#la',el).value||0, m=$('#lm',el).value;
    $('#lout',el).textContent = m.startsWith('English') ? `Extra payment toward principal only.\nPlease apply ${a?'$'+a.toLocaleString():'this amount'} to reduce the principal balance of my ${b} account, not to prepay next month's bill.`
      : m.startsWith('고객') ? `안녕하세요, ${b} 상환 관련 요청드립니다. 이번에 납입하는 ${a?fmt(a,'KRW'):'추가 금액'}은 다음 달 청구금 선납이 아니라 ‘원금 상환용 추가 납입(중도상환)’으로 처리해 잔액을 줄여 주시기 바랍니다.`
      : `[원금 상환용 추가 납입] ${b} ${a?fmt(a,'KRW'):''} — 선납 아님, 원금 차감 요청`; };
  $$('input,select',el).forEach(i=>i.oninput=run); run();
  $('#lc',el).onclick=()=>{ navigator.clipboard?.writeText($('#lout',el).textContent).then(()=>toast('복사되었습니다')); };
},
dateSync(el){
  const draw=()=>{ const d=getData(); const now=new Date(), y=now.getFullYear(), mo=now.getMonth(); const first=new Date(y,mo,1).getDay(), last=new Date(y,mo+1,0).getDate();
    const debts=d.debts.length?d.debts:SARA.map((s,i)=>({...s,due:[15,1,10,25][i]}));
    let cells=['일','월','화','수','목','금','토'].map(x=>`<div class="h">${x}</div>`).join('');
    for(let i=0;i<first;i++) cells+='<div style="background:transparent;border:0"></div>';
    for(let day=1;day<=last;day++){ const due=debts.map((x,i)=>[x,i]).filter(([x])=>Math.min(+x.due||0,last)===day);
      cells+=`<div class="${day===now.getDate()?'today':''}"><span class="d">${day}</span>${due.map(([x,i])=>`<span class="dot" style="background:${SERIES[i%8]}">${esc(x.name)}</span>`).join('')}</div>`; }
    const uniq=new Set(debts.map(x=>+x.due||0)).size;
    el.innerHTML=`${d.debts.length?'':'<p class="small muted">아직 입력한 부채가 없어 사라의 예시로 보여 드립니다. 4장에서 내 부채를 입력하면 내 달력이 됩니다.</p>'}
    <div class="row"><b>${y}년 ${mo+1}월</b><span class="pill ${uniq<=1?'math':'mind'}">결제일 ${uniq}개 날짜에 흩어짐</span><span style="margin-left:auto" class="small">모든 결제일을</span><select id="sd" style="width:auto"><option value="">선택</option><option>1</option><option>5</option><option>10</option><option>15</option><option>25</option></select><span class="small">일로</span><button class="btn sm" id="sync" ${d.debts.length?'':'disabled'}>맞추기</button></div>
    <div class="cal" style="margin-top:10px">${cells}</div>`;
    $('#sync',el).onclick=()=>{ const v=+$('#sd',el).value; if(!v) return toast('날짜를 선택하세요'); const dd=getData(); dd.debts.forEach(x=>x.due=v); setData(dd); toast(`모든 결제일을 매월 ${v}일로 맞췄습니다 (실제 변경은 각 금융기관에 요청)`); draw(); };
  };
  draw();
},
/* ---------- 10. 재배분 ---------- */
rollStepper(el){
  const steps=[{n:'신용카드',ic:'💳',pay:295,txt:'최소 $85 + 여유 $210 → 집중 공격'},{n:'개인대출',ic:'🧾',pay:380,txt:'신용카드 완납 → $85 해방 → $295+$85'},{n:'자동차 대출',ic:'🚗',pay:550,txt:'개인대출 완납 → $380+$150 (+여유) 굴리기'},{n:'학자금 대출',ic:'🎓',pay:830,txt:'자동차 완납 → $550+$200 (+여유) 굴리기'}];
  let k=0;
  const draw=()=>{ el.innerHTML=`<div class="row" style="justify-content:space-around;align-items:flex-end;gap:6px;min-height:200px">${steps.map((s,i)=>{ const size=60+s.pay/830*90; const st=i<k?'done':i===k?'now':'wait'; return `<div style="text-align:center;flex:1;opacity:${st==='wait'?.35:1}"><div style="width:${size}px;height:${size}px;border-radius:50%;margin:0 auto;display:grid;place-items:center;font-size:${size/2.6}px;background:${st==='done'?'#d9dee6':st==='now'?SERIES[1]:'#e8edf5'};transition:all .4s;box-shadow:${st==='now'?'0 0 0 6px rgba(235,104,52,.18)':'none'}">${st==='done'?'✅':s.ic}</div><b style="display:block;margin-top:6px">${s.n}</b><span class="small">${st==='done'?'완납!':usd(s.pay)+'/월'}</span></div>${i<steps.length-1?'':''}`; }).join('<div style="font-size:1.6rem;color:var(--muted);align-self:center">→</div>')}</div>
    <div class="callout" style="margin-top:12px">${k<steps.length?`<b>지금 공격 중: ${steps[k].n} — 월 ${usd(steps[k].pay)}</b><br><span class="small">${steps[k].txt}</span>`:'<b>🎉 DEBT-FREE! 같은 $780 예산으로 모든 빚을 끝냈습니다.</b>'}</div>
    <div class="row" style="margin-top:10px"><button class="btn c sm" id="nx" ${k>=steps.length?'disabled':''}>${k<steps.length?steps[k].n+' 완납 → 굴리기 ▶':'완료'}</button><button class="btn ghost sm" id="rs">처음으로</button></div>`;
    $('#nx',el).onclick=()=>{ k++; draw(); }; $('#rs',el).onclick=()=>{ k=0; draw(); }; };
  draw();
},
shiftTable(el){
  const rows=[['1–3','$780','최소상환 $495 + 신용카드에 $295','신용카드 완납'],['4–13','$780','최소상환 $485 + 개인대출 집중(굴린 금액 포함)','개인대출 완납'],['14–24','$780','자동차 대출에 $435 (개인대출에서 $180 포함)','자동차 대출 완납'],['25–35','$780','학자금 대출에 $685 (자동차에서 $230 포함)','학자금 대출 완납 ✓']];
  el.innerHTML=`<div class="tbl-wrap"><table class="t"><thead><tr><th>개월</th><th class="num">월 총 상환</th><th>상환 구성</th><th>부채 상태</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td class="num"><b>${r[1]}</b></td><td class="small">${r[2]}</td><td><span class="pill math">${r[3]}</span></td></tr>`).join('')}</tbody></table></div>
  <p class="small muted" style="margin-top:6px">교재의 표(이자 단순화). 아래는 사라의 빚에 <b>실제 이자를 반영</b>해 매달 $780가 어떻게 나뉘는지 계산한 차트입니다 — 월 총액은 그대로인데, 색이 오른쪽으로 갈수록 한 빚에 몰리는 것이 ‘재배분’입니다.</p>
  <div style="height:300px"><canvas></canvas></div><div class="legend">${SARA.map((s,i)=>`<span><i style="background:${SERIES[i]}"></i>${s.name}</span>`).join('')}</div>`;
  const S=simulate(SARA,95,'snowball'); const R=S.rows.slice(1);
  chart($('canvas',el),{type:'bar',data:{labels:R.map(r=>r.m+''),datasets:SARA.map((s,i)=>({label:s.name,data:R.map(r=>Math.round(r.pay[s.id]||0)),backgroundColor:SERIES[i],borderColor:'#fff',borderWidth:{top:1},stack:'a'}))},
    options:{interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},title:{display:true,text:`매달 $780 상환 구성 (실제 이자 반영 · ${S.months}개월 만에 완납)`},tooltip:{callbacks:{title:c=>c[0].label+'개월 차',label:c=>c.raw?c.dataset.label+': '+usd(c.raw):null}}},scales:{x:{stacked:true,grid:{display:false},ticks:{maxTicksLimit:14},title:{display:true,text:'개월'}},y:{stacked:true,grid:gridOpt,border:{display:false},ticks:{callback:v=>'$'+v}}}}});
},
/* ---------- 11. 동기 ---------- */
sticky(el){
  const base=['빚 = 스트레스\n자유 = 숙면','1만 원 = 한 걸음 더 가까이','미래의 나는 나를 자랑스러워할 거야','이 빚에게 내 기쁨을 빚지지 않는다'];
  const places=['욕실 거울','체크/신용카드','냉장고','지갑 안','업무 책상'];
  const st=store.get('t_sticky',[]);
  const draw=()=>{ el.innerHTML=`<p>매일 보는 작은 코치들을 곳곳에 붙이세요: ${places.join(' · ')}</p>
   <div class="notes">${base.map(b=>`<div class="note" style="white-space:pre-line;transform:rotate(${Math.random()*4-2}deg)">${esc(b)}<b>교재 예시</b></div>`).join('')}${st.map((s,i)=>`<div class="note" style="white-space:pre-line">${esc(s.t)}<b>📍 ${esc(s.p)} <a href="#" data-x="${i}">삭제</a></b></div>`).join('')}</div>
   <div class="row" style="margin-top:12px"><input id="st" placeholder="나만의 포스트잇 문구" style="flex:1"><select id="sp" style="width:auto">${places.map(p=>`<option>${p}</option>`).join('')}</select><button class="btn sm" id="sa">붙이기</button><button class="btn ghost sm" id="spr">🖨️ 인쇄</button></div>`;
   $('#sa',el).onclick=()=>{ const t=$('#st',el).value.trim(); if(!t) return; st.push({t,p:$('#sp',el).value}); store.set('t_sticky',st); draw(); };
   $$('[data-x]',el).forEach(a=>a.onclick=e=>{ e.preventDefault(); st.splice(+a.dataset.x,1); store.set('t_sticky',st); draw(); });
   $('#spr',el).onclick=()=>{ el.closest('.card').classList.add('printme'); window.print(); setTimeout(()=>el.closest('.card').classList.remove('printme'),500); }; };
  draw();
},
wallpaper(el){
  const themes={navy:['#1d3557','#f6c443','#ffffff'],coral:['#e2523b','#fff4d1','#ffffff'],teal:['#2f6f73','#f6c443','#ffffff'],cream:['#fbf6ee','#1d3557','#e2523b']};
  const st=store.get('t_wall',{date:'',big:'D-DAY 2028.07',quote:'모든 1원이 나의 자유를 짓고 있다.',theme:'navy'});
  el.innerHTML=`<div class="grid2"><div><p class="small">교재 팁: 꿈의 집이나 여행지 사진 같은 이미지, 큰 숫자(목표 상환일), 힘이 되는 문구를 담은 배경화면을 만드세요.</p>
   <label>큰 숫자 / 목표일</label><input id="wb" value="${esc(st.big)}" style="margin:4px 0 8px"><label>문구</label><input id="wq" value="${esc(st.quote)}" style="margin:4px 0 8px">
   <label>테마</label><div class="opts" style="margin:6px 0 10px">${Object.keys(themes).map(t=>`<button class="opt ${st.theme===t?'sel':''}" data-t="${t}" style="background:${themes[t][0]};color:${themes[t][1]}">${t}</button>`).join('')}</div>
   <label>배경 사진 (선택)</label><input id="wi" type="file" accept="image/*" style="margin:4px 0 10px"><button class="btn y" id="wd">⬇️ 배경화면 PNG 다운로드</button></div>
   <div style="text-align:center"><canvas width="1080" height="1920" style="width:220px;height:391px;border-radius:26px;box-shadow:0 10px 30px rgba(0,0,0,.25)"></canvas></div></div>`;
  const cv=$('canvas',el), ctx=cv.getContext('2d'); let img=null;
  const wrap=(t,x,y,max,lh)=>{ let line='',lines=[]; for(const ch of t){ if(ctx.measureText(line+ch).width>max){ lines.push(line); line=ch; } else line+=ch; } lines.push(line); lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lh)); };
  const draw=()=>{ st.big=$('#wb',el).value; st.quote=$('#wq',el).value; store.set('t_wall',st); const [bg,ac,tx]=themes[st.theme];
    ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1920);
    if(img){ const r=Math.max(1080/img.width,1920/img.height); ctx.globalAlpha=.55; ctx.drawImage(img,(1080-img.width*r)/2,(1920-img.height*r)/2,img.width*r,img.height*r); ctx.globalAlpha=1; ctx.fillStyle='rgba(0,0,0,.25)'; ctx.fillRect(0,0,1080,1920); }
    ctx.textAlign='center'; ctx.fillStyle=ac; ctx.font='800 54px Pretendard, sans-serif'; ctx.fillText('ZERO MOMENTUM',540,560);
    ctx.font='400 150px "Black Han Sans", sans-serif'; wrap(st.big,540,800,960,170);
    ctx.fillStyle=img?'#fff':tx===bg?'#1d3557':tx; if(st.theme==='cream') ctx.fillStyle='#1d3557';
    ctx.font='700 62px Pretendard, sans-serif'; wrap('“'+st.quote+'”',540,1180,900,86);
    ctx.font='600 40px Pretendard, sans-serif'; ctx.globalAlpha=.7; ctx.fillText('Debt-free. Drama-free. Focused.',540,1700); ctx.globalAlpha=1; };
  $$('#wb,#wq',el).forEach(i=>i.oninput=draw);
  $$('[data-t]',el).forEach(b=>b.onclick=()=>{ st.theme=b.dataset.t; $$('[data-t]',el).forEach(x=>x.classList.toggle('sel',x===b)); draw(); });
  $('#wi',el).onchange=e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ img=new Image(); img.onload=draw; img.src=r.result; }; r.readAsDataURL(f); };
  $('#wd',el).onclick=()=>{ const a=document.createElement('a'); a.download='zero-momentum-wallpaper.png'; a.href=cv.toDataURL('image/png'); a.click(); };
  (document.fonts?document.fonts.ready:Promise.resolve()).then(draw); draw();
},
morning(el){
  const acts=[['월','지출 추적하기'],['화','비상금에 5천 원 더하기'],['수','빚 해방 팟캐스트 듣기'],['목','자유로워진 나를 상상하기'],['금','무지출 데이 도전'],['토','주간 데빗 데이트 (잔액 점검)'],['일','다음 주 밀프렙 & 계획']];
  const wk=(()=>{ const d=new Date(); d.setDate(d.getDate()-((d.getDay()+6)%7)); return d.toISOString().slice(0,10); })();
  const all=store.get('t_morning',{}); const st=all[wk]||{};
  el.innerHTML=`<p class="small muted">매주 반복하세요. 하루 60초면 됩니다. (이번 주: ${wk} 시작)</p><div class="tbl-wrap"><table class="t"><thead><tr><th>요일</th><th>행동</th><th style="text-align:center">완료?</th><th>메모</th></tr></thead><tbody>${acts.map((a,i)=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td style="text-align:center"><input type="checkbox" data-i="${i}" ${st['d'+i]?'checked':''} style="width:20px;height:20px;accent-color:var(--teal)"></td><td><input data-n="${i}" value="${esc(st['n'+i]||'')}" placeholder="메모"></td></tr>`).join('')}</tbody></table></div><div class="row" style="margin-top:10px"><div class="progressbar" style="flex:1"><i></i></div><b class="pc"></b></div>`;
  const upd=()=>{ const n=acts.filter((_,i)=>st['d'+i]).length; $('.progressbar i',el).style.width=(n/7*100)+'%'; $('.pc',el).textContent=`${n}/7 ${n===7?'🔥 완벽한 한 주!':''}`; all[wk]=st; store.set('t_morning',all); };
  $$('[data-i]',el).forEach(c=>c.onchange=()=>{ st['d'+c.dataset.i]=c.checked; upd(); });
  $$('[data-n]',el).forEach(c=>c.oninput=()=>{ st['n'+c.dataset.n]=c.value; upd(); });
  upd();
},
/* ---------- 12. 라이프스타일 ---------- */
swap(el){
  const rows=[['🥡 배달 주 3회','🥗 일요일 밀프렙',120000],['🛍️ 스트레스 쇼핑','📦 정리 & 중고판매 챌린지',100000],['📺 OTT·구독 과다','📚 도서관 + 저널 나이트',30000],['🥂 친구들과 브런치','🧺 포틀럭 & 피크닉 데이',60000]];
  const st=store.get('t_swap',{on:{},amt:rows.map(r=>r[2]),custom:[]});
  const draw=()=>{ const all=[...rows.map((r,i)=>({a:r[0],b:r[1],v:st.amt[i],k:'r'+i})),...st.custom.map((c,i)=>({a:c.a,b:c.b,v:c.v,k:'c'+i}))];
    const tot=all.filter(x=>st.on[x.k]).reduce((s,x)=>s+(+x.v||0),0);
    el.innerHTML=`<div class="tbl-wrap"><table class="t"><thead><tr><th></th><th>대신에… (Instead of)</th><th>이렇게 (Try this)</th><th class="num">월 절약액(원)</th></tr></thead><tbody>${all.map(x=>`<tr><td><input type="checkbox" data-k="${x.k}" ${st.on[x.k]?'checked':''} style="width:18px;height:18px;accent-color:var(--teal)"></td><td>${esc(x.a)}</td><td>${esc(x.b)}</td><td><input type="number" data-v="${x.k}" value="${x.v}" style="text-align:right;width:130px"></td></tr>`).join('')}</tbody></table></div>
    <div class="row" style="margin-top:8px"><input id="ca" placeholder="대신에 (예: 편의점 커피)" style="flex:1"><input id="cb" placeholder="이렇게 (예: 집에서 텀블러)" style="flex:1"><input id="cv" type="number" placeholder="월 절약액" style="width:130px"><button class="btn sm" id="cadd">추가</button></div>
    <div class="grid3" style="margin-top:14px"><div class="kpi"><div class="lbl">월 절약</div><div class="val">${fmt(tot,'KRW')}</div></div><div class="kpi"><div class="lbl">1년이면</div><div class="val">${fmt(tot*12,'KRW')}</div></div><div class="kpi accent"><div class="lbl">스노우볼에 더하면</div><div class="val">+${fmt(tot,'KRW')}/월</div><div class="sub">추가 상환액으로 대시보드에 반영 가능</div></div></div>
    <div style="height:${Math.max(160,all.length*40)}px;margin-top:12px"><canvas></canvas></div><button class="btn t sm" id="toExtra" style="margin-top:8px">대시보드 ‘추가 상환액’에 더하기</button>`;
    $$('[data-k]',el).forEach(c=>c.onchange=()=>{ st.on[c.dataset.k]=c.checked; store.set('t_swap',st); draw(); });
    $$('[data-v]',el).forEach(c=>c.onchange=()=>{ const k=c.dataset.v; if(k[0]==='r') st.amt[+k.slice(1)]=+c.value; else st.custom[+k.slice(1)].v=+c.value; store.set('t_swap',st); draw(); });
    $('#cadd',el).onclick=()=>{ const a=$('#ca',el).value.trim(),b=$('#cb',el).value.trim(),v=+$('#cv',el).value||0; if(!a) return; st.custom.push({a,b,v}); st.on['c'+(st.custom.length-1)]=true; store.set('t_swap',st); draw(); };
    $('#toExtra',el).onclick=()=>{ const d=getData(); d.extra=(+d.extra||0)+tot; setData(d); toast(`추가 상환액에 ${fmt(tot,'KRW')}를 더했습니다`); };
    chart($('canvas',el),{type:'bar',data:{labels:all.map(x=>x.b.replace(/^\S+\s/,'')),datasets:[{label:'연간 절약',data:all.map(x=>(+x.v||0)*12),backgroundColor:all.map(x=>st.on[x.k]?SERIES[2]:'#d9dee6'),borderRadius:4,barThickness:20}]},options:{indexAxis:'y',plugins:{legend:{display:false},title:{display:true,text:'스왑별 1년 절약액 (선택한 항목은 초록)'},tooltip:{callbacks:{label:c=>fmt(c.raw,'KRW')+' / 년'}}},scales:{x:{grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,'KRW')}},y:{grid:{display:false}}}}});
  };
  draw();
},
joy(el){
  const base=['부엌에서 춤추기','게임의 밤 열기','꿈을 일기에 쓰기','자연 속 산책','무지출 챌린지 시작','오랜 친구에게 전화하기','무료 앱으로 새 기술 배우기'];
  const st=store.get('t_joyc',[]);
  el.innerHTML=`<div class="cl"></div><div class="row" style="margin-top:8px"><input id="ji" placeholder="나만의 돈 안 드는 기쁨 추가" style="flex:1"><button class="btn sm" id="ja">추가</button></div>`;
  const items=[...base,...st];
  checklist($('.cl',el),'joy',items,{progress:false});
  $('#ja',el).onclick=()=>{ const v=$('#ji',el).value.trim(); if(!v) return; st.push(v); store.set('t_joyc',st); TOOLS.joy(el); };
},
/* ---------- 13. 계산기 ---------- */
payoffCalc(el){
  el.innerHTML=`<div class="grid4"><div><label>대출 잔액</label><input id="pb" type="number" value="5000000"></div><div><label>연 이자율(%)</label><input id="pr" type="number" step="0.1" value="15"></div><div><label>월 상환액</label><input id="pm" type="number" value="200000"></div><div><label>월 추가 상환</label><input id="pe" type="number" value="100000"></div></div>
  <div class="grid4" id="pk" style="margin-top:14px"></div><div style="height:280px;margin-top:12px"><canvas></canvas></div><div class="legend"><span><i style="background:#9aa3b2"></i>기본 상환만</span><span><i style="background:${SERIES[2]}"></i>추가 상환 포함</span></div>`;
  const sim=(b,r,p)=>{ const pts=[b]; let i=0,m=0; while(b>0.5&&m<600){ const it=b*r/1200; if(p<=it) return {stuck:true,pts,i,m}; b+=it; i+=it; b-=Math.min(p,b); pts.push(b); m++; } return {pts,i,m}; };
  const run=()=>{ const b=+$('#pb',el).value,r=+$('#pr',el).value,p=+$('#pm',el).value,e=+$('#pe',el).value;
    const A=sim(b,r,p),B=sim(b,r,p+e); const ok=x=>x.stuck?'상환 불가':x.m+'개월';
    $('#pk',el).innerHTML=`<div class="kpi"><div class="lbl">기본 상환 기간</div><div class="val">${ok(A)}</div><div class="sub">이자 ${A.stuck?'-':fmt(A.i,'KRW')}</div></div><div class="kpi"><div class="lbl">추가 상환 시 기간</div><div class="val">${ok(B)}</div><div class="sub">이자 ${B.stuck?'-':fmt(B.i,'KRW')}</div></div><div class="kpi"><div class="lbl">단축 기간</div><div class="val">${A.stuck||B.stuck?'-':(A.m-B.m)+'개월'}</div></div><div class="kpi accent"><div class="lbl">이자 절약</div><div class="val">${A.stuck||B.stuck?'-':fmt(A.i-B.i,'KRW')}</div></div>`;
    const n=Math.max(A.pts.length,B.pts.length);
    chart($('canvas',el),{type:'line',data:{labels:Array.from({length:n},(_,i)=>i+''),datasets:[{label:'기본',data:A.pts,borderColor:'#9aa3b2',borderWidth:2,pointRadius:0},{label:'추가 상환',data:B.pts,borderColor:SERIES[2],backgroundColor:'rgba(27,175,122,.12)',fill:true,borderWidth:2,pointRadius:0}]},options:{interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{callbacks:{title:c=>c[0].label+'개월',label:c=>c.dataset.label+': '+fmt(c.raw,'KRW')}}},scales:{y:{beginAtZero:true,grid:gridOpt,border:{display:false},ticks:{callback:v=>fmtShort(v,'KRW')}},x:{grid:{display:false},ticks:{maxTicksLimit:12},title:{display:true,text:'개월'}}}}}); };
  $$('input',el).forEach(i=>i.oninput=run); run();
},
/* ---------- 14. 선언문 ---------- */
declaration(el){
  const st=store.get('t_decl',{want:'',when:'',types:{},other:'',celebrate:'',feel:'',next:'',name:'',date:new Date().toISOString().slice(0,10),sig:''});
  const types=['신용카드','개인(신용)대출','자동차 대출','학자금 대출'];
  el.innerHTML=`<div class="grid2 noprint"><div>
   <label>나는 빚에서 자유로워지기로 결심했다. 왜냐하면 나는…</label><textarea id="dw" rows="2" style="margin:4px 0 10px">${esc(st.want)}</textarea>
   <label>🗓️ 나는 완전히 빚에서 자유로워진다: (년/월)</label><input id="dd" type="month" value="${esc(st.when)}" style="margin:4px 0 8px">
   <div class="row small">${types.map((t,i)=>`<label style="font-weight:500"><input type="checkbox" data-t="${i}" ${st.types[i]?'checked':''} style="width:auto"> ${t}</label>`).join('')}<input id="do" placeholder="기타" value="${esc(st.other)}" style="width:120px"></div>
   <label style="margin-top:8px;display:block">🎉 이렇게 축하할 것이다</label><input id="dc" value="${esc(st.celebrate)}" style="margin:4px 0 8px">
   <label>💛 그때 느낄 감정</label><input id="df" value="${esc(st.feel)}" style="margin:4px 0 8px">
   <label>🌱 시작할 나의 다음 챕터</label><input id="dn" value="${esc(st.next)}" style="margin:4px 0 8px">
   <div class="grid2"><div><label>이름</label><input id="dname" value="${esc(st.name)}"></div><div><label>날짜</label><input id="ddate" type="date" value="${esc(st.date)}"></div></div></div>
   <div><label>✍️ 서명 (마우스/손가락으로)</label><canvas id="sig" width="500" height="160" style="width:100%;height:160px;border:1.5px dashed var(--line);border-radius:12px;background:#fff;touch-action:none;margin-top:4px"></canvas><div class="row" style="margin-top:6px"><button class="btn ghost sm" id="sclr">지우기</button><button class="btn y" id="dprint">🖨️ 선언문 인쇄 / PDF 저장</button></div></div></div>
   <div id="cert" style="margin-top:18px"></div>`;
  const sc=$('#sig',el), sx=sc.getContext('2d'); let drawing=false;
  if(st.sig){ const im=new Image(); im.onload=()=>sx.drawImage(im,0,0); im.src=st.sig; }
  const pos=e=>{ const r=sc.getBoundingClientRect(); return [(e.clientX-r.left)*sc.width/r.width,(e.clientY-r.top)*sc.height/r.height]; };
  sc.onpointerdown=e=>{ drawing=true; sx.beginPath(); sx.moveTo(...pos(e)); sc.setPointerCapture(e.pointerId); };
  sc.onpointermove=e=>{ if(!drawing) return; sx.lineWidth=3; sx.lineCap='round'; sx.strokeStyle='#16202e'; sx.lineTo(...pos(e)); sx.stroke(); };
  sc.onpointerup=()=>{ drawing=false; st.sig=sc.toDataURL(); save(); };
  $('#sclr',el).onclick=()=>{ sx.clearRect(0,0,sc.width,sc.height); st.sig=''; save(); };
  const save=()=>{ st.want=$('#dw',el).value; st.when=$('#dd',el).value; st.other=$('#do',el).value; st.celebrate=$('#dc',el).value; st.feel=$('#df',el).value; st.next=$('#dn',el).value; st.name=$('#dname',el).value; st.date=$('#ddate',el).value; $$('[data-t]',el).forEach(c=>st.types[c.dataset.t]=c.checked); store.set('t_decl',st); cert(); };
  const L=(v,w=220)=>`<span class="line" style="min-width:${w}px">${esc(v)||'&nbsp;'}</span>`;
  const cert=()=>{ const ty=types.filter((_,i)=>st.types[i]); if(st.other) ty.push(st.other); const [yy,mm]=(st.when||'').split('-');
    $('#cert',el).innerHTML=`<div class="cert"><div class="kicker">ZERO MOMENTUM · 다인에듀</div><h2>나의 DEBT-FREE 선언문</h2>
     <p style="font-size:1.05rem">나는 빚에서 자유로워지기로 결심했다. 왜냐하면 나는 ${L(st.want,320)} 원하기 때문이다.</p>
     <p>나는 할 수 있고, 가치 있으며, 내 재정을 통제할 준비가 되어 있다.<br>오늘의 노력이 내일 내가 느낄 자유를 만든다는 것을 안다.</p>
     <p style="font-size:1.15rem">나는 <b>${yy?yy+'년 '+(+mm)+'월':L('',120)}</b>까지 완전히 빚에서 자유로워진다.</p>
     <p>${ty.length?ty.map(t=>'☑ '+esc(t)).join(' &nbsp; '):''}</p>
     <p>🎉 축하: ${L(st.celebrate)} &nbsp; 💛 감정: ${L(st.feel,160)}<br>🌱 나의 다음 챕터: ${L(st.next,300)}</p>
     <div class="row" style="justify-content:center;gap:40px;margin-top:20px"><div>이름<br>${L(st.name,180)}</div><div>서명<br>${st.sig?`<img src="${st.sig}" style="height:60px">`:L('',180)}</div><div>날짜<br>${L(st.date,140)}</div></div></div>`; };
  $$('input,textarea',el).forEach(i=>{ if(i.id!=='sig') i.oninput=i.onchange=save; });
  $('#dprint',el).onclick=()=>{ const c=el.closest('.card'); c.classList.add('printme'); window.print(); setTimeout(()=>c.classList.remove('printme'),500); };
  cert();
},
/* ---------- 15. 체크인 ---------- */
checkin(el){
  const def=[['자동이체 설정 + 모든 지출 추적','근사한 커피 또는 영화의 밤'],['비상금 100만 원(＄1,000) 만들기','예산 친화적인 물건 하나 사기'],['첫 번째 빚 완전히 갚기','홈 스파 나이트 또는 배달 음식'],['월 상환액 10만 원(＄100) 늘리기','위시리스트 적금에 1만 원'],['사치 지출 하나를 30일간 끊기','죄책감 없는 휴식의 날'],['저축률 재계산 & 계획 조정','친구에게 진행 상황 공유하기']];
  const st=store.get('t_checkin',{rows:def.map(r=>({g:r[0],r:r[1],done:false}))});
  const draw=()=>{ const n=st.rows.filter(r=>r.done).length;
    el.innerHTML=`<div class="tbl-wrap"><table class="t"><thead><tr><th>월</th><th>미니 목표</th><th>달성 시 보상</th><th style="text-align:center">달성</th></tr></thead><tbody>${st.rows.map((r,i)=>`<tr><td><b>${i+1}개월</b></td><td><input data-i="${i}" data-k="g" value="${esc(r.g)}"></td><td><input data-i="${i}" data-k="r" value="${esc(r.r)}"></td><td style="text-align:center"><input type="checkbox" data-c="${i}" ${r.done?'checked':''} style="width:20px;height:20px;accent-color:var(--teal)"></td></tr>`).join('')}</tbody></table></div>
    <div class="row" style="margin-top:12px;align-items:center"><div style="flex:1"><div class="progressbar"><i style="width:${n/6*100}%"></i></div></div><b>${n}/6 달성</b></div>
    <div class="callout c small" style="margin-top:10px">💡 <b>Pro Tip:</b> 목표를 이루지 못했더라도 ‘노력’에 보상하세요. 습관을 만드는 중이고, 습관에는 시간과 친절함이 필요합니다.</div>`;
    $$('[data-k]',el).forEach(i=>i.oninput=()=>{ st.rows[i.dataset.i][i.dataset.k]=i.value; store.set('t_checkin',st); });
    $$('[data-c]',el).forEach(c=>c.onchange=()=>{ st.rows[c.dataset.c].done=c.checked; store.set('t_checkin',st); draw(); }); };
  draw();
},
milestone(el){
  const draw=()=>{ const d=getData(); const ms=d.milestones||{}; const cols=['목표 설정','진행 점검','보상 지급'];
    el.innerHTML=`<div class="grid2"><div class="tbl-wrap"><table class="t"><thead><tr><th>월</th>${cols.map(c=>`<th style="text-align:center">☐ ${c}</th>`).join('')}</tr></thead><tbody>${[1,2,3,4,5,6].map(m=>`<tr><td><b>${m}개월</b></td>${cols.map((c,j)=>`<td style="text-align:center"><input type="checkbox" data-k="${m}-${j}" ${ms[m+'-'+j]?'checked':''} style="width:20px;height:20px;accent-color:var(--teal)"></td>`).join('')}</tr>`).join('')}</tbody></table></div><div style="height:240px"><canvas></canvas></div></div><p class="small muted">마일스톤은 나의 부채 대시보드와 연동됩니다.</p>`;
    $$('[data-k]',el).forEach(c=>c.onchange=()=>{ const dd=getData(); dd.milestones=dd.milestones||{}; dd.milestones[c.dataset.k]=c.checked; setData(dd); draw(); });
    chart($('canvas',el),{type:'bar',data:{labels:['1','2','3','4','5','6'].map(x=>x+'개월'),datasets:cols.map((c,j)=>({label:c,data:[1,2,3,4,5,6].map(m=>ms[m+'-'+j]?1:0),backgroundColor:SERIES[j],borderColor:'#fff',borderWidth:{top:2},stack:'s'}))},options:{plugins:{title:{display:true,text:'월별 마일스톤 달성'},legend:{position:'bottom'}},scales:{y:{stacked:true,max:3,ticks:{stepSize:1},grid:gridOpt,border:{display:false}},x:{stacked:true,grid:{display:false}}}}}); };
  draw();
}
};

/* ---------- 페이지 구성 ---------- */
ZM.topbar('lesson');
ZM.initRoomFromURL();
const p=new URLSearchParams(location.search); let no=+(p.get('ch')||0); if(!(no>=0&&no<CHAPTERS.length)) no=0;
const ch=CHAPTERS[no], part=PARTS[ch.part];
document.title=`${ch.no}장 ${ch.title} · ZERO MOMENTUM`;
const done=store.get('done',{});
const main=document.createElement('main');
main.innerHTML=`<div class="lesson-hero"><div class="wrap"><span class="pill ${part.cls}">${part.k}</span> <span class="small" style="opacity:.75">CHAPTER ${String(ch.no).padStart(2,'0')}</span><h1>${ch.title}</h1><div class="en">${ch.en}</div><p>${ch.sum}</p></div></div>
 <div class="wrap lesson-layout"><aside class="side"></aside><div class="content"></div></div>`;
document.body.appendChild(main);
const side=$('.side',main); let lastPart='';
CHAPTERS.forEach(c=>{ if(c.part!==lastPart){ side.insertAdjacentHTML('beforeend',`<div class="grp">${PARTS[c.part].k}</div>`); lastPart=c.part; } side.insertAdjacentHTML('beforeend',`<a href="lesson.html?ch=${c.no}" class="${c.no===no?'on':''}"><span>${c.no}</span>${c.title}${done[c.no]?' ✓':''}</a>`); });
const content=$('.content',main);
ch.blocks.forEach((b,i)=>{
  const card=document.createElement('div'); card.className='card';
  if(b.live){ card.innerHTML=''; card.style.padding='6px'; card.style.background='transparent'; card.style.boxShadow='none'; card.style.border='0'; const box=document.createElement('div'); card.appendChild(box); content.appendChild(card); renderActivity(box,b.live); return; }
  card.innerHTML=`${b.h?`<h3>${b.tool?'🛠️ ':''}${b.h}</h3>`:''}<div class="body">${b.html||''}</div>`;
  content.appendChild(card);
  if(b.tool && TOOLS[b.tool]) TOOLS[b.tool]($('.body',card));
});
const nav=document.createElement('div'); nav.className='row noprint'; nav.style.margin='10px 0 40px';
nav.innerHTML=`${no>0?`<a class="btn ghost" href="lesson.html?ch=${no-1}">← ${no-1}장</a>`:''}<button class="btn ${done[no]?'t':'y'}" id="done">${done[no]?'✓ 학습 완료됨':'이 챕터 완료 표시'}</button>${no<CHAPTERS.length-1?`<a class="btn" style="margin-left:auto" href="lesson.html?ch=${no+1}">${no+1}장: ${CHAPTERS[no+1].title} →</a>`:`<a class="btn" style="margin-left:auto" href="dashboard.html">나의 부채 대시보드 →</a>`}`;
content.appendChild(nav);
$('#done').onclick=()=>{ done[no]=!done[no]; store.set('done',done); $('#done').textContent=done[no]?'✓ 학습 완료됨':'이 챕터 완료 표시'; $('#done').className='btn '+(done[no]?'t':'y'); };
})();
