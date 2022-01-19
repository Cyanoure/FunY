//getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

var socket = new io();

socket.on("broadcast",(d)=>{
    console.log("BC:",d);
    if(typeof(d) != "string") return;
    d = d.toLowerCase().trim();
    if(d == "clear"){
        clearScene();
    }else if(d == "play"){
        playVideo();
    }else{
        loadFun(d);
    }
});

socket.on("clients",n=>{
    document.getElementById("clients").innerText = `Kapcsolódó kliensek: ${n}`;
})

socket.on("connect",()=>{
    //socket.emit("broadcast","kukac");
});

//<img class="fullscreenimage" src="img/gandalf.gif" alt="">

var gimg = document.createElement("img");
gimg.src = "img/gandalf.gif";
gimg.classList.add("fsimg");

function openGandalf(){
    var i = gimg.cloneNode();
    var s = document.querySelector(".scene");
    s.appendChild(i);
}

document.addEventListener("keypress",e=>{
    //console.log(e.code);
    switch(e.code){
        case "Backquote":
            socket.emit("broadcast","clear");
            break;
        case "Enter":
            socket.emit("broadcast","play");
            break;
    }
    if(e.code.startsWith("Digit")){
        var n = parseInt(e.code[e.code.length-1]);
        console.log(n);
        socket.emit("broadcast",Object.keys(funs)[n-1]);
    }
});

var funs = {
    "testvideo":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/test.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`,
    "gandalfvideo":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/gandalf.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`,
    "hgandalf":`<div class="fs bgcontain" style="background-image:url(img/hgandalf.jfif)"></div>`,
    "potato":`<div class="fs bgcover" style="background-image:url(img/potato.jpg)"></div>`,
    "bsod":`<div class="fs bgcover" style="background-image:url(img/BSOD.png)"></div>`,
    "capaszeret":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/capaszeret.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`,
    "inconvenience":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/inconvenience.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`,
    "police":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/police.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`,
    "coffin":`
    <video class="fs" width="320" height="240" controls>
        <source src="video/coffin.mp4" type="video/mp4">
        Használj Chrome-ot!
    </video>`
}

console.log(...Object.keys(funs));

var funs2 = {};

Object.keys(funs).forEach((id) => {
    funs2[id] = document.createElement("div");
    var o = funs2[id];
    o.innerHTML = funs[id];
    console.log(o);
    o.classList.add("scontent");
    
});

function clearScene(){
    var s = document.querySelector(".scene");
    while(s.hasChildNodes()){
        s.removeChild(s.children[0]);
    }
}

function loadFun(fun){
    if(typeof(fun) != "string") return;
    fun = fun.toLowerCase().trim();
    if(fun == "clear"){
        clearScene();
        return;
    }
    var o = funs2[fun];
    if(o){
        clearScene();
        var s = document.querySelector(".scene");
        s.appendChild(o);
        var children = [].slice.call(o.children);
        if(children && children.length > 0){
            children.forEach(o2=>{
                if(o2.tagName.toLowerCase() == "video"){
                    o2.controls = false;
                    o2.loop = true;
                    o2.currentTime = 0
                    o2.pause();
                }
            });
        }
    }
}

function playVideo(){
    var s = document.querySelector(".scene");
    var f = s.children[0];
    if(f){
        var f2 = f.children[0];
        console.log(f);
        if(f2.tagName.toLowerCase() == "video"){
            f2.currentTime = 0
            f2.play();
        }
    }
}