let video = document.querySelector("video");

let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtnCont = document.querySelector(".capture-btn-cont");
// es contianer ko click kr tha hi animtion es button per perform hona hai.
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");

let chunks = []; // media recorder in chunks.

let recoder;
let recordFlag = false;

let constraints = {
    video : true,
    Audio : true
}

// navigator --> global obj, brow info

navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    video.srcObject = stream;
    recoder = new MediaRecorder(stream);
    recoder.addEventListener("start",(e)=>{
        chunks = [];
    })
    recoder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    })
    recoder.addEventListener("stop",(e)=>{
        // conversin of media chunks to video.
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoURL;
        a.download="stream.mp4";
        a.click();
    })
})

recordBtnCont.addEventListener("click",(e)=>{
    if(!recoder)return ;
    recordFlag = !recordFlag;
    if(recordFlag){
        recoder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }
    else{
        recoder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

let timerID;
let timer = document.querySelector(".timer");
let counter = 0; // represent total second;

function startTimer(){
    function dispalyTimer(){
        timer.style.display = "block";
        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds%60;

        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds%60;
        
        let seconds = totalSeconds;

        hours = (hours <10) ? `0${hours}` : hours;
        minutes = (minutes <10) ? `0${minutes}` : minutes;
        seconds = (seconds <10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID = setInterval( dispalyTimer,1000);
}

function stopTimer(){
    timer.style.display = "none";
    clearInterval(timerID);
    timer.innerText = "00:00:00";
}
