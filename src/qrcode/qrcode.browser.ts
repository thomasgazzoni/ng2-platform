import { Observable, Observer } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { IQrcodeService } from './qrcode.service';

export class QrcodeServiceBrowser implements IQrcodeService {

    constructor(
        private _http: Http,
    ) {

    }

    public generateQrcode(apiUrl: string, data: string, fallbackUrl: string): string {

        const params = `?s=${data}&url=${fallbackUrl}`;

        return `${apiUrl}${params}`;
    }

    public scanQrcode() {

        return Observable
            .create((observer: Observer<string>) => {

                observer.error('Not implemented on desktop yet');
                observer.complete();

            });
    }
}
