import { Observable, Observer } from 'rxjs/Rx';
import { Push } from 'ionic-native';

import { PlatformService } from '../platform.service';
import { PushUtils } from './push.utils';
import { IPushService } from './push.service';

export class PushServiceBrowser extends PushUtils implements IPushService {

    constructor(
        private _platformService: PlatformService
    ) {
        super();
    }

    // Once the service worker is registered set the initial state
    public init() {
        // Are Notifications supported in the service worker?
        // if (!('showNotification' in '')) {
        //     console.log('Notifications aren\'t supported.');
        //     return;
        // }

        // Check the current Notification permission.
        // If its denied, it's a permanent block until the
        // user changes the permission
        if (Notification.permission === 'denied') {
            console.log('The user has blocked notifications.');
            return;
        }

        // Check if push messaging is supported
        if (!('PushManager' in window)) {
            console.log(`Push messaging isn't supported.`);
            return;
        }

        // We need the service worker registration to check for a subscription
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // Do we already have a push message subscription?
            serviceWorkerRegistration.pushManager.getSubscription()
                .then((subscription) => {

                    if (!subscription) {
                        // We aren’t subscribed to push, so set UI
                        // to allow the user to enable push
                        return;
                    }

                    // Keep your server in sync with the latest subscription
                    this.sendSubscriptionToServer(subscription.endpoint);
                })
                .catch((error) => {
                    console.error('Error during getSubscription()', error);
                });
        });
    }

    public subscribe() {

        const subscribeParams = {
            userVisibleOnly: true
        };

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            serviceWorkerRegistration.pushManager.subscribe()
                .then((subscription) => {
                    // The subscription was successful
                    return this.sendSubscriptionToServer(subscription.endpoint);
                })
                .catch((error) => {
                    if (Notification.permission === 'denied') {
                        // The user denied the notification permission which
                        // means we failed to subscribe and the user will need
                        // to manually change the notification permission to
                        // subscribe to push messages
                        console.warn('Permission for Notifications was denied');
                    } else {
                        // A problem occurred with the subscription, this can
                        // often be down to an issue or lack of the gcm_sender_id
                        // and / or gcm_user_visible_only
                        console.error('Unable to subscribe to push.', error);
                    }
                });
        });
    }

    public unsubscribe() {

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // To unsubscribe from push messaging, you need get the
            // subcription object, which you can call unsubscribe() on.
            serviceWorkerRegistration.pushManager.getSubscription()
                .then((pushSubscription) => {
                    // Check we have a subscription to unsubscribe
                    if (!pushSubscription) {
                        // No subscription available
                        return;
                    }

                    // TODO: Make a request to your server to remove
                    // the users data from your data store so you
                    // don't attempt to send them push messages anymore
                    this.sendSubscriptionToServer(undefined);

                    // We have a subcription, so call unsubscribe on it
                    pushSubscription.unsubscribe()
                        .then(() => {
                        })
                        .catch((e) => {
                            console.error('Unsubscription error: ', e);
                        });
                })
                .catch((error) => {
                    console.error(`Error thrown while unsubscribing from push messaging:`, error);
                });
        });
    }
}
