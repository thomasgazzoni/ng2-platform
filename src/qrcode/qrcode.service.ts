import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../index';
import { QrcodeServiceBrowser } from './qrcode.browser';
import { QrcodeServiceIonic } from './qrcode.ionic';

export const QRCODE_API_GEN_ENDPOINT = '/api/qrcode/gen/';
export const QRCODE_API_DECODE_ENDPOINT = '/api/qrcode/';

export interface IQrcodeService {
    generateQrcode(data: string, fallbackUrl: string): string;
    scanQrcode(): Observable<any>;
}

export abstract class QrcodeService implements IQrcodeService {
    public abstract generateQrcode(data: string, fallbackUrl: string): string;
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
