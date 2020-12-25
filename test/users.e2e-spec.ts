import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from './../src/users/user.entity';
import TestUtil from './../src/common/test/testUtil';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user: User = TestUtil.giveAMeAValidUser();
  const updatedUser: User = TestUtil.giveAMeAValidUser();

  it('/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(res.body.id).toEqual(user.id);
    expect(res.body.name).toEqual(user.name);
    expect(res.body.userName).toEqual(user.userName);
    expect(res.body.isActive).toEqual(user.isActive);
  });

  it('/users (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/users').expect(200);

    expect(res.body[0].id).toEqual(user.id);
    expect(res.body[0].name).toEqual(user.name);
    expect(res.body[0].userName).toEqual(user.userName);
    expect(res.body[0].isActive).toEqual(user.isActive);
    expect(res.body).toHaveLength(1);
  });

  it('/users/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);

    expect(res.body.id).toEqual(user.id);
    expect(res.body.name).toEqual(user.name);
    expect(res.body.userName).toEqual(user.userName);
    expect(res.body.isActive).toEqual(user.isActive);
  });

  it('/users/:id (PUT)', async () => {
    const res = await request(app.getHttpServer())
      .put(`/users/${user.id}`)
      .send(updatedUser)
      .expect(200);

    expect(res.body.id).toEqual(updatedUser.id);
    expect(res.body.name).toEqual(updatedUser.name);
    expect(res.body.userName).toEqual(updatedUser.userName);
    expect(res.body.isActive).toEqual(updatedUser.isActive);
  });

  it('/users/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${updatedUser.id}`)
      .expect(200);
  });
});
