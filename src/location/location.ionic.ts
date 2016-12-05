import { Observable, Observer } from 'rxjs/Rx';

import { Geolocation, GeolocationOptions } from 'ionic-native';

import { ILocationService, ILocation } from './location.service';

export class LocationServiceIonic implements ILocationService {

    getCurrentPosition() {

        const options: GeolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        return Observable
            .create((observer: Observer<ILocation>) => {

                Geolocation.getCurrentPosition(options)
                    .then(pos => {
                        observer.next(pos.coords);
                        observer.complete();

                    }).catch(error => {
                        observer.error(error);
                        observer.complete();
                    });

            });

    }

}
