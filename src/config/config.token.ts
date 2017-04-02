import { OpaqueToken } from '@angular/core';
import { IPlatformConfig } from './config.model';
import { PlatformService } from '../platform.service';

export const PLATFORM_CONFIG_TOKEN = new OpaqueToken('PLATFORMCONFIG');

export function platformServiceFactory(platformConfig: IPlatformConfig) {

    const platform = new PlatformService();

    platformConfig = platformConfig || {
        debug: false,
        appName: 'app-name',
        appVersion: '1.0.0',
        FCMSenderId: undefined,
        GATrackerId: undefined,
    };

    platform.setConfig(platformConfig);
    platform.runGuessPlatform();

    return platform;
}
