const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ---------- Player ----------
const plane = {
    x: canvas.width/2,
    y: canvas.height/2,
    width: 70,
    height: 35,
    speed: 6
};

// ---------- Controls ----------
const keys = {};

window.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

// ---------- Clouds ----------
let clouds=[];

for(let i=0;i<8;i++){
    clouds.push({
        x:Math.random()*canvas.width,
        y:Math.random()*220,
        w:100+Math.random()*80,
        h:40+Math.random()*20,
        speed:0.3+Math.random()*0.4
    });
}

function drawCloud(c){

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.ellipse(c.x,c.y,c.w/2,c.h/2,0,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(c.x-30,c.y+5,c.w/3,c.h/2,0,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(c.x+30,c.y+5,c.w/3,c.h/2,0,0,Math.PI*2);
    ctx.fill();
}

function drawPlane(){

    // Shadow
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(
        plane.x,
        plane.y+25,
        28,
        8,
        0,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Body
    ctx.fillStyle="#d62828";
    ctx.fillRect(
        plane.x-30,
        plane.y-10,
        60,
        20
    );

    // Nose
    ctx.beginPath();
    ctx.moveTo(plane.x+30,plane.y);
    ctx.lineTo(plane.x+45,plane.y-10);
    ctx.lineTo(plane.x+45,plane.y+10);
    ctx.fill();

    // Wings
    ctx.fillStyle="#f77f00";

    ctx.beginPath();
    ctx.moveTo(plane.x-5,plane.y);
    ctx.lineTo(plane.x-30,plane.y-18);
    ctx.lineTo(plane.x+10,plane.y-8);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(plane.x-5,plane.y);
    ctx.lineTo(plane.x-30,plane.y+18);
    ctx.lineTo(plane.x+10,plane.y+8);
    ctx.fill();

    // Cockpit
    ctx.fillStyle="#87ceeb";
    ctx.beginPath();
    ctx.arc(
        plane.x+10,
        plane.y,
        6,
        0,
        Math.PI*2
    );
    ctx.fill();
}

function update(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Clouds
    for(const cloud of clouds){

        cloud.x+=cloud.speed;

        if(cloud.x>canvas.width+150){
            cloud.x=-150;
        }

        drawCloud(cloud);
    }

    // Movement
    if(keys["ArrowLeft"]) plane.x-=plane.speed;
    if(keys["ArrowRight"]) plane.x+=plane.speed;
    if(keys["ArrowUp"]) plane.y-=plane.speed;
    if(keys["ArrowDown"]) plane.y+=plane.speed;

    // Keep inside screen
    plane.x=Math.max(40,Math.min(canvas.width-40,plane.x));
    plane.y=Math.max(40,Math.min(canvas.height-40,plane.y));

    drawPlane();

    // Version text
    ctx.fillStyle="black";
    ctx.font="22px Arial";
    ctx.fillText("Chicken Planes v0.1.2",20,35);

    requestAnimationFrame(update);
}

update();
