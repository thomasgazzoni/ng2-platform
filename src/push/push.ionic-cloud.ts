import { Observable, Observer } from 'rxjs/Rx';
import { Push, PushToken } from '@ionic/cloud-angular';

import { PushUtils } from './push.utils';
import { IPushService } from './push.service';

export class PushIonicService extends PushUtils implements IPushService {

    public init() {

    }

    public subscribe() {

        // this.push.register()
        //     .then((token: PushToken) => {

        //         console.debug('PushToken', token);

        //         return this.push.saveToken(token);
        //     })
        //     .then((token: PushToken) => {
        //         console.debug('PushToken saved', token);

        //         const params = {
        //             reg_id: this._convertEndpoint(token.token)
        //         };

        //         this.postMethod('/register_device/android/', params)
        //             // .catch(response => {
        //             //     console.error('error call API for register_device');
        //             // })
        //             .map(response => response.json())
        //             .subscribe((status) => {
        //                 console.debug('DONE: push notification reg succes', status);

        //                 this.storage.set('push_notificatio_id', params.reg_id);
        //             });

        //     });

        // this.push.rx.notification()
        //     .subscribe((pushMessages) => {
        //         console.debug('push notifications', pushMessages);
        //     });

    }

    public unsubscribe() {

    }
}
