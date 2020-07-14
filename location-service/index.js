const express = require('express');
const { getLocation, moveLocation, updateLocation } = require('./move-it');
const { makeResponse } = require('../utils/http-util.js');

const controller = () => {
  const router = express.Router();

  router.get('/test', (req, res) => {
    res.json({ message: 'surprise motherfucker!!!' });
  });

  router.post('/location', (req, res) => {
    const { lat, lng } = req.body;
    updateLocation(lat, lng);
    const coords = getLocation();
    res.json(makeResponse(200, true, '', coords));
  });

  router.get('/location', (req, res) => {
    res.json(makeResponse(200, true, '', getLocation()));
  });

  router.post('/move', async (req, res) => {
    const { src, dest, step } = req.body;
    // console.log(src, dest);

    try {
      await moveLocation(
        { lat: src.lat, lng: src.lng },
        { lat: dest.lat, lng: dest.lng },
        step || 1,
      );
      res.json(makeResponse(200, true, '', getLocation()));
    } catch (error) {
      res.json(makeResponse(404, false, error));
    }
  });

  return router;
};

module.exports = controller;
