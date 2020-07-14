const { execSync } = require('child_process');
const { v4 } = require('uuid');
const fs = require('fs');

const run = (cmd) => execSync(`genyshell -c "${cmd}"`, { encoding: 'utf-8' });

const runScript = (script) => {
  const path = `/tmp/${v4()}`;
  let s = '';
  script.forEach((i) => {
    s += `${i}\n`;
  });
  fs.writeFileSync(path, s);

  const ret = execSync(`genyshell -f "${path}"`, { encoding: 'utf-8' });
  execSync(`rm "${path}"`, { encoding: 'utf-8' });
  return ret;
};

const setLongitude = (longitude) => {
  run(`gps setlongitude ${longitude}`);
};

const getLongitude = () => {
  let ret = run('gps getlongitude');
  ret = ret.split('\n').filter((i) => i.indexOf('GPS') !== -1);
  if (ret.length === 0) {
    return null;
  }
  ret = ret[0].split(':');
  ret = ret[ret.length - 1];
  ret = parseFloat(ret);
  return ret;
};

const setLatitude = (latitude) => {
  run(`gps setlatitude ${latitude}`);
};

const getLatitude = () => {
  let ret = run('gps getlatitude');
  ret = ret.split('\n').filter((i) => i.indexOf('GPS') !== -1);
  if (ret.length === 0) {
    return null;
  }
  ret = ret[0].split(':');
  ret = ret[ret.length - 1];
  ret = parseFloat(ret);
  return ret;
};

module.exports = {
  setLatitude,
  getLatitude,
  setLongitude,
  getLongitude,
  runScript,
};
