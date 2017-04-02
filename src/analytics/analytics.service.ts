import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../platform.service';
import { AnalyticsServiceBrowser } from './analytics.browser';
import { AnalyticsServiceIonic } from './analytics.ionic';


export interface IAnalyticsService {
    init();
    setUserId(id: string);
    addCustomDimension(index: number, value: string);
    trackPageView(viewName: string);
    trackScreenView(screenName: string);
    trackEvent(category: string, action: string, ...values: Array<any>);
}

export abstract class AnalyticsService implements IAnalyticsService {
    public abstract init();
    public abstract setUserId(id: string);
    public abstract addCustomDimension(index: number, value: string);
    public abstract trackPageView(viewName: string);
    public abstract trackScreenView(screenName: string);
    public abstract trackEvent(category: string, action: string, ...values: Array<any>);
    protected abstract callTrackEvent(category: string, action: string, label: string);
}

export function analyticsServiceFactory(platformService: PlatformService): IAnalyticsService {

    if (platformService.isMobile) {
        return new AnalyticsServiceIonic(platformService);
    }

    return new AnalyticsServiceBrowser(platformService);
}
