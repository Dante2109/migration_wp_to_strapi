let api="http://localhost/migrating_data/graphql"
const callData=async (type)=>{
    let query={query:
        `query{
          ${type}{
            nodes{
              title
            
              excerpt(format:RAW)
              slug
              seo{
                title
                canonical
                metaDesc
                opengraphTitle
                opengraphDescription
                opengraphImage {
                  sourceUrl
                }
              }
            }
          }
        }`
    }
        try {
            
            let data=await fetch(`${api}`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "X-Auth-Username":"akshay"

                  },
                body:JSON.stringify(query)
            })
            data=await data.json()
            data=data.data?.pages?.nodes || data.data.posts?.nodes
            return data
        } catch (error) {
            console.log(error)
        }
}
callData("posts").then(res=>console.log(res))
module.exports={
    callData
}
