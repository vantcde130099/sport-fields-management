const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header x-auth-token
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Không có mã thông báo, ủy quyền bị từ chối' });
  }

  //Verify
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.coach = decoded.coach;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Không có mã thông báo, ủy quyền bị từ chối' });
  }
};
