process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  topic: process.env.TOPIC,
}

export default config
