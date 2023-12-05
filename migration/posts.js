require("dotenv").config()
const { stringify } = require("./constants.js");
const { getStrapiData } = require("./services/gettingStrapiData.js");
const { callPostsData } = require("./services/gettingWordpressData.js");
const getPosts = async () => {
  let data = await callPostsData("posts");
  let count=0
  await data.forEach(async (el) => {await fillingtheData(el);console.log(++count)});
  
};

const fillingtheData = async (data) => {
  let title = data.title;
  let content = JSON.stringify(data.content);
  let excerpt = JSON.stringify(data.excerpt);
  let seoTitle = data.seo.title;
  let seoCanonical = data.seo.canonical;
  let seoMetaDesc = data.seo.metaDesc;
  let slug = data.slug;
  let opengraphTitle = data.seo.opengraphTitle;
  let opengraphDescription = data.seo?.opengraphDescription || "";
  let opengraphImageUrl = data?.seo?.opengraphImage?.sourceUrl || "";
  let date = data?.date;
  let featuredImageUrl = data?.featuredImage?.node?.sourceUrl || "";
  let featuredImagealtText = data.featuredImage?.node?.altText || "";
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
          `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
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
          `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
        },
        body: JSON.stringify(createData),
      });
      newData = await newData.json();
      console.log("CREATION", newData);
    } catch (error) {
      console.log(error)
    }
  }
  // setTimeout to avoid api rate limit for posting in strapi cms
  setTimeout(()=>{
    console.log("COMPLETED")
  },1000)
  
};

getPosts();