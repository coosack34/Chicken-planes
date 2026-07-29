const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let clouds = [];

for (let i = 0; i < 8; i++) {
    clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 250,
        w: 100 + Math.random() * 80,
        h: 40 + Math.random() * 20,
        speed: 0.2 + Math.random() * 0.4
    });
}

function drawCloud(cloud) {
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, cloud.w / 2, cloud.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cloud.x - 30, cloud.y + 5, cloud.w / 3, cloud.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cloud.x + 35, cloud.y + 5, cloud.w / 3, cloud.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
}

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const cloud of clouds) {

        cloud.x += cloud.speed;

        if (cloud.x > canvas.width + 100) {
            cloud.x = -150;
            cloud.y = Math.random() * 250;
        }

        drawCloud(cloud);
    }

    requestAnimationFrame(update);
}

update();
