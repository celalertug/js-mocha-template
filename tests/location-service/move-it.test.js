/* eslint-disable no-undef */
const assert = require('assert');
const {
  moveLocation,
  updateLocation,
  getLocation,
} = require('../../location-service/move-it');

describe('move-it', () => {
  const TEST_TIMEOUT = 30000;

  it('move', async () => {
    await moveLocation(
      { lat: 41.005752, lng: 29.987754 },
      { lat: 40.656567, lng: 39.687739 },
    );

    const res = getLocation();
    assert.deepEqual(Math.abs(res.lat - 40.655692) < 0.01, true);
    assert.deepEqual(Math.abs(res.lng - 39.687739) < 0.01, true);
  }).timeout(TEST_TIMEOUT);

  it('update', async () => {
    updateLocation(41, 41);

    const res = getLocation();
    assert.deepEqual(Math.abs(res.lat - 41) < 0.01, true);
    assert.deepEqual(Math.abs(res.lng - 41) < 0.01, true);
  }).timeout(TEST_TIMEOUT);
});
