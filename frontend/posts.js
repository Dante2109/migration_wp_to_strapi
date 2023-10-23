const { callData } = require("../call.js");

const funct = async () => {
  let data = await callData("posts");

  await data.forEach(async (el) => await fillingtheData(el));
  let query = {
    query: `query{
        posts{
            data{
              attributes{
                title
                content
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
    body: JSON.stringify(query),
  });
  newData = await newData.json();
  console.log(newData);

  // console.log(newData.data.wordpressStrapis.data)
};
funct();

const fillingtheData = async (data) => {
  let title = data.title.toString();
  let content = JSON.stringify(data.content);
  let seoTitle = data.seo.title;
  let seoCanonical = data.seo.canonical;
  let seoMetaDesc = data.seo.metaDesc;
  let strapiData = {
    query: `mutation{
        createPost(data:{title:"${title}",content:${content},seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}"}}){
        data{
          id
          attributes{
            title
            content
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
    body: JSON.stringify(strapiData),
  });
  newData = await newData.json();
  console.log(newData);
};
