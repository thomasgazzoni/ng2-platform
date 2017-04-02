import { Observable, Observer } from 'rxjs/Rx';

import { PlatformService } from '../platform.service';
import { IAnalyticsService } from './analytics.service';
import { AnalyticsUtils } from './analytics.utils';

declare var ga;

export class AnalyticsServiceBrowser extends AnalyticsUtils implements IAnalyticsService {

    constructor(
        private _platformService: PlatformService
    ) {
        super();
    }

    init() {

        const gaCodeScript = document.createElement('script');
        const gaLibScript = document.createElement('script');

        gaCodeScript.innerHTML = `
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${this._platformService.GATrackerId}', 'auto');
            ga('set', 'appName', '${this._platformService.appName}');
            ga('set', 'appVersion', '${this._platformService.appVersion}');
        `;

        gaLibScript.setAttribute('src', 'https://www.google-analytics.com/analytics.js');
        gaLibScript.setAttribute('async', '');

        document.body.appendChild(gaCodeScript);
        document.body.appendChild(gaLibScript);

        ga((tracker) => {

        });

        super.init();
    }

    setUserId(userId: string) {
        ga('set', 'userId', userId);
    }

    addCustomDimension(index: number, value: string) {
        ga('set', `dimension${index}`, value);
    }

    protected callTrackPageView(pageName: string) {
        ga('send', {
            hitType: 'pageview',
            page: pageName,
        });
    }

    protected callTrackScreenView(screenName: string) {
        ga('send', {
            hitType: 'screenview',
            screenName: screenName,
        });
    }

    protected callTrackEvent(category: string, action: string, label: string) {
        ga('send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label
        });
    }
}
