import request from 'supertest';
import { expect } from 'chai';
// import assert from 'assert';
import mocha from 'mocha';

import app from '../src/app';

const { describe, it } = mocha;

describe('Users controller', () => {
  describe('GET /ping', () => {
    it('Responds with ´Alive message in json and statusCode 200', async () => {
      const response = await request(app).get('/ping');
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.equal('Alive');
      expect(response.type).to.equal('application/json');
      expect(response.statusCode).to.equal(200);
    });
  });
});
