const {test} = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
// A synthetic identifier is used only in this isolated VM. No network or real tags.
function setup(configured = true) {
 const scripts = [], deletions = []
 const location = { href: 'https://www.odhadyvachuska.cz/odhad-pro-dedicke-rizeni?utm_source=seznam&utm_medium=cpc&utm_campaign=dedictvi&email=private#x', origin: 'https://www.odhadyvachuska.cz', hostname:'www.odhadyvachuska.cz', pathname:'/odhad-pro-dedicke-rizeni', reload(){this.reloaded=true} }
 const document = { title:'Dědictví', referrer:'https://search.seznam.cz/?q=private', createElement:()=>({}), head:{appendChild:s=>scripts.push(s)}, get cookie(){return '_ga=old; _ga_X=old; unrelated=keep'}, set cookie(v){deletions.push(v)} }
 const context = { exports:{}, process:{env:{NEXT_PUBLIC_GTM_ID: configured ? ['GTM','UNITTEST'].join('-') : ''}}, window:{location}, document, URL, Date }
 vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/analytics.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,context)
 return {...context, api:context.exports, scripts, deletions, events:()=>context.window.dataLayer?.filter(x=>x.event)||[]}
}
test('no ID or no consent means no script and no queued visitor events',()=>{
 for(const configured of [true,false]) {const x=setup(configured); x.api.trackPageView();x.api.trackLead(true,'Dědictví','/');assert.equal(x.events().length,0); if(!configured){x.api.setAnalyticsConsent(true);x.api.trackPageView();assert.equal(x.scripts.length,0);assert.equal(x.events().length,0)}}
})
test('consent precedes single GTM load, no duplicate views, SPA and Sklik attribution retained',()=>{
 const x=setup();x.api.captureAnalyticsLanding();x.window.location.href='https://www.odhadyvachuska.cz/nejcastejsi-dotazy';x.window.location.pathname='/nejcastejsi-dotazy';x.api.setAnalyticsConsent(true);x.api.setAnalyticsConsent(true);x.api.trackPageView();x.api.trackPageView();assert.equal(x.scripts.length,1)
 assert.equal(x.window.dataLayer[0][0],'consent');assert.equal(x.window.dataLayer[0][1],'default');assert.equal(x.window.dataLayer[0][2].analytics_storage,'denied');assert.equal(x.window.dataLayer[1][2].analytics_storage,'granted');assert.equal(x.window.dataLayer[1][2].ad_storage,'denied')
 const views=x.events().filter(e=>e.event==='page_view');assert.equal(views.length,1);assert.equal(views[0].campaign_source,'seznam');assert.equal(views[0].campaign_medium,'cpc');assert.equal(views[0].campaign_name,'dedictvi');assert.ok(!JSON.stringify(x.window.dataLayer).includes('private'))
 x.window.location.href='https://www.odhadyvachuska.cz/en/faq';x.window.location.pathname='/en/faq';x.api.trackPageView();assert.equal(x.events().filter(e=>e.event==='page_view').length,2)
})
test('lead only after success, fixed service values, contacts and withdrawal',()=>{
 const x=setup();x.api.setAnalyticsConsent(true);x.api.trackLead(false,'Dědictví','/');assert.equal(x.events().filter(e=>e.event==='generate_lead').length,0);x.api.trackLead(true,'Dědictví','/odhad-pro-dedicke-rizeni');assert.equal(x.events().at(-1).service_type,'inheritance')
 for(const [href,event] of [['tel:+420774104020','click_phone'],['mailto:odhadyvachuska@gmail.com?body=private','click_email']]){x.api.trackContactClick({getAttribute:()=>href,textContent:'Kontakt'});assert.equal(x.events().at(-1).event,event);assert.ok(!x.events().at(-1).link_url.includes('private'))}
 const count=x.events().length;x.api.revokeAnalytics();x.api.trackLead(true,'Dědictví','/');x.api.trackPageView();assert.equal(x.events().length,count);assert.equal(x.window.location.reloaded,true);assert.ok(x.deletions.length>0);assert.ok(x.deletions.every(c=>!c.startsWith('unrelated')))
})
test('expired consent blocks events',()=>{const x=setup();x.api.setAnalyticsConsent(true,Date.now()-1);x.api.trackPageView();x.api.trackLead(true,'Dědictví','/');assert.equal(x.events().length,0);assert.equal(x.scripts.length,0)})
test('actual form handler: server failure/exception never measures, double submission is locked',async()=>{
 const source=ts.transpileModule(fs.readFileSync('components/contact-form.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText
 for(const outcome of ['success','failure','exception']) {
  let calls=0,resets=0;const leads=[];let finish;const pending=new Promise(r=>finish=r)
  const imports={react:{useState:value=>[value,()=>{}],useRef:current=>({current})},'react/jsx-runtime':{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})},'@/components/locale-provider':{useLocale:()=>({t:x=>x,href:x=>x,locale:'cs'})},'@/lib/enquiry':{ENQUIRY_TYPES:[],PROPERTY_GROUPS:[],attachmentError:()=>null},'@/lib/analytics':{trackLead:(...args)=>leads.push(args)},'@/app/actions/send-email':{sendEmail:async()=>{calls++;await pending;if(outcome==='exception')throw Error('offline');return {success:outcome==='success',message:'result'}}}}
  class Data {constructor(){this.values=new Map([['service','Dědictví']])}set(k,v){this.values.set(k,v)}get(k){return this.values.get(k)}append(){}}
  const ctx={exports:{},require:name=>imports[name]||{},window:{location:{pathname:'/odhad-pro-dedicke-rizeni'}},FormData:Data}
  vm.runInNewContext(source,ctx);const form=ctx.exports.ContactForm({});const event={preventDefault(){},currentTarget:{reset(){resets++}}}
  const first=form.props.onSubmit(event);await form.props.onSubmit(event);finish();await first
  assert.equal(calls,1);assert.equal(leads.length,outcome==='success'?1:0);assert.equal(resets,outcome==='success'?1:0)
  if(leads.length)assert.deepEqual([...leads[0]],[true,'Dědictví','/odhad-pro-dedicke-rizeni'])
 }
})
