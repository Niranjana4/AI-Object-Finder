status = "";

function setup() {
    canvas = createCanvas(380, 260);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 260);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status= Detecting objects";
    document.getElementById("input").value;

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 260);
}