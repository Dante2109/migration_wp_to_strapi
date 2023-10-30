const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callPostsData } = require("./services/gettingWordpressData.js");

const getPosts = async () => {
  let data = await callPostsData("posts");

  await data.forEach(async (el) => await fillingtheData(el));
};
getPosts();

const fillingtheData = async (data) => {
  let title = data.title.toString();
  let content = JSON.stringify(data.content);
  let excerpt = JSON.stringify(data.excerpt);
  let seoTitle = data.seo.title;
  let seoCanonical = data.seo.canonical;
  let seoMetaDesc = data.seo.metaDesc;
  let slug = data.slug;
  let opengraphTitle = data.seo.opengraphTitle;
  let opengraphDescription = data.seo.opengraphDescription;
  let opengraphImageUrl = data.seo.opengraphImage.sourceUrl;
  let date = data.date;
  let featuredImageUrl = data.featuredImage.node.sourceUrl;
  let featuredImagealtText = data.featuredImage.node.altText;
  let authorAvatar = data.author.node.avatar.url;
  let authorEmail = data.author.node.email;
  let authorName = data.author.node.name;
  let authorFirstName = data.author.node.firstName;
  let authorLastName = data.author.node.lastName;
  let categories = data.categories.edges;
  categories = categories.map((el) => {
    return { name: el.node.name };
  });

  let tags = data.tags.edges;
  tags = tags.map((el) => {
    return { name: el.node.name };
  });

  let a = "[";
  tags.forEach((el, i) => {
    if (i == tags.length - 1) {
      a += `{name:"${el.name}"}`;
      return;
    }
    a += `{name:"${el.name}"},`;
  });
  let b = "[";
  categories.forEach((el, i) => {
    if (i == categories.length - 1) {
      b += `{name:"${el.name}"}`;
      return;
    }
    b += `{name:"${el.name}"},`;
  });
  b += "]";
  a += "]";
  tags = JSON.stringify(tags);
  console.log(a, b);
  let strapiData = await getStrapiData("posts");
  let ans = strapiData.find(({ attributes }) => attributes.slug === slug);
  if (ans) {
    let updateData = {
      query: `mutation{
        updatePost(id:${ans.id},data:{title:"${title}",slug:"${slug}",
        content:${content},
        excerpt:${excerpt},
        date:"${date}",
        categories:${b},
        tags:${a},
        featuredImage:{sourceUrl:"${featuredImageUrl}",altText:"${featuredImagealtText}"},
        author:{avatar:{url:"${authorAvatar}"},name:"${authorName}",firstName:"${authorFirstName}",lastName:"${authorLastName}",email:"${authorEmail}"},
        seo:{title:"${seoTitle}",canonical:"${seoCanonical}",
        metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",
        opengraphDescription:"${opengraphDescription}",opengraphImage:{sourceUrl:"${opengraphImageUrl}"}}}){
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
          createPost(data:{title:"${title}",slug:"${slug}",content:${content},seo:{title:"${seoTitle}",canonical:"${seoCanonical}",metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",opengraphDescription:"${opengraphDescription}"}}){
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
