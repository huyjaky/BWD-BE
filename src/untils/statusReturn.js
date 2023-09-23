

const statusReturn = (res, status, message, error) => {
  if (error) {
    return  res.status(status).json({message: message, error: error});
  } else {
    return  res.status(status).json({message: message});
  }
}

module.exports = {
  statusReturn
}