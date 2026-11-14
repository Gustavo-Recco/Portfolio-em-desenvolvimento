const c=document.getElementById('orb'),x=c.getContext('2d');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const N=150,P=[],E=[];

for(let i=0;i<N;i++){
  const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),t=i*2.399963;P.push([Math.cos(t)*r,y,Math.sin(t)*r])
}
for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
  const d=Math.hypot(P[i][0]-P[j][0],P[i][1]-P[j][1],P[i][2]-P[j][2]);if(d<.4)E.push([i,j])
  }
let w,h,R,ay=.6,ax=.35,tx=.35;
function size(){
  const d=devicePixelRatio||1,r=c.getBoundingClientRect();w=r.width;h=r.height;R=Math.min(w,h)*.4;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);draw()
}
function pr(p){
  const x1=p[0]*Math.cos(ay)+p[2]*Math.sin(ay),z1=-p[0]*Math.sin(ay)+p[2]*Math.cos(ay);
  return[w/2+x1*R,h/2+(p[1]*Math.cos(ax)-z1*Math.sin(ax))*R,p[1]*Math.sin(ax)+z1*Math.cos(ax)]
}
function ring(f){x.beginPath();
  let a=null;for(let i=0;i<=64;i++){const q=pr(f(i/64*Math.PI*2));
    a=a||q;if(i)x.lineTo(q[0],q[1]);else x.moveTo(q[0],q[1])}
  }
function draw(){
  x.clearRect(0,0,w,h);
  x.lineWidth=1;
  for(const la of[-60,-30,0,30,60]){const y=Math.sin(la*Math.PI/180),r=Math.cos(la*Math.PI/180);
    ring(t=>[Math.cos(t)*r,y,Math.sin(t)*r]);x.strokeStyle='rgba(92,225,230,.14)';
    x.stroke()}
  for(let m=0;m<6;m++){const o=m*Math.PI/6;
    ring(t=>[Math.cos(t)*Math.cos(o),Math.sin(t),Math.cos(t)*Math.sin(o)]);x.strokeStyle='rgba(155,140,255,.14)';
    x.stroke()
  }
  const Q=P.map(pr);
  for(const[i,j]of E){const z=(Q[i][2]+Q[j][2])/2;
    x.strokeStyle=`rgba(92,225,230,${.06+.28*(z+1)/2})`;
    x.beginPath();
    x.moveTo(Q[i][0],Q[i][1]);
    x.lineTo(Q[j][0],Q[j][1]);
    x.stroke()
  }
  for(const q of Q){x.fillStyle=`rgba(190,250,255,${.25+.7*(q[2]+1)/2})`;x.beginPath();
  x.arc(q[0],q[1],1+1.2*(q[2]+1)/2,0,6.283);
  x.fill()}
}
function loop(){
  ay+=.0035;ax+=(tx-ax)*.05;draw();
  requestAnimationFrame(loop)
}
addEventListener('resize',size);
if(!still)addEventListener('pointermove',e=>{tx=.35+(e.clientY/innerHeight-.5)*.5});
size();if(!still)loop();
