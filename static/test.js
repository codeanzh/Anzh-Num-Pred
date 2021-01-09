window.addEventListener("load", function(){
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#4d4805";

    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if (!painting) return;

        ctx.lineWidth = 30;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishPosition);
    canvas.addEventListener("mousemove", draw);
});

function clearcanvas() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sendData() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = canvas.toDataURL("image/png");

    $.ajax({ 
        type: "POST", 
        url: "/sendData", 
        data: { 
            imgData: image.src
        }
    }).done(function(o) { 
        document.getElementById('num').innerHTML = o;
    }); 
}