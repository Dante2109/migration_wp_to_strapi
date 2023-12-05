import { promises as fs } from "fs";
import *as path from 'path';
let graphqlEndpoint="http://0.0.0.0:1337/graphql"
const downloadImage = async (url,pathname) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(pathname, buffer);
    let image=await fs.readFile(pathname,(err,data)=>{
        if(err){
            console.log(err)
            return null
        }else{
            return data
        }
    })
    let name=path.basename(pathname)
    await postImage(image,10,name)
}

let api = "http://localhost/migrating_data/graphql";
    const callPostsData = async () => {
  let query = {
    query: `query{
          posts{
            nodes{
              title
              id
              excerpt
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              
             seo{
              canonical
              title
              metaDesc
              opengraphTitle
              opengraphDescription
              opengraphImage {
                sourceUrl
              }
             }
             author {
              node {
                avatar {
                  url
                }
                email
                name
                firstName
                lastName
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            tags {
              edges {
                node {
                  name
                }
              }
            }
            }
          }
        }`,
  };
  try {
    let data = await fetch(`${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    data = await data.json();
    data = data.data?.posts?.nodes;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getphotos=async()=>{
    let data= await callPostsData();
    data=data.map((el)=>{return {url:el.featuredImage.node.sourceUrl,id:el.id}})
    data.forEach(el=>getImage(el))
    
    
}
const getImage=async(el)=>{
    let data=el.url.split("/")
    await downloadImage(el.url, `${data[data.length-1]}`,el.id);
}

// ($refId :ID, $ref: String, $field: String, $file:Upload! )
getphotos()
const postImage=async(data,id,imageFileName)=>{
    data=JSON.stringify(data)
        let variables=
            {
                "refID":id,
                "ref":"post",
                "field":"image",
                "file":data
            }
        
        let query = {
            query: `mutation {
                upload(refId :${id}, ref: "post", field: "image", file:${data})
            {
              data{
                attributes{
                  name
                }
              }  
            }
          }`,
        };

        let q2={
        query:`query{
            pages{
            data{
              id
              attributes{
                title
              }
            }
          }
        }`
        }
            try {
          
          let newData = await fetch("http://0.0.0.0:1337/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
              "Bearer 743f20979ac960e84e461567ed409323f3348264c8bada5e84cec4bab10f11dfe2bcbc718632eb4392619328f29347f53d8042d29c94758641d9b58ba3828867c8393871fc2b22fd0e277648b12edb9182c0a0635c74810a92a46e6f983d54cb0076e178b56c479812979b79aee7bd1862679f9823161fbf9e4dc424b704b640",
            },
            body: JSON.stringify(query),
          });
          newData = await newData.json();
          console.log("UPDATION", newData);
        } catch (error) {
          console.log("error",error)

        }
      
       
    }

