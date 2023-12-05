let api = "https://blog-ecatering-cdn.ipsator.com";
const callPostsData = async () => {
  let query = {
    query: `query{
          posts(first:53){
            nodes{
              title
              content
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
callPostsData("posts")

const callPagesData = async () => {
  let query = {
    query: `query{
          pages(first:1000){
            nodes{
              title
             content
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
    data = data.data?.pages?.nodes

    return data;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  callPostsData,
  callPagesData,
};
