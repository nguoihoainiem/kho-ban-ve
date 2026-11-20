// Cloudflare Pages Function: /api/visit  (cần gắn KV namespace với tên biến VISITS)
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export async function onRequest({request,env}){
  const kv=env.VISITS; if(!kv) return J({error:'Chưa gắn KV VISITS'},503);
  const day=new Date(Date.now()+7*3600e3).toISOString().slice(0,10); // giờ Việt Nam
  const dk='day:'+day;
  let [t,u,d]=(await Promise.all([kv.get('total'),kv.get('unique'),kv.get(dk)])).map(v=>Number(v)||0);
  if(request.method==='POST'){
    let b={}; try{b=await request.json()}catch(e){}
    const w=[];
    if(b.visit){t++;d++;w.push(kv.put('total',String(t)),kv.put(dk,String(d),{expirationTtl:60*86400}))}
    if(b.unique){u++;w.push(kv.put('unique',String(u)))}
    await Promise.all(w);
  }
  return J({total:t,unique:u,today:d});
}
