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

  it('/users (POST)', async (done) => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(res.body).toMatchObject(user);
    done();
  });

  it('/users (GET)', async (done) => {
    const res = await request(app.getHttpServer()).get('/users').expect(200);
    expect(res.body).toHaveLength(1);
    done();
  });

  it('/users/:id (GET)', async (done) => {
    const res = await request(app.getHttpServer()).get(`/users/1`).expect(200);

    expect(res.body).toMatchObject(user);
    done();
  });

  it('/users/:id (PUT)', async (done) => {
    const res = await request(app.getHttpServer())
      .put(`/users/1`)
      .send(user)
      .expect(200);

    expect(res.body).toMatchObject(user);
    done();
  });

  it('/users/:id (DELETE)', async (done) => {
    const res = await request(app.getHttpServer())
      .delete(`/users/1`)
      .expect(200);
    expect(res.body).toMatchObject(user);
    done();
  });

  afterAll(async (done) => {
    await app.close();
    await prisma.$disconnect();
    done();
  });
});
