


var soy = require('../soynode.js');
var Q = require('q');
var db = require('../promise/db');
var isProduction = process.env.NODE_ENV === 'production';
var _ = require('underscore');
var strftime = require('strftime');
var moment = require('moment');
moment.lang('ja');
goog.require('goog.array');
goog.require('goog.string.linkify');
var outError = require('../promise/promise').outError;


/*
 * GET home page.
 */

exports.index = function(req, res) {

  var feature = [
    'La-bD1IhMto',

    // @static_element@
    '103989632'

    // 'JphADRVX_W0',

    // '102117201',
    // '100169194',
    // 'd7fTQMUZ6yc',
    // 'phffZ2snf0A',
    // 'S0U4rIi07qY',
    // 'Ao399AaSV_E',

    // '106166477',
    // 'pl2DQWEFbp8'
  ];

  var itemsRef;
  db.items.find(null, null, {sort: {created_at: -1}})
  .then(function(items) {

    items = sortByIdAs(items, feature);

    items.forEach(extendItemForDisplay);

    itemsRef = items;
    items.splice(2, 0, {
      nm_type: '@static_element@',
      role: 'link',
      media: 'youtube',
      label: 'YouTube',
      href: 'http://www.youtube.com/user/NUminormusic'
    });

    items.splice(5, 0, {
      nm_type: '@static_element@',
      role: 'link',
      media: 'soundcloud',
      label: 'SoundCloud',
      href: 'https://soundcloud.com/nu-minor'
    });

  })
  .then(function(items) {
    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      items: itemsRef.concat(items ? _.shuffle(items) : [])
    }));
  })
  .fail(outError);

};


/* destractive */
function extendItemForDisplay(item) {
  switch (item.nm_type) {
    case 'googlecalendar':
      item.displayDate = moment().add(item.start.date.getTime() - Date.now()).calendar();
      break;
    case 'twitter':
      // item.displayDate = moment(item.created_at, 'DD').fromNow();
      item.displayDate = moment(item.created_at).fromNow();
      item.displayDateDescription = moment(item.created_at).format('LLLL');
      item.displayText = goog.string.linkify.linkifyPlainText(item.text);
  }
}

goog.require('goog.array');
var assert = require('assert');



nearlyEqual(sortByIdAs([
  { id: '03' },
  { id: '04' },
  { id: '01' },
  { id: '02' },
  { id: '05' }
],
['03', '02']).map(getId),
[
  '03',
  '02',
  '04',
  '01',
  '05'
]);

nearlyEqual(sortByIdAs([
  { id: '98374' },
  { id: '89' },
  { id: '834987121' },
  { id: '0' },
  { id: '834987122' }
],
[null, '834987121', null, '0']).map(getId),
[
  '98374' ,
  '834987121' ,
  '89' ,
  '0' ,
  '834987122'
]);




function sortByIdAs(objArr, idArr) {
  var result = new Array(objArr.length);

  idArr.forEach(function(id, index) {
    var found = goog.array.findIndex(objArr, function(obj) {
      if (!obj) return;
      return obj.id == id;
    });
    if (found < 0) return;
    result[index] = objArr[found];
    objArr[found] = null;
  });

  var next = 0;
  objArr.forEach(function(obj) {
    if (!obj) return;
    while (result[next]) ++next;
    result[next] = obj;
  });

  return result;
}

function getId(obj) {
  return obj.id;
}

function nearlyEqual(arr1, arr2, msg) {
  if (arr1.length != arr2.length) throw new Error(msg);
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) throw new Error(msg);
  }
}
