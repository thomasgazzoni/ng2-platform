import { Observable, Observer, Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { IDownloadService, IDownloadResult } from './download.service';

export class DownloadServiceBrowser implements IDownloadService {

    constructor() {

    }

    public download<T>(fileUrl: string, fileName: string): Observable<IDownloadResult> {

        return undefined;
    }

}
