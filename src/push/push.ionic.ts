import { Observable, Observer } from 'rxjs/Rx';
import {
    Push,
    PushNotification,
    PushOptions,
    NotificationEventResponse,
    LocalNotifications,
    Vibration
} from 'ionic-native';

import { PushUtils } from './push.utils';
import { IPushService } from './push.service';

export class PushServiceIonic extends PushUtils implements IPushService {

    private push: PushNotification;

    public init() {

        const options: PushOptions = {
            android: {
                senderID: '1000791411599'
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

        Push.hasPermission().then((data) => {
            if (data.isEnabled) {
                console.log('push isEnabled');
            }
        });

        this.push.setApplicationIconBadgeNumber(() => { }, () => { });

        this.push.on('registration', (data) => {
            console.debug('push notification registration', data);

            this.sendSubscriptionToServer(data.registrationId);
        });

        this.push.on('notification', (data) => {
            console.debug('push notification notify', data);

            this.showPushNotification(data);
        });

        this.push.on('error', (e) => {
            console.debug('push notification error', e);
        });

    }

    public subscribe() {

    }

    public unsubscribe() {
        this.push.unregister(() => {
            console.debug('unsubscribe success');
        }, () => {
            console.debug('unsubscribe error');
        });
    }

    private showPushNotification(data: NotificationEventResponse) {

        LocalNotifications.schedule({
            id: 1,
            title: 'Co-Produce (push-notification)',
            text: `${data.message}`,
            sound: 'file://sound.mp3',
            data: data
        });

        Vibration.vibrate([100, 300, 600]);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    }
}
