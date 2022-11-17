/**
 * @file declares Tuit datatype.
 */
import User from "./User";
import Stats from "./Stats"
/**
  * @typedef Tuit represents the following manadatory properties
  * @tuit
  * @postedBy
  */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats?:Stats
};