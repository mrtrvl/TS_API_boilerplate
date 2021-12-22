import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'someTempSecret',
    expiresIn: process.env.JWT_EXPIRES || '1h',
  },
};

export default config;
