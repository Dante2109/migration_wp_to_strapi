const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callData } = require("./services/gettingWordpressData.js");
const getPages = async () => {
  let data = await callData("pages");

  await data.forEach(async (el) => await fillingtheData(el));
};
getPages();
const fillingtheData = async (data) => {
  let title = data.title.toString();
  let content = JSON.stringify(data.content);
  let seoTitle = data.seo.title;
  let seoCanonical = data.seo.canonical;
  let seoMetaDesc = data.seo.metaDesc;
  let slug = data.slug;
  let opengraphTitle = data.seo.opengraphTitle;
  let opengraphImageUrl = data.seo.opengraphImage.sourceUrl;

  let opengraphDescription = data.seo.opengraphDescription;

  let strapiData = await getStrapiData("pages");

  let ans = strapiData.find(({ attributes }) => attributes.slug === slug);
  if (ans) {
    let updateData = {
      query: `mutation{
        updatePage(id:${ans.id},data:{title:"${title}",slug:"${slug}",content:${content},seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",opengraphDescription:"${opengraphDescription}",opengraphImage:{sourceUrl:"${opengraphImageUrl}"}}}){
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
          "Bearer 47ba92af80187baea4c918d8377f8ad148523dddad7d5488ea7ed4e243dd857f1c1b381e0760a3ae5956fda4016786057d493784a389dbb3bf2ac08bc2268ee4f4fa4c6779ce8191cec4031ac81d3196a8c98c8fa70ed722a8cbc6901ed86b53ba9bb32e3e18d5748eae04760a5e845b7aad909420c07c80160a799ba30a43d0",
      },
      body: JSON.stringify(updateData),
    });
    newData = await newData.json();
    console.log("UPDATION", newData);
  } else {
    let createData = {
      query: `mutation{
          createPage(data:{title:"${title}",slug:"${slug}",content:${content},seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",opengraphDescription:"${opengraphDescription}"}}){
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
          "Bearer 47ba92af80187baea4c918d8377f8ad148523dddad7d5488ea7ed4e243dd857f1c1b381e0760a3ae5956fda4016786057d493784a389dbb3bf2ac08bc2268ee4f4fa4c6779ce8191cec4031ac81d3196a8c98c8fa70ed722a8cbc6901ed86b53ba9bb32e3e18d5748eae04760a5e845b7aad909420c07c80160a799ba30a43d0",
      },
      body: JSON.stringify(createData),
    });
    newData = await newData.json();
    console.log("CREATION", newData);
  }
};
