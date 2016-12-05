import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

import { IUser } from '../../user/user.model';

import { IQrcodeService, QRCODE_API_GEN_ENDPOINT } from './qrcode.service';

import { ENVIRONMENT } from '../../../environments/environment';

export class QrcodeServiceBrowser implements IQrcodeService {

    constructor(
        private _http: Http,
    ) {

    }

    public generateQrcode(data: string, fallbackUrl: string): string {

        const params = `?s=${data}&url=${fallbackUrl}`;

        return `${ENVIRONMENT.HOST}${QRCODE_API_GEN_ENDPOINT}${params}`;
    }

    public scanQrcode() {

        return Observable
            .create((observer: Observer<string>) => {

                observer.error('Not implemented on desktop yet');
                observer.complete();

            });
    }
}
