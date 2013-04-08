
var soy = require('../soynode.js');
var db = require('../src/setupdb');
var isProduction = process.env.NODE_ENV === 'production';

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.end(soy.render('app.soy.main', {
    isProduction: isProduction,
    items: [
      'j3S3Txsl2vs',
      'kcVh-tXfwZw',
      '-3JCESdFNyw',
      '05ZvII57p_M',
      'tu3IkbDvteQ',
      'PtcqXFZFiWo',
      'eeM5YcMUtFQ',
      '93t1H-EkUj4',
      'qN3kC_4xURA',
      'f9iIgQN5uZE',
      'tb3qxDrsA0M',
      'RIFSuAJhTlg',
      'NKlCIR654Ho',
      'aryARs0szU4',
      'duVq7cXWcYw',
      '1dF2ZLq7oBk',
      'QNwCojCJ3-Q',
      '-0Xa4bHcJu8',
      'FavUpD_IjVY',
      'WQO-aOdJLiw',
      'jX3iLfcMDCw',
      'oWTgvRGwzWg',
      'GAvS1ndtEKg',
      '6W_ETBVdoKc',
      'MuWTQtyKih4'
    ]
  }));
};
