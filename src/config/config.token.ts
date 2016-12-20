import { OpaqueToken } from '@angular/core';
import { IPlatformConfig } from './config.model';
import { PlatformService } from '../platform.service';

export const PLATFORM_CONFIG_TOKEN = new OpaqueToken('PLATFORMCONFIG');

export function platformServiceFactory(platformConfig: IPlatformConfig) {

    const platform = new PlatformService();

    platformConfig = platformConfig || {
        appName: 'app',
        appVersion: '1.0',
        FCMSenderId: undefined,
    };

    platform.setConfig(platformConfig);
    platform.runGuessPlatform();

    return platform;
}
