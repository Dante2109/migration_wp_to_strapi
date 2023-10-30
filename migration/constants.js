function stringify(data) {
  let stringData = "[";
  data.forEach((el, i) => {
    if (i == data.length - 1) {
      stringData += `{name:"${el.name}"}`;
      return;
    }
    stringData += `{name:"${el.name}"},`;
  });
  stringData += "]";
  return stringData;
}

module.exports = {
  stringify,
};
