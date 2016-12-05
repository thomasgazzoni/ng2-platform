import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

import { IUploadService, IUploadResult, IFileUploadResult } from './upload.service';
import { UploadUtils } from './upload.utils';
import { UploadedFile } from './upload.file';

import { ENVIRONMENT } from '../../../environments/environment';

export class UploadServiceBrowser extends UploadUtils implements IUploadService {

    constructor() {
        super();
    }

    public upload<T>(endpoint: string, fieldName: string, fileData: string | Blob): IUploadResult<T> {

        const url = ENVIRONMENT.API_BASE_URL + endpoint;

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

        // Object.keys(this.data).forEach(k => {
        //     form.append(k, this.data[k]);
        // });

        const uploadingFile = new UploadedFile(
            '1',
            'file',
            fileToUpload.size
        );

        let time: number = new Date().getTime();
        let load = 0;
        let speed = 0;
        let speedHumanized: string = null;

        result.abort = () => xhr.abort();

        result.uploadResult$ = Observable
            .create((observer: Observer<IFileUploadResult<T>>) => {

                uploadProgress.next(0);

                xhr.upload.onprogress = (e: ProgressEvent) => {
                    if (e.lengthComputable) {

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

                        if (speed === 0) {
                            uploadingFile.setProgres({
                                total: e.total,
                                loaded: e.loaded,
                                percent: percent
                            });
                        } else {
                            uploadingFile.setProgres({
                                total: e.total,
                                loaded: e.loaded,
                                percent: percent,
                                speed: speed,
                                speedHumanized: speedHumanized
                            });
                        }

                        // this._emitter.emit(uploadingFile);
                    }
                };

                xhr.upload.onabort = (e: Event) => {
                    uploadingFile.setAbort();
                };

                xhr.onreadystatechange = () => {
                    console.debug('onreadystatechange .readyState', xhr.readyState);

                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        uploadingFile.onFinished(
                            xhr.status,
                            xhr.statusText,
                            xhr.response
                        );

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
                            observer.error(`Upload file error ${xhr.statusText}`);
                        }
                        observer.complete();
                    }
                };

                xhr.open('POST', url, true);
                xhr.setRequestHeader('X-CSRFToken', ENVIRONMENT.AUTH_CSRFTOKEN);
                xhr.withCredentials = true;
                xhr.send(form);
            });

        return result;
    }

}
