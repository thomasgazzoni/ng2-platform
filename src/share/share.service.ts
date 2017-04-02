import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { ShareServiceBrowser } from './share.browser';
import { ShareServiceIonic } from './share.ionic';

export interface IShareService {
    shareTo(title: string, url: string, message: string, files?: Array<any>): Observable<string>;
}

export abstract class ShareService implements IShareService {
    public abstract shareTo(title: string, url: string, message: string, files?: Array<any>): Observable<string>;
}

export function shareServiceFactory(platformService: PlatformService): IShareService {

    if (platformService.isMobile) {
        return new ShareServiceIonic();
    }

    return new ShareServiceBrowser();
}
