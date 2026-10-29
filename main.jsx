import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { Search, MapPin, Menu, Globe, MessageCircle, Sprout, Wheat, Milk, ShoppingBasket, Fish, Wrench, Leaf, Package, UserRound, PlusCircle, X, ArrowRight, ShieldCheck, Clock3, HeartHandshake } from 'lucide-react';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey && !supabaseUrl.includes('YOUR_PROJECT') ? createClient(supabaseUrl, supabaseKey) : null;
const WA = (import.meta.env.VITE_WHATSAPP_NUMBER || '255769001784').replace(/\D/g, '');
const t = {
 sw: {
  tagline:'Mahali fursa zinapokufikia', search:'Tafuta bidhaa, mfano mahindi, asali, vikapu...', region:'Mkoa', district:'Wilaya', allRegions:'Mikoa yote', allDistricts:'Wilaya zote',
  categories:'Makundi ya bidhaa', featured:'Bidhaa zinazotangazwa', rural:'Hazina za vijijini', ruralSub:'Bidhaa bora kutoka kwa wazalishaji ambao hawajapata mwonekano wa kutosha.',
  latest:'Bidhaa zilizowekwa hivi karibuni', viewAll:'Tazama zote', addProduct:'Tangaza bidhaa', signIn:'Ingia / Jisajili', help:'Unahitaji msaada?', contact:'Wasiliana nasi',
  searchBtn:'Tafuta', all:'Bidhaa zote', noProducts:'Bado hakuna bidhaa halisi zilizowekwa. Kuwa wa kwanza kutangaza bidhaa yako!', demo:'Mifano ya bidhaa — si matangazo halisi',
  price:'Bei', negotiable:'Bei kwa makubaliano', quantity:'Kiasi kinachopatikana', location:'Eneo', seller:'Muuzaji', contactSeller:'Wasiliana na muuzaji',
  products:'Bidhaa', tools:'Vifaa na pembejeo', services:'Huduma', about:'Kuhusu KIRAFA', legal:'Sheria na sera', privacy:'Sera ya faragha', terms:'Masharti ya matumizi',
  packages:'Vifurushi', week:'KIRAFA WIKI', month:'KIRAFA MWEZI', days7:'siku 7', days30:'siku 30', trial:'Siku 5 za uzinduzi bure', trialText:'Ofa ya uzinduzi inatumika katika siku 5 za mwanzo za KIRAFA, si kila akaunti mpya.',
  weekDesc:'Hadi bidhaa 10 kwa muda wa kifurushi.', monthDesc:'Bidhaa bila kikomo wakati kifurushi kiko hai, pamoja na tangazo 1 la bure la siku 7.',
  choose:'Chagua kifurushi', loginTitle:'Ingia au jisajili', email:'Barua pepe', password:'Nenosiri', fullName:'Jina kamili', phone:'Namba ya simu', createAccount:'Fungua akaunti', signInAction:'Ingia', logout:'Toka', account:'Akaunti',
  newProduct:'Tangaza bidhaa', productName:'Jina la bidhaa', description:'Maelezo ya bidhaa', category:'Kundi', priceTsh:'Bei (TSh)', qty:'Kiasi na kipimo', productRegion:'Mkoa bidhaa ilipo', productDistrict:'Wilaya', imageUrl:'Kiungo cha picha (hiari)', publish:'Hifadhi tangazo', cancel:'Ghairi', needLogin:'Ingia kwanza ili kutangaza bidhaa.', saved:'Tangazo limehifadhiwa.', failed:'Haikuwezekana kuhifadhi. Hakikisha akaunti na muunganisho wa database vimewekwa.',
  noImage:'Hakuna picha', contactUs:'Wasiliana na KIRAFA', footer:'KIRAFA huunganisha wanunuzi na wauzaji. Malipo ya bidhaa na usafirishaji hupangwa moja kwa moja kati yao; KIRAFA haikusanyi malipo ya bidhaa kwa niaba yao.',
  paymentNote:'Malipo ya vifurushi yatathibitishwa na KIRAFA kabla kifurushi hakijawezeshwa. Usitume PIN au OTP kwa mtu yeyote.',
  policyNote:'Rasimu ya sera — lazima ipitiwe kisheria kabla ya uzinduzi rasmi.', language:'Lugha', allCategories:'Makundi yote', sellerSupport:'Hujui kuweka bidhaa? Tuandikie WhatsApp na tutakusaidia.', districtPlaceholder:'Mf. Mbozi', regionPlaceholder:'Mf. Songwe',
  categoryNames:['Mazao ya shambani','Kilimo: vifaa na pembejeo','Mifugo na bidhaa zake','Sanaa za mikono','Asali na bidhaa za nyuki','Vyakula vilivyosindikwa','Uvuvi na ufugaji samaki','Ufundi na huduma','Miche na bustani','Bidhaa nyingine za wazalishaji'],
  aboutText:'KIRAFA inalenga kuwapa wazalishaji wa mikoani na vijijini nafasi ya kuonyesha bidhaa bora na kufikia wanunuzi wapya.',
  termsText:'Watumiaji wanawajibika kutoa taarifa sahihi na kufuata sheria. KIRAFA inaweza kuondoa matangazo yanayokiuka sera. Wanunuzi na wauzaji hukubaliana moja kwa moja kuhusu bidhaa, bei, malipo na usafirishaji. Masharti haya ni rasimu na yanahitaji mapitio ya kisheria.',
  privacyText:'KIRAFA inapaswa kukusanya taarifa zinazohitajika tu, kuzitumia kwa madhumuni yaliyoelezwa, kuzilinda na kuweka njia ya watumiaji kuomba ufikiaji au marekebisho ya taarifa zao. Sera hii ni rasimu inayohitaji kukamilishwa kulingana na sheria zinazotumika.',
  listingText:'Hairuhusiwi kuweka bidhaa haramu, bandia, za udanganyifu au bidhaa zinazohitaji vibali bila kufuata masharti husika. Ripoti tangazo linalotia wasiwasi kwa KIRAFA.'
 },
 en: {
  tagline:'Where opportunities find you', search:'Search products, e.g. maize, honey, baskets...', region:'Region', district:'District', allRegions:'All regions', allDistricts:'All districts',
  categories:'Product categories', featured:'Promoted products', rural:'Rural treasures', ruralSub:'Quality products from producers who deserve more visibility.',
  latest:'Recently listed products', viewAll:'View all', addProduct:'List a product', signIn:'Sign in / Register', help:'Need help?', contact:'Contact us',
  searchBtn:'Search', all:'All products', noProducts:'No live listings yet. Be the first to list your product!', demo:'Sample items — not real listings',
  price:'Price', negotiable:'Price negotiable', quantity:'Available quantity', location:'Location', seller:'Seller', contactSeller:'Contact seller',
  products:'Products', tools:'Farm inputs & equipment', services:'Services', about:'About KIRAFA', legal:'Legal & policies', privacy:'Privacy policy', terms:'Terms of use',
  packages:'Plans', week:'KIRAFA WEEK', month:'KIRAFA MONTH', days7:'7 days', days30:'30 days', trial:'5-day launch trial', trialText:'The launch offer applies to KIRAFA’s first 5 days, not to every new account.',
  weekDesc:'Up to 10 listings during the plan.', monthDesc:'Unlimited listings while active, plus one free 7-day promoted listing.',
  choose:'Choose plan', loginTitle:'Sign in or register', email:'Email', password:'Password', fullName:'Full name', phone:'Phone number', createAccount:'Create account', signInAction:'Sign in', logout:'Sign out', account:'Account',
  newProduct:'List a product', productName:'Product name', description:'Product description', category:'Category', priceTsh:'Price (TSh)', qty:'Quantity and unit', productRegion:'Region where product is located', productDistrict:'District', imageUrl:'Image URL (optional)', publish:'Save listing', cancel:'Cancel', needLogin:'Sign in first to list a product.', saved:'Listing saved.', failed:'Could not save. Check account and database connection.',
  noImage:'No image', contactUs:'Contact KIRAFA', footer:'KIRAFA connects buyers and sellers. Product payments and transport are arranged directly between them; KIRAFA does not collect product payments on their behalf.',
  paymentNote:'Package payments must be verified by KIRAFA before a plan is activated. Never share your PIN or OTP.',
  policyNote:'Policy draft — legal review is required before official launch.', language:'Language', allCategories:'All categories', sellerSupport:'Need help listing a product? Message us on WhatsApp.',
  categoryNames:['Farm produce','Agriculture: inputs & equipment','Livestock & products','Handmade crafts','Honey & bee products','Processed foods','Fishing & aquaculture','Trades & services','Seedlings & gardening','Other local products'],
  aboutText:'KIRAFA aims to give rural and regional producers a place to showcase quality products and reach new buyers.',
  termsText:'Users must provide accurate information and comply with applicable law. KIRAFA may remove listings that breach its policies. Buyers and sellers agree directly on products, prices, payment and transport. These terms are a draft and require legal review.',
  privacyText:'KIRAFA should collect only necessary information, use it for stated purposes, protect it and provide a way for users to request access or corrections. This policy is a draft and must be completed against applicable law.',
  listingText:'Illegal, counterfeit, deceptive or regulated goods without required permissions are prohibited. Report concerning listings to KIRAFA.'
 }
};
const categories = [
 {icon:Wheat, key:0, color:'#e8b44a'}, {icon:Sprout,key:1,color:'#5d9c65'}, {icon:Milk,key:2,color:'#7da6b8'}, {icon:ShoppingBasket,key:3,color:'#b47d55'}, {icon:Leaf,key:4,color:'#719b49'},
 {icon:Package,key:5,color:'#c78b45'}, {icon:Fish,key:6,color:'#6599b7'}, {icon:Wrench,key:7,color:'#8c91a1'}, {icon:Sprout,key:8,color:'#76a66c'}, {icon:HeartHandshake,key:9,color:'#b982a1'}
];
const demoProducts = [
 {id:'sample1', name:{sw:'Mahindi yaliyovunwa',en:'Harvested maize'}, category:0, price:0, quantity:{sw:'Gunia 50 (mfano)',en:'50 sacks (sample)'}, region:{sw:'Songwe (mfano)',en:'Songwe (sample)'}, district:{sw:'Mbozi (mfano)',en:'Mbozi (sample)'}, image:'', sample:true},
 {id:'sample2', name:{sw:'Asali ya asili',en:'Natural honey'}, category:4, price:0, quantity:{sw:'Lita 100 (mfano)',en:'100 litres (sample)'}, region:{sw:'Tabora (mfano)',en:'Tabora (sample)'}, district:{sw:'Nzega (mfano)',en:'Nzega (sample)'}, image:'', sample:true},
 {id:'sample3', name:{sw:'Vikapu vilivyofumwa kwa mikono',en:'Handwoven baskets'}, category:3, price:0, quantity:{sw:'Vipande 40 (mfano)',en:'40 pieces (sample)'}, region:{sw:'Tanga (mfano)',en:'Tanga (sample)'}, district:{sw:'Lushoto (mfano)',en:'Lushoto (sample)'}, image:'', sample:true}
];
function App(){
 const [lang,setLang] = useState('sw');
 const [listings,setListings] = useState([]);
 const [search,setSearch] = useState('');
 const [cat,setCat] = useState('all');
 const [region,setRegion] = useState('');
 const [district,setDistrict] = useState('');
 const [session,setSession] = useState(null);
 const [showAuth,setShowAuth] = useState(false);
 const [showListing,setShowListing] = useState(false);
 const [page,setPage] = useState('home');
 const [busy,setBusy] = useState(false);
 const [notice,setNotice] = useState('');
 const [authMode,setAuthMode] = useState('signup');
 const [form,setForm] = useState({email:'',password:'',full_name:'',phone:''});
 const [product,setProduct] = useState({name:'',description:'',category:'0',price:'',quantity:'',region:'',district:'',image_url:''});
 const tr=t[lang];
 useEffect(()=>{
  if(!supabase) return;
  supabase.auth.getSession().then(({data})=>setSession(data.session));
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));
  return ()=>subscription.unsubscribe();
 },[]);
 const loadListings=async()=>{
  if(!supabase){setListings([]);return;}
  const {data,error}=await supabase.from('listings').select('*, profiles(full_name, phone)').eq('status','active').order('created_at',{ascending:false}).limit(60);
  if(!error && data) setListings(data);
 };
 useEffect(()=>{loadListings()},[]);
 const filtered=useMemo(()=>listings.filter(p=>{
  const term=search.toLowerCase();
  return (!term || `${p.name} ${p.description||''} ${p.region} ${p.district}`.toLowerCase().includes(term))
   && (cat==='all' || String(p.category)===String(cat))
   && (!region || p.region===region)
   && (!district || p.district===district);
 }),[listings,search,cat,region,district]);
 const notify=(s)=>{setNotice(s);setTimeout(()=>setNotice(''),4500)};
 const signUpOrIn=async(e)=>{
  e.preventDefault(); if(!supabase){notify('Database haijaunganishwa bado. Fuata README ili kuiunganisha.');return}
  setBusy(true);
  try{
   if(authMode==='signup'){
    const {data,error}=await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{full_name:form.full_name,phone:form.phone}}});
    if(error) throw error;
    if(data.session) setSession(data.session);
    notify(lang==='sw'?'Akaunti imeanzishwa. Angalia barua pepe ikiwa uthibitisho unahitajika.':'Account created. Check email if confirmation is required.');
   }else{
    const {data,error}=await supabase.auth.signInWithPassword({email:form.email,password:form.password});
    if(error) throw error; setSession(data.session); notify(lang==='sw'?'Umeingia.':'Signed in.');
   }
   setShowAuth(false);
  }catch(err){notify(err.message||tr.failed)}finally{setBusy(false)}
 };
 const saveListing=async(e)=>{
  e.preventDefault(); if(!session){setShowListing(false);setShowAuth(true);notify(tr.needLogin);return}
  if(!supabase){notify(tr.failed);return}
  setBusy(true);
  const {error}=await supabase.from('listings').insert({...product,category:Number(product.category),price:product.price?Number(product.price):null,seller_id:session.user.id,status:'pending'});
  setBusy(false);
  if(error){notify(error.message||tr.failed);return}
  setShowListing(false);setProduct({name:'',description:'',category:'0',price:'',quantity:'',region:'',district:'',image_url:''});
  notify(lang==='sw'?'Tangazo limetumwa kwa ukaguzi.':'Listing submitted for review.');
  loadListings();
 };
 const signOut=async()=>{if(supabase) await supabase.auth.signOut();setSession(null);notify(lang==='sw'?'Umetoka.':'Signed out.')};
 const wLink=`https://wa.me/${WA}?text=${encodeURIComponent(lang==='sw'?'Habari KIRAFA, naomba msaada.':'Hello KIRAFA, I need assistance.')}`;
 const openAuth=()=>{setAuthMode('signup');setShowAuth(true)};
 const categoryName=(n)=>tr.categoryNames[n]||tr.categoryNames[0];
 const money=(p)=>p==null?tr.negotiable:`TSh ${Number(p).toLocaleString()}`;
 return <div className="app">
  <div className="topline"><span><Sprout size={14}/> {tr.tagline}</span><div className="topright"><span className="launch"><Clock3 size={13}/> {tr.trial}</span><button className="lang" onClick={()=>setLang(lang==='sw'?'en':'sw')}><Globe size={15}/>{lang==='sw'?'SW | EN':'EN | SW'}</button></div></div>
  <header className="header">
   <a className="brand" href="#" onClick={e=>{e.preventDefault();setPage('home')}}>
    <img src="/kirafa-logo.png" alt="KIRAFA logo" onError={e=>e.currentTarget.style.display='none'}/>
    <span className="brandfallback"><b>KIRAFA</b><small>{tr.tagline}</small></span>
   </a>
   <nav><button onClick={()=>setPage('home')}>{lang==='sw'?'Nyumbani':'Home'}</button><button onClick={()=>setPage('packages')}>{tr.packages}</button><button onClick={()=>setPage('legal')}>{tr.legal}</button></nav>
   <div className="head-actions"><button className="outline" onClick={()=>{if(session)setShowListing(true);else openAuth()}}><PlusCircle size={16}/>{tr.addProduct}</button>{session?<button className="iconbtn" title={tr.logout} onClick={signOut}><UserRound size={19}/></button>:<button className="iconbtn" title={tr.signIn} onClick={openAuth}><UserRound size={19}/></button>}<button className="menu-btn" onClick={()=>setPage(page==='menu'?'home':'menu')}><Menu/></button></div>
  </header>
  {page==='menu'&&<div className="mobile-menu"><button onClick={()=>setPage('home')}>{lang==='sw'?'Nyumbani':'Home'}</button><button onClick={()=>setPage('packages')}>{tr.packages}</button><button onClick={()=>setPage('legal')}>{tr.legal}</button></div>}
  {page==='home'&&<>
   <section className="hero">
    <div className="hero-copy"><div className="eyebrow"><span></span>{lang==='sw'?'SOKO LA WAZALISHAJI WA TANZANIA':'TANZANIAN PRODUCER MARKETPLACE'}</div><h1>{lang==='sw'?'Bidhaa bora za wazalishaji.':'Quality products from producers.'}<em>{lang==='sw'?'Fursa mpya kwa wote.':'New opportunities for everyone.'}</em></h1><p>{tr.aboutText}</p>
     <div className="searchbox"><Search size={20}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={tr.search}/><button onClick={()=>document.getElementById('listings')?.scrollIntoView({behavior:'smooth'})}>{tr.searchBtn}<ArrowRight size={16}/></button></div>
     <div className="hero-meta"><span><MapPin size={15}/>{lang==='sw'?'Tafuta kwa mkoa na wilaya':'Search by region and district'}</span><span><ShieldCheck size={15}/>{lang==='sw'?'Soko linalolenga wazalishaji':'Built for producers'}</span></div>
    </div>
    <div className="hero-art"><div className="art-orbit"></div><div className="art-card card-a"><Wheat/><b>{lang==='sw'?'Mazao bora':'Quality produce'}</b><small>{lang==='sw'?'Kutoka kwa wazalishaji':'From producers'}</small></div><div className="art-card card-b"><ShoppingBasket/><b>{lang==='sw'?'Sanaa za mikono':'Handmade crafts'}</b><small>{lang==='sw'?'Ujuzi wenye thamani':'Valuable skills'}</small></div><div className="art-leaf leaf-one">✦</div><div className="art-center"><Sprout size={76}/><span>KIRAFA</span></div><div className="art-card card-c"><MapPin/><b>{lang==='sw'?'Mikoa na vijiji':'Regions & villages'}</b></div></div>
   </section>
   <section className="categories section"><div className="section-head"><div><span className="kicker">{lang==='sw'?'GUNDUA KIRAFA':'EXPLORE KIRAFA'}</span><h2>{tr.categories}</h2></div><span className="count">{categories.length} {lang==='sw'?'makundi':'categories'}</span></div><div className="cat-grid">{categories.map(({icon:Icon,key,color})=><button key={key} className={`cat-tile ${String(cat)===String(key)?'selected':''}`} onClick={()=>setCat(String(cat)===String(key)?'all':String(key))}><span className="cat-icon" style={{'--cat':color}}><Icon size={23}/></span><b>{categoryName(key)}</b><ArrowRight size={15} className="cat-arrow"/></button>)}</div></section>
   <section className="section filters"><div className="section-head"><div><span className="kicker">{lang==='sw'?'TAFUTA KWA ENEO':'SEARCH BY LOCATION'}</span><h2>{lang==='sw'?'Karibu zaidi na soko':'Closer to the market'}</h2></div></div><div className="filter-row"><label>{tr.region}<input value={region} onChange={e=>setRegion(e.target.value)} placeholder={tr.regionPlaceholder}/></label><label>{tr.district}<input value={district} onChange={e=>setDistrict(e.target.value)} placeholder={tr.districtPlaceholder}/></label><button className="soft-btn" onClick={()=>{setRegion('');setDistrict('');setCat('all');setSearch('')}}>{lang==='sw'?'Futa vichujio':'Clear filters'}</button></div></section>
   <section className="section listings" id="listings"><div className="section-head"><div><span className="kicker">{lang==='sw'?'SOKO LA KIRAFA':'KIRAFA MARKETPLACE'}</span><h2>{tr.latest}</h2><p>{tr.ruralSub}</p></div><span className="count">{filtered.length} {lang==='sw'?'matangazo':'listings'}</span></div>
    {!supabase&&<div className="setup-note"><ShieldCheck size={18}/><span>{lang==='sw'?'Muonekano uko tayari. Ili bidhaa halisi na akaunti zifanye kazi, unganisha Supabase kwa kufuata maelekezo kwenye README.':'The interface is ready. Connect Supabase using the README to enable real listings and accounts.'}</span></div>}
    {filtered.length===0?<div className="empty"><div className="empty-icon"><ShoppingBasket size={34}/></div><h3>{tr.noProducts}</h3><p>{lang==='sw'?'Unaweza kuanza kwa kufungua akaunti na kutuma tangazo lako.':'Start by creating an account and submitting your listing.'}</p><button className="primary" onClick={()=>session?setShowListing(true):openAuth()}>{tr.addProduct}<ArrowRight size={16}/></button></div>:<div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-photo">{p.image_url?<img src={p.image_url} alt={p.name}/>:<div className="photo-placeholder"><Sprout size={38}/><span>KIRAFA</span></div>}{p.status==='pending'&&<span className="pending-badge">{lang==='sw'?'Inakaguliwa':'Under review'}</span>}</div><div className="product-info"><span className="product-cat">{categoryName(p.category)}</span><h3>{p.name}</h3><p className="product-desc">{p.description||''}</p><div className="product-price">{money(p.price)}</div><div className="product-quantity">{p.quantity||''}</div><div className="product-location"><MapPin size={14}/>{p.district?`${p.district}, `:''}{p.region}</div><a className="contact-seller" href={p.profiles?.phone?`https://wa.me/${p.profiles.phone.replace(/\D/g,'')}`:wLink} target="_blank" rel="noreferrer"><MessageCircle size={16}/>{tr.contactSeller}</a></div></article>)}</div>}
   </section>
   <section className="launch-band"><div><span className="kicker light">{lang==='sw'?'ANZA SAFARI YAKO':'START YOUR JOURNEY'}</span><h2>{tr.trial}</h2><p>{tr.trialText}</p></div><button onClick={()=>setPage('packages')}>{tr.packages}<ArrowRight size={16}/></button></section>
  </>}
  {page==='packages'&&<main className="content-page"><span className="kicker">{lang==='sw'?'VIFURUSHI VYA KIRAFA':'KIRAFA PLANS'}</span><h1>{tr.packages}</h1><p>{tr.trialText}</p><div className="plans"><article className="plan"><span className="plan-mark"><Clock3/></span><h2>{tr.week}</h2><div className="plan-price">TSh 7,000 <small>/ {tr.days7}</small></div><p>{tr.weekDesc}</p><ul><li>{lang==='sw'?'Bidhaa zisizozidi 10 kwa wakati':'Up to 10 active listings'}</li><li>{lang==='sw'?'Eneo na mawasiliano ya muuzaji':'Seller location and contact'}</li></ul><button className="primary" onClick={()=>notify(tr.paymentNote)}>{tr.choose}</button></article><article className="plan featured-plan"><span className="plan-mark"><Sprout/></span><span className="popular">{lang==='sw'?'KWA MUUZAJI ANAYEKUA':'FOR GROWING SELLERS'}</span><h2>{tr.month}</h2><div className="plan-price">TSh 24,000 <small>/ {tr.days30}</small></div><p>{tr.monthDesc}</p><ul><li>{lang==='sw'?'Bidhaa bila kikomo wakati kifurushi kiko hai':'Unlimited listings while active'}</li><li>{lang==='sw'?'Tangazo 1 la bure la siku 7':'One free 7-day promotion'}</li></ul><button className="primary" onClick={()=>notify(tr.paymentNote)}>{tr.choose}</button></article></div><div className="notice"><ShieldCheck/><p>{tr.paymentNote}</p></div></main>}
  {page==='legal'&&<main className="content-page legal-page"><span className="kicker">KIRAFA / LEGAL</span><h1>{tr.legal}</h1><div className="notice"><ShieldCheck/><p>{tr.policyNote}</p></div><article><h2>{tr.terms}</h2><p>{tr.termsText}</p></article><article><h2>{tr.privacy}</h2><p>{tr.privacyText}</p></article><article><h2>{lang==='sw'?'Sera ya bidhaa na matangazo':'Listings policy'}</h2><p>{tr.listingText}</p></article><article><h2>{lang==='sw'?'Malipo na vifurushi':'Payments & plans'}</h2><p>{tr.paymentNote}</p></article><p className="legal-warning">{tr.policyNote}</p></main>}
  <section className="seller-help"><div className="help-icon"><MessageCircle size={24}/></div><div><h3>{tr.help}</h3><p>{tr.sellerSupport}</p></div><a href={wLink} target="_blank" rel="noreferrer" className="whatsapp"><MessageCircle size={17}/>{tr.contact}</a></section>
  <footer><div className="footer-main"><div className="footer-brand"><div className="footer-logo">KIRAFA</div><p>{tr.tagline}</p><small>{tr.aboutText}</small></div><div><b>{lang==='sw'?'Gundua':'Discover'}</b><button onClick={()=>{setPage('home');window.scrollTo(0,0)}}>{tr.categories}</button><button onClick={()=>setPage('packages')}>{tr.packages}</button><button onClick={()=>setPage('legal')}>{tr.legal}</button></div><div><b>{tr.contactUs}</b><a href={wLink} target="_blank" rel="noreferrer">WhatsApp: 0769001784</a><small>{tr.paymentNote}</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KIRAFA</span><span>{tr.footer}</span></div></footer>
  {showAuth&&<div className="modal-backdrop" onClick={()=>setShowAuth(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowAuth(false)}><X/></button><span className="kicker">{tr.loginTitle}</span><h2>{authMode==='signup'?tr.createAccount:tr.signInAction}</h2><form onSubmit={signUpOrIn}>{authMode==='signup'&&<label>{tr.fullName}<input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></label>}<label>{tr.email}<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>{tr.password}<input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{authMode==='signup'&&<label>{tr.phone}<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>}<button className="primary full" disabled={busy}>{busy?'…':authMode==='signup'?tr.createAccount:tr.signInAction}</button></form><button className="text-button" onClick={()=>setAuthMode(authMode==='signup'?'signin':'signup')}>{authMode==='signup'?(lang==='sw'?'Tayari una akaunti? Ingia':'Already registered? Sign in'):(lang==='sw'?'Huna akaunti? Jisajili':'No account? Register')}</button><p className="fineprint">{lang==='sw'?'Kwa kuendelea unakubali Masharti ya Matumizi na Sera ya Faragha.':'By continuing, you agree to the Terms of Use and Privacy Policy.'}</p></div></div>}
  {showListing&&<div className="modal-backdrop" onClick={()=>setShowListing(false)}><div className="modal listing-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowListing(false)}><X/></button><span className="kicker">{tr.newProduct}</span><h2>{tr.newProduct}</h2><form onSubmit={saveListing}><label>{tr.productName}<input required value={product.name} onChange={e=>setProduct({...product,name:e.target.value})}/></label><label>{tr.description}<textarea value={product.description} onChange={e=>setProduct({...product,description:e.target.value})} rows="3"/></label><label>{tr.category}<select value={product.category} onChange={e=>setProduct({...product,category:e.target.value})}>{tr.categoryNames.map((n,i)=><option key={i} value={i}>{n}</option>)}</select></label><div className="two-col"><label>{tr.priceTsh}<input type="number" min="0" value={product.price} onChange={e=>setProduct({...product,price:e.target.value})}/></label><label>{tr.qty}<input value={product.quantity} onChange={e=>setProduct({...product,quantity:e.target.value})}/></label></div><div className="two-col"><label>{tr.productRegion}<input required value={product.region} onChange={e=>setProduct({...product,region:e.target.value})}/></label><label>{tr.productDistrict}<input value={product.district} onChange={e=>setProduct({...product,district:e.target.value})}/></label></div><label>{tr.imageUrl}<input type="url" placeholder="https://..." value={product.image_url} onChange={e=>setProduct({...product,image_url:e.target.value})}/></label><button className="primary full" disabled={busy}>{busy?'…':tr.publish}</button></form><button className="text-button" onClick={()=>setShowListing(false)}>{tr.cancel}</button></div></div>}
  {notice&&<div className="toast" role="status">{notice}<button onClick={()=>setNotice('')}><X size={15}/></button></div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);