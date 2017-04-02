import { Observable, Subject } from 'rxjs/Rx';
import { IPushNotification } from './push.service';

/**
 * PushUtils
 */
export class PushUtils {

    public onSubscribed: Observable<string>;
    public onShowNotitication: Observable<IPushNotification>;

    private _onSubscribed: Subject<string>;
    private _onShowNotification: Subject<IPushNotification>;

    constructor() {
        this._onSubscribed = new Subject<string>();
        this.onSubscribed = this._onSubscribed.asObservable();

        this._onShowNotification = new Subject<IPushNotification>();
        this.onShowNotitication = this._onShowNotification.asObservable();
    }

    protected endpointWorkaround(pushSubscription: PushSubscription) {

        // Make sure we only mess with GCM
        if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
            return pushSubscription.endpoint;
        }

        let mergedEndpoint = pushSubscription.endpoint;
        // Chrome 42 + 43 will not have the subscriptionId attached
        // to the endpoint.
        const oldChromepushSubscriptionId = (pushSubscription as any).subscriptionId
        if (oldChromepushSubscriptionId &&
            pushSubscription.endpoint.indexOf(oldChromepushSubscriptionId) === -1) {
            // Handle version 42 where you have separate subId and Endpoint
            mergedEndpoint = pushSubscription.endpoint + '/' +
                oldChromepushSubscriptionId;
        }

        return mergedEndpoint;
    }

    protected removeEndpoint(endpoint: string) {
        return endpoint.replace('https://android.googleapis.com/gcm/send/', '');
    }

    protected sendSubscriptionToServer(subscriptionId: string) {

        const regId = this.removeEndpoint(subscriptionId);

        this._onSubscribed.next(regId);
    }

    /**
     * Call this method to dispatch the pushNotification data to any listener of the
     * onShowNotification Observable
     *
     * Ionic 2 Example:
     *
     * ```
     * this._pushService.onShowNotitication.subscribe((pushNotification) => {
     *
     *      LocalNotifications.schedule({
     *          id: 1,
     *          title: `${pushNotification.title}`,
     *          text: `${pushNotification.message}`,
     *          sound: 'file://sound.mp3',
     *          data: pushNotification.data
     *      });
     *
     *      Vibration.vibrate([100, 200]);
     * });
     * ```
     * @stable
     */
    protected showPushNotification(pushNotification: IPushNotification) {

        this._onShowNotification.next(pushNotification);
    }
}
