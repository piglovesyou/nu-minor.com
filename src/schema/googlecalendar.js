
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
  'description': String,
  'location': String,
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
    'date': Date,
    'dateTime': Date
  },
  'end': {
    'date': Date,
    'dateTime': Date
  },
  'transparency': String,
  'iCalUID': String,
  'sequence': Number
};
