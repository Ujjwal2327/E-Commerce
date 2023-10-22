// create token and send it in cookie
const sendToken = (user, statusCode, res) => {
  
  const token = user.getJWTToken();

  // cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user
  })
  
}

export default sendToken;