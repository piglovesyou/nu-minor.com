
// Google Calendar

module.exports = {
  // "id": String,
  'kind': String,
  'etag': String,
  'status': String,
  'htmlLink': String,
  'created': Date,
  'updated': Date,
  'summary': String,
  'creator': {
    'email': String,
    'displayName': String
  },
  'organizer': {
    'email': String,
    'displayName': String,
    'self': Boolean
  },
  'start': {
    'date': Date
  },
  'end': {
    'date': Date
  },
  'transparency': String,
  'iCalUID': String,
  'sequence': Number
};