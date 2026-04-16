const app=document.getElementById("app");

let userName="",questions=[],index=0,score=0,timeLeft=0,timer;
let userAnswers=[];

const modes={
rapid:{q:10,time:30},
standard:{q:20,time:60},
practice:{q:30,time:0}
};

function toggleTheme(){
document.body.classList.toggle("dark");
document.getElementById("themeBtn").textContent =
document.body.classList.contains("dark")?"☀️":"🌙";
}

function escapeHTML(text){
return text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function shuffle(arr){
for(let i=arr.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1));
[arr[i],arr[j]]=[arr[j],arr[i]];
}
return arr;
}

const html=[
{q:"HTML stands for?",o:["HyperText Markup Language","HighText Machine Language","None","None"],a:0},
{q:"Tag used for hyperlink?",o:["a tag","link tag","href tag","url tag"],a:0},
{q:"Tag used to display image?",o:["img tag","image tag","pic tag","src tag"],a:0},
{q:"Line break tag?",o:["br tag","lb tag","break tag","line tag"],a:0},
{q:"Table row tag?",o:["tr tag","td tag","th tag","row tag"],a:0},
{q:"Table data tag?",o:["td tag","tr tag","th tag","data tag"],a:0},
{q:"Heading tag?",o:["h1 tag","p tag","title tag","head tag"],a:0},
{q:"Paragraph tag?",o:["p tag","text tag","para tag","body tag"],a:0},
{q:"Body tag contains?",o:["Page content","Metadata","None","None"],a:0},
{q:"Head tag contains?",o:["Metadata","Content","None","None"],a:0},

{q:"List item tag?",o:["li tag","ul tag","ol tag","item tag"],a:0},
{q:"Unordered list tag?",o:["ul tag","ol tag","li tag","list tag"],a:0},
{q:"Ordered list tag?",o:["ol tag","ul tag","li tag","list tag"],a:0},
{q:"HTML file extension?",o:[".html",".doc",".txt",".exe"],a:0},
{q:"HTML is?",o:["Markup language","Programming","Database","None"],a:0},

{q:"Bold text tag?",o:["strong tag","b tag","bold tag","None"],a:0},
{q:"Italic text tag?",o:["em tag","i tag","italic tag","None"],a:0},
{q:"Audio tag?",o:["audio tag","sound tag","music tag","None"],a:0},
{q:"Video tag?",o:["video tag","movie tag","media tag","None"],a:0},
{q:"Navigation tag?",o:["nav tag","menu tag","header tag","None"],a:0},

{q:"Footer tag?",o:["footer tag","bottom tag","end tag","None"],a:0},
{q:"Main content tag?",o:["main tag","section tag","body tag","None"],a:0},
{q:"Div tag used for?",o:["Grouping","Styling","Link","None"],a:0},
{q:"Span tag used for?",o:["Inline grouping","Block","Table","None"],a:0},
{q:"Iframe used for?",o:["Embed page","Image","Video","None"],a:0},

{q:"Mark tag used for?",o:["Highlight","Bold","Italic","None"],a:0},
{q:"Progress tag?",o:["Progress bar","Text","Image","None"],a:0},
{q:"Form tag used for?",o:["User input","Display","Style","None"],a:0},
{q:"Input tag used for?",o:["User input","Text","Image","None"],a:0},
{q:"Meta tag used for?",o:["Metadata","Content","Style","None"],a:0}
];

const css=[
{q:"CSS stands for?",o:["Cascading Style Sheets","Creative","Color","None"],a:0},
{q:"Text color property?",o:["color","font-color","text","bg"],a:0},
{q:"Background color?",o:["background-color","color","bg","None"],a:0},
{q:"Class selector?",o:[".","#","*","@"],a:0},
{q:"ID selector?",o:["#",".","*","@"],a:0},
{q:"Font size?",o:["font-size","size","text-size","None"],a:0},
{q:"Bold property?",o:["font-weight","bold","text","None"],a:0},
{q:"Italic value?",o:["italic","bold","normal","None"],a:0},
{q:"Margin property?",o:["margin","padding","gap","None"],a:0},
{q:"Padding property?",o:["padding","margin","gap","None"],a:0},

{q:"Width property?",o:["width","size","length","None"],a:0},
{q:"Height property?",o:["height","size","length","None"],a:0},
{q:"Text align?",o:["text-align","align","font","None"],a:0},
{q:"Center value?",o:["center","middle","align","None"],a:0},
{q:"Border property?",o:["border","outline","edge","None"],a:0},
{q:"Border radius?",o:["border-radius","radius","curve","None"],a:0},
{q:"Display flex?",o:["layout","color","font","None"],a:0},
{q:"Default position?",o:["static","absolute","fixed","None"],a:0},
{q:"Opacity property?",o:["opacity","visibility","alpha","None"],a:0},
{q:"Opacity 0?",o:["Invisible","Visible","Half","None"],a:0},

{q:"Overflow property?",o:["overflow","flow","hidden","None"],a:0},
{q:"Cursor property?",o:["cursor","pointer","mouse","None"],a:0},
{q:"Box shadow?",o:["box-shadow","shadow","border","None"],a:0},
{q:"Text shadow?",o:["text-shadow","font-shadow","shadow","None"],a:0},
{q:"Gap property?",o:["gap","space","margin","None"],a:0},
{q:"Remove bullets?",o:["list-style none","remove","hide","None"],a:0},
{q:"Display grid?",o:["layout","grid","style","None"],a:0},
{q:"Flex direction?",o:["flex-direction","direction","layout","None"],a:0},
{q:"Z index?",o:["layer order","color","size","None"],a:0},
{q:"Visibility property?",o:["visibility","display","show","None"],a:0}
];

