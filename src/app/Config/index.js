import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  jwt_secret: process.env.ACCESS_TOKEN_SECRET,
  bcrypt_salt_round: process.env.BCRYPT_SALTROUND,
};
