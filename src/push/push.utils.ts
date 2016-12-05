import { Observable, Subject } from 'rxjs/Rx';

/**
 * PushUtils
 */
export class PushUtils {

    public onSubscribed: Observable<string>;
    private _onSubscribed: Subject<string>;

    constructor(

    ) {
        this._onSubscribed = new Subject<string>();
        this.onSubscribed = this._onSubscribed.asObservable();
    }

    protected endpointWorkaround(pushSubscription: PushSubscription) {

        // Make sure we only mess with GCM
        if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
            return pushSubscription.endpoint;
        }

        let mergedEndpoint = pushSubscription.endpoint;
        // Chrome 42 + 43 will not have the subscriptionId attached
        // to the endpoint.
        if (pushSubscription.subscriptionId &&
            pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
            // Handle version 42 where you have separate subId and Endpoint
            mergedEndpoint = pushSubscription.endpoint + '/' +
                pushSubscription.subscriptionId;
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
}
