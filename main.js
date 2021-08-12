let mic;
let record = 0;
let calibrating = false;
let calibrated = false;
let startT = 0;
let average = 0;
let threshold = 0;
let hitCount = 0;
let lastT = 0;
function setup() {
    createCanvas(710, 200);
    mic = new p5.AudioIn();
    mic.start();
    frameRate(60)
    textSize(32);
}

function draw() {
    background(200);
    let vol = mic.getLevel();
    if (calibrated && millis() - lastT > 100) {
        if(vol > threshold)
        {   lastT = millis()
            hitCount++;
        }
        text(hitCount, 50, 150)
    }
    else if(calibrating)
    {
        if(frameCount - startT >= 5*60){
            calibrating = false;
            threshold = lerp(average,record,.5)
        }
        
        average = (average *(startT-1) + vol)/startT
        
        if (vol > record) {
            record = vol;
            console.log("hey")
        }
        text(record, 50, 100)
        text(vol, 50, 150)
        text(average, 50, 50)

    }
}

function startCalibration() {
    if (!calibrating) {
        getAudioContext().resume()
        calibrating = true;
        record = 0;
        average = 0;
        startT = frameCount
        
    }

}