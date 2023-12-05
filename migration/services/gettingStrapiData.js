let getStrapiData = async (type) => {
  let query = {
    query: `query{
            ${type}(pagination:{start:0,limit:100}){
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
        "Bearer cf3ae97929a0fc2025bca6ae7ad59b5cdd11bbfed064eac18c8a411618653039acf5bf16b6af9a919016af73890b35356624ca539a0e74c0e3b47770c9bbccdeb1dcaee4cb150b28728af2ef0b56bddef8b07526bf72bbc6500b1d6514d849f64b2a5326f6d1341c036f5c262933a4b6bb44859484b0dfe8c6360e254409340a",
    },
    body: JSON.stringify(query),
  });
  newData = await newData.json();
  newData = newData.data?.pages?.data || newData.data?.posts?.data;
  return newData;
};
getStrapiData("posts").then(res=>console.log(res))
module.exports = {
  getStrapiData,
};