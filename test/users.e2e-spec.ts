import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from './../src/users/user.entity';
import TestUtil from './../src/common/test/testUtil';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async (callback) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    callback();
  });

  const user: User = TestUtil.giveAUser();
  const updatedUser: User = TestUtil.giveAUpdatedUser();

  it('/users (POST)', async (callback) => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(res.body).toMatchObject(user);
    callback();
  });

  it('/users (GET)', async (callback) => {
    const res = await request(app.getHttpServer()).get('/users').expect(200);

    expect(res.body[0].id).toEqual(user.id);
    expect(res.body[0].name).toEqual(user.name);
    expect(res.body[0].userName).toEqual(user.userName);
    expect(res.body[0].password).toEqual(undefined);
    expect(res.body[0].token).toEqual(user.token);
    expect(res.body[0].isActive).toEqual(user.isActive);
    expect(res.body[0].admin).toEqual(user.admin);
    expect(res.body).toHaveLength(1);
    callback();
  });

  it('/users/:id (GET)', async (callback) => {
    const res = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);

    expect(res.body.id).toEqual(user.id);
    expect(res.body.name).toEqual(user.name);
    expect(res.body.userName).toEqual(user.userName);
    expect(res.body.password).toEqual(undefined);
    expect(res.body.token).toEqual(user.token);
    expect(res.body.isActive).toEqual(user.isActive);
    expect(res.body.admin).toEqual(user.admin);
    callback();
  });

  it('/users/:id (PUT)', async (callback) => {
    const res = await request(app.getHttpServer())
      .put(`/users/${user.id}`)
      .send(updatedUser)
      .expect(200);

    expect(res.body.id).toEqual(user.id);
    expect(res.body).toMatchObject(updatedUser);
    callback();
  });

  it('/users/:id (DELETE)', async (callback) => {
    await request(app.getHttpServer()).delete(`/users/${user.id}`).expect(200);
    callback();
  });

  afterAll(async (callback) => {
    await app.close();
    callback();
  });
});
