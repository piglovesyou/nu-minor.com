


var soy = require('../soynode.js');
var Q = require('q');
var db = require('../promise/db');
var isProduction = process.env.NODE_ENV === 'production';
var _ = require('underscore');
var moment = require('moment');
moment.lang('ja');
goog.require('goog.array');
goog.require('goog.string.linkify');
var outError = require('../promise/promise').outError;


/*
 * GET home page.
 */

exports.index = function(req, res) {
  db.items.find(null, null, {sort: { updated_at: -1, created_at: -1 }})
  .then(extendItems)
  .then(sortItemsNicely)
  .then(insertStaticLinks)
  .then(function(items) {
    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      items: items
    }));
  })
  .fail(outError);
};

function sortItemsNicely(items) {
  [
    ['youtube', 0],
    ['googlecalendar', 2]
  ]
  .forEach(function(pair) {
    var found = goog.array.findIndex(items, function(i) { return i.nm_type == pair[0] });
    if (found >= 0) moveElementTo(items, found, pair[1]);
  });
  return items;
}

function insertStaticLinks(items) {
  items.splice(2, 0, {
    nm_type: '@static_element@',
    role: 'link',
    media: 'youtube',
    label: 'YouTube',
    href: 'http://www.youtube.com/user/NUminormusic'
  });
  items.splice(6, 0, {
    nm_type: '@static_element@',
    role: 'link',
    media: 'soundcloud',
    label: 'SoundCloud',
    href: 'https://soundcloud.com/nu-minor'
  });
  return items;
}

/* destractive */
function extendItems(items) {
  items.forEach(function(item) {
    switch (item.nm_type) {
      case 'googlecalendar':
        var d = item.start.dateTime || item.start.date;
        item.displayDate = moment(d).fromNow();
        item.displayDateDescription = moment(d).format('LLLL');
        item.displayURL = goog.string.linkify.findFirstUrl(item.description) ?
            goog.string.trim(item.description) : item.htmlLink;
        break;

      case 'twitter':
        item.displayDate = moment(item.created_at).fromNow();
        item.displayDateDescription = moment(item.created_at).format('LLLL');
        item.displayText = goog.string.linkify.linkifyPlainText(item.text);
        break;
    }
  });
  return items;
}

function moveElementTo(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
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
