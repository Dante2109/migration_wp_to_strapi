const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callPagesData } = require("./services/gettingWordpressData.js");
const getPages = async () => {
  let data = await callPagesData("pages");

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

  let date = data.date;
  let featuredImageUrl = data.featuredImage.node.sourceUrl;
  let featuredImagealtText = data.featuredImage.node.altText;
  let authorAvatar = data.author.node.avatar.url;
  let authorEmail = data.author.node.email;
  let authorName = data.author.node.name;
  let authorFirstName = data.author.node.firstName;
  let authorLastName = data.author.node.lastName;

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
          "Bearer 743f20979ac960e84e461567ed409323f3348264c8bada5e84cec4bab10f11dfe2bcbc718632eb4392619328f29347f53d8042d29c94758641d9b58ba3828867c8393871fc2b22fd0e277648b12edb9182c0a0635c74810a92a46e6f983d54cb0076e178b56c479812979b79aee7bd1862679f9823161fbf9e4dc424b704b640",
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
          "Bearer 743f20979ac960e84e461567ed409323f3348264c8bada5e84cec4bab10f11dfe2bcbc718632eb4392619328f29347f53d8042d29c94758641d9b58ba3828867c8393871fc2b22fd0e277648b12edb9182c0a0635c74810a92a46e6f983d54cb0076e178b56c479812979b79aee7bd1862679f9823161fbf9e4dc424b704b640",
      },
      body: JSON.stringify(createData),
    });
    newData = await newData.json();
    console.log("CREATION", newData);
  }
};
