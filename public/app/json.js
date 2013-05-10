
goog.provide('app.json');


/**
 * @typedef { {
 *   "wasPushed": boolean,
 *   "wasOppositePulled": boolean,
 *   "currentLike": number,
 *   "currentBad": number,
 *   "success": number,
 *   "message": string
 * } }
 */
app.json.ItemActionResponse;


/**
 * @typedef { {
 *   "nm_like": Array,
 *   "nm_bad": Array
 * } }
 */
app.json.ViewItemLikedUsers;
