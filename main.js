
objects = [];
status = "";


function setup() {
  canvas = createCanvas(380, 260);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,260);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  indexVAL = document.getElementById("index").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 260);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == indexVAL)
            {
              objectDetector.detect(gotResult);
              document.getElementById("to_find").innerHTML = indexVAL + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + "Found");
              synth.speak(utterThis);
            }
            else
            {
              document.getElementById("to_find").innerHTML = indexVAL + " Not Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + " Not Found");
              synth.speak(utterThis);
            }          
           }
        }
  }