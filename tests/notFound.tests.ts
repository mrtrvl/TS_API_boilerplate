import request from 'supertest';
import { expect } from 'chai';
// import assert from 'assert';
import mocha from 'mocha';

import app from '../src/app';

const { describe, it } = mocha;

describe('Not found', () => {
  describe('GET /nonExistingRoute', () => {
    it('Responds with json with Not found message and statusCode 404', async () => {
      const response = await request(app).get('/nonExistingRoute');
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.equal('Not found');
      expect(response.type).to.equal('application/json');
      expect(response.statusCode).to.equal(404);
    });
  });
});
