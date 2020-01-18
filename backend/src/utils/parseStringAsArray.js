module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(item => item.trim());
};
