let api="http://localhost/migrating_data/graphql"
const callData=async (type)=>{
    let query={query:
        `query{
          ${type}{
            nodes{
              title
              content
            }
          }
        }`
    }
        try {
            
            let data=await fetch(`${api}`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
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
module.exports={
    callData
}
