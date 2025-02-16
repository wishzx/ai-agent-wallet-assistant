process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logging: false,
  topic: process.env.TOPIC,
  openapikey: process.env.OPENAPIKEY,
};

export default config;
