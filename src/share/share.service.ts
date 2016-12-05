import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../index';
import { ShareServiceBrowser } from './share.browser';
import { ShareServiceIonic } from './share.ionic';

export interface IShareService {
    shareTo(title: string, url: string, message: string): Observable<string>;
}

export abstract class ShareService implements IShareService {
    public abstract shareTo(title: string, url: string, message: string): Observable<string>;
}

export function shareServiceFactory(platformService: PlatformService): IShareService {

    if (platformService.isMobile) {
        return new ShareServiceIonic();
    }

    return new ShareServiceBrowser();
}
