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

function drawPlane() {

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(plane.x, plane.y + 28, 30, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Propeller
    let spin = Math.sin(Date.now() / 40) * 10;

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(plane.x + 42, plane.y - spin);
    ctx.lineTo(plane.x + 42, plane.y + spin);
    ctx.stroke();

    // Body
    ctx.fillStyle = "#1565C0";
    ctx.beginPath();
    ctx.ellipse(plane.x, plane.y, 35, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = "#FFD54F";
    ctx.beginPath();
    ctx.moveTo(plane.x + 35, plane.y);
    ctx.lineTo(plane.x + 47, plane.y - 7);
    ctx.lineTo(plane.x + 47, plane.y + 7);
    ctx.fill();

    // Tail
    ctx.fillStyle = "#1565C0";
    ctx.beginPath();
    ctx.moveTo(plane.x - 30, plane.y);
    ctx.lineTo(plane.x - 42, plane.y - 12);
    ctx.lineTo(plane.x - 36, plane.y);
    ctx.lineTo(plane.x - 42, plane.y + 12);
    ctx.fill();

    // Main Wings
    ctx.fillStyle = "#1976D2";

    ctx.beginPath();
    ctx.moveTo(plane.x - 5, plane.y);
    ctx.lineTo(plane.x - 22, plane.y - 22);
    ctx.lineTo(plane.x + 15, plane.y - 7);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(plane.x - 5, plane.y);
    ctx.lineTo(plane.x - 22, plane.y + 22);
    ctx.lineTo(plane.x + 15, plane.y + 7);
    ctx.fill();

    // Yellow stripe
    ctx.fillStyle = "#FFEB3B";
    ctx.fillRect(plane.x - 20, plane.y - 2, 35, 4);

    // Cockpit
    ctx.fillStyle = "#81D4FA";
    ctx.beginPath();
    ctx.arc(plane.x + 8, plane.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Wheels
    ctx.fillStyle = "#222";

    ctx.beginPath();
    ctx.arc(plane.x - 10, plane.y + 13, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(plane.x + 10, plane.y + 13, 3, 0, Math.PI * 2);
    ctx.fill();
}
}

function update(){

    // Sky
ctx.fillStyle = "#87CEEB";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Ground
ctx.fillStyle = "#7BCB5B";
ctx.fillRect(0, canvas.height - 120, canvas.width, 120);

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
