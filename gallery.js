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
        })
    }


      
    }
   
},1000)


    