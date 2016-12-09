import { Observable, Observer } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { BarcodeScanner } from 'ionic-native';

import { IQrcodeService } from './qrcode.service';

export class QrcodeServiceIonic implements IQrcodeService {

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

                BarcodeScanner.scan()
                    .then((barcodeData) => {

                        if (!barcodeData.cancelled) {
                            observer.next(barcodeData.text);
                        }
                        observer.complete();

                    }, (err) => {
                        observer.error(err);
                        observer.complete();
                    });

            });
    }
}
