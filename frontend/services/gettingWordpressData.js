let api = "http://localhost/wordpress/graphql";
const callData = async (type) => {
  let query = {
    query: `query{
          ${type}{
            nodes{
              title
              slug
              content
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
let ans = callData("pages").then((res) => console.log(res[0].seo.opengraphImage));

module.exports = {
  callData,
};
