import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IClipboardService } from './clipboard.service';

export class ClipboardServiceBrowser implements IClipboardService {

    public copy(text: string) {

    }

    public paste() {

        return Observable
            .create((observer: Observer<string>) => {

                observer.error('Not implemented on desktop yet');
                observer.complete();

            });
    }

}
