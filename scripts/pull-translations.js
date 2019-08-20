#! /usr/bin/env node
/* eslint no-console: 0 */
const pkg = require('../package.json');
const async = require('async');
const fs = require('fs');
const colors = require('colors'); // eslint-disable-line
const request = require('request');
const _ = require('lodash');
const mkdirp = require('mkdirp');
let shortid = require('shortid');

shortid = shortid.generate();

console.log('- Update Translations from www.rackspace.com -'.green);

const targetDir = `${__dirname}/../src/translations`;

if (!fs.existsSync(targetDir)) {
  mkdirp.sync(targetDir);
}

function getLocales(callback) {
  console.log(`Pulling ${'locales.json'.cyan}`);
  request.get(`https://admin.rackspace.com/api/content/locales.json?${shortid}`, (err, res, body) => {
    fs.writeFile(`${targetDir}/locales.json`, body, (error) => {
      let payload = body;
      if (err) {
        payload = console.log(error);
      }
      return payload;
    });
    body = JSON.parse(body);
    callback(err, body);
  });
}

function saveLocale(locale, callback) {
  const prefix = locale.prefix.length ? `/${locale.prefix}` : '';
  const filename = locale.prefix.length ? locale.prefix : locale.language;
  request.get(`https://admin.rackspace.com${prefix}/api/content/signup.json?${shortid}`, (err, res, body) => {
    console.log(`Pulled ${filename.cyan}`);
    body = body.replace(/(\\n|\\r)/g, '');
    body = JSON.parse(body);
    fs.writeFile(`${targetDir}/${filename}.json`, JSON.stringify(body, null, 2), callback);
  });
}

function saveLocales(callback, results) {
  let locales = results.locales;
  locales = _.transform(locales, (list, value, key) => {
    list.push(value);
    return list;
  }, []);
  async.map(locales, saveLocale, callback);
}

const opts = {
  locales: getLocales,
  save: ['locales', saveLocales],
};

async.auto(opts, (err, data) => {
  console.log('- Translations updated! -'.green);
});
