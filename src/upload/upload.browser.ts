import { Observable, Observer, Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { IUploadService, IUploadResult, IFileUploadResult } from './upload.service';
import { UploadUtils } from './upload.utils';

// import { ENVIRONMENT } from '../../../environments/environment';

export class UploadServiceBrowser extends UploadUtils implements IUploadService {

    constructor() {
        super();
    }

    public upload<T>(endpoint: string, fieldName: string, fileData: string | Blob): IUploadResult<T> {

        const url = endpoint;

        // fileData can be a File or a paste/photo image (base64)
        const fileToUpload = this.getFileToUpload(fileData);

        const uploadProgress = new Subject<number>();

        const result: IUploadResult<T> = {
            uploadResult$: undefined,
            uploadProgress$: uploadProgress.asObservable(),
            abort: undefined,
        };

        const xhr = new XMLHttpRequest();
        const form = new FormData();
        form.append(fieldName, fileToUpload, 'image');

        const time = new Date().getTime();
        const load = 0;
        const speed = 0;
        const speedHumanized: string = null;

        result.abort = () => xhr.abort();

        result.uploadResult$ = Observable
            .create((observer: Observer<IFileUploadResult<T>>) => {

                uploadProgress.next(0);

                xhr.upload.onprogress = (e: ProgressEvent) => {
                    if (e.lengthComputable) {

                        // if (this.calculateSpeed) {
                        //   time = new Date().getTime() - time;
                        //   load = e.loaded - load;
                        //   speed = load / time * 1000;
                        //   speed = parseInt(<any>speed, 10);
                        //   speedHumanized = humanizeBytes(speed);
                        // }

                        const percent = Math.round(e.loaded / e.total * 100);

                        console.debug('upload percent', percent, e.loaded, e.total);

                        uploadProgress.next(percent);

                        if (percent === 100) {
                            Observable
                                .interval(150)
                                .take(10)
                                .map(value => value * 10)
                                .subscribe(value => uploadProgress.next(value));
                        }

                        // if (speed === 0) {
                        //     uploadingFile.setProgres({
                        //         total: e.total,
                        //         loaded: e.loaded,
                        //         percent: percent
                        //     });
                        // } else {
                        //     uploadingFile.setProgres({
                        //         total: e.total,
                        //         loaded: e.loaded,
                        //         percent: percent,
                        //         speed: speed,
                        //         speedHumanized: speedHumanized
                        //     });
                        // }
                    }
                };

                xhr.upload.onabort = (e: Event) => {

                };

                xhr.onreadystatechange = () => {

                    if (xhr.readyState === XMLHttpRequest.DONE) {

                        uploadProgress.next(100);
                        uploadProgress.complete();

                        if (xhr.status === 201) {
                            observer.next({
                                bytesSent: 0,
                                response: xhr.response,
                                responseCode: xhr.status,
                                responseData: JSON.parse(xhr.response),
                                headers: [], // xhr.getAllResponseHeaders()
                            });
                        } else {
                            observer.error(`${xhr.statusText}`);
                        }
                        observer.complete();
                    }
                };

                xhr.open('POST', url, true);
                // xhr.setRequestHeader('X-CSRFToken', ENVIRONMENT.AUTH_CSRFTOKEN);
                xhr.withCredentials = true;
                xhr.send(form);
            });

        return result;
    }

}