const js=[
{q:"JavaScript is?",o:["Scripting language","Markup","Style","None"],a:0},
{q:"Variable keyword?",o:["var","int","string","None"],a:0},
{q:"Modern keyword?",o:["let","var","const","None"],a:0},
{q:"Constant keyword?",o:["const","let","var","None"],a:0},
{q:"Alert function?",o:["alert()","print","msg","None"],a:0},
{q:"Console log?",o:["console.log()","print","alert","None"],a:0},
{q:"Assignment operator?",o:["=","==","===","None"],a:0},
{q:"Loose equality?",o:["==","=","===","None"],a:0},
{q:"Strict equality?",o:["===","==","=","None"],a:0},
{q:"Array index?",o:["0","1","-1","None"],a:0},

{q:"Boolean values?",o:["true false","yes no","1 0","None"],a:0},
{q:"Not a data type?",o:["float","string","boolean","None"],a:0},
{q:"typeof used for?",o:["Check type","Print","Loop","None"],a:0},
{q:"NaN means?",o:["Not a Number","New","Null","None"],a:0},
{q:"Single comment?",o:["//","<!-- -->","**","#"],a:0},
{q:"Multi comment?",o:["/* */","//","<!-- -->","#"],a:0},
{q:"Add element end?",o:["push","pop","shift","None"],a:0},
{q:"Remove last?",o:["pop","push","shift","None"],a:0},
{q:"Remove first?",o:["shift","pop","push","None"],a:0},
{q:"Add first?",o:["unshift","push","shift","None"],a:0},

{q:"Loop keyword?",o:["for","if","switch","None"],a:0},
{q:"While keyword?",o:["while","for","loop","None"],a:0},
{q:"If keyword?",o:["if","check","when","None"],a:0},
{q:"Else used for?",o:["Alternative","Loop","Function","None"],a:0},
{q:"Function keyword?",o:["function","def","fun","None"],a:0},
{q:"Return does?",o:["Returns value","Prints","Loops","None"],a:0},
{q:"Click event?",o:["onclick","onpress","onhit","None"],a:0},
{q:"DOM stands for?",o:["Document Object Model","Data Model","None","None"],a:0},
{q:"Math random?",o:["Random number","Fixed","Integer","None"],a:0},
{q:"Date function?",o:["Date time","Math","String","None"],a:0}
];

const db={html,css,js};
function home(){
clearInterval(timer);
userAnswers=[];

app.innerHTML=`
<div class="card">
<h2>Enter Name</h2>
<input id="name" placeholder="Your Name">

<h2>Select Mode</h2>
<select id="mode">
<option value="rapid">Rapid</option>
<option value="standard">Standard</option>
<option value="practice">Practice</option>
</select>

<h2>Select Topic</h2>

<div class="topic-buttons">
<button onclick="startQuiz('html')">HTML</button>
<button onclick="startQuiz('css')">CSS</button>
<button onclick="startQuiz('js')">JavaScript</button>
<button onclick="startQuiz('fusion')">Fusion</button>
</div>
</div>
`;
}
function startQuiz(topic){
let mode=modes[document.getElementById("mode").value];
userName=document.getElementById("name").value||"Guest";

let pool = topic==="fusion"
?[...db.html,...db.css,...db.js]
:[...db[topic]];

questions=shuffle([...pool]).slice(0,mode.q);

index=0;
score=0;
timeLeft=mode.time;
clearInterval(timer);
showQuestion();
if(mode.time>0){
timer=setInterval(()=>{
timeLeft--;
if(timeLeft<=0){
clearInterval(timer);
showResult();
}else{
document.getElementById("timerBox").innerText="Time Left: "+timeLeft+"s";
}
},1000);
}
}
function showQuestion(){
if(index>=questions.length){
showResult();
return;
}

let q=questions[index];

q.shuffledOptions = shuffle([...q.o]);
q.correctIndex = q.shuffledOptions.indexOf(q.o[q.a]);

app.innerHTML=`
<div class="card">
<h3>${userName} | Question ${index+1}/${questions.length}</h3>
${timeLeft>0?`<div class="timer" id="timerBox">Time Left: ${timeLeft}s</div>`:""}

<p>${escapeHTML(q.q)}</p>

${q.shuffledOptions.map((o,i)=>
`<button class="option" onclick="answer(${i})">${escapeHTML(o)}</button>`
).join("")}
</div>
`;
}

/* ANSWER */
function answer(i){
let q=questions[index];

let selected = q.shuffledOptions[i];
let correct = q.o[q.a];

userAnswers.push({
question:q.q,
selected:selected,
correct:correct
});

if(i === q.correctIndex) score++;

index++;
showQuestion();
}
function showResult(){
clearInterval(timer);

let review="";

userAnswers.forEach((r,i)=>{
review +=
'<div style="margin:10px;padding:10px;border:1px solid #ccc;border-radius:8px">' +
'<b>Q'+(i+1)+':</b> '+ escapeHTML(r.question) +'<br><br>' +
'Your Answer: <span style="color:'+(r.selected===r.correct?'green':'red')+'">'+ escapeHTML(r.selected) +'</span><br>' +
'Correct Answer: <span style="color:green">'+ escapeHTML(r.correct) +'</span>' +
'</div>';
});

app.innerHTML =
'<div class="card">' +
'<h2>Result Summary</h2>' +
'Name: '+userName+'<br>' +
'Score: '+score+'/'+questions.length+'<br><br>' +
review +
'<button onclick="home()">Restart</button>' +
'</div>';
}

home();
