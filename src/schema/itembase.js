
// item base

module.exports = {
  type: String, // (youtube|twitter|...)
  like: {type: [ String ], default: [] },
  bad: {type: [ String ], default: [] },
  comment: [
    {
      userId: String,
      body: String,
      updateAt: {type: Date, default: Date.now}
    }
  ]
};
