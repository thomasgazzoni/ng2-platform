import { Observable, Observer } from 'rxjs/Rx';
import { Clipboard } from 'ionic-native';

import { IClipboardService } from './clipboard.service';

export class ClipboardServiceIonic implements IClipboardService {

    public copy(text: string) {

        Clipboard.copy(text)
            .then((status) => {
                console.debug('MobileClipboardService success', status, text);
            })
            .catch(error => {
                console.debug('MobileClipboardService error', error, text);
            });
    }

    public paste() {

        return Observable
            .create((observer: Observer<string>) => {

                Clipboard.paste()
                    .then((status) => {
                        observer.next(status);
                        observer.complete();
                    })
                    .catch(error => {
                        observer.error(error);
                        observer.complete();
                    });
            });
    }
}
