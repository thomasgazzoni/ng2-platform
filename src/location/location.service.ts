import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { LocationServiceBrowser } from './location.browser';
import { LocationServiceIonic } from './location.ionic';

export interface ILocation extends Coordinates {

}

export interface ILocationService {
    /**
     * Return the current GPS (Coordinates) positions
     */
    getCurrentPosition(): Observable<ILocation>;
}

export abstract class LocationService implements ILocationService {
    public abstract getCurrentPosition(): Observable<ILocation>;
}

export function locationServiceFactory(platformService: PlatformService): ILocationService {

    if (platformService.isMobile) {
        return new LocationServiceIonic();
    }

    return new LocationServiceBrowser();
}
