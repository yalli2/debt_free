/* ZERO MOMENTUM — 챕터 콘텐츠 (교재: Debt-Free Blueprint · Crush Debt Fast on Any Income) */
window.CHAPTERS = [
{ no:0, part:'intro', title:'오리엔테이션: 빚 없는 여정의 시작', en:'Welcome to Your Debt-Free Journey',
  sum:'이 프로그램은 스프레드시트나 금융 전문용어가 아니라 “평범한 사람을 위한 현실 전략”입니다. 3M — Mindset · Math · Momentum — 으로 빚을 끊습니다.',
  blocks:[
   {h:'저자의 이야기', html:`<p>교재의 저자는 연봉 약 <b>$40,000</b>로 <b>$30,000 이상의 학자금 대출</b>을 갚았습니다. 운이 아니라 <b>명확한 시스템</b>, 몇 가지 어려운 결정, 그리고 많은 동기부여로 해냈습니다. 이제 여러분 차례입니다.</p>
     <div class="quote">“이 책은 빚의 무게에 지친 사람, ‘이렇게는 더 못 살겠다’고 속삭여 본 사람을 위한 것입니다.”</div>`},
   {tool:'pillars', h:'이 프로그램의 3단계 지도 — 3M'},
   {h:'이런 분을 위한 과정입니다', html:`<ul class="clean"><li>학자금 대출에 허우적대는 사회초년생</li><li>각종 청구서와 꿈 사이에서 줄타기하는 부모</li><li>“이렇게는 못 살겠다”고 말해 본 모든 직장인</li></ul><p class="muted small">금융 전문가나 가계부 마니아를 위한 과정이 아닙니다. 부끄럽거나, 막막하거나, 그냥 멈춰 있다고 느낀다면 — 바로 당신을 위한 과정입니다.</p>`},
   {live:{id:'c0-type',type:'multi',label:'아이스브레이킹',q:'지금 나를 가장 무겁게 하는 빚은? (복수 선택)',options:['신용카드','학자금 대출','자동차 할부','신용(개인)대출','주택담보대출','마이너스통장','가족·지인 채무','기타']}},
   {live:{id:'c0-stress',type:'scale',min:1,max:10,minLabel:'평온',maxLabel:'극심',label:'체크인',q:'지금 나의 “빚 스트레스 지수”는? (1~10)'}}
  ]},
{ no:1, part:'mind', title:'빚은 좋은 사람에게도 생긴다', en:'Why Debt Happens to Good People',
  sum:'“내가 어쩌다 여기까지 왔지?” — 당신만 그런 게 아닙니다. 빚은 실패·무책임·무능의 증거가 아닙니다.',
  blocks:[
   {tool:'mythFlip', h:'오해 vs 진실 — 카드를 뒤집어 보세요'},
   {h:'소비자 부채의 진실', html:`<p>빚은 종종 <b>꿈</b>에서 시작합니다 — 대학 교육, 믿을 만한 자동차, 안전한 집. 때로는 최악의 순간에 찾아온 <b>비상사태</b>이고, 때로는 수백만 명처럼 <b>작은 소비</b>가 눈덩이처럼 불어난 것입니다.</p>`},
   {tool:'pictogram', h:'숫자로 보는 현실'},
   {live:{id:'c1-origin',type:'choice',label:'우리 반 이야기',q:'내 빚이 처음 시작된 계기에 가장 가까운 것은?',options:['꿈 (교육·학업)','자동차','주거 (전세·월세·집)','갑작스러운 비상사태','작은 소비가 눈덩이처럼','가족·지인 사정','기타']}},
   {h:'이것은 당신의 마지막 장이 아닙니다', html:`<p>당신은 <b>망가지지 않았습니다.</b> 뒤처진 것도 <b>아닙니다.</b> 단지 전환점에 서서, 앞으로 나아가기를 선택하고 있을 뿐입니다.</p><div class="quote">22살이든 52살이든, 2,000달러든 200,000달러든 — 빠져나갈 길은 언제나 있습니다.</div>`},
   {live:{id:'c1-feel',type:'text',label:'한 줄 나누기',q:'“빚이 있다고 해서 내가 ___인 것은 아니다.” 빈칸을 채워 보세요.',ph:'예: 실패자'}}
  ]},
{ no:2, part:'mind', title:'나의 ‘Why’가 나의 무기다', en:'Your ‘Why’ Is Your Weapon',
  sum:'빚 상환이 힘들어질 때(반드시 그럴 것입니다), 핑계보다 큰 이유가 필요합니다. 빚에서 벗어나는 것을 넘어 ‘무엇을 위해’ 자유로워지려 하는지 분명히 합니다.',
  blocks:[
   {tool:'whyBuilder', h:'나의 개인적인 ‘Why’ 만들기'},
   {live:{id:'c2-why',type:'multi',label:'우리 반의 Why',q:'나에게 가장 강력한 ‘Why’는? (최대 3개 추천)',options:['밤에 돈 걱정 없이 자고 싶다','월급날만 기다리는 삶을 끝내고 싶다','내 집 마련 대출 자격을 갖추고 싶다','아이들에게 재정적 모범이 되고 싶다','여행하고, 베풀고, 잘 살 자유','창업·이직의 선택지를 갖고 싶다','노후를 준비하고 싶다']}},
   {live:{id:'c2-mywhy',type:'text',label:'Why 벽',q:'나만의 Why를 한 문장으로 붙여 주세요.',ph:'예: 딸에게 빚 대신 여행을 물려주고 싶다'}},
   {h:'마지막 메모: Why > 의지력', html:`<div class="quote">의지력은 사라지고, 삶은 바빠지고, 동기는 떨어집니다. 하지만 강한 Why는 좌절 속에서도 목적을 줍니다. 이 페이지로 자주 돌아오세요. 다시 읽고, 필요하면 다시 쓰세요.</div>`}
  ]},
{ no:3, part:'math', title:'STEP 1. 두려움을 마주하고 사실을 찾자', en:'Face the Fear, Find the Facts',
  sum:'빚을 정복하려면 먼저 이해해야 합니다. 불편하더라도 정직함에서 시작합니다. 이 첫 단계를 ‘부채 건강검진(DEBT CHECKUP)’이라 부릅니다.',
  blocks:[
   {h:'건강검진 비유', html:`<div class="grid2"><div><p>다리에 이상한 점이 생겼는데, 무서워서 병원에 가지 않는다고 상상해 보세요. 피한다고 사라지지 않습니다. 오히려 더 나빠질 수 있죠.</p><p>빚도 똑같습니다. 계좌를 들여다보면 무엇을 발견할지 두렵지만, <b>피할수록 빚은 더 큰 힘</b>을 갖습니다.</p></div><div class="callout"><b>지금 숫자를 마주하면</b> 통제권을 되찾습니다. 그리고 일찍 발견했다면? 더 큰 고통을 미리 막은 것입니다.</div></div>
     <div class="quote" style="margin-top:14px">“외면하는 것은 나를 지배하고, 마주하는 것은 힘을 잃는다.”</div>`},
   {tool:'checkup', h:'부채 건강검진 시작하기'},
   {live:{id:'c3-face',type:'choice',label:'마음 체크',q:'내 빚의 숫자를 정확히 알고 있나요?',options:['정확히 안다 (원 단위까지)','대략 안다','솔직히 잘 모른다','보기가 무서워 피해왔다']}},
   {live:{id:'c3-after',type:'scale',min:1,max:10,minLabel:'불안',maxLabel:'후련',label:'검진 후',q:'숫자를 마주한 지금, 마음은 어느 정도 후련한가요?'}}
  ]},
{ no:4, part:'math', title:'나의 부채 스냅샷 & 데빗 데이트', en:'Your Debt Snapshot Worksheet · Debt Date',
  sum:'모든 빚을 한곳에서 선명하게 보는 ‘재정 거울’입니다. 여기에 입력한 내용은 나의 부채 대시보드에 그대로 저장됩니다(내 브라우저에만 보관).',
  blocks:[
   {tool:'snapshot', h:'부채 스냅샷 워크시트'},
   {tool:'debtDate', h:'Make It a Vibe — “데빗 데이트” 준비 체크리스트'},
   {live:{id:'c4-count',type:'choice',label:'익명 통계',q:'내가 가진 부채는 몇 건인가요?',options:['1건','2건','3건','4건','5건 이상']}},
   {live:{id:'c4-vibe',type:'text',label:'데빗 데이트 아이디어',q:'나만의 “데빗 데이트” 분위기는? (장소·음악·간식)',ph:'예: 토요일 아침 동네 카페 + 재즈 플레이리스트'}}
  ]},
{ no:5, part:'math', title:'STEP 2. 공격 계획 고르기', en:'Choose Your Attack Plan',
  sum:'두 가지 대표 전략 — 애벌랜치(논리)와 스노우볼(추진력). 둘 다 효과가 있습니다. 선택은 당신이 ‘논리’로 움직이는지 ‘추진력’으로 움직이는지에 달려 있습니다.',
  blocks:[
   {h:'두 가지 전략', html:`<div class="grid2"><div class="card" style="background:var(--teal-soft);box-shadow:none"><div class="kicker" style="color:var(--teal)">Option 1</div><h3>🏔️ 애벌랜치 (Avalanche)</h3><p><b>이자율이 가장 높은 빚</b>부터 갚습니다(잔액 무관). 수학적으로 시간이 지날수록 <b>가장 많은 돈을 절약</b>합니다.</p><p class="small"><b>추천:</b> 장기 절약과 큰 그림의 논리로 동기부여되는 ‘재정 미니멀리스트’</p></div>
     <div class="card" style="background:var(--coral-soft);box-shadow:none"><div class="kicker">Option 2</div><h3>⛄ 스노우볼 (Snowball)</h3><p>이자율은 무시하고 <b>잔액이 가장 작은 빚</b>부터 해결합니다. 작은 빚을 빨리 없애며 동기를 쌓습니다.</p><p class="small"><b>추천:</b> 감정적 승리, 빠른 추진력, 눈에 보이는 진전이 필요한 사람</p></div></div>
     <div class="tbl-wrap" style="margin-top:14px"><table class="t"><thead><tr><th>비교 항목</th><th>🏔️ 애벌랜치</th><th>⛄ 스노우볼</th></tr></thead><tbody>
     <tr><td>우선순위</td><td>가장 높은 이자율</td><td>가장 작은 잔액</td></tr>
     <tr><td>이자 절약</td><td>✅ 더 많음</td><td>❌ 상대적으로 적음</td></tr>
     <tr><td>빠른 감정적 승리</td><td>더 오래 걸릴 수 있음</td><td>✅ 빠르게 보이는 진전</td></tr>
     <tr><td>동기 부여</td><td>시간이 지나며</td><td>✅ 즉각적인 승리 → 추진력</td></tr>
     <tr><td>총 상환액</td><td>✅ 가장 적음</td><td>약간 더 많음</td></tr></tbody></table></div>
     <p class="small muted" style="margin-top:8px">어느 쪽이 최고일까요? 숫자에 강하고 규율이 있다면 → 애벌랜치. 작은 승리가 계속 필요한 사람이라면 → 스노우볼.</p>`},
   {tool:'styleQuiz', h:'나는 논리형? 추진력형? — 자가 진단'},
   {tool:'compare', h:'시뮬레이터: 같은 빚, 다른 전략'},
   {live:{id:'c5-pick',type:'choice',label:'우리 반 투표',q:'나는 어떤 전략으로 공격할까요?',options:['🏔️ 애벌랜치 (이자율 높은 순)','⛄ 스노우볼 (잔액 작은 순)','아직 고민 중']}}
  ]},
{ no:6, part:'math', title:'빚을 부수는 스노우볼 만들기', en:'How to Build a Snowball That Crashes Debt · Live Example',
  sum:'스노우볼 방식은 단순한 상환이 아니라 ‘추진력’입니다. 언덕을 굴러 내려가는 눈덩이처럼, 상환력은 승리할 때마다 커집니다.',
  blocks:[
   {h:'6단계 스노우볼 세팅', html:`<div class="grid2"><div>
     <p><span class="step-badge">1</span> <b>모든 빚을 나열</b> — 부채 스냅샷 워크시트를 사용</p>
     <p><span class="step-badge">2</span> <b>잔액 순으로 정렬</b> — 지금은 이자율 무시, 총액만 봅니다</p>
     <p><span class="step-badge">3</span> <b>모든 빚의 최소상환 유지</b> — 신용점수를 지킵니다</p>
     <p><span class="step-badge">4</span> <b>가장 작은 빚을 집중 공격</b> — 남는 돈을 모두 여기에</p>
     <p><span class="step-badge">5</span> <b>다 갚으면 굴려라(Roll Over)</b> — 그 금액 전체를 다음 빚으로</p>
     <p><span class="step-badge">6</span> <b>자유로워질 때까지 반복</b></p></div>
     <div class="callout"><b>💡 Tip</b><br>색깔 체크리스트나 화이트보드로 진행 상황을 추적하세요. 빚 하나하나에 줄을 긋는 장면이 강력한 동기부여가 됩니다.</div></div>`},
   {tool:'sortGame', h:'실습: 스노우볼 순서로 정렬해 보세요'},
   {tool:'sara', h:'라이브 예시: 사라(Sara)의 스노우볼'},
   {live:{id:'c6-quiz',type:'quiz',label:'퀴즈',q:'사라가 신용카드($85 최소상환)를 다 갚은 3개월차, 새 스노우볼 금액은?',options:['$295','$380','$435','$550'],answer:1,explain:'기존 스노우볼 $295 + 신용카드 최소상환 $85 = $380 를 개인대출에 굴립니다.'}},
   {live:{id:'c6-quiz2',type:'quiz',label:'퀴즈',q:'스노우볼 방식에서 빚을 공격하는 순서의 기준은?',options:['이자율이 높은 순','잔액이 작은 순','만기일이 빠른 순','금액이 큰 순'],answer:1,explain:'스노우볼은 이자율을 무시하고 잔액이 가장 작은 빚부터 공격합니다.'}}
  ]},
{ no:7, part:'mom', title:'비상금 먼저, 그다음 공격', en:'Emergency First, Then Attack',
  sum:'빚에 돈을 던지기 전에 작은 안전망부터. 상환 중이라고 인생이 멈추지 않기 때문입니다. 이것은 지연이 아니라 ‘방어’입니다.',
  blocks:[
   {h:'왜 $1,000 비상금인가?', html:`<p>상상해 보세요. 상환이 순조로운데 자동차가 고장 났습니다. 비상금이 없으면 $300 수리비는 다시 신용카드로 — 원점입니다.</p><div class="callout"><b>$1,000(약 100만~150만 원) 스타터 비상금</b>은 숨 쉴 틈을 줍니다. 추진력을 지키고, 패닉 모드에서 벗어나게 합니다.</div>
     <h4 style="margin-top:14px">Life Happens. Be Ready.</h4><div class="grid3 small"><div>🚗 자동차 수리</div><div>🧰 가전제품 고장</div><div>🩺 병원 진료</div><div>📦 이사 비용</div><div>🐾 반려동물 응급</div><div>💸 수입 공백·급여 지연</div></div>`},
   {tool:'efFinder', h:'실습: 나의 첫 비상금 어디서 찾을까?'},
   {live:{id:'c7-amt',type:'number',label:'우리 반 비상금 챌린지',q:'이번 달 내가 찾아낸 비상금 금액은? (만원 단위)',unit:'만원',ph:'예: 30'}},
   {live:{id:'c7-idea',type:'text',label:'아이디어 공유',q:'비상금을 만드는 나만의 방법 한 가지!',ph:'예: 안 쓰는 OTT 2개 해지'}}
  ]},
{ no:8, part:'mind', title:'셀프 이미지 리셋', en:'Self-Image Reset Worksheet',
  sum:'정체성이 결과를 만듭니다. 스스로를 ‘돈에 약한 사람’, ‘늘 뒤처진 사람’으로 본다면 그 패턴을 계속 강화하게 됩니다. 돈 앞에서 이기는 사람처럼 자신에게 말해 보세요.',
  blocks:[
   {tool:'becoming', h:'문장 완성: “나는 ~이 되어가고 있다 (I Am Becoming…)”'},
   {live:{id:'c8-becoming',type:'text',label:'Becoming 벽',q:'“나는 ______ 사람이 되어가고 있다.”',ph:'예: 죄책감 없이 저축하고 목적 있게 쓰는'}},
   {tool:'reframe', h:'성찰: 나는 매일 나에게 어떻게 말하나요?'},
   {tool:'confidence', h:'자신감 습관 빌더: 이번 주 3가지 선택'},
   {live:{id:'c8-habit',type:'multi',label:'우리 반 습관',q:'이번 주 내가 고른 자신감 습관은?',options:['7일간 모든 지출 기록','충동구매에 “아니오” 하기','겁먹지 않고 잔액 확인','매일 돈 관련 성공 3가지 적기','5분 “부의 의식”(음악+계획)','거울 보고 “나는 되어가고 있다” 말하기']}}
  ]},
{ no:9, part:'mom', title:'자동화하고 라벨을 붙여라', en:'Automate and Label Payments',
  sum:'더 많은 의지력이 아니라 더 적은 결정이 필요합니다. 자동화할수록 궤도에서 벗어날 가능성이 줄어듭니다. 상환 계획을 ‘자동 조종’에 맡기세요.',
  blocks:[
   {h:'3단계 자동화', html:`<div class="grid3"><div class="card" style="box-shadow:none;background:#f7f4ee"><div class="kicker">Step 1</div><h3>최소상환 자동이체</h3><ul class="clean small"><li>모든 대출·카드 계정에 로그인</li><li>최소금액 자동이체 설정</li><li>알림 앱/캘린더로 매달 재확인</li><li>가능하면 같은 결제일로</li></ul><p class="small muted">신용점수 보호, 연체료 방지, 나 자신에 대한 신뢰 구축</p></div>
     <div class="card" style="box-shadow:none;background:#f7f4ee"><div class="kicker">Step 2</div><h3>추가 상환에 라벨 붙이기</h3><p class="small">스노우볼에 여윳돈을 넣을 때는 반드시 <b>“원금 상환용 추가 납입”</b>이라고 명시하세요. 다음 달 청구금 선납이 아니라 <b>잔액 자체를 줄이도록</b> 하는 것입니다.</p></div>
     <div class="card" style="box-shadow:none;background:#f7f4ee"><div class="kicker">Step 3</div><h3>결제일 맞추기</h3><p class="small">대부분의 금융기관은 결제일 변경 요청을 받아줍니다. 매달 1일이나 15일처럼 <b>같은 날</b>로 모으면 관리가 단순해집니다.</p></div></div>`},
   {tool:'labelMaker', h:'실습: 추가 상환 요청 문구 만들기'},
   {tool:'dateSync', h:'실습: 나의 결제일 달력 — 흩어진 날짜 한곳에 모으기'},
   {live:{id:'c9-auto',type:'choice',label:'현황 체크',q:'현재 내 빚의 자동이체 설정 상태는?',options:['전부 자동이체','일부만 자동이체','자동이체 없음 (매번 직접 납부)']}}
  ]},
{ no:10, part:'mom', title:'반복하고 재배분하라', en:'Repeat & Reallocate',
  sum:'스노우볼의 진짜 마법은 단 하나 — ‘재배분’에서 나옵니다. 빚 하나를 갚아도 멈추지 말고 그 금액을 다음 빚으로 굴리세요. 수입이 늘지 않아도 추진력은 점점 커집니다.',
  blocks:[
   {tool:'rollStepper', h:'시각화: 상환금을 앞으로 굴리기'},
   {tool:'shiftTable', h:'월별 부채 이동표 (Month-by-Month Debt Shift Table)'},
   {h:'Final Reminder', html:`<div class="quote">수입을 늘릴 필요는 없습니다. 계획을 지키고, 보스처럼 재배분하면 됩니다.</div>`},
   {live:{id:'c10-quiz',type:'quiz',label:'퀴즈',q:'빚 하나를 다 갚았을 때 가장 먼저 해야 할 일은?',options:['그 돈으로 나에게 선물한다','상환을 잠시 쉬고 저축한다','그 금액을 다음 빚 상환에 더한다','최소상환만 유지한다'],answer:2,explain:'갚은 빚에 쓰던 금액 전체를 다음 목표 빚으로 굴리는(Roll) 것이 스노우볼의 핵심입니다.'}}
  ]},
{ no:11, part:'mom', title:'진짜 작동하는 동기 시스템', en:'Motivation Systems That Actually Work',
  sum:'빚 상환은 숫자 게임이 아니라 에너지 게임입니다. 에너지가 떨어질 때 다시 집중하게 해 줄 ‘내장된 리마인더’를 만듭니다.',
  blocks:[
   {tool:'sticky', h:'포스트잇 시스템 (Sticky Note System)'},
   {live:{id:'c11-sticky',type:'text',label:'우리 반 포스트잇 벽',q:'나를 움직이는 한 줄 포스트잇을 붙여 주세요.',ph:'예: 1만원 = 자유에 한 걸음 더'}},
   {tool:'wallpaper', h:'폰 배경화면 만들기 (Phone Wallpaper)'},
   {tool:'morning', h:'모닝 해빗 트래커: 빚 해방 카운트다운'}
  ]},
{ no:12, part:'mom', title:'단기 희생을 위한 라이프스타일 해킹', en:'Lifestyle Hacks for Short-Term Sacrifice',
  sum:'빚을 갚는다고 비참해질 필요는 없습니다. 더 빨리 자유로워지려면 ‘기쁨’이 아니라 ‘사치’를 줄이세요.',
  blocks:[
   {tool:'swap', h:'사치를 단순함으로 바꾸기 (Swap Luxuries for Simplicity)'},
   {live:{id:'c12-swap',type:'multi',label:'우리 반 스왑',q:'내가 도전할 스왑은?',options:['배달 주 3회 → 일요일 밀프렙','스트레스 쇼핑 → 정리 & 중고판매 챌린지','OTT 과다 구독 → 도서관 + 저널','브런치 모임 → 포틀럭·피크닉']}},
   {live:{id:'c12-save',type:'number',label:'우리 반 절약 합계',q:'스왑으로 한 달에 아낄 수 있는 금액은? (만원)',unit:'만원',ph:'예: 25'}},
   {tool:'joy', h:'제로 코스트 기쁨 리스트 — 나만의 목록 만들기'},
   {h:'마인드셋 전환', html:`<div class="quote">이것은 영원이 아니라 ‘재정 디톡스’입니다. 단기 희생이 장기 자유를 만듭니다. 그리고 강요가 아니라 스스로 ‘선택’할 때 힘이 됩니다. 포기하는 것이 아니라 더 나은 삶을 나에게 주는 것입니다.</div>`}
  ]},
{ no:13, part:'mom', title:'도구와 자료', en:'Tools & Resources',
  sum:'혼자 해결할 필요 없습니다. 정리하고, 동기를 유지하고, 궤도에 머물게 도와주는 무료·간편 도구 모음입니다.',
  blocks:[
   {h:'나의 Debt-Free 툴박스', html:`<div class="grid2">
     <div><h4>📋 예산 템플릿</h4><ul class="clean small"><li>월간·주간 인쇄용 플래너</li><li>수입·청구서·저축을 추적하는 스프레드시트</li><li>부채 스냅샷 워크시트와 함께 사용 → <a href="dashboard.html">나의 부채 대시보드</a></li></ul></div>
     <div><h4>📱 지출 추적 앱 (교재 추천)</h4><ul class="clean small"><li>EveryDollar (무료 버전)</li><li>YNAB (체험판)</li><li>Goodbudget (봉투 예산법)</li><li>Fudget (간단·모바일 친화)</li></ul><p class="small muted">국내에서는 은행·카드사 앱의 가계부 기능이나 뱅크샐러드 같은 자산관리 앱도 활용할 수 있습니다.</p></div>
     <div><h4>🧮 부채 계산기</h4><ul class="clean small"><li>스노우볼 vs 애벌랜치 비교 도구 → <a href="lesson.html?ch=5">5장 시뮬레이터</a></li><li>예상 상환 타임라인 계산기 → 아래</li><li>이자 절약 계산기 → 아래</li></ul></div>
     <div><h4>🎨 시각 트래커 & 인쇄물</h4><ul class="clean small"><li>색칠형 상환 차트 → 대시보드 ‘색칠 차트’</li><li>습관 체크리스트 → <a href="lesson.html?ch=11">11장</a></li><li>비상금 트래커 → 대시보드</li></ul></div></div>`},
   {tool:'payoffCalc', h:'예상 상환 타임라인 & 이자 절약 계산기'},
   {live:{id:'c13-tool',type:'choice',label:'도구 선택',q:'나는 어떤 도구로 추적을 시작할까요?',options:['이 사이트의 부채 대시보드','스프레드시트','가계부/지출 추적 앱','종이 플래너·화이트보드']}}
  ]},
{ no:14, part:'mom', title:'나의 Debt-Free 선언문', en:'Your Debt-Free Declaration',
  sum:'빚으로부터의 자유는 마지막 상환일이 아니라 ‘선언하는 날’ 시작됩니다. 목표를 글로 쓰고, 서명하고, 벽에 붙이고, 매일 아침 소리 내어 읽으세요.',
  blocks:[
   {tool:'declaration', h:'선언문 작성 & 인증서 출력'},
   {live:{id:'c14-date',type:'month',label:'우리 반 목표 타임라인',q:'나는 언제 완전히 빚에서 자유로워질까요? (목표 년/월)'}},
   {live:{id:'c14-celebrate',type:'text',label:'축하 계획',q:'빚을 다 갚으면 이렇게 축하할 거예요!',ph:'예: 가족과 제주도 여행'}}
  ]},
{ no:15, part:'mom', title:'6개월 체크인 플랜 & 마무리', en:'6-Month Check-In Plan · Final Words',
  sum:'빚으로부터의 자유는 단거리가 아니라 마라톤입니다. 정기 체크인으로 방향을 맞추고, 계획을 조정하고, 진전을 축하합니다.',
  blocks:[
   {tool:'checkin', h:'월간 미니 목표 + 마이크로 보상'},
   {tool:'milestone', h:'마일스톤 트래커'},
   {h:'Final Words: 이것은 영원하지 않습니다', html:`<p>빚은 종신형처럼 느껴질 수 있습니다. 하지만 아닙니다. 그것은 하나의 계절이고, 모든 계절처럼 <b>이 계절도 지나갑니다.</b></p><ul class="clean"><li>모든 상환은 내가 원하는 삶에 던지는 한 표입니다.</li><li>모든 습관은 조용한 자기 존중의 행동입니다.</li><li>아낀 모든 돈은 더 나은 무언가를 위한 씨앗입니다.</li></ul><div class="quote" style="font-size:1.25rem;text-align:center">“You don’t owe your past anything but growth.”<br><span class="small muted">과거에 진 빚은 오직 ‘성장’뿐이다.</span></div><p style="margin-top:12px">완벽할 필요는 없습니다. 꾸준하면 됩니다. 가장 어려운 일 — <b>시작</b> — 은 이미 해냈습니다.</p>`},
   {live:{id:'c15-word',type:'text',label:'수료 한마디',q:'이 과정을 마치며 나에게 남은 한 단어(또는 한 문장)는?',ph:'예: 모멘텀!'}},
   {live:{id:'c15-conf',type:'scale',min:1,max:10,minLabel:'아직',maxLabel:'확신',label:'애프터 체크',q:'이제 빚을 끊을 수 있다는 자신감은? (1~10)'}}
  ]}
];
window.PARTS = {intro:{k:'START',cls:'intro',name:'시작'}, mind:{k:'MINDSET',cls:'mind',name:'마인드셋'}, math:{k:'MATH',cls:'math',name:'계산·계획'}, mom:{k:'MOMENTUM',cls:'mom',name:'모멘텀'}};
