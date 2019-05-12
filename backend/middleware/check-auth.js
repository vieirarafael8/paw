const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoedeToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {email: decoedeToken.email, userId: decoedeToken.userId};
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Não se encontra autenticado'
    });
  }
};
