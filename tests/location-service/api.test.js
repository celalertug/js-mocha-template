/* eslint-disable no-undef */
const assert = require('assert');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios').default;
const controller = require('../../location-service/index.js');

describe('server', () => {
  const TEST_TIMEOUT = 25000;

  const PORT = 3000;
  const URL = `http://localhost:${PORT}`;

  let listener;
  beforeEach(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', controller());
    listener = app.listen(PORT);
  });

  afterEach(async () => {
    listener.close();
  });

  it('should echo api', async () => {
    const res = await axios.get(`${URL}/test`);
    assert.deepStrictEqual(res.data, { message: 'surprise motherfucker!!!' });
  });

  it('should move it', async () => {
    const res = await axios.post(`${URL}/move`, {
      src: {
        lat: 41.005752,
        lng: 29.987754,
      },
      dest: {
        lat: 38.656567,
        lng: 29.687739,
      },
    });
    // console.log(res.data);
    assert.deepStrictEqual(res.data.code, 200);
    assert.deepStrictEqual(res.data.success, true);
  }).timeout(TEST_TIMEOUT);

  it('should update location', async () => {
    const res = await axios.post(`${URL}/location`, {
      lat: 41,
      lng: 29,

    });
    // console.log(res.data);
    assert.deepStrictEqual(res.data, {
      code: 200, success: true, msg: '', data: { lat: 41, lng: 29 },
    });
  }).timeout(TEST_TIMEOUT);
});
