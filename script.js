let video = document.querySelector("video");

let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtnCont = document.querySelector(".capture-btn-cont");
// es contianer ko click kr tha hi animtion es button per perform hona hai.
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");

let transparentColor = "transparent";

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
        // let videoURL = URL.createObjectURL(blob); 

        if(db){
            let videoID = shortid();
            
            if (!videoID) {
                console.error("Error generating video ID");
                return;
            }
            let dbTransaction = db.transaction("video","readwrite");
            let videoStore = dbTransaction.objectStore("video");
            let videoEntry = { 
                id: `vid-${videoID}`,
                blobData: blob
            }
            videoStore.add(videoEntry);
        }



        // let a = document.createElement("a");
        // a.href = videoURL;
        // a.download="stream.mp4";
        // a.click();
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

captureBtnCont.addEventListener("click",(e)=>{
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height= video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);


    // filtering
    tool.fillStyle= transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);


    let imageURL = canvas.toDataURL();


    if(db){
        let imageID = shortid();
        
        if (!imageID) {
            console.error("Error generating image ID");
            return;
        }
        let dbTransaction = db.transaction("image","readwrite");
        let imageStore = dbTransaction.objectStore("image");
        let imageEntry = { 
            id: `img-${imageID}`,
            blobData: imageURL
        }
        imageStore.add(imageEntry);
    }

    // let a = document.createElement("a");
    // a.href = imageURL;
    // a.download="image.jpg";
    // a.click();

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

// filter logic
let filterLayer = document.querySelector(".filter-layer");
let allFliters = document.querySelectorAll(".filter");
allFliters.forEach((filterElem)=>{
    filterElem.addEventListener("click",(e)=>{
        // get 
        transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color");
        //set
        filterLayer.style.backgroundColor = transparentColor;
    })
})


