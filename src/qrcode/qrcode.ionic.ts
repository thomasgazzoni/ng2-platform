import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import { BarcodeScanner } from 'ionic-native';

import { IUser } from '../../user/user.model';

import {
    IQrcodeService,
    QRCODE_API_GEN_ENDPOINT,
    QRCODE_API_DECODE_ENDPOINT
} from './qrcode.service';

import { ENVIRONMENT } from '../../../environments/environment';

export class QrcodeServiceIonic implements IQrcodeService {

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

                BarcodeScanner.scan()
                    .then((barcodeData) => {
                        console.debug('barcodeData', barcodeData);

                        if (!barcodeData.cancelled) {

                            const urlAndToken = barcodeData.text as string;

                            if (urlAndToken.indexOf('/qr/') > 0) {

                                const token = urlAndToken.split('/qr/')[1];

                                this._http.get(`${ENVIRONMENT.HOST}${QRCODE_API_DECODE_ENDPOINT}${token}`)
                                    .map(res => res.text())
                                    .subscribe(data => {
                                        console.debug('barcodeData api', data);
                                        observer.next(data);
                                        observer.complete();
                                    });
                            } else {
                                observer.error('QR Code not supported by this app');
                                observer.complete();
                            }
                        } else {
                            observer.complete();
                        }

                    }, (err) => {
                        observer.error(err);
                        observer.complete();
                    });

            });
    }
}
