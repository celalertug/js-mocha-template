/* eslint-disable no-undef */
const assert = require('assert');
const {
  setLatitude,
  getLatitude,
  setLongitude,
  getLongitude,
  runScript,
} = require('../../location-service/geny-lib.js');

describe('geny-lib', () => {
  const TEST_TIMEOUT = 10000;

  it('long', () => {
    setLongitude(55);
    const res = getLongitude();
    assert.equal(res, 55);
  }).timeout(TEST_TIMEOUT);

  it('lat', () => {
    setLatitude(44);
    const res = getLatitude();
    assert.equal(res, 44);
  }).timeout(TEST_TIMEOUT);

  it('script', () => {
    runScript(['gps setlatitude 33', 'gps setlongitude 33']);
    res = getLongitude();
    assert.equal(res, 33);
    res = getLatitude();
    assert.equal(res, 33);
  }).timeout(TEST_TIMEOUT);
});
