import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Prisma, PrismaClient } from '@prisma/client';
import { validUser } from './testUtil';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeEach(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    done();
  });

  const user: Prisma.UserCreateInput = validUser();
  const login: Prisma.UserWhereInput = {
    email: user.email,
    password: user.password,
  };
  const returnedUser: Prisma.UserWhereInput = {
    name: user.name,
    email: user.email,
  };
  let token: string;

  it('/users (POST)', async (done) => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(res.body).toMatchObject(returnedUser);
    done();
  });
  it('/auth/login (POST)', async (done) => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(login)
      .expect(201);

    token = res.body.access_token;
    done();
  });

  it('/users (GET)', async (done) => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(res.body[0]).toMatchObject(returnedUser);
    expect(res.body).toHaveLength(1);
    done();
  });

  it('/users/:id (GET)', async (done) => {
    const res = await request(app.getHttpServer())
      .get(`/users/1`)
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(res.body).toMatchObject(returnedUser);
    done();
  });

  it('/users/:id (PUT)', async (done) => {
    const res = await request(app.getHttpServer())
      .put(`/users/1`)
      .send(user)
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(res.body).toMatchObject(returnedUser);
    done();
  });

  it('/users/:id (DELETE)', async (done) => {
    const res = await request(app.getHttpServer())
      .delete(`/users/1`)
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(res.body).toMatchObject(returnedUser);
    done();
  });

  afterAll(async (done) => {
    await app.close();
    await prisma.$disconnect();
    done();
  });
});
