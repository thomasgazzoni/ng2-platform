import { Observable } from 'rxjs/Rx';

import { PlatformService } from '../index';
import { PushServiceBrowser } from './push.browser';
import { PushServiceIonic } from './push.ionic';

export interface IPushService {
    onSubscribed: Observable<string>;
    init();
    subscribe();
    unsubscribe();
}

export abstract class PushService implements IPushService {
    public onSubscribed: Observable<string>;
    public abstract init();
    public abstract subscribe();
    public abstract unsubscribe();
}

export function pushServiceFactory(platformService: PlatformService): IPushService {

    if (platformService.isMobile) {
        return new PushServiceIonic();
    }

    return new PushServiceBrowser();
}
