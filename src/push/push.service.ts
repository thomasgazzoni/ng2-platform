import { Observable } from 'rxjs/Rx';

import { PlatformService } from '../platform.service';
import { PushServiceBrowser } from './push.browser';
import { PushServiceIonic } from './push.ionic';

export interface IPushNotification {
    title: string;
    message: string;
    data?: any;
}

export interface IPushService {
    onSubscribed: Observable<string>;
    onShowNotitication: Observable<IPushNotification>;
    init();
    subscribe();
    unsubscribe();
}

export abstract class PushService implements IPushService {
    public onSubscribed: Observable<string>;
    public onShowNotitication: Observable<IPushNotification>;
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
