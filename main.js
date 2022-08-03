img = "";
status1 = "";
objects = [];
alarm = "";
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function preload(){
    img = loadImage("dog_cat.jpg");
    alarm = loadSound("Alarm-Fast-A1-www.fesliyanstudios.com.mp3");
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("numberOfObjects").innerHTML = "Number of objects detected are: " + objects.length; 
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15 , objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects.length == 0){
                document.getElementById("status").innerHTML = "Baby Not Detected"
                alarm.play();
            }
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Detected";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby Not Detected"
                alarm.play();
            }
        }
    }
}
function modelloaded(){
    console.log("Model loaded!");
    status1 = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}