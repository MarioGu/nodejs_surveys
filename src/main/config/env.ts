export default {
  mongoUrl: global.__MONGO_URI__ ?? 'mongodb://balta:e296cd9f@localhost:27017/admin',
  port: process.env.PORT ?? 5050
}
