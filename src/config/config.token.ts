import { OpaqueToken } from '@angular/core';
import { IPlatformConfig } from './config.model';
import { PlatformService } from '../platform.service';

export const PLATFORM_CONFIG_TOKEN = new OpaqueToken('PLATFORM_CONFIG_TOKEN');

export function setupPlatformConfig(platformConfig: IPlatformConfig): PlatformService {

    const platform = new PlatformService();

    // TODO: make sure cordova device is already initialized by now

    platform.setAppInfo(platformConfig.appName, platformConfig.appVersion);
    platform.runGuessPlatform();

    return platform;
}
