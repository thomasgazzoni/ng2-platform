import { Observable, Observer } from 'rxjs/Rx';
import {
    Push,
    PushNotification,
    PushOptions,
} from 'ionic-native';

import { PlatformService } from '../platform.service';
import { PushUtils } from './push.utils';
import { IPushService } from './push.service';

export class PushServiceIonic extends PushUtils implements IPushService {

    private push: PushNotification;

    constructor(
        private _platformService: PlatformService
    ) {
        super();
    }

    public init() {

        Push.hasPermission()
            .then((data) => {
                if (data.isEnabled) {
                }
            });
    }

    public subscribe() {

        const options: PushOptions = {
            android: {
                senderID: this._platformService.FCMSenderId
            },
            ios: {
                alert: true,
                badge: true,
                sound: false
            },
            windows: {

            }
        };

        this.push = Push.init(options);

        // Reset badge
        this.push.setApplicationIconBadgeNumber(() => { }, () => { }, 0);

        this.push.on('registration', (data) => {
            this.sendSubscriptionToServer(data.registrationId);
        });

        this.push.on('notification', (data) => {

            this.showPushNotification({
                title: data.title,
                message: data.message,
                data: data.additionalData,
            });
        });

        this.push.on('error', (error) => {
            console.error('Ionic push notification error', error);
        });
    }

    public unsubscribe() {
        if (this.push) {
            this.push.unregister(
                () => {

                },
                () => {
                    console.error('unsubscribe error');
                });
        }
    }
}
