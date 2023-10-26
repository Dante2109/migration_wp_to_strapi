let getStrapiData = async (type) => {
  let query = {
    query: `query{
            ${type}{
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
        "Bearer 47ba92af80187baea4c918d8377f8ad148523dddad7d5488ea7ed4e243dd857f1c1b381e0760a3ae5956fda4016786057d493784a389dbb3bf2ac08bc2268ee4f4fa4c6779ce8191cec4031ac81d3196a8c98c8fa70ed722a8cbc6901ed86b53ba9bb32e3e18d5748eae04760a5e845b7aad909420c07c80160a799ba30a43d0",
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
