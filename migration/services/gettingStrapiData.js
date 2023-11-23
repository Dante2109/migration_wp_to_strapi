let getStrapiData = async (type) => {
  let query = {
    query: `query{
            ${type}(pagination:{limit:100}){
                data{
                    id
                  attributes{
                    title
                    slug
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
    body: JSON.stringify(query),
  });
  newData = await newData.json();
  newData = newData.data?.pages?.data || newData.data?.posts?.data;
  return newData;
};

module.exports = {
  getStrapiData,
};
