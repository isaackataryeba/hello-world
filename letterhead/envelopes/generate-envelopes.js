const { jsPDF } = require('jspdf'); const path=require('path');
const OUT=process.argv[2];
const BLUE='#3d93d1', INK='#111827', GREY='#5b6676';
const SIZES=[ // w,h (landscape), scale s
  {id:'C4',w:324,h:229,s:1.25,note:'C4 · 324 × 229 mm · A4 flat'},
  {id:'C5',w:229,h:162,s:1.0,note:'C5 · 229 × 162 mm · A4 folded once'},
  {id:'DL',w:220,h:110,s:0.9,note:'DL · 220 × 110 mm · A4 folded in thirds'},
];
function draw(doc,z){
  const {w,h,s}=z, m=14*s;
  // mark
  const r=5.2*s, cx=m+r, cy=m+r;
  doc.setFillColor(BLUE); doc.circle(cx,cy,r,'F');
  doc.setFont('helvetica','bold'); doc.setTextColor('#ffffff'); doc.setFontSize(12.5*s);
  doc.text('A',cx,cy+1.55*s*1.6,{align:'center'});
  const tx=m+2*r+3.2*s;
  doc.setTextColor(INK); doc.setFontSize(15.5*s); doc.text('Astrid',tx,cy+0.6*s);
  doc.setTextColor(BLUE); doc.setFontSize(5.4*s); doc.text('TECHNOLOGY LIMITED',tx+0.2*s,cy+4.3*s);
  // return address
  doc.setFont('helvetica','normal'); doc.setTextColor(GREY); doc.setFontSize(6.8*s);
  const ay=cy+r+7*s, lh=3.3*s;
  ['Plot 156 Namugongo–Bulindo Road','Kampala, Uganda','astridtechnology.site'].forEach((l,i)=>doc.text(l,m,ay+i*lh));
  // bottom edge bar
  const bh=2.4*s;
  doc.setFillColor(BLUE); doc.rect(0,h-bh,w,bh,'F');
  doc.setFillColor(INK); doc.rect(0,h-bh,m+2*r+20*s,bh,'F');
}
const all=new jsPDF({unit:'mm',format:[SIZES[0].w,SIZES[0].h],orientation:'landscape'});
SIZES.forEach((z,i)=>{
  if(i) all.addPage([z.w,z.h],'landscape'); draw(all,z);
  const one=new jsPDF({unit:'mm',format:[z.w,z.h],orientation:'landscape'});
  one.setProperties({title:'Astrid Technology envelope '+z.id}); draw(one,z);
  one.save(path.join(OUT,'astrid-envelope-'+z.id+'.pdf'));
});
all.setProperties({title:'Astrid Technology envelopes'});
all.save(path.join(OUT,'astrid-envelopes-all.pdf'));
