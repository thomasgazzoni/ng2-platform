import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { DownloadServiceBrowser } from './download.browser';
import { DownloadServiceIonic } from './download.ionic';

export interface IDownloadResult {
    savedPath: string;
    fileName?: string;
    fileMime?: string;
}

export interface IDownloadService {
    download<T>(fileUrl: string, fileName: string): Observable<IDownloadResult>;
}

export abstract class DownloadService implements IDownloadService {
    public abstract download<T>(fileUrl: string, fileName: string): Observable<IDownloadResult>;
}

export function downloadServiceFactory(
    platformService: PlatformService): IDownloadService {

    if (platformService.isMobile) {
        return new DownloadServiceIonic();
    }

    return new DownloadServiceBrowser();
}
