require('dotenv').config({path:"./migration/.env"})

const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callPagesData } = require("./services/gettingWordpressData.js");
console.log(process.env.STRAPI_AUTH_TOKEN)
const getPages = async () => {
  let data = await callPagesData("pages");
  let count=0
  await data.forEach(async (el) => {await fillingtheData(el);console.log(++count)});
};


const fillingtheData =async (data) => {
  let title = data.title?.toString();
  let content = JSON.stringify(data?.content);
  let seoTitle = data?.seo?.title;
  let seoCanonical = data?.seo?.canonical;
  let seoMetaDesc = data?.seo?.metaDesc;
  let slug = data?.slug;
  let opengraphTitle = data?.seo?.opengraphTitle;
  let opengraphImageUrl = data?.seo?.opengraphImage?.sourceUrl || "" ;
  let opengraphDescription = data?.seo?.opengraphDescription || "";
  let date = data?.date;
  let featuredImageUrl = data?.featuredImage?.node?.sourceUrl || "";
  let featuredImagealtText = data?.featuredImage?.node?.altText;
  let authorAvatar = data?.author?.node?.avatar?.url;
  let authorEmail = data?.author?.node?.email;
  let authorName = data?.author?.node?.name;
  let authorFirstName = data?.author?.node?.firstName;
  let authorLastName = data?.author?.node?.lastName;
  
  let strapiData = await getStrapiData("pages");
  
  let ans = strapiData.find(({ attributes }) => attributes.slug === slug);
  if (ans) {
    let updateData = {
      query: `mutation{
        updatePage(id:${ans.id},data:{title:"${title}",slug:"${slug}",content:${content},date:"${date}",
        featuredImage:{sourceUrl:"${featuredImageUrl}",altText:"${featuredImagealtText}"},
        author:{avatar:{url:"${authorAvatar}"},name:"${authorName}",firstName:"${authorFirstName}",lastName:"${authorLastName}",email:"${authorEmail}"},
        seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",opengraphDescription:"${opengraphDescription}",opengraphImage:{sourceUrl:"${opengraphImageUrl}"}}}){
        data{
          id
          attributes{
            title
          }
        }
      }
    }`,
    };
    let newData = await fetch("http://0.0.0.0:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
        `Bearer ${process.env.STRAPI_AUTH_TOKEN}`
      },
      body: JSON.stringify(updateData),
    });
    newData = await newData.json();
    console.log("UPDATION", newData);
  } else {
    let createData = {
      query: `mutation{
          createPage(data:{title:"${title}",slug:"${slug}",content:${content},date:"${date}",
          featuredImage:{sourceUrl:"${featuredImageUrl}",altText:"${featuredImagealtText}"},
          author:{avatar:{url:"${authorAvatar}"},name:"${authorName}",firstName:"${authorFirstName}",lastName:"${authorLastName}",email:"${authorEmail}"},
          seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",opengraphDescription:"${opengraphDescription}"}}){
          data{
            id
            attributes{
              title
            }
          }
        }
      }`,
    };
    let newData = await fetch("http://0.0.0.0:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${process.env.STRAPI_AUTH_TOKEN}`
      },
      body: JSON.stringify(createData),
    });
    newData = await newData.json();
    console.log("CREATION", newData);
  }
  // setTimeout to avoid api rate limit for posting in strapi cms
  setTimeout(()=>{
    console.log("COMPLETED")
  },1000)
};

getPages();