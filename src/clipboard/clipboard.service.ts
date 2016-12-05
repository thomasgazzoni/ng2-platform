import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../index';
import { ClipboardServiceBrowser } from './clipboard.browser';
import { ClipboardServiceIonic } from './clipboard.ionic';
import { ClipboardServiceElectron } from './clipboard.electron';

export interface IClipboardService {
    copy(text: string);
    paste(): Observable<string>;
}

export abstract class ClipboardService implements IClipboardService {
    public abstract copy(text: string);
    public abstract paste(): Observable<string>;
}

export function clipboardServiceFactory(platformService: PlatformService): IClipboardService {

    if (platformService.isMobile) {
        return new ClipboardServiceIonic();
    }

    if (platformService.isDesktop) {
        return new ClipboardServiceElectron();
    }

    return new ClipboardServiceBrowser();
}
