import { Observable, Observer } from 'rxjs/Rx';
import { SocialSharing } from 'ionic-native';

import { IShareService } from './share.service';

export class ShareServiceIonic implements IShareService {

    public shareTo(title: string, url: string, message: string): Observable<string> {

        const options = {
            subject: title,
            message: title,
            files: [],
            url: url,
            chooserTitle: 'Share via...'
        };

        return Observable
            .create((observer: Observer<string>) => {

                SocialSharing.shareWithOptions(options)
                    .then((data) => {
                        observer.next(data);
                        observer.complete();
                    })
                    .catch((error) => {
                        observer.error(error);
                        observer.complete();
                    });
            });
    }
}
