import jwt from 'jsonwebtoken';

const JWT_SECRET_FOR_VERIFY = 'lfjfjasjfr09ri09wrilfdjdjgdfgd';
const JWT_SECRET = 'fgdfgdfgdfgfgfdgdfgdfgfgfgtrgrtg5455454y4646hhgdfg';

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId,
      dataPath:user.dataPath
    },
    JWT_SECRET_FOR_VERIFY,
    { expiresIn: '15m' }
  );
};


module.exports = {
  
  tokenForVerify,
  
};
