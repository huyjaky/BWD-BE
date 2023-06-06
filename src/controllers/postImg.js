

let postImg = async (req, res) => {
  try {
    const files = await req.files;
    // files.map(async item => {
    //   await postImage(item);
    //   arrImg.push(item);
    // });
    return res.json('Finish UpImg');
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

module.exports = {
  postImg: postImg
}