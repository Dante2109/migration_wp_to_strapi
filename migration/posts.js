const { stringify } = require("./constants.js");
const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callPostsData } = require("./services/gettingWordpressData.js");

const getPosts = async () => {
  let data = await callPostsData("posts");

  await data.forEach(async (el) => await fillingtheData(el));
};
getPosts();

const fillingtheData = async (data) => {
  let title = data.title;
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
    return el.node.name;
  });
  let myTag = JSON.stringify(tags);
  let myCategory = stringify(categories);
  let strapiData = await getStrapiData("posts");
  let ans = strapiData.find(({ attributes }) => attributes.slug === slug);
  if (ans) {
    let updateData = {
      query: `mutation{
        updatePost(id:${ans.id},data:{title:"${title}",slug:"${slug}",
        content:${content},
        excerpt:${excerpt},
        date:"${date}",
        categories:${myCategory},
        tags:${myTag},
        featuredImage:{sourceUrl:"${featuredImageUrl}",altText:"${featuredImagealtText}"},
        seo:{title:"${seoTitle}",canonical:"${seoCanonical}",
        metaDesc:"${seoMetaDesc}",opengraphTitle:"${opengraphTitle}",
        opengraphDescription:"${opengraphDescription}",opengraphImage:{sourceUrl:"${opengraphImageUrl}"}
      }
    }){
        data{
          id
          attributes{
            title
          }
        }
      }
    }`,
    };
    try {
      
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
    } catch (error) {
      console.log(error)
    }
  } else {
    let createData = {
      query: `mutation{
          createPost(data:{title:"${title}",slug:"${slug}",
          content:${content},
          excerpt:${excerpt},
          date:"${date}",
          categories:${myCategory},
          tags:${myTag},
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
    try {
      
      let newData = await fetch("http://0.0.0.0:1337/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
          "Bearer da5129e0c69341a4d5acab6c5d27e7a14d88e17d7f69543c8630c9972ab51c62aeb16bccb5f901b0c47bd2cdb8b368eb4b067538750bf682a6aba55000465ea4b08b031931fc68a7aa2b379392a743f20979ac960e84e461567ed409323f3348264c8bada5e84cec4bab10f11dfe2bcbc718632eb4392619328f29347f53d8042d29c94758641d9b58ba3828867c8393871fc2b22fd0e277648b12edb9182c0a0635c74810a92a46e6f983d54cb0076e178b56c479812979b79aee7bd1862679f9823161fbf9e4dc424b704b640c623291cf7953376378481be6545098babd6d961b0fb6fed364bab37505421a799d1b46548bc9488b7e5974205f325ec4f322",
        },
        body: JSON.stringify(createData),
      });
      newData = await newData.json();
      console.log("CREATION", newData);
    } catch (error) {
      console.log(error)
    }
  }
};
