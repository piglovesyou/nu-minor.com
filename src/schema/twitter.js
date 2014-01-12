
// twitter

/**@type{Object}*/
module.exports = {
  'coordinates': String,
  'truncated': Boolean,
  'favorited': Boolean,
  // 'created_at': String,
  'id_str': String,
  'entities': {
    'urls': [
      {
        'expanded_url': String,
        'url': String,
        'indices': [Number],
        'display_url': String
      }
    ],
    'hashtags': [String],
    'user_mentions': [String]
  },
  'in_reply_to_user_id_str': String,
  'text': String,
  'contributors': String,
  'in_reply_to_status_id_str': String,
  // 'id': Number,
  'retweet_count': Number,
  'geo': String,
  'retweeted': Boolean,
  'in_reply_to_user_id': String,
  'source': String,
  'user': {
    'profile_sidebar_border_color': String,
    'profile_background_tile': Boolean,
    'profile_sidebar_fill_color': String,
    'name': String,
    'expanded_url': String,
    'location': String,
    'profile_image_url': String,
    'created_at': String,
    'follow_request_sent': Boolean,
    'is_translator': Boolean,
    'profile_link_color': String,
    'id_str': String,
    'entities': {
      'urls': [String],
      'hashtags': [String],
      'user_mentions': [String]
    },
    'contributors_enabled': Boolean,
    'favourites_count': Number,
    'default_profile': Boolean,
    'url': String,
    'profile_image_url_https': String,
    'id': Number,
    'utc_offset': Number,
    'listed_count': Number,
    'profile_use_background_image': Boolean,
    'lang': String,
    'followers_count': Number,
    'profile_text_color': String,
    'protected': Boolean,
    'time_zone': String,
    'geo_enabled': Boolean,
    'profile_background_image_url_https': String,
    'notifications': Boolean,
    'description': String,
    'verified': Boolean,
    'profile_background_color': String,
    'default_profile_image': Boolean,
    'friends_count': Number,
    'profile_background_image_url': String,
    'statuses_count': Number,
    'display_url': String,
    'screen_name': String,
    'show_all_inline_media': Boolean,
    'following': Boolean
  },
  'in_reply_to_screen_name': String,
  'place': String,
  'in_reply_to_status_id': String
};

