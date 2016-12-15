interface Window {
    cordova: any;
    device: any;
}

interface Navigator {
    share: any;
    serviceWorker: any;
}

interface PushSubscription {
    endpoint: string;
    subscriptionId: string;
    unsubscribe();
}

declare namespace Notification {
    var permission: any;
}
