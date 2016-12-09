import { Observable, Observer } from 'rxjs/Rx';

import { StorageUtils } from './storage.utils';
import { IStorageService } from './storage.service';

export class StorageServiceIonic extends StorageUtils implements IStorageService {

    constructor(platformService) {
        super(platformService);
    }
}
