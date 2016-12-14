import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { QrcodeServiceBrowser } from './qrcode.browser';
import { QrcodeServiceIonic } from './qrcode.ionic';

export interface IQrcodeService {
    generateQrcode(apiUrl: string, data: string, fallbackUrl: string): string;
    scanQrcode(): Observable<any>;
}

export abstract class QrcodeService implements IQrcodeService {
    public abstract generateQrcode(apiUrl: string, data: string, fallbackUrl: string): string;
    public abstract scanQrcode(): Observable<any>;
}

export function qrcodeServiceFactory(
    platformService: PlatformService,
    http: Http,
): IQrcodeService {

    if (platformService.isMobile) {
        return new QrcodeServiceIonic(http);
    }

    return new QrcodeServiceBrowser(http);
}
