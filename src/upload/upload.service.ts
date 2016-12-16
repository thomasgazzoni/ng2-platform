import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { UploadServiceBrowser } from './upload.browser';
import { UploadServiceIonic } from './upload.ionic';

export interface IUploadService {
    upload<T>(endpoint: string, fieldName: string, fileDataOrUrl: string | Blob): IUploadResult<T>;
    getFilePreview(data: string | File): Promise<string>;
    getFileToUpload(data: string | File): Blob;
}

export interface IFileUploadResult <T> {
    /**
     * The number of bytes sent to the server as part of the upload.
     */
    bytesSent: number;
    /**
     * The HTTP response code returned by the server.
     */
    responseCode: number;
    /**
     * The HTTP response returned by the server.
     */
    response: string;
    responseData: T;
    /**
     * The HTTP response headers by the server.
     */
    headers: {
        [s: string]: any;
    };
}

export interface IUploadResult<T> {
    uploadResult$: Observable<IFileUploadResult<T>>;
    uploadProgress$: Observable<number>;
    abort: Function;
}

export abstract class UploadService implements IUploadService {
    public abstract upload<T>(endpoint: string, fieldName: string, fileDataOrUrl: string | Blob): IUploadResult<T>;
    public abstract getFilePreview(data: string | File): Promise<string>;
    public abstract getFileToUpload(data: string | File): Blob;
}

export function uploadServiceFactory(platformService: PlatformService): IUploadService {

    if (platformService.isMobile) {
        return new UploadServiceIonic();
    }

    return new UploadServiceBrowser();
}
