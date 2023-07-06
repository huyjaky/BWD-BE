

let postImg = async (req, res) => {
  try {
    const files = await req.files;
    return res.json('Finish UpImg');
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

module.exports = {
  postImg: postImg
}