
// https://api.twitter.com/1/users/show.json?id=${id}

module.exports = {
  id: String, // Actually it's Number
  id_str: String,
  name: String,
  screen_name: String,
  location: String,
  url: String,
  description: String,
  protected: Boolean,
  followers_count: Number,
  friends_count: Number,
  listed_count: Number,
  created_at: String,
  favourites_count: Number,
  utc_offset: Number,
  time_zone: String,
  geo_enabled: Boolean,
  verified: Boolean,
  statuses_count: Number,
  lang: String,
  status: {
    created_at: String,
    id: Number,
    id_str: String,
    text: String,
    source: String,
    truncated: Boolean,
    in_reply_to_status_id: String,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: String,
    in_reply_to_user_id_str: String,
    in_reply_to_screen_name: String,
    geo: String,
    coordinates: String,
    place: String,
    contributors: String,
    retweet_count: Number,
    favorite_count: Number,
    entities: {
      hashtags: String,
      symbols: String,
      urls: [
        {
          url: String,
          expanded_url: String,
          display_url: String,
          indices: [Number]
        }
      ],
      user_mentions: String,
    },
    favorited: Boolean,
    retweeted: Boolean,
    possibly_sensitive: Boolean,
    lang: String
  },
  contributors_enabled: Boolean,
  is_translator: Boolean,
  profile_background_color: String,
  profile_background_image_url: String,
  profile_background_image_url_https: String,
  profile_background_tile: Boolean,
  profile_image_url: String,
  profile_image_url_https: String,
  profile_link_color: String,
  profile_sidebar_border_color: String,
  profile_sidebar_fill_color: String,
  profile_text_color: String,
  profile_use_background_image: Boolean,
  default_profile: Boolean,
  default_profile_image: Boolean,
  following: String,
  follow_request_sent: String,
  notifications: String
};