import { performAPIRequest } from "./APIFetch";
import { getAPIDefinitions } from "./APIProps";
import CachedUserEntity from "./entities/CachedUserEntity";

export class APIUserCache {
    private cache: CachedUserEntity[] = [];

    /**
     * Gets the user object from the specified id.
     * @param id The Id of the user to retrieve.
     */
    public async fetch(id: string) {
        const user = this.cache.find(x => x.id == id);

        if(!user) {
            // Get from server
            const userObj = await performAPIRequest<CachedUserEntity>(getAPIDefinitions().gwServer + "/user/" + id, "GET", null);

            if(!userObj.success)
                return null;
            
            this.cache.push(userObj.data);
            return userObj.data;
        }
        else
            return user;
    }
}