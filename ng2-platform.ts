import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// Modules
import { HttpModule } from '@angular/http';

// Providers
import { Http } from '@angular/http';
import {
    PlatformService,
    CameraService, cameraServiceFactory,
    ClipboardService, clipboardServiceFactory,
    LocationService, locationServiceFactory,
    PushService, pushServiceFactory,
    ShareService, shareServiceFactory,
    QrcodeService, qrcodeServiceFactory,
    UploadService, uploadServiceFactory,
} from './src/index';

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
        PlatformService,
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
            provide: ShareService,
            useFactory: shareServiceFactory,
            deps: [PlatformService]
        },
        {
            provide: QrcodeService,
            useFactory: qrcodeServiceFactory,
            deps: [PlatformService, Http]
        },
        {
            provide: UploadService,
            useFactory: uploadServiceFactory,
            deps: [PlatformService]
        },
    ],
})
export class PlatformModule {

    constructor( @Optional() @SkipSelf() parentModule: PlatformModule) {
        if (parentModule) {
            throw new Error(
                'PlatformModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(config?: {}): ModuleWithProviders {
        return {
            ngModule: PlatformModule,
            providers: [
            ]
        };
    }

}
