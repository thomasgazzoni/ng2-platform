import { Observable, Observer, Subject } from 'rxjs/Rx';
import {
    LocalNotifications,
    Transfer,
    FileOpener,
} from 'ionic-native';

import { IDownloadService, IDownloadResult } from './download.service';

export class DownloadServiceIonic implements IDownloadService {

    constructor() {

    }

    public download<T>(fileUrl: string, fileName: string): Observable<IDownloadResult> {

        const fileTransfer = new Transfer();
        const uri = `https:${fileUrl}?filename=${encodeURI(fileName)}`;
        const targetUri = `${window.cordova.file.externalDataDirectory}${fileName}`;

        fileTransfer.onProgress((event) => {
            console.debug('download onProgress:', event.loaded, event.total);
        });

        return Observable
            .create((observer: Observer<string>) => {

                fileTransfer.download(
                    uri,
                    targetUri)
                    .then((entry) => {
                        console.debug('download complete: ' + entry.toURL());
                        // FileOpener.open(entry.toURL(), 'application/');
                        LocalNotifications.schedule({
                            id: 100,
                            title: `Download completed`,
                            text: entry.toURL(),
                            data: entry,
                        });

                        observer.next(entry);
                        observer.complete();

                    }).catch((error) => {
                        console.debug('download error source ' + error.source);
                        console.debug('download error target ' + error.target);
                        console.debug('download error code' + error.code);
                        LocalNotifications.schedule({
                            id: 100,
                            title: `Downloading ${fileName} error`,
                            text: '0%',
                            data: fileName,
                        });

                        observer.error(error);
                        observer.complete();
                    });
            });
    }
}
