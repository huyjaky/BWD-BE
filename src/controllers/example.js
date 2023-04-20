const testAPI = require("../services/testAPI");

let var1 = async (req, res) => {
  try {
    const test = await testAPI.test();
    if (test.includes("error")) {
      console.log(test);
      return res.status(500).json({ message: "Cannot get API from server", error: test });
    }
    return res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

module.exports = {
  var1: var1,
};
