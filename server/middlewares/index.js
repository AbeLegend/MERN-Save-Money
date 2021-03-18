import expressJwt from 'express-jwt';

export const requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
});