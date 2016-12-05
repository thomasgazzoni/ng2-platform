import { Observable, Observer } from 'rxjs/Rx';
import { SocialSharing } from 'ionic-native';

import { IShareService } from './share.service';

export class ShareServiceBrowser implements IShareService {

    public shareTo(title: string, url: string, message: string): Observable<string> {

        const options = {
            message: title,
            title: title,
            files: [],
            url: url,
            chooserTitle: 'Share via...'
        };

        return Observable
            .create((observer: Observer<string>) => {

                if (navigator.share === undefined) {
                    observer.error('Share API not supported');
                    observer.complete();
                    return;
                }

                navigator.share({
                    title: options.title,
                    text: options.message,
                    url: options.url
                })
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
