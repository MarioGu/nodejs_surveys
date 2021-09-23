export default {
  mongoUrl: process.env.MONGODB_URI ?? 'mongodb://balta:e296cd9f@localhost:27017/admin',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'd7=-48mab5'
}
