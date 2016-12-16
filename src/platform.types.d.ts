interface Window {
    cordova: any;
    device: any;
}

interface Navigator {
    share: any;
}

interface PushSubscription {
    unsubscribe();
}

declare namespace Notification {
    var permission: any;
}
