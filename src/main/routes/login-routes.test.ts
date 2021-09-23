import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Post /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Mario',
          email: 'mario.bonaldi@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('Post /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Mario',
        email: 'mario.bonaldi@gmail.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'mario.bonaldi@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'mario.bonaldi@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
