import { GenericAPIEntity } from "./GenericAPIEntity";

/**
 * API Cached User entity.
 */
export default interface CachedUserEntity extends GenericAPIEntity {
    /**
     * Whether this user is a bot.
     */
    bot: boolean;

    /**
     * Username.
     */
    username: string;

    /**
     * User discriminant.
     */
    discrim: string;

    /**
     * User avatar url.
     */
    avatarUrl: string;

    /**
     * Account creation date string.
     */
    creationDate: string;
}