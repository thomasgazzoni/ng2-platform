import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
// import { clipboard } from 'electron';

import { IClipboardService } from './clipboard.service';

export class ClipboardServiceElectron implements IClipboardService {

    public copy(text: string) {
        // clipboard.writeText(text);
    }

    public paste() {

        return Observable
            .create((observer: Observer<string>) => {

                // observer.next(clipboard.readText());
                observer.complete();

            });
    }

}
