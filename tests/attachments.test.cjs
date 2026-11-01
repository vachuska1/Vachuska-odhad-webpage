const {test} = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
function compile(path, imports={}, globals={}) {
 const context={exports:{},require:n=>imports[n],File,Blob,...globals}
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,context)
 return context.exports
}
const shared=compile('lib/enquiry.ts')
function setup({fail=false,large=false}={}) {
 const draws=[], qualities=[];let closed=0
 const api=compile('lib/optimize-attachments.ts',{'./enquiry':shared},{createImageBitmap:async(file,options)=>{assert.equal(options.imageOrientation,'from-image');if(fail)throw Error();return {width:4000,height:3000,close(){closed++}}},document:{createElement:()=>({getContext:()=>({drawImage:(_b,_x,_y,w,h)=>draws.push([w,h])}),toBlob:(cb,type,q)=>{qualities.push(q);cb(new Blob([new Uint8Array(large?400000:100000)],{type}))}})}})
 return {api,draws,qualities,closed:()=>closed}
}
test('large phone photo is oriented, resized and compressed; PDF stays unchanged',async()=>{
 const x=setup();const pdf=new File(['%PDF-test'],'plan.pdf');const photo=new File([new Uint8Array(5*1024*1024)],'phone.jpg')
 const result=await x.api.optimizeAttachments([photo,pdf]);assert.deepEqual(x.draws,[[1920,1440]]);assert.equal(x.closed(),1);assert.equal(result[1],pdf);assert.equal(result[0].size,100000);assert.equal(x.api.optimizedAttachmentError(result),null)
})
test('many photos fit, excessive batches retry quality and remain removable',async()=>{
 const files=Array.from({length:12},(_,i)=>new File([new Uint8Array(900000)],`${i}.jpg`))
 const small=setup();assert.equal(small.api.optimizedAttachmentError(await small.api.optimizeAttachments(files)),null)
 const x=setup({large:true});const result=await x.api.optimizeAttachments(files);assert.ok(x.qualities.includes(.66));assert.equal(x.api.optimizedAttachmentError(result),x.api.TOO_LARGE);assert.equal(x.api.optimizedAttachmentError(result.slice(0,3)),null)
})
test('preserves smaller originals and lossless plan resolution; rejects invalid files',async()=>{
 const x=setup();const jpg=new File(['tiny'],'small.jpg');const png=new File([new Uint8Array(200000)],'plan.png');const result=await x.api.optimizeAttachments([jpg,png]);assert.equal(result[0],jpg);assert.equal(result[1].type,'image/png');assert.deepEqual(x.draws[1],[4000,3000]);await assert.rejects(x.api.optimizeAttachments([new File(['x'],'bad.exe')]));await assert.rejects(x.api.optimizeAttachments([new File([],'empty.jpg')]));await assert.rejects(x.api.optimizeAttachments(Array(21).fill(jpg)))
 const bad=setup({fail:true});await assert.rejects(bad.api.optimizeAttachments([jpg]));const pdf=new File([new Uint8Array(3500000)],'large.pdf');assert.equal(x.api.optimizedAttachmentError(await x.api.optimizeAttachments([pdf])),null);const oversized=new File([new Uint8Array(4200000)],'oversized.pdf');assert.equal(x.api.optimizedAttachmentError(await x.api.optimizeAttachments([oversized])),x.api.TOO_LARGE)
})
test('thirteen articles use four categories, valid services and at most three related articles',()=>{
 const {articles,articleCategories,articleCategory,relatedArticles}=compile('lib/articles.ts');assert.equal(articles.length,13);assert.equal(new Set(articles.map(a=>a.slug)).size,13);assert.equal(new Set(articles.map(a=>a.description)).size,13)
 assert.deepEqual(Array.from(articleCategories,c=>articles.filter(a=>a.category===c.id).length),[7,3,2,1])
 for(const a of articles){assert.ok(!a.title.includes('\n'));assert.ok(a.title.length<150);assert.ok(a.blocks.length>0);const category=articleCategory(a);assert.ok(fs.existsSync(`app/(cs)${category.servicePath}/page.tsx`));assert.ok(shared.ENQUIRY_TYPES.includes(category.enquiryType));const related=relatedArticles(a);assert.equal(related.length,3);assert.ok(related.every(item=>item.slug!==a.slug));assert.equal(new Set(related.map(item=>item.slug)).size,3)}
})
