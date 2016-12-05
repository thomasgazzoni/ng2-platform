import { Observable, Observer } from 'rxjs/Rx';

import { ILocationService, ILocation } from './location.service';

export class LocationServiceBrowser implements ILocationService {


    getCurrentPosition() {

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        return Observable
            .create((observer: Observer<ILocation>) => {

                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        observer.next( pos.coords);
                        observer.complete();

                    }, (error) => {
                        observer.error(error);
                        observer.complete();
                    }, options);

            });

    }

}
