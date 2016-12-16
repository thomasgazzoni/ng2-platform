import { Observable, Observer } from 'rxjs/Rx';

import { StorageUtils } from './storage.utils';
import { IStorageService } from './storage.service';
import { PlatformService } from '../platform.service';

export class StorageServiceBrowser extends StorageUtils implements IStorageService {

    constructor(platformService: PlatformService) {
        super(platformService);
    }
}
