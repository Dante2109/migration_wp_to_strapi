let api = "http://localhost/wordpress/graphql";
const callPostsData = async (type) => {
  let query = {
    query: `query{
          ${type}{
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
    data = data.data?.pages?.nodes || data.data.posts?.nodes;

    return data;
  } catch (error) {
    console.log(error);
  }
};
let ans = callPostsData("posts").then((res) => console.log(res[0].categories.edges));

const callPagesData = async (type) => {
  let query = {
    query: `query{
          ${type}{
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
    data = data.data?.pages?.nodes || data.data.posts?.nodes;

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  callPostsData,
  callPagesData,
};
