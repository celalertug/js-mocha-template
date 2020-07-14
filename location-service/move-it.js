require('dotenv').config({ path: './.env' });
const fs = require('fs');
const { execSync } = require('child_process');
const axios = require('axios');
const { v4 } = require('uuid');

const { runScript, getLatitude, getLongitude } = require('./geny-lib.js');

// http://35.230.140.112:8989/route?point=41.005752,29.987754&point=40.656567,39.687739&points_encoded=false
const getRoute = (source, dest) => {
  const url = `${process.env.ROUTE_SERVICE}?point=${source.lat},${source.lng}&point=${dest.lat},${dest.lng}&points_encoded=false`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data.paths[0].points.coordinates);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const moveLocationScript = (res, waitStep = 1) => {
  const path = `/tmp/${v4()}`;

  let s = '';
  res.forEach((i) => {
    for (let j = 0; j < waitStep; ++j) {
      s += `gps setlatitude ${i[1]}\n`;
      s += `gps setlongitude ${i[0]}\n`;
    }
  });

  fs.writeFileSync(path, s);
  return path;
};

const updateLocation = async (lat, lng) => {
  runScript([`gps setlatitude ${lat}`, `gps setlongitude ${lng}`]);
};

const getLocation = () => {
  const lat = getLatitude();
  const lng = getLongitude();
  return { lat, lng };
};

const moveLocation = async (src, dest, step = 1) => {
  let res;
  try {
    res = await getRoute(
      { lat: src.lat, lng: src.lng },
      { lat: dest.lat, lng: dest.lng },
    );
  } catch (error) {
    console.error('rota hesaplanamadi');
    return null;
  }

  // console.log(JSON.stringify(res, null, 2));
  const scriptPath = moveLocationScript(res, step);
  const ret = execSync(`genyshell -f "${scriptPath}"`, { encoding: 'utf-8' });
  execSync(`rm  "${scriptPath}"`, { encoding: 'utf-8' });
  return ret;
};

module.exports = { moveLocation, updateLocation, getLocation };
