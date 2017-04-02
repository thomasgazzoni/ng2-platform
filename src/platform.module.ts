import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// Modules
import { HttpModule } from '@angular/http';

// Providers
import { Http } from '@angular/http';
import {
    PlatformService,
} from './platform.service';
import {
    IPlatformConfig
} from './config/config.model';
import {
    PLATFORM_CONFIG_TOKEN, platformServiceFactory,
} from './config/config.token';
import {
    AnalyticsService, analyticsServiceFactory,
} from './analytics/analytics.service';
import {
    CameraService, cameraServiceFactory,
} from './camera/camera.service';
import {
    ClipboardService, clipboardServiceFactory,
} from './clipboard/clipboard.service';
import {
    DownloadService, downloadServiceFactory,
} from './download/download.service';
import {
    LocationService, locationServiceFactory
} from './location/location.service';
import {
    PushService, pushServiceFactory,
} from './push/push.service';
import {
    QrcodeService, qrcodeServiceFactory,
} from './qrcode/qrcode.service';
import {
    ShareService, shareServiceFactory,
} from './share/share.service';
import {
    StorageService, storageServiceFactory,
} from './storage/storage.service';
import {
    UploadService, uploadServiceFactory,
} from './upload/upload.service';

@NgModule({
    imports: [
        HttpModule,
    ],
    exports: [

    ],
    declarations: [
        // Components
        // Directives
    ],
    providers: [

    ]
})
export class Ng2PlatformModule {

    constructor( @Optional() @SkipSelf() parentModule: Ng2PlatformModule) {
        if (parentModule) {
            throw new Error(
                'Ng2PlatformModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(platformConfig: IPlatformConfig = null): ModuleWithProviders {

        return {
            ngModule: Ng2PlatformModule,
            providers: [
                {
                    provide: PLATFORM_CONFIG_TOKEN,
                    useValue: platformConfig
                },
                {
                    provide: PlatformService,
                    useFactory: platformServiceFactory,
                    deps: [PLATFORM_CONFIG_TOKEN]
                },
                {
                    provide: AnalyticsService,
                    useFactory: analyticsServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: CameraService,
                    useFactory: cameraServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: ClipboardService,
                    useFactory: clipboardServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: DownloadService,
                    useFactory: downloadServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: LocationService,
                    useFactory: locationServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: PushService,
                    useFactory: pushServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: QrcodeService,
                    useFactory: qrcodeServiceFactory,
                    deps: [PlatformService, Http]
                },
                {
                    provide: ShareService,
                    useFactory: shareServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: StorageService,
                    useFactory: storageServiceFactory,
                    deps: [PlatformService]
                },
                {
                    provide: UploadService,
                    useFactory: uploadServiceFactory,
                    deps: [PlatformService]
                }
            ]
        };
    }

}
