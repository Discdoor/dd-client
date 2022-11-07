/**
 * API User entity.
 */
export interface UserEntity {
    /**
     * User avatar URL.
     */
    avatarUrl: string;

    /**
     * User discriminant.
     */
    discrim: string;

    /**
     * User email.
     */
    email: string;

    /**
     * Username.
     */
    username: string;

    /**
     * Account verification status. Only available to client user.
     */
    verifStatus: "VERIFIED_L1"|"VERIFIED_L2"|"AWAIT_VERIF"|"UNVERIFIED";
}