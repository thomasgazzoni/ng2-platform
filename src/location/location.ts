import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';

export interface ILocation {
    lat: number;
    lon: number;
}

@Injectable()
export class LocationService {
    private _location: ILocation;

    get location(): ILocation {
        return this._location;
    }

    set location(locationObj: ILocation) {
        this._location = locationObj;
    }

    public getGMapsString(address: string): string {
        if (!address) {
            return;
        }
        return 'http://maps.google.com/?daddr=' + address.replace(',', '').replace(' ', '+');
    }
}
