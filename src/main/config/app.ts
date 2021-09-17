import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
