import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// Modules
import { HttpModule } from '@angular/http';

// Providers
import { Http } from '@angular/http';
import {
    PlatformService,
    IPlatformConfig, PLATFORM_CONFIG_TOKEN, setupPlatformConfig,
    CameraService, cameraServiceFactory,
    ClipboardService, clipboardServiceFactory,
    LocationService, locationServiceFactory,
    PushService, pushServiceFactory,
    QrcodeService, qrcodeServiceFactory,
    ShareService, shareServiceFactory,
    StorageService, storageServiceFactory,
    UploadService, uploadServiceFactory,
} from './index';

@NgModule({
    imports: [
        HttpModule,
    ],
    declarations: [
        // Components
        // Directives
    ],
    exports: [
        // Components
        // Directives
    ],
    providers: [

    ],
})
export class Ng2PlatformModule {

    constructor( @Optional() @SkipSelf() parentModule: Ng2PlatformModule) {
        if (parentModule) {
            throw new Error(
                'Ng2PlatformModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(platformConfig: IPlatformConfig = {} as any): ModuleWithProviders {

        return {
            ngModule: Ng2PlatformModule,
            providers: [
                {
                    provide: PLATFORM_CONFIG_TOKEN,
                    useValue: platformConfig
                },
                {
                    provide: PlatformService,
                    useFactory: setupPlatformConfig,
                    deps: [PLATFORM_CONFIG_TOKEN]
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
                },
            ]
        };
    }

}
