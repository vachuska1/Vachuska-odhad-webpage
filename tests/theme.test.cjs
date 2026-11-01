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
test('local clock sets light at 08:00 and dark at 20:00 before any body exists',()=>{
 for(const [hour,minute,expected] of [[0,0,'dark'],[7,59,'dark'],[8,0,'light'],[19,59,'light'],[20,0,'dark'],[23,59,'dark']]){
  const x=boot(localTime(1,hour,minute));assert.equal(x.root.dataset.theme,expected);assert.equal(x.root.style.colorScheme,expected);assert.equal(x.timers.size,1)
 }
})
test('automatic boundary timer crosses both periods and the following morning',()=>{
 const x=boot(localTime(1,7,59,59));assert.equal([...x.timers.values()][0].delay,1000)
 x.advance(localTime(1,8));assert.equal(x.api.getTheme(),'light');assert.equal([...x.timers.values()][0].delay,12*60*60*1000)
 x.advance(localTime(1,20));assert.equal(x.api.getTheme(),'dark');assert.equal([...x.timers.values()][0].delay,12*60*60*1000)
 x.advance(localTime(2,8));assert.equal(x.api.getTheme(),'light')
})
test('manual choice survives reload/navigation and expires at the next local boundary',()=>{
 const x=boot(localTime(1,10));x.api.setTheme('dark');assert.equal(x.api.getTheme(),'dark')
 const reloaded=boot(localTime(1,11),x.storage);assert.equal(reloaded.api.getTheme(),'dark');assert.equal(JSON.parse(x.storage.get('odhady-theme-v1')).expiresAt,localTime(1,20))
 reloaded.advance(localTime(1,20));assert.equal(reloaded.api.getTheme(),'dark');assert.equal(x.storage.has('odhady-theme-v1'),false)
 reloaded.advance(localTime(2,8));assert.equal(reloaded.api.getTheme(),'light')
 const night=boot(localTime(2,22));night.api.setTheme('light');assert.equal(JSON.parse(night.storage.get('odhady-theme-v1')).expiresAt,localTime(3,8))
})
test('sleep recovery, corrupt storage and disabled persistence keep theme usable',()=>{
 const blocked=boot(localTime(1,11),new Map(),true);blocked.api.setTheme('dark');assert.equal(blocked.api.getTheme(),'dark');blocked.advance(localTime(1,20));assert.equal(blocked.api.getTheme(),'dark');blocked.advance(localTime(2,9));assert.equal(blocked.api.getTheme(),'light')
 const corrupt=boot(localTime(1,22),new Map([['odhady-theme-v1','invalid JSON']]));assert.equal(corrupt.api.getTheme(),'dark')
 const expired=boot(localTime(1,22),new Map([['odhady-theme-v1',JSON.stringify({theme:'light',expiresAt:localTime(1,20)})]]));assert.equal(expired.api.getTheme(),'dark')
 const x=boot(localTime(1,10));x.api.setTheme('dark');x.storage.delete('odhady-theme-v1');x.handlers.storage({key:'odhady-theme-v1'});assert.equal(x.api.getTheme(),'light')
 vm.runInNewContext(x.context.exports.themeScript,x.context);assert.equal(x.timers.size,1)
})
