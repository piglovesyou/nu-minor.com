
// item base

module.exports = {
  nm_type: String, // (youtube|twitter|...)
  nm_like: {type: [ String ], default: [] },
  nm_bad: {type: [ String ], default: [] },
  nm_comment: [
    {
      userId: String,
      body: String,
      updateAt: {type: Date, default: Date.now}
    }
  ]
};
