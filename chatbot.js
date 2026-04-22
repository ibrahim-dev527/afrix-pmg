/**
 * chatbot.js — Afrix Properties & Management Group
 * Improved chatbot with keyword matching + clear WhatsApp fallback
 * Developer: Ibratech | 0544823484
 */
(function(){
'use strict';
const WA_NUMBER='233539484203';
const WA_BASE=`https://wa.me/${WA_NUMBER}`;
const WA_SVG='<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

/* ── Q&A DATABASE ── Add { q, a } objects to add new answers */
const FAQ_DB=[
  {id:'buying',label:'🏠 Buying',questions:[
    {q:'How do I buy a property through Afrix?',a:'Browse our listings, shortlist what you love, then contact us. We assign a dedicated agent who handles viewings, negotiations and all legal paperwork from search to keys in hand.'},
    {q:'What documents do I need to buy property?',a:'You\'ll need: a valid national ID or passport, proof of income/funds, and (for land) a title search at the Lands Commission. Our legal team guides you through every step.'},
    {q:'How long does the buying process take?',a:'A typical apartment or house purchase takes 4–8 weeks. Land transactions may take 2–4 months. We work hard to move things as quickly as possible.'},
    {q:'Can I negotiate the asking price?',a:'Absolutely! Our agents are skilled negotiators and will advocate for the best price on your behalf based on current market data.'},
    {q:'What are your fees for buying?',a:'Our fees are transparent — usually a % of the purchase price paid by the seller. We outline all costs before you sign anything. No hidden charges.'},
  ]},
  {id:'renting',label:'🔑 Renting',questions:[
    {q:'How do I rent a property through Afrix?',a:'Browse our rental listings (use the Rent tab), shortlist your favourites, then contact us to arrange viewings. We handle the application, reference checks and lease agreement.'},
    {q:'What is required to rent in Ghana?',a:'Most landlords require 1–2 years rent in advance (standard in Ghana), a valid ID, employment letter or proof of business. We\'ll tell you exactly what each landlord requires.'},
    {q:'Can I view the property before paying?',a:'Always. We never ask you to commit without a viewing. We arrange in-person viewings and virtual video tours depending on your location.'},
    {q:'Are utilities included in rent?',a:'It depends on the property. Serviced apartments often include utilities; standalone houses usually don\'t. We clearly state what is included in every listing.'},
    {q:'Do you have short stay or Airbnb properties?',a:'Yes! We offer Short Stay, Airbnb and Long-Term rental options. Use the filter tabs on our Properties page to browse by category.'},
  ]},
  {id:'selling',label:'💰 Selling',questions:[
    {q:'How do I list my property for sale?',a:'Click the "Sell" tab on our Properties page or WhatsApp us. An agent will schedule a free inspection, advise on pricing, and list within 72 hours — no upfront cost.'},
    {q:'How do you determine the right asking price?',a:'We use comparative market analysis — recent sales of similar properties, current demand, and your property\'s condition and unique features.'},
    {q:'What is your commission for selling?',a:'Our seller\'s commission is a competitive percentage of the final sale price, outlined clearly before you sign anything.'},
    {q:'How long will it take to sell?',a:'Well-priced properties in prime locations typically sell within 30–90 days. We use targeted digital marketing and our buyer database.'},
  ]},
  {id:'management',label:'⚙️ Management',questions:[
    {q:'What does your property management service include?',a:'Full management covers: tenant sourcing & screening, lease management, rent collection & disbursement, routine inspections, maintenance coordination and monthly financial reporting.'},
    {q:'How much do you charge for property management?',a:'Our management fees are 8–12% of monthly rental income depending on property type. No upfront fee to start. See our Property Management page for full plan details.'},
    {q:'How will I receive my rental income?',a:'We collect rent and disburse net income to your nominated bank account — whether Ghanaian or international — with a detailed monthly statement.'},
    {q:'Can you manage my property while I\'m abroad?',a:'Yes! We manage everything remotely: tenants, rent collection, maintenance and monthly income statements sent to your overseas account.'},
  ]},
  {id:'diaspora',label:'🌍 Diaspora',questions:[
    {q:'Can I buy property in Ghana from abroad?',a:'Absolutely. We offer virtual tours, handle all due diligence and legal work, and can act as your Power of Attorney to complete the purchase 100% remotely.'},
    {q:'How do I pay for a property from abroad?',a:'We support secure international wire transfers (SWIFT). All transactions are fully documented and receipted by trusted legal partners.'},
    {q:'How do I know the property is legitimate if I can\'t visit?',a:'We conduct a full physical inspection, legal title search at the Lands Commission, and provide you with a detailed report, photos and live video tours.'},
    {q:'Which countries do you serve diaspora clients from?',a:'We serve Ghanaians in the UK, USA, Canada, Germany, Australia, Netherlands, UAE, Italy and many more. WhatsApp us from wherever you are!'},
  ]},
  {id:'general',label:'❓ General',questions:[
    {q:'Where does Afrix PMG operate?',a:'We operate primarily in Greater Accra (East Legon, Cantonments, Airport Residential, Trasacco, Spintex, Tema) and also serve Kumasi, Takoradi and other major cities.'},
    {q:'How do I contact Afrix Properties?',a:'📱 WhatsApp/Call: 0539484203 | 📧 lotsuibrahim2@gmail.com | Mon–Sat, 8am–6pm GMT. WhatsApp is fastest — we typically reply within minutes!'},
    {q:'What are your office hours?',a:'Monday–Friday 8am–6pm and Saturday 9am–4pm (GMT). WhatsApp is monitored outside hours too!'},
    {q:'Do you have properties in Kumasi?',a:'Yes! We have listings in Kumasi. Use the Location filter on our Properties page to browse Kumasi listings.'},
    {q:'Do you have Airbnb or short stay properties?',a:'Yes! Use the Airbnb or Short Stay tabs on our Properties page to browse all short-term rental options across Accra and beyond.'},
  ]},
];

/* ── Build keyword index ── */
const KW_INDEX=[];
FAQ_DB.forEach(cat=>cat.questions.forEach(item=>{
  const words=(item.q+' '+item.a).toLowerCase().split(/\W+/).filter(w=>w.length>3);
  KW_INDEX.push({words,q:item.q,a:item.a});
}));

function findAnswer(text){
  if(!text.trim())return null;
  const input=text.toLowerCase().split(/\W+/).filter(w=>w.length>3);
  let best=null,score=0;
  KW_INDEX.forEach(e=>{const s=input.filter(w=>e.words.includes(w)).length;if(s>score){score=s;best=e;}});
  return score>=2?best:null;
}

/* ── Quick keyword map ── */
const QUICK={
  price:'Our fees are transparent. For buying/selling: a % of the purchase price. For management: 8–12% of monthly rent. Contact us for a personalised quote!',
  cost:'Our fees are transparent. For buying/selling: a % of the purchase price. For management: 8–12% of monthly rent. Contact us for a personalised quote!',
  fee:'Our fees are transparent. For buying/selling: a % of the purchase price. For management: 8–12% of monthly rent. Contact us for a personalised quote!',
  location:'We operate across Greater Accra (East Legon, Cantonments, Airport, Trasacco, Spintex), Tema, Kumasi and Takoradi. Use the location filter on our Properties page.',
  accra:'We operate across Greater Accra (East Legon, Cantonments, Airport Residential, Trasacco, Spintex, Tema). Browse our properties to find the perfect location.',
  kumasi:'Yes, we have properties in Kumasi. Use the Location filter on our Properties page to browse Kumasi listings.',
  phone:'📱 WhatsApp / Call: <strong>0539484203</strong><br>📧 lotsuibrahim2@gmail.com<br>Hours: Mon–Sat 8am–6pm GMT',
  call:'📱 WhatsApp / Call: <strong>0539484203</strong><br>📧 lotsuibrahim2@gmail.com<br>Hours: Mon–Sat 8am–6pm GMT',
  contact:'📱 WhatsApp / Call: <strong>0539484203</strong><br>📧 lotsuibrahim2@gmail.com<br>Visit our <a href="contact.html">Contact page</a>.',
  list:'To list your property: click the <strong>Sell</strong> tab on our Properties page, or WhatsApp us on 0539484203. Free inspection, no upfront fees!',
  sell:'To list your property: click the <strong>Sell</strong> tab on our Properties page, or WhatsApp us on 0539484203. Free inspection, no upfront fees!',
  manage:'Our Property Management handles tenants, rent collection, maintenance and monthly reports. Plans from 8% of monthly rent. See our <a href="property-management.html">Management page</a>!',
  tenant:'Our Property Management handles tenants, rent collection, maintenance and monthly reports. Plans from 8% of monthly rent.',
  diaspora:'We specialise in helping Ghanaians abroad invest safely in Ghana — virtual tours, legal due diligence, remote purchase and ongoing management. All 100% remote!',
  abroad:'We specialise in helping Ghanaians abroad invest safely in Ghana — virtual tours, legal due diligence, remote purchase and ongoing management. All 100% remote!',
  airbnb:'Yes! We manage Airbnb and Short-Stay properties. Use the Airbnb tab on our Properties page to browse, or WhatsApp us to list your property on Airbnb.',
  short:'Yes! We have short-stay properties. Use the "Short Stay" filter on our Properties page.',
  admin:'The admin dashboard is at <a href="admin.html">admin.html</a>. Only authorised administrators can access it.',
};

/* ── Styles ── */
const style=document.createElement('style');
style.textContent=`
#cb-toggle{position:fixed;bottom:96px;right:24px;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#C4922A,#E8B84B);border:none;cursor:pointer;z-index:9100;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(196,146,42,.5);transition:all .3s;animation:cbPulse 2.5s infinite;}
#cb-toggle:hover{transform:scale(1.1);}
@keyframes cbPulse{0%,100%{box-shadow:0 6px 24px rgba(196,146,42,.5)}50%{box-shadow:0 6px 36px rgba(196,146,42,.8)}}
#cb-toggle svg{width:26px;height:26px;fill:#fff;transition:transform .3s;}
#cb-toggle.open svg{transform:rotate(45deg);}
#cb-widget{position:fixed;bottom:168px;right:24px;width:360px;max-height:580px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.18);z-index:9100;display:none;flex-direction:column;overflow:hidden;font-family:'Poppins',sans-serif;border:1px solid #E8E6E0;opacity:0;transform:translateY(16px) scale(.95);transition:transform .3s ease,opacity .3s ease;}
#cb-widget.show{display:flex;opacity:1;transform:translateY(0) scale(1);}
.cb-head{background:linear-gradient(135deg,#0B1E33,#162D47);padding:14px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.cb-head-av{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#C4922A,#E8B84B);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.cb-head-info h4{color:#fff;font-size:.86rem;font-weight:600;margin:0 0 2px;}
.cb-head-info p{color:#C4922A;font-size:.72rem;margin:0;display:flex;align-items:center;gap:4px;}
.cb-online{width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;}
.cb-close{margin-left:auto;background:none;border:none;color:rgba(255,255,255,.6);font-size:1.2rem;cursor:pointer;}
.cb-close:hover{color:#fff;}
.cb-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#F9F8F5;min-height:0;max-height:260px;}
.cb-body::-webkit-scrollbar{width:4px;}.cb-body::-webkit-scrollbar-thumb{background:#E8E6E0;border-radius:2px;}
.cb-msg{max-width:88%;padding:10px 14px;border-radius:16px;font-size:.83rem;line-height:1.6;animation:cbMsgIn .25s ease;}
@keyframes cbMsgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.cb-msg.bot{background:#fff;color:#1C1C1C;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.06);align-self:flex-start;}
.cb-msg.user{background:linear-gradient(135deg,#C4922A,#E8B84B);color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}
.cb-msg a{color:#C4922A;font-weight:600;}.cb-msg.user a{color:#fff;}
.cb-cats{padding:10px 12px;background:#fff;border-top:1px solid #F0EFEC;display:flex;flex-wrap:wrap;gap:6px;flex-shrink:0;}
.cb-cat-btn{padding:6px 11px;border-radius:20px;background:#F4F3EF;border:1.5px solid #E8E6E0;font-size:.75rem;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;color:#1C1C1C;transition:all .2s;white-space:nowrap;}
.cb-cat-btn:hover,.cb-cat-btn.active{background:#0B1E33;color:#fff;border-color:#0B1E33;}
.cb-qlist{padding:8px 12px;background:#fff;border-top:1px solid #F0EFEC;display:flex;flex-direction:column;gap:5px;flex-shrink:0;max-height:180px;overflow-y:auto;}
.cb-q-btn{text-align:left;background:#F9F8F5;border:1.5px solid #E8E6E0;border-radius:10px;padding:9px 12px;font-size:.78rem;font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s;color:#1C1C1C;display:flex;gap:8px;}
.cb-q-btn::before{content:'›';color:#C4922A;font-weight:700;font-size:1rem;line-height:1.1;flex-shrink:0;}
.cb-q-btn:hover{background:#F9EDD0;border-color:#C4922A;}
.cb-back{background:#F9F8F5;border:none;cursor:pointer;color:#C4922A;font-size:.78rem;font-weight:600;font-family:'Poppins',sans-serif;padding:8px 12px;border-bottom:1px solid #F0EFEC;width:100%;text-align:left;display:flex;align-items:center;gap:4px;}
.cb-input-row{padding:10px 12px;background:#fff;border-top:1px solid #F0EFEC;display:flex;gap:8px;flex-shrink:0;}
.cb-input{flex:1;border:1.5px solid #E8E6E0;border-radius:20px;padding:9px 13px;font-size:.82rem;font-family:'Poppins',sans-serif;outline:none;transition:border .2s;background:#F9F8F5;}
.cb-input:focus{border-color:#C4922A;background:#fff;}
.cb-send{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#C4922A,#E8B84B);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.cb-send svg{width:16px;height:16px;fill:#fff;}
.cb-wa-bar{padding:10px 12px;background:#fff;border-top:1px solid #F0EFEC;flex-shrink:0;}
.cb-wa-btn{display:flex;align-items:center;justify-content:center;gap:7px;background:#25D366;color:#fff;border-radius:10px;padding:10px;font-size:.8rem;font-weight:600;text-decoration:none;transition:background .2s;font-family:'Poppins',sans-serif;}
.cb-wa-btn:hover{background:#1da851;}
.cb-wa-btn svg{width:15px;height:15px;fill:#fff;}
.cb-typing{display:flex;gap:4px;align-items:center;padding:10px 14px;}
.cb-typing span{width:7px;height:7px;border-radius:50%;background:#9E9B94;animation:cbDot 1.2s infinite ease;}
.cb-typing span:nth-child(2){animation-delay:.2s;}.cb-typing span:nth-child(3){animation-delay:.4s;}
@keyframes cbDot{0%,80%,100%{transform:scale(.7);opacity:.5}40%{transform:scale(1);opacity:1}}
@media(max-width:420px){#cb-widget{width:calc(100vw - 20px);right:10px;bottom:160px;}}
`;
document.head.appendChild(style);

/* ── Build widget ── */
const btn=document.createElement('button');
btn.id='cb-toggle';btn.setAttribute('aria-label','Open chat');
btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg>';

const widget=document.createElement('div');
widget.id='cb-widget';widget.setAttribute('role','dialog');
widget.innerHTML=`<div class="cb-head"><div class="cb-head-av">🏠</div><div class="cb-head-info"><h4>Afrix Assistant</h4><p><span class="cb-online"></span> Online · Replies fast</p></div><button class="cb-close" id="cbClose">&#215;</button></div>
<div class="cb-body" id="cbBody"></div>
<div id="cbCats" class="cb-cats"></div>
<div id="cbQList" class="cb-qlist" style="display:none"></div>
<div class="cb-input-row"><input type="text" id="cbInput" class="cb-input" placeholder="Type your question…" autocomplete="off"/><button class="cb-send" id="cbSend">${'<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>'}</button></div>
<div class="cb-wa-bar"><a class="cb-wa-btn" id="cbWa" href="${WA_BASE}?text=Hello%20Afrix%20Properties%2C%20I%20need%20help." target="_blank" rel="noopener">${WA_SVG} Continue on WhatsApp</a></div>`;

document.body.appendChild(btn);document.body.appendChild(widget);

const body=document.getElementById('cbBody');
const cats=document.getElementById('cbCats');
const qlist=document.getElementById('cbQList');
const input=document.getElementById('cbInput');
const waLink=document.getElementById('cbWa');
let isOpen=false;

function openChat(){
  isOpen=true;widget.style.display='flex';btn.classList.add('open');
  setTimeout(()=>widget.classList.add('show'),10);
  if(!body.children.length)welcome();
  setTimeout(()=>input.focus(),300);
}
function closeChat(){
  isOpen=false;widget.classList.remove('show');btn.classList.remove('open');
  setTimeout(()=>{widget.style.display='none';},300);
}
btn.addEventListener('click',()=>isOpen?closeChat():openChat());
document.getElementById('cbClose').addEventListener('click',closeChat);

function addBot(html,delay=400){
  const t=document.createElement('div');t.className='cb-msg bot cb-typing';
  t.innerHTML='<span></span><span></span><span></span>';body.appendChild(t);body.scrollTop=body.scrollHeight;
  return new Promise(res=>setTimeout(()=>{t.remove();const m=document.createElement('div');m.className='cb-msg bot';m.innerHTML=html;body.appendChild(m);body.scrollTop=body.scrollHeight;res(m);},delay));
}
function addUser(text){const m=document.createElement('div');m.className='cb-msg user';m.textContent=text;body.appendChild(m);body.scrollTop=body.scrollHeight;}

function welcome(){
  addBot(`👋 Hi there! Welcome to <strong>Afrix Properties & Management Group</strong>.<br><br>I can answer questions about buying, renting, selling, property management and diaspora services.<br><br>Pick a topic below or type your question!`,300);
  showCats();
}

function showCats(){
  cats.innerHTML='';qlist.style.display='none';
  FAQ_DB.forEach(cat=>{
    const b=document.createElement('button');b.className='cb-cat-btn';b.textContent=cat.label;
    b.addEventListener('click',()=>selectCat(cat));cats.appendChild(b);
  });
  const other=document.createElement('button');other.className='cb-cat-btn';other.textContent='💬 Other';
  other.addEventListener('click',()=>{addUser('I have another question');addBot('Of course! Type your question below and I\'ll do my best. If I can\'t help, I\'ll connect you to a live agent on WhatsApp. 👇');input.focus();});
  cats.appendChild(other);
}

function selectCat(cat){
  addUser(cat.label.replace(/^[^\s]+ /,''));
  cats.querySelectorAll('.cb-cat-btn').forEach(b=>b.classList.toggle('active',b.textContent===cat.label));
  qlist.style.display='flex';qlist.innerHTML='';
  const back=document.createElement('button');back.className='cb-back';back.innerHTML='‹ All categories';
  back.addEventListener('click',()=>{qlist.style.display='none';qlist.innerHTML='';cats.querySelectorAll('.cb-cat-btn').forEach(b=>b.classList.remove('active'));});
  qlist.appendChild(back);
  cat.questions.forEach(item=>{
    const b=document.createElement('button');b.className='cb-q-btn';b.textContent=item.q;
    b.addEventListener('click',()=>answerQ(item));qlist.appendChild(b);
  });
  body.scrollTop=body.scrollHeight;
}

function answerQ(item){
  addUser(item.q);
  waLink.href=`${WA_BASE}?text=${encodeURIComponent(`Hello Afrix Properties, I have a question: "${item.q}"`)}`;
  addBot(`<p>${item.a}</p><p style="margin-top:8px;font-size:.74rem;color:#9E9B94">💡 Need more help? Use the WhatsApp button below.</p>`);
}

function handleInput(){
  const text=input.value.trim();if(!text)return;
  input.value='';addUser(text);
  waLink.href=`${WA_BASE}?text=${encodeURIComponent(`Hello Afrix Properties, my question: "${text}"`)}`;
  const lower=text.toLowerCase();

  // Quick keyword shortcuts
  for(const[kw,ans] of Object.entries(QUICK)){
    if(lower.includes(kw)){addBot(`<p>${ans}</p>`);return;}
  }

  // Semantic match
  const match=findAnswer(text);
  if(match){addBot(`<p>${match.a}</p><p style="margin-top:8px;font-size:.74rem;color:#9E9B94">💡 Tap "Continue on WhatsApp" below for live support.</p>`);return;}

  // FALLBACK — clear message + WhatsApp link
  addBot(`<p>🤔 I'm not sure I understand that one. Please contact us on WhatsApp and a real agent will help you right away:</p>
    <p style="margin-top:10px"><a href="${WA_BASE}?text=${encodeURIComponent(`Hello Afrix Properties, I have a question: "${text}"`)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;padding:8px 16px;border-radius:20px;font-weight:600;text-decoration:none;font-size:.82rem">${WA_SVG} Chat on WhatsApp</a></p>`,500);
}

document.getElementById('cbSend').addEventListener('click',handleInput);
input.addEventListener('keydown',e=>{if(e.key==='Enter')handleInput();});
if(new URLSearchParams(window.location.search).get('chat')==='1')setTimeout(openChat,800);
})();
