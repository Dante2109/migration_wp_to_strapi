call()
function call (){
    fetch("http://localhost:3010").then(res=>console.log(res)).catch((error)=>console.log(error))
}