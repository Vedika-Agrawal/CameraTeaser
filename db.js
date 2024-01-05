// open db ========================================
// created db =====================================
// make transition ================================

let  db;
let openRequest = indexedDB.open("myDatabase");

openRequest.addEventListener("success",(e)=>{
    console.log("succes");
    sb =openRequest.result;
})
openRequest.addEventListener("error",(e)=>{
    console.log("error");
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("upgraded, inital db creation");
    db =   openRequest.result;
    // key path uniquely identidfied use keypath value
    db.createObjectStore("video",{keyPath: "id"});
    db.createObjectStore("image",{keyPath: "id"});
})

