import { Observable, Subject } from 'rxjs/Rx';

/**
 * PushUtils
 */
export class AnalyticsUtils {

    get trackerId() {
        return this._trackerId;
    }

    set trackerId(value) {
        this._trackerId = value;
    }

    protected _isInited: boolean;
    protected _isDebug: boolean;
    protected _trackerId: string;

    constructor() {
        this._isInited = false;
        this._isDebug = true;
    }

    init() {
        this._isInited = true;
    }

    trackPageView(pageName: string) {
        this.callTrackPageView(pageName);
    }

    trackScreenView(screenName: string) {
        this.callTrackScreenView(screenName);
    }

    trackEvent(category: string, action: string, ...values: Array<any>) {

        if (!this._isInited) {
            return;
        }

        const label = this.getEventLabel(...values);

        if (this._isDebug) {
            console.log('AnalyticsService:', category, action, label);
        }

        this.callTrackEvent(category, action, label);
    }

    protected getEventLabel(...values: Array<any>) {

        let label = '';

        values.forEach((item) => {

            let value = '';

            if (typeof item === 'object') {
                value = item ? (item.name || item.title || item.display_name) + ' - ' + (item.id || 0) : 'null';
            } else {
                value = item;
            }

            if (label.length <= 0) {
                label = `${value}`;
            } else {
                label = `${label} - ${value}`;
            }
        });

        return label;
    }

    protected callTrackPageView(page: string) {
        new Error('callTrackPageView must be overrided!');
    }

    protected callTrackScreenView(screenName: string) {
        new Error('callTrackScreenView must be overrided!');
    }

    protected callTrackEvent(category: string, action: string, label: string) {
        new Error('callTrackEvent must be overrided!');
    }
}
