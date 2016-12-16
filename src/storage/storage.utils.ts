import { Observable, Observer } from 'rxjs/Rx';
import localForage from 'localforage';

import { PlatformService } from '../platform.service';

/**
 * StorageUtils
 */
export class StorageUtils {

    private _db: LocalForage;

    constructor(
        platformService: PlatformService
    ) {

        const dbConfig: LocalForageOptions = {
            name: platformService.appName,
            version: 3,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: `${platformService.appName}_db`, // Should be alphanumeric, with underscores.
            description: 'Data db',
        };

        this._db = localForage.createInstance(dbConfig);

        this._db.setDriver([
            localForage.INDEXEDDB,
            localForage.WEBSQL,
            localForage.LOCALSTORAGE,
        ]);

        this._db.length(); // Init db now
    }

    get(keyName: string) {

        return Observable
            .fromPromise(this._db.getItem(keyName))
            .catch((error) => {
                console.error('Storage DB: error get', keyName);
                return Observable.of(undefined);
            });

    }

    set(keyName: string, value: any) {

        return Observable
            .fromPromise(this._db.setItem(keyName, value))
            .catch((error) => {
                console.error('Storage DB: error set', keyName, value);
                return Observable.of(undefined);
            });

    }

    remove(keyName: string) {

        return Observable
            .fromPromise(this._db.removeItem(keyName))
            .catch((error) => {
                console.error('Storage DB: error remove', keyName);
                return Observable.of(undefined);
            });

    }

    clear() {

        return Observable
            .fromPromise(this._db.clear())
            .catch((error) => {
                console.error('Storage DB: clear db');
                return Observable.of(undefined);
            });
    }
}
