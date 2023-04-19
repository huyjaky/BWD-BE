const testAPI = require( "../services/testAPI")

let var1 = async (req, res) => {
  try {
    const test = await testAPI.test();
    return res.json(test);
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  var1: var1
}