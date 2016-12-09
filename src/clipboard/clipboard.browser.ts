import { Observable, Observer } from 'rxjs/Rx';

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
