/**
 * chatbot.js — Afrix Properties & Management Group
 * Full floating chatbot widget with:
 *   - Predefined categories & Q&A
 *   - Free-text keyword matching
 *   - WhatsApp fallback for unknown questions
 *   - Conversation history
 *
 * Developer: Ibratech | 0544823484
 * To update WhatsApp number: change WA_NUMBER below
 */

(function () {
  'use strict';

  /* ── CONFIG — change these ── */
  const WA_NUMBER = '233539484203';
  const WA_BASE = `https://wa.me/${WA_NUMBER}`;
  const COMPANY = 'Afrix Properties & Management Group';

  /* ── PREDEFINED Q&A DATABASE ──
   * Add new questions: copy a { q, a } object and paste inside the correct category.
   * Add a new category: copy a full category block and add it to FAQ_DB.
   */
  const FAQ_DB = [
    {
      id: 'buying',
      label: '🏠 Buying',
      questions: [
        {
          q: 'How do I buy a property through Afrix?',
          a: 'Buying with us is straightforward! Browse our listings, shortlist what you love, then contact us. We assign you a dedicated agent who handles viewings, negotiations and all legal paperwork from search to keys in hand.'
        },
        {
          q: 'What documents do I need to buy property?',
          a: 'You typically need: a valid national ID or passport, proof of income/funds, and (for land) a title search at the Lands Commission. Our legal team guides you through every document — nothing is left to chance.'
        },
        {
          q: 'How long does the buying process take?',
          a: 'A typical apartment or house purchase takes 4–8 weeks. Land transactions with title searches may take 2–4 months. We work hard to keep things moving as fast as possible.'
        },
        {
          q: 'Can I negotiate the asking price?',
          a: 'Absolutely! Our agents are skilled negotiators and will advocate for the best price on your behalf. We know the market inside out and will advise what is realistically achievable.'
        },
        {
          q: 'What are your fees for buying?',
          a: 'Our fees are transparent and competitive — usually a percentage of the purchase price paid by the seller. We outline all costs clearly before you sign anything. No hidden charges, ever.'
        },
      ]
    },
    {
      id: 'renting',
      label: '🔑 Renting',
      questions: [
        {
          q: 'How do I rent a property through Afrix?',
          a: 'Browse our rental listings (filter by "Rent"), shortlist your favourites, then contact us to arrange viewings. Once you choose, we process your application, run reference checks, and prepare the lease agreement quickly.'
        },
        {
          q: 'What is required to rent in Ghana?',
          a: 'Most landlords require 1–2 years rent in advance (standard practice in Ghana), a valid ID, employment letter or proof of business, and sometimes a guarantor. We communicate each landlord\'s specific requirements upfront.'
        },
        {
          q: 'Can I view the property before paying?',
          a: 'Always. We never ask you to commit without a viewing. We arrange in-person viewings and virtual tours (video call) depending on your location and availability.'
        },
        {
          q: 'Are utilities included in the rent?',
          a: 'It depends on the property. Serviced apartments often include utilities; standalone houses usually do not. We clearly state what is included in every listing description.'
        },
      ]
    },
    {
      id: 'selling',
      label: '💰 Selling',
      questions: [
        {
          q: 'How do I list my property for sale?',
          a: 'Easy! WhatsApp us or fill in our contact form. An agent will schedule a free inspection, advise on pricing, and list your property across our platform and marketing channels within days.'
        },
        {
          q: 'How do you determine the right asking price?',
          a: 'We use comparative market analysis — recent sales of similar properties nearby, current demand, your property\'s condition, and our deep local knowledge — to recommend the optimal asking price.'
        },
        {
          q: 'What is your commission for selling?',
          a: 'Our seller\'s commission is a competitive percentage of the final sale price. We outline this clearly in our listing agreement. Contact us for a no-obligation discussion about your property.'
        },
        {
          q: 'How long will it take to sell my property?',
          a: 'Well-priced properties in prime locations typically sell within 30–90 days. We use targeted digital marketing, our buyer database, and social media to attract qualified buyers quickly.'
        },
      ]
    },
    {
      id: 'management',
      label: '⚙️ Management',
      questions: [
        {
          q: 'What does your property management service include?',
          a: 'Our full management service covers: tenant sourcing & screening, lease management, rent collection & disbursement, routine inspections, maintenance coordination, emergency repairs, utility management, and monthly financial reporting.'
        },
        {
          q: 'How much do you charge for property management?',
          a: 'Our management fees are 8–12% of monthly rental income depending on property type and services required. No upfront fee to start. Check our Property Management page for the full plan breakdown.'
        },
        {
          q: 'How will I receive my rental income?',
          a: 'We collect rent on your behalf and disburse net income to your nominated bank account — whether it\'s a Ghanaian or international account. You receive a detailed monthly statement by email.'
        },
        {
          q: 'What happens if a tenant damages my property?',
          a: 'We conduct thorough move-in and move-out inspections with photo evidence. A security deposit is held to cover damages. If damage exceeds the deposit, we pursue the tenant through the appropriate legal channels on your behalf.'
        },
        {
          q: 'Can you manage my property while I am abroad?',
          a: 'Yes — that is exactly what many of our diaspora clients do. We manage everything remotely: find tenants, collect rent, handle maintenance, and send you monthly income statements.'
        },
      ]
    },
    {
      id: 'diaspora',
      label: '🌍 Diaspora',
      questions: [
        {
          q: 'Can I buy property in Ghana while living abroad?',
          a: 'Absolutely. We specialise in serving diaspora clients. We offer virtual property tours, handle all due diligence and legal work, and can act as your Power of Attorney to complete the purchase — 100% remotely.'
        },
        {
          q: 'How do I pay for a property from abroad?',
          a: 'We support secure international wire transfers (SWIFT). All transactions are fully documented and receipted. We work with reputable legal and banking partners to ensure complete security for your funds.'
        },
        {
          q: 'How do I know the property is legitimate if I cannot visit?',
          a: 'We conduct a full physical inspection, legal title search at the Lands Commission, and provide you with a detailed report with photos and live video. We stake our reputation on every transaction.'
        },
        {
          q: 'Which countries do you serve diaspora clients from?',
          a: 'We serve Ghanaians in the UK, USA, Canada, Germany, Australia, Netherlands, UAE, Italy and many more. If you are in a country not listed — just WhatsApp us, we can still help!'
        },
      ]
    },
    {
      id: 'general',
      label: '❓ General',
      questions: [
        {
          q: 'Where does Afrix PMG operate?',
          a: 'We operate primarily in the Greater Accra Region (East Legon, Cantonments, Airport Residential, Trasacco, Spintex, Tema) and also serve clients in Kumasi, Takoradi and other major Ghanaian cities.'
        },
        {
          q: 'How do I contact Afrix Properties?',
          a: 'You can reach us via WhatsApp or phone on 0539484203, email at lotsuibrahim2@gmail.com, or use the Contact form on our website. WhatsApp is fastest — we typically reply within minutes!'
        },
        {
          q: 'What are your office hours?',
          a: 'Our office is open Monday–Friday 8am–6pm and Saturday 9am–4pm (GMT). WhatsApp is monitored outside these hours too — so feel free to message any time.'
        },
        {
          q: 'Is Afrix PMG a licensed real estate company?',
          a: 'Yes. Afrix Properties & Management Group operates fully within Ghana\'s regulatory framework for real estate and property management. We are committed to full legal compliance in every transaction.'
        },
        {
          q: 'Do you have properties in Kumasi or Takoradi?',
          a: 'Yes, we have listings across multiple Ghanaian cities including Kumasi and Takoradi. Use the location filter on our Properties page, or WhatsApp us with your preferred city and requirements.'
        },
      ]
    }
  ];

  /* ── BUILD KEYWORD INDEX for free-text matching ── */
  const keywordIndex = [];
  FAQ_DB.forEach(cat => {
    cat.questions.forEach(item => {
      const words = (item.q + ' ' + item.a).toLowerCase().split(/\W+/).filter(w => w.length > 3);
      keywordIndex.push({ words, q: item.q, a: item.a });
    });
  });

  function findAnswer(text) {
    if (!text.trim()) return null;
    const input = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    let best = null, bestScore = 0;
    keywordIndex.forEach(entry => {
      const score = input.filter(w => entry.words.includes(w)).length;
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return bestScore >= 2 ? best : null;
  }

  /* ── STYLES ── */
  const style = document.createElement('style');
  style.textContent = `
    /* CHATBOT TOGGLE BUTTON */
    #cb-toggle {
      position: fixed; bottom: 96px; right: 24px;
      width: 58px; height: 58px; border-radius: 50%;
      background: linear-gradient(135deg, #C4922A, #E8B84B);
      border: none; cursor: pointer; z-index: 9100;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 24px rgba(196,146,42,.5);
      transition: all .3s cubic-bezier(.4,0,.2,1);
      animation: cbPulse 2.5s infinite;
    }
    #cb-toggle:hover { transform: scale(1.1); }
    @keyframes cbPulse { 0%,100%{box-shadow:0 6px 24px rgba(196,146,42,.5)} 50%{box-shadow:0 6px 36px rgba(196,146,42,.8)} }
    #cb-toggle svg { width: 26px; height: 26px; fill: #fff; transition: all .3s; }
    #cb-toggle.cb-open svg { transform: rotate(45deg); }

    /* CHAT WIDGET */
    #cb-widget {
      position: fixed; bottom: 168px; right: 24px;
      width: 360px; max-height: 560px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,.18);
      z-index: 9100; display: none; flex-direction: column;
      overflow: hidden; font-family: 'Poppins', sans-serif;
      border: 1px solid #E8E6E0;
      transform: translateY(16px) scale(.95);
      opacity: 0;
      transition: transform .3s ease, opacity .3s ease;
    }
    #cb-widget.cb-show {
      display: flex;
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    /* Header */
    .cb-head {
      background: linear-gradient(135deg, #0B1E33, #162D47);
      padding: 14px 18px; display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
    }
    .cb-head-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #C4922A, #E8B84B);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; flex-shrink: 0;
    }
    .cb-head-info h4 { color: #fff; font-size: .88rem; font-weight: 600; margin: 0 0 2px; }
    .cb-head-info p { color: #C4922A; font-size: .72rem; margin: 0; display: flex; align-items: center; gap: 4px; }
    .cb-online { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; display: inline-block; }
    .cb-close { margin-left: auto; background: none; border: none; color: rgba(255,255,255,.6); font-size: 1.2rem; cursor: pointer; line-height: 1; transition: color .2s; }
    .cb-close:hover { color: #fff; }
    /* Messages body */
    .cb-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #F9F8F5; min-height: 0; max-height: 320px; }
    .cb-body::-webkit-scrollbar { width: 4px; }
    .cb-body::-webkit-scrollbar-track { background: transparent; }
    .cb-body::-webkit-scrollbar-thumb { background: #E8E6E0; border-radius: 2px; }
    /* Messages */
    .cb-msg {
      max-width: 88%; padding: 10px 14px;
      border-radius: 16px; font-size: .83rem; line-height: 1.55;
      animation: cbMsgIn .25s ease;
    }
    @keyframes cbMsgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .cb-msg.bot { background: #fff; color: #1C1C1C; border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,.06); align-self: flex-start; }
    .cb-msg.user { background: linear-gradient(135deg, #C4922A, #E8B84B); color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
    .cb-msg p { margin: 0 0 6px; }
    .cb-msg p:last-child { margin: 0; }
    /* Category buttons */
    .cb-cats { padding: 12px 14px; background: #fff; border-top: 1px solid #F0EFEC; display: flex; flex-wrap: wrap; gap: 7px; flex-shrink: 0; }
    .cb-cat-btn {
      padding: 7px 12px; border-radius: 20px;
      background: #F4F3EF; border: 1.5px solid #E8E6E0;
      font-size: .77rem; font-weight: 600; cursor: pointer;
      font-family: 'Poppins', sans-serif; color: #1C1C1C;
      transition: all .2s; white-space: nowrap;
    }
    .cb-cat-btn:hover, .cb-cat-btn.active { background: #0B1E33; color: #fff; border-color: #0B1E33; }
    /* Questions list */
    .cb-qlist { padding: 8px 14px; background: #fff; border-top: 1px solid #F0EFEC; display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; max-height: 160px; overflow-y: auto; }
    .cb-q-btn {
      text-align: left; background: #F9F8F5; border: 1.5px solid #E8E6E0;
      border-radius: 10px; padding: 9px 12px; font-size: .78rem;
      font-family: 'Poppins', sans-serif; cursor: pointer; transition: all .2s;
      color: #1C1C1C; display: flex; align-items: flex-start; gap: 8px;
    }
    .cb-q-btn::before { content: '›'; color: #C4922A; font-weight: 700; font-size: 1rem; line-height: 1.1; flex-shrink: 0; }
    .cb-q-btn:hover { background: #F9EDD0; border-color: #C4922A; color: #0B1E33; }
    /* Input row */
    .cb-input-row { padding: 10px 14px; background: #fff; border-top: 1px solid #F0EFEC; display: flex; gap: 8px; flex-shrink: 0; }
    .cb-input {
      flex: 1; border: 1.5px solid #E8E6E0; border-radius: 20px;
      padding: 9px 14px; font-size: .82rem; font-family: 'Poppins', sans-serif;
      outline: none; transition: border .2s; background: #F9F8F5;
    }
    .cb-input:focus { border-color: #C4922A; background: #fff; }
    .cb-send {
      width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #C4922A, #E8B84B);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all .2s;
    }
    .cb-send:hover { transform: scale(1.08); }
    .cb-send svg { width: 16px; height: 16px; fill: #fff; }
    /* WhatsApp bar */
    .cb-wa-bar { padding: 10px 14px; background: #fff; border-top: 1px solid #F0EFEC; flex-shrink: 0; }
    .cb-wa-btn {
      display: flex; align-items: center; justify-content: center; gap: 7px;
      background: #25D366; color: #fff; border-radius: 10px; padding: 10px;
      font-size: .8rem; font-weight: 600; text-decoration: none;
      transition: background .2s; font-family: 'Poppins', sans-serif;
    }
    .cb-wa-btn:hover { background: #1da851; }
    .cb-wa-btn svg { width: 16px; height: 16px; fill: #fff; }
    /* Back button */
    .cb-back {
      background: none; border: none; cursor: pointer;
      color: #C4922A; font-size: .78rem; font-weight: 600;
      font-family: 'Poppins', sans-serif; display: flex;
      align-items: center; gap: 4px; padding: 8px 14px;
      border-bottom: 1px solid #F0EFEC; width: 100%;
      text-align: left; background: #F9F8F5;
    }
    .cb-back:hover { color: #9B7420; }
    /* Typing indicator */
    .cb-typing { display: flex; gap: 4px; align-items: center; padding: 10px 14px; }
    .cb-typing span { width: 7px; height: 7px; border-radius: 50%; background: #9E9B94; animation: cbDot 1.2s infinite ease; }
    .cb-typing span:nth-child(2) { animation-delay: .2s; }
    .cb-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes cbDot { 0%,80%,100%{transform:scale(.7);opacity:.5} 40%{transform:scale(1);opacity:1} }

    @media (max-width: 420px) {
      #cb-widget { width: calc(100vw - 20px); right: 10px; bottom: 160px; }
    }
  `;
  document.head.appendChild(style);

  /* ── BUILD HTML ── */
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'cb-toggle';
  toggleBtn.setAttribute('aria-label', 'Open chat');
  toggleBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg>`;

  const widget = document.createElement('div');
  widget.id = 'cb-widget';
  widget.setAttribute('role', 'dialog');
  widget.setAttribute('aria-label', 'Afrix Properties Chat');
  widget.innerHTML = `
    <div class="cb-head">
      <div class="cb-head-avatar">🏠</div>
      <div class="cb-head-info">
        <h4>Afrix Assistant</h4>
        <p><span class="cb-online"></span> Online — here to help!</p>
      </div>
      <button class="cb-close" id="cbClose" aria-label="Close chat">&#215;</button>
    </div>
    <div class="cb-body" id="cbBody"></div>
    <div id="cbCats" class="cb-cats"></div>
    <div id="cbQList" class="cb-qlist" style="display:none"></div>
    <div class="cb-input-row">
      <input type="text" id="cbInput" class="cb-input" placeholder="Type your question…" autocomplete="off" />
      <button class="cb-send" id="cbSend" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="cb-wa-bar">
      <a class="cb-wa-btn" id="cbWaBtn" href="${WA_BASE}?text=Hello%20Afrix%20Properties%2C%20I%20need%20help." target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Continue on WhatsApp
      </a>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(widget);

  /* ── ELEMENTS ── */
  const body = document.getElementById('cbBody');
  const cats = document.getElementById('cbCats');
  const qlist = document.getElementById('cbQList');
  const input = document.getElementById('cbInput');
  const waBtn = document.getElementById('cbWaBtn');

  let isOpen = false;
  let currentCat = null;
  let conversationContext = '';

  /* ── OPEN / CLOSE ── */
  function openChat() {
    isOpen = true;
    widget.style.display = 'flex';
    toggleBtn.classList.add('cb-open');
    setTimeout(() => widget.classList.add('cb-show'), 10);
    if (!body.children.length) {
      showWelcome();
    }
    input.focus();
  }

  function closeChat() {
    isOpen = false;
    widget.classList.remove('cb-show');
    toggleBtn.classList.remove('cb-open');
    setTimeout(() => { widget.style.display = 'none'; }, 300);
  }

  toggleBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  document.getElementById('cbClose').addEventListener('click', closeChat);

  /* ── MESSAGES ── */
  function addMsg(text, type = 'bot', html = false) {
    const msg = document.createElement('div');
    msg.className = `cb-msg ${type}`;
    html ? (msg.innerHTML = text) : (msg.textContent = text);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    return msg;
  }

  function addUserMsg(text) { addMsg(text, 'user'); }

  function addBotMsg(text, delay = 400) {
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'cb-msg bot cb-typing';
    typing.innerHTML = `<span></span><span></span><span></span>`;
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    return new Promise(resolve => {
      setTimeout(() => {
        typing.remove();
        const msg = addMsg(text, 'bot', true);
        resolve(msg);
      }, delay);
    });
  }

  /* ── WELCOME ── */
  function showWelcome() {
    addMsg(`<p>👋 Hello! Welcome to <strong>${COMPANY}</strong>.</p><p>I can answer questions about buying, renting, selling, property management, and our diaspora services.</p><p>Pick a category below or type your question!</p>`, 'bot', true);
    showCategories();
  }

  /* ── CATEGORIES ── */
  function showCategories() {
    cats.innerHTML = '';
    qlist.style.display = 'none';
    qlist.innerHTML = '';

    FAQ_DB.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cb-cat-btn';
      btn.textContent = cat.label;
      btn.addEventListener('click', () => selectCategory(cat));
      cats.appendChild(btn);
    });

    // "Other / Ask me" button
    const other = document.createElement('button');
    other.className = 'cb-cat-btn';
    other.textContent = '💬 Ask anything';
    other.addEventListener('click', () => {
      addUserMsg('I have another question');
      addBotMsg('Of course! Type your question below and I\'ll do my best to answer. If I can\'t help, I\'ll connect you to a live agent on WhatsApp. 👇');
      input.focus();
    });
    cats.appendChild(other);
  }

  /* ── SELECT CATEGORY ── */
  function selectCategory(cat) {
    currentCat = cat;
    addUserMsg(cat.label.replace(/^[^ ]+ /, ''));

    // Highlight active
    cats.querySelectorAll('.cb-cat-btn').forEach(b => {
      b.classList.toggle('active', b.textContent === cat.label);
    });

    // Show questions for this category
    qlist.style.display = 'flex';
    qlist.innerHTML = '';

    // Back button
    const back = document.createElement('button');
    back.className = 'cb-back';
    back.innerHTML = '‹ All categories';
    back.addEventListener('click', () => {
      qlist.style.display = 'none';
      qlist.innerHTML = '';
      cats.querySelectorAll('.cb-cat-btn').forEach(b => b.classList.remove('active'));
      currentCat = null;
    });
    qlist.appendChild(back);

    cat.questions.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'cb-q-btn';
      btn.textContent = item.q;
      btn.addEventListener('click', () => answerQuestion(item));
      qlist.appendChild(btn);
    });

    body.scrollTop = body.scrollHeight;
  }

  /* ── ANSWER A QUESTION ── */
  function answerQuestion(item) {
    addUserMsg(item.q);
    conversationContext = item.q;

    // Update WhatsApp button with context
    waBtn.href = `${WA_BASE}?text=${encodeURIComponent(`Hello Afrix Properties, I have a question about: "${item.q}"`)}`;

    addBotMsg(`<p>${item.a}</p><p style="margin-top:8px;font-size:.76rem;color:#9E9B94">💡 Need more help? Chat with an agent on WhatsApp.</p>`);
  }

  /* ── FREE TEXT INPUT ── */
  function handleInput() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMsg(text);

    // Update WhatsApp context
    waBtn.href = `${WA_BASE}?text=${encodeURIComponent(`Hello Afrix Properties, I have a question: "${text}"`)}`;

    // Try to match
    const match = findAnswer(text);
    if (match) {
      addBotMsg(`<p>${match.a}</p><p style="margin-top:8px;font-size:.76rem;color:#9E9B94">💡 Tap "Continue on WhatsApp" below to speak with a live agent.</p>`);
    } else {
      // Keywords for quick answers
      const lower = text.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('fee')) {
        addBotMsg('Our fees vary by service. For buying/selling it\'s a percentage of the sale price; for management it\'s 8–12% of monthly rent. Contact us directly for a personalised quote!');
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('area') || lower.includes('accra') || lower.includes('tema')) {
        addBotMsg('We operate across Accra (East Legon, Cantonments, Airport, Trasacco, Spintex), Tema, Kumasi and Takoradi. Use the location filter on our Properties page to browse by city.');
      } else if (lower.includes('phone') || lower.includes('call') || lower.includes('contact') || lower.includes('number')) {
        addBotMsg('<p>You can reach us at:<br><strong>📱 WhatsApp / Call: 0539484203</strong><br>📧 lotsuibrahim2@gmail.com</p><p>Mon–Sat, 8am–6pm GMT</p>', false);
        const msg = body.lastChild;
        msg.innerHTML = '<p>You can reach us at:<br><strong>📱 WhatsApp / Call: 0539484203</strong><br>📧 lotsuibrahim2@gmail.com</p><p>Mon–Sat, 8am–6pm GMT</p>';
      } else if (lower.includes('list') || lower.includes('sell') || lower.includes('rent out') || lower.includes('landlord')) {
        addBotMsg('Listing your property with us is easy and free to start! We inspect, photograph, and market your property across our platform. WhatsApp us to get started right away.');
      } else if (lower.includes('manage') || lower.includes('management') || lower.includes('tenant')) {
        addBotMsg('Our Property Management service handles everything — tenants, rent collection, maintenance, and monthly reports. Plans start from just 8% of monthly rent. Check our Management page for full details!');
      } else if (lower.includes('diaspora') || lower.includes('abroad') || lower.includes('uk') || lower.includes('usa') || lower.includes('canada')) {
        addBotMsg('Great news — we specialise in helping Ghanaians in the diaspora invest back home safely! We handle everything remotely: virtual tours, legal due diligence, purchase, and ongoing management. Visit our Diaspora Services page!');
      } else {
        // True fallback → WhatsApp
        addBotMsg(`<p>I'm not quite sure about that one! 🤔</p><p>Let me connect you with one of our property experts who can give you a definitive answer.</p><p><strong>Tap "Continue on WhatsApp" below</strong> — they typically reply within minutes! ⬇️</p>`, 600);
      }
    }
  }

  document.getElementById('cbSend').addEventListener('click', handleInput);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });

  /* ── OPEN CHAT IF QUERY PARAM ── */
  if (new URLSearchParams(window.location.search).get('chat') === '1') {
    setTimeout(openChat, 800);
  }

})();
