setTimeout(()=>{
    if(db){
        // vedio retrival 
        
        let videoTransaction = db.transaction("video","readonly");
        let videoStore = videoTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess =(e)=>{
            let videoReuslt = videoRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            videoReuslt.forEach((videoObj)=>{
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class","media-cont");
                mediaElem.setAttribute("id",videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData);

                mediaElem.innerHTML = `
                <div class="media">
                <video controls autoplay  loop src="${url}"></video>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;

                galleryCont.appendChild(mediaElem);



                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click",dowloadListener);

            })
        }

        // images retrival

    let imgTransaction = db.transaction("image","readonly");
    let imageStore = imgTransaction.objectStore("image");
    let imageRequest = imageStore.getAll();
    imageRequest.onsuccess =(e)=>{
        let imageReuslt = imageRequest.result;
        let galleryCont = document.querySelector(".gallery-cont");

        imageReuslt.forEach((imageObj)=>{
            let mediaElem = document.createElement("div");
            mediaElem.setAttribute("class","media-cont");
            mediaElem.setAttribute("id",imageObj.id);

            let url = imageObj.URL;

            mediaElem.innerHTML = `
            <div class="media">
            <img src ="${url}"/>
            </div>
            <div class="delete action-btn">DELETE</div>
            <div class="download action-btn">DOWNLOAD</div>
            `;

            galleryCont.appendChild(mediaElem);


            // Listners 
            let deleteBtn = mediaElem.querySelector(".delete");
            deleteBtn.addEventListener("click", deleteListener);
            let downloadBtn = mediaElem.querySelector(".download");
            downloadBtn.addEventListener("click",dowloadListener);
        })
    }

}
   
},1000)

// remove ui and database ir idexed db 

function deleteListener(e){

    // db removal 
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);
    if(type ==="vid"){
        let videoTransaction = db.transaction("video","readwrite");
        let videoStore = videoTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if (type ==="img"){
        let imgTransaction = db.transaction("image","readwrite");
        let imageStore = imgTransaction.objectStore("image");
        imageStore.delete(id);
    }
    e.target.parentElement.remove();
}



function dowloadListener(e){

    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);

    if (type === "vid"){
        let videoTransaction = db.transaction("video","readwrite");
        let videoStore = videoTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) =>{
            let videoResult = videoRequest.result;
            let videoURL = URL.createObjectURL(videoResult.blobData);

            let a = document.createElement("a");
            a.href = videoURL;
            a.download="stream.mp4";
            a.click();
        }
    }
    else if(type === "img"){
        let imageTransaction = db.transaction("image","readwrite");
        let imageStore = imageTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) =>{
            let imageResult = imageRequest.result;
            // let imageURL = URL.createObjectURL(imageResult.blobData);

             let a = document.createElement("a");
            a.href = imageResult.URL;
            a.download="image.jpg";
            a.click();
        }
    }
}


    