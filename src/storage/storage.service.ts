import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { StorageServiceBrowser } from './storage.browser';
import { StorageServiceIonic } from './storage.ionic';

export interface IStorageService {
    get(key: string): Observable<any>;
    set(key: string, value: any): Observable<void>;
    remove(key: string): Observable<void>;
    clear(): Observable<void>;
}

export abstract class StorageService implements IStorageService {
    public abstract get(key: string): Observable<any>;
    public abstract set(key: string, value: any): Observable<void>;
    public abstract remove(key: string): Observable<void>;
    public abstract clear(): Observable<void>;
}

export function storageServiceFactory(platformService: PlatformService): IStorageService {

    if (platformService.isMobile) {
        return new StorageServiceIonic(platformService);
    }

    return new StorageServiceBrowser(platformService);
}
