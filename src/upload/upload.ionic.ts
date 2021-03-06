import { Observable, Observer, Subject } from 'rxjs/Rx';
import { Transfer, FileUploadOptions } from 'ionic-native';

import { IUploadService, IUploadResult, IFileUploadResult } from './upload.service';
import { UploadUtils } from './upload.utils';

export class UploadServiceIonic extends UploadUtils implements IUploadService {

    constructor() {
        super();
    }

    public upload<T>(endpoint: string, fieldName: string, fileData: string): IUploadResult<T> {

        const url = endpoint;

        // fileData is a file path/url on the device
        const fileToUpload = fileData;

        const uploadProgress = new Subject<number>();

        const result: IUploadResult<T> = {
            uploadResult$: undefined,
            uploadProgress$: uploadProgress.asObservable(),
            abort: undefined,
        };

        const options: FileUploadOptions = {
            httpMethod: 'POST',
            fileKey: fieldName,
            headers: this.apiUploadHeaders,
        };

        const fileTransfer = new Transfer();

        fileTransfer.onProgress((event) => {

            const percent = Math.round((event.loaded / event.total) * 100);
            uploadProgress.next(percent);

            if (percent === 100) {
                Observable
                    .interval(150)
                    .take(10)
                    .map(value => value * 10)
                    .subscribe(value => uploadProgress.next(value));
            }

        });

        result.abort = () => fileTransfer.abort();

        result.uploadResult$ = Observable
            .create((observer: Observer<IFileUploadResult<T>>) => {

                fileTransfer.upload(fileToUpload, url, options)
                    .then((status: IFileUploadResult<T>) => {
                        uploadProgress.next(100);
                        uploadProgress.complete();
                        if (status.responseCode === 200 || status.responseCode === 201) {
                            status.responseData = JSON.parse(status.response);
                            observer.next(status);
                        } else {
                            observer.error(`Upload file error ${status.response}`);
                        }
                        observer.complete();
                    })
                    .catch(error => {
                        uploadProgress.next(100);
                        uploadProgress.complete();
                        observer.error(error);
                        observer.complete();
                    });

                uploadProgress.next(1);

            });

        return result;
    }

    private transformHttpUriToFileUri(input: string) {

        const necessaryPart = '/var';
        const partIndex = input.indexOf(necessaryPart);

        if (partIndex === -1) {
            return input;
        }

        return `file://${input.substr(partIndex)}`;
    }
}
