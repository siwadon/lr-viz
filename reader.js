'use strict';

const catalog = "test/data/catalog.lrcat"
const _ = require('lodash');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(catalog, sqlite3.OPEN_READONLY)

let stat = [];

db.each("SELECT id_local, captureTime FROM Adobe_images", function(err, row) {
  let year = moment(row.captureTime).format('Y');
  let month = moment(row.captureTime).format('M');

  if (_.isUndefined(stat[year])) {
    stat[year] = 1;
  } else {
    stat[year] += 1;
  }
});

db.close();
