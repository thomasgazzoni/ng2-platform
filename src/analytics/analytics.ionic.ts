import { Observable, Observer } from 'rxjs/Rx';
import { GoogleAnalytics } from 'ionic-native';

import { PlatformService } from '../platform.service';
import { IAnalyticsService } from './analytics.service';
import { AnalyticsUtils } from './analytics.utils';

export class AnalyticsServiceIonic extends AnalyticsUtils implements IAnalyticsService {

    constructor(
        private _platformService: PlatformService
    ) {
        super();
    }

    init() {

        GoogleAnalytics.enableUncaughtExceptionReporting(true)
            .then((result) => {

            })
            .catch((error) => {
                console.error('GoogleAnalytics, enableUncaughtExceptionReporting', error);
            });

        GoogleAnalytics.startTrackerWithId(this._platformService.GATrackerId)
            .then((result) => {

            })
            .catch((error) => {
                console.error('GoogleAnalytics, startTrackerWithId', error);
            });

        super.init();
    }

    setUserId(userId: string) {
        GoogleAnalytics.setUserId(userId);
    }

    addCustomDimension(index: number, value: string) {
        GoogleAnalytics.addCustomDimension(index, value);
    }

    protected callTrackPageView(pageName: string) {
        this.callTrackScreenView(pageName);
    }

    protected callTrackScreenView(screenName: string) {
        GoogleAnalytics.trackView(screenName)
            .then((result) => {

            })
            .catch((error) => {
                console.error('TRACK VIEW Error: ', error);
            });
    }

    protected callTrackEvent(category: string, action: string, label: string) {
        GoogleAnalytics.trackEvent(category, action, label)
            .then((result) => {

            })
            .catch((error) => {
                console.error('TRACK EVENT Error: ', error);
            });
    }
}
