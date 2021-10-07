import request from 'supertest';
import { expect } from 'chai';
import mocha from 'mocha';
import app from '../src/app';
import { NewUser } from '../src/components/users';

const { describe, it } = mocha;
const newUser: NewUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com',
  password: 'password',
};
let userId: number;
const inproperUserId = 'qwert';
const nonexistingUserId = 999999999;
const noneexistingUser = {
  email: 'nonexisting@email.com',
  password: 'password',
};

describe('Users controller', () => {
  describe('POST /users', () => {
    it('Responds with statusCode 400 because of missing user data', async () => {
      const response = await request(app).post('/users');
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 201 - creates new user', async () => {
      const response = await request(app).post('/users').send(newUser);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body.id).to.be.a('number');
      expect(response.statusCode).to.equal(201);
      userId = response.body.id;
    });
    it('Responds with statusCode 400 because of existing email', async () => {
      const response = await request(app).post('/users').send(newUser);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
  });
  describe('POST /users/login', () => {
    it('Responds with statusCode 400 because of missing email', async () => {
      const response = await request(app).post('/users/login').send({ email: noneexistingUser.email });
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 400 because of missing password', async () => {
      const response = await request(app).post('/users/login').send({ password: noneexistingUser.password });
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 404 because of nonexisting user', async () => {
      const response = await request(app).post('/users/login').send(noneexistingUser);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
    });
    it('Responds with statusCode 200 after successful login', async () => {
      const response = await request(app).post('/users/login').send(newUser);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('jwt');
      expect(response.body.jwt).to.be.a('string');
      expect(response.statusCode).to.equal(200);
    });
  });
  describe('GET /users', () => {
    it('Responds with statusCode 200 and list of users', async () => {
      const response = await request(app).get('/users');
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('users');
      expect(response.body.users).to.be.a('array');
      expect(response.body.users.length).to.be.greaterThan(0);
      expect(response.statusCode).to.equal(200);
    });
  });
  describe('GET /users/:id', () => {
    it('Responds with statusCode 200 and user data', async () => {
      const response = await request(app).get(`/users/${userId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('user');
      expect(response.body.user.firstName).to.equal(newUser.firstName);
      expect(response.body.user.lastName).to.equal(newUser.lastName);
      expect(response.body.user.email).to.equal(newUser.email);
      expect(response.body.user.role).to.equal('user');
      expect(response.body.user.status).to.equal('active');
      expect(response.statusCode).to.equal(200);
    });
    it('Responds with statusCode 400 due to inproper user id', async () => {
      const response = await request(app).get(`/users/${inproperUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 404 due to nonexisting user id', async () => {
      const response = await request(app).get(`/users/${nonexistingUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.statusCode).to.equal(404);
    });
  });
  describe('PATCH /users/:id', () => {
    it('Responds with statusCode 204 after changing users data', async () => {
      const firstName = 'Maarika';
      const response = await request(app).patch(`/users/${userId}`).send({ firstName });
      expect(response.type).to.equal('');
      expect(response.statusCode).to.equal(204);
    });
    it('Responds with statusCode 400 due to missing data to change', async () => {
      const response = await request(app).patch(`/users/${userId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).has.property('message');
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 400 due to inproper user id', async () => {
      const response = await request(app).patch(`/users/${inproperUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 404 due to nonexisting user id', async () => {
      const response = await request(app).patch(`/users/${nonexistingUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.statusCode).to.equal(404);
    });
  });
  describe('DELETE /users/:id', () => {
    it('Responds with statusCode 204 after deleting user', async () => {
      const response = await request(app).delete(`/users/${userId}`);
      expect(response.type).to.equal('');
      expect(response.statusCode).to.equal(204);
    });
    it('Responds with statusCode 400 due to inproper user id', async () => {
      const response = await request(app).delete(`/users/${inproperUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.body.error).to.equal(true);
      expect(response.statusCode).to.equal(400);
    });
    it('Responds with statusCode 404 due to nonexisting user id', async () => {
      const response = await request(app).delete(`/users/${nonexistingUserId}`);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('message');
      expect(response.statusCode).to.equal(404);
    });
  });
});
