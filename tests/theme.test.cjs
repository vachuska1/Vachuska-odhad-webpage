const {test} = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = ts.transpileModule(fs.readFileSync('lib/theme.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
const localTime = (day,hour,minute=0,second=0) => new Date(2026,10,day,hour,minute,second).getTime()
function boot(timestamp, storage=new Map(), blocked=false) {
 let now=timestamp, nextId=0
 const timers=new Map(), handlers={}, documentHandlers={}
 class Clock extends Date { constructor(...args){super(...(args.length?args:[now]))} static now(){return now} }
 const root={dataset:{},style:{}}
 const context={exports:{},Date:Clock,Event,localStorage:{getItem:key=>{if(blocked)throw Error();return storage.get(key)||null},setItem:(key,value)=>{if(blocked)throw Error();storage.set(key,value)},removeItem:key=>{if(blocked)throw Error();storage.delete(key)}},document:{documentElement:root,hidden:false,addEventListener:(name,fn)=>{documentHandlers[name]=fn}},window:{addEventListener:(name,fn)=>{handlers[name]=fn},dispatchEvent:()=>{}},setTimeout:(fn,delay)=>{timers.set(++nextId,{fn,delay});return nextId},clearTimeout:id=>timers.delete(id)}
 vm.runInNewContext(source,context)
 vm.runInNewContext(context.exports.themeScript,context)
 return {api:context.window.__vachuskaTheme,root,storage,timers,handlers,context,advance:timestamp=>{now=timestamp;context.window.__vachuskaTheme.refresh()}}
}
test('first visit always uses light, including at night',()=>{
 for(const hour of [0,7,8,19,20,23]){
  const x=boot(localTime(1,hour));assert.equal(x.root.dataset.theme,'light');assert.equal(x.root.style.colorScheme,'light');assert.equal(x.timers.size,0)
 }
})
test('manual choice survives reload and later visits without expiry',()=>{
 const x=boot(localTime(1,10));x.api.setTheme('dark');assert.equal(x.api.getTheme(),'dark')
 const reloaded=boot(localTime(8,11),x.storage);assert.equal(reloaded.api.getTheme(),'dark')
 reloaded.advance(localTime(9,8));assert.equal(reloaded.api.getTheme(),'dark')
 reloaded.api.setTheme('light');assert.equal(boot(localTime(10,23),x.storage).api.getTheme(),'light')
})
test('blocked or corrupt storage keeps theme usable and sync works across tabs',()=>{
 const blocked=boot(localTime(1,11),new Map(),true);blocked.api.setTheme('dark');blocked.advance(localTime(2,9));assert.equal(blocked.api.getTheme(),'dark')
 for(const value of ['invalid JSON','null','{}','{"theme":"invalid"}']){
  assert.equal(boot(localTime(1,22),new Map([['odhady-theme-v1',value]])).api.getTheme(),'light')
 }
 const x=boot(localTime(1,10));x.api.setTheme('dark');x.storage.delete('odhady-theme-v1');x.handlers.storage({key:'odhady-theme-v1'});assert.equal(x.api.getTheme(),'light')
 vm.runInNewContext(x.context.exports.themeScript,x.context);assert.equal(x.api.getTheme(),'light')
})

test('toggle recovers when the head initializer is missing and handles repeated clicks',()=>{
 const x=boot(localTime(1,22))
 delete x.context.window.__vachuskaTheme
 const themeModule=x.context.exports
 const imports={
  react:{useSyncExternalStore:(subscribe,snapshot)=>{subscribe(()=>{});return snapshot()}},
  'react/jsx-runtime':{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})},
  'lucide-react':{Moon:()=>null,Sun:()=>null},
  '@/components/locale-provider':{useLocale:()=>({locale:'cs'})},
  '@/lib/theme':themeModule,
 }
 x.context.require=name=>imports[name]
 x.context.exports={}
 const component=ts.transpileModule(fs.readFileSync('components/theme-toggle.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText
 vm.runInNewContext(component,x.context)
 const toggle=x.context.exports.ThemeToggle()
 assert.equal(x.root.dataset.theme,'light')
 // Simulate losing the initializer during a development refresh as well.
 delete x.context.window.__vachuskaTheme
 for(const theme of ['dark','light','dark']){toggle.props.onClick();assert.equal(x.root.dataset.theme,theme)}
 assert.equal(boot(localTime(8,9),x.storage).api.getTheme(),'dark')
})
