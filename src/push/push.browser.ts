import { Observable, Observer } from 'rxjs/Rx';
import { Push } from 'ionic-native';

import { PushUtils } from './push.utils';
import { IPushService } from './push.service';

export class PushServiceBrowser extends PushUtils implements IPushService {

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
            console.log('Push messaging isn\'t supported.');
            return;
        }

        // We need the service worker registration to check for a subscription
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // Do we already have a push message subscription?
            serviceWorkerRegistration.pushManager.getSubscription()
                .then((subscription) => {
                    // Enable any UI which subscribes / unsubscribes from
                    // push messages.
                    // var pushButton = document.querySelector('.js-push-button');
                    // pushButton.disabled = false;

                    if (!subscription) {
                        // We aren’t subscribed to push, so set UI
                        // to allow the user to enable push
                        return;
                    }

                    // Keep your server in sync with the latest subscription
                    this.sendSubscriptionToServer(subscription.endpoint);

                    // Set your UI to show they have subscribed for
                    // push messages
                    // pushButton.textContent = 'Disable Push Messages';
                    // isPushEnabled = true;
                })
                .catch((err) => {
                    console.log('Error during getSubscription()', err);
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
                    // isPushEnabled = true;
                    // pushButton.textContent = 'Disable Push Messages';
                    // pushButton.disabled = false;

                    // TODO: Send the subscription subscription.endpoint
                    // to your server and save it to send a push message
                    // at a later date
                    return this.sendSubscriptionToServer(subscription.endpoint);
                })
                .catch((e) => {
                    if (Notification.permission === 'denied') {
                        // The user denied the notification permission which
                        // means we failed to subscribe and the user will need
                        // to manually change the notification permission to
                        // subscribe to push messages
                        console.log('Permission for Notifications was denied');
                        // pushButton.disabled = true;
                    } else {
                        // A problem occurred with the subscription, this can
                        // often be down to an issue or lack of the gcm_sender_id
                        // and / or gcm_user_visible_only
                        console.log('Unable to subscribe to push.', e);
                        // pushButton.disabled = false;
                        // pushButton.textContent = 'Enable Push Messages';
                    }
                });
        });
    }

    public unsubscribe() {

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // To unsubscribe from push messaging, you need get the
            // subcription object, which you can call unsubscribe() on.
            serviceWorkerRegistration.pushManager.getSubscription().then(
                (pushSubscription) => {
                    // Check we have a subscription to unsubscribe
                    if (!pushSubscription) {
                        // No subscription object, so set the state
                        // to allow the user to subscribe to push
                        // isPushEnabled = false;
                        // pushButton.disabled = false;
                        // pushButton.textContent = 'Enable Push Messages';
                        return;
                    }

                    // TODO: Make a request to your server to remove
                    // the users data from your data store so you
                    // don't attempt to send them push messages anymore

                    // We have a subcription, so call unsubscribe on it
                    pushSubscription.unsubscribe().then(() => {
                        // pushButton.disabled = false;
                        // pushButton.textContent = 'Enable Push Messages';
                        // isPushEnabled = false;
                    }).catch(function (e) {
                        // We failed to unsubscribe, this can lead to
                        // an unusual state, so may be best to remove
                        // the subscription id from your data store and
                        // inform the user that you disabled push

                        console.log('Unsubscription error: ', e);
                        // pushButton.disabled = false;
                    });
                }).catch(function (e) {
                    console.log('Error thrown while unsubscribing from ' +
                        'push messaging.', e);
                });
        });
    }
}
