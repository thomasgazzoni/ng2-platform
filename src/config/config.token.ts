import { OpaqueToken } from '@angular/core';
import { IPlatformConfig } from './config.model';
import { PlatformService } from '../platform.service';

export const PLATFORM_CONFIG_TOKEN = new OpaqueToken('PLATFORM_CONFIG');

export function setupPlatformConfig(platformConfig: IPlatformConfig): PlatformService {

    const platform = new PlatformService();

    // TODO: make suer cordova device is initialized yet

    platform.setAppInfo(platformConfig.appName, platformConfig.appVersion);
    platform.runGuessPlatform();

    return platform;
}
