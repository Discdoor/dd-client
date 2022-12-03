import { GenericAPIEntity } from "./GenericAPIEntity";

/**
 * API Guild entity.
 */
export default interface GuildEntity extends GenericAPIEntity {
    /**
     * Guild icon URL.
     */
    iconUrl: string;

    /**
     * Guild name.
     */
    name: string;
}