const { callData } =require("../call.js");

const funct=async()=>{
    let data= await callData("pages")

    await data.forEach(async(el)=>await fillingtheData(el))
    let query = {query :`query{
        pages{
            data{
              attributes{
                title
                content
                }
            }
          }
        }`
    }
    let newData=await fetch("http://0.0.0.0:1337/graphql",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer c360b7e3abef1a387cc7a711a2b7a30466f835d0c6e729fe0cd1c798b35774155837fef7b1ebf07a60671d2713f244bde026cf0dde8539bd900d4d9cc9d06d23ddaf5011d256820139e9f5a567cfb26e7e000dcd13a7c46c351c5fa97ca8001db177608f7758a4d618bd56dd84fa3e82b3889ff7a2a6ce61377ad7c63b3e7dd9"
    
        },
        body:JSON.stringify(query)
    }) 
    newData=await newData.json()
    console.log(newData.data.pages.data)
  
    // console.log(newData.data.wordpressStrapis.data)
}
funct()


const fillingtheData=async(data)=>{
    let title=data.title.toString()
    let content=JSON.stringify(data.content)
    let strapiData={
        query:`mutation{
        createPage(data:{title:"${title}",content:${content}}){
        data{
          id
          attributes{
            title
            content
          }
        }
      }
    }`
    }
    let newData=await fetch("http://0.0.0.0:1337/graphql",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer c360b7e3abef1a387cc7a711a2b7a30466f835d0c6e729fe0cd1c798b35774155837fef7b1ebf07a60671d2713f244bde026cf0dde8539bd900d4d9cc9d06d23ddaf5011d256820139e9f5a567cfb26e7e000dcd13a7c46c351c5fa97ca8001db177608f7758a4d618bd56dd84fa3e82b3889ff7a2a6ce61377ad7c63b3e7dd9"
    
        },
        body:JSON.stringify(strapiData)
    }) 
    newData=await newData.json()
    console.log(newData)
}