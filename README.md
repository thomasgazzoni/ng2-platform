[![Build Status](https://travis-ci.org/thomasgazzoni/ng2-platform.svg?branch=master)](https://travis-ci.org/thomasgazzoni/ng2-platform)
[![npm version](https://badge.fury.io/js/ng2-platform.svg)](https://badge.fury.io/js/ng2-platform)
[![npm](https://img.shields.io/npm/dm/ng2-platform.svg)](https://www.npmjs.com/package/ng2-platform)
[![bitHound Overall Score](https://www.bithound.io/github/thomasgazzoni/ng2-platform/badges/score.svg)](https://www.bithound.io/github/thomasgazzoni/ng2-platform)
[![bitHound Dependencies](https://www.bithound.io/github/thomasgazzoni/ng2-platform/badges/dependencies.svg)](https://www.bithound.io/github/thomasgazzoni/ng2-platform/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/thomasgazzoni/ng2-platform/badges/code.svg)](https://www.bithound.io/github/thomasgazzoni/ng2-platform)

# ng2-platform

The aim of this project is provide a cross platforms access to native feature available on Browser, Mobile (Ionic 2) and Desktop (Electron).
Each Feature will espose methods with RxJs Observable making their api agnostic among various platform.

| Feature | Description | Browser | Ionic2 | Electron |
| --- | --- | --- | --- | --- |
| `Camera` | Take or select picture | Available (only take photo) | Available | TODO
| `Clipboard` | Copy and Paste | Available | Available | Available
| `Download` | Download file in backgroud | Need improve | TODO | TODO
| `Location` | Get current position | Available | Available | Available
| `Push` | Push notification | Available (with SW) | Available | TODO
| `Qrcode` | Generate and scan QR Code | TODO | Available | TODO
| `Share` | Share link on social network | Available (only Chrome) | Available | TODO
| `Upload` | Upload a file | Available | Available | TODO
| `Storage` | Localstorage for caching | Available | Available | TODO
| `Core` | Platform service | Available | Available | Available

## Project status
This project is just started, I am looking for collaborator to expand the Electron feature (although the implementation will be same as the Browser for most of the case)
since I am not fully implement that in my work project.
I will use as much as possible native api for Browser that maybe be available only in latest browser versions.
NOTE: the code is not yet optimize but it works in most of the case.

## Install
```sh
npm install ng2-platform
```

For Ionic 2, for each feature you will use in your project, you must add the correspondent cordova plugin.
```sh
ionic plugin add phonegap-plugin-push --variable SENDER_ID="1234567890"
ionic plugin add phonegap-plugin-barcodescanne
ionic plugin add cordova-plugin-device
ionic plugin add cordova-plugin-x-socialsharing
ionic plugin add cordova-plugin-camera
ionic plugin add cordova-plugin-geolocation
ionic plugin add cordova-plugin-file
ionic plugin add cordova-plugin-file-transfer
```

## How it works
Each Feature have a:
 - **XxxService**: containing the abstract feature declaration (with options and result interface)
 - **factoryXxxService**: factory function to create the right instace of the service base on the platform.
 - **XxxServiceXxxplatform**: native implementation for each platform (foo.browser.ts, foo.ionic.ts, foo.electron.ts, etc)

## Exemple

 - In your app main module
```ts
// app.module.ts
import { Ng2PlatformModule } from 'ng2-platform';
...

@NgModule({
    ...
    imports: [
        ... // your modules
        Ng2PlatformModule.forRoot({
            appName: 'MyAppName',
            appVersion: '1.0',
            FCMSenderId: '1234567890',
        }),
    ]
    ...
})
export class AppModule ...
```

 - Example for take a picture using the Camera on browser
```ts
// custom.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CameraService, UploadService } from 'ng2-platform';
...

@Component({
    selector: 'us-user-profile',
    templateUrl: 'user-profile.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class UserProfileComponent implements OnInit {

    constructor(
        private _uploadService: UploadService,
        private _cameraService: CameraService,
    ) {

    }

    ngOnInit() {
        // If the upload API need some custom header you can set it before call the upload method
        this._uploadService.setApiHeaders({
            'X-CSRFToken': 'your_token', // Your custom auth token
            'Referer': 'www.exemple.com', // For Ionic 2 you might need this
        });
    }

    takePhoto() {
        this._cameraService.takePhoto({ allowEdit: true, imageSize: 300 })
            .catch((error) => {
                console.error('Take photo error', error);
                return Observable.empty();
            })
            .subscribe((dataURI) => {

                const uploadAvatar = this._uploadService
                    .upload<string>('/api/user/logo/', 'avatar_url', dataURI);

                uploadAvatar.uploadProgress$
                    .subscribe((progress) => {
                        console.info('Uploading in progress', progress);
                    });

                uploadAvatar.uploadResult$
                    .catch((error) => {
                        console.error('Upload error', error);
                        return Observable.empty();
                    })
                    .subscribe((response) => {
                        console.info('Upload success with api response', response);
                    });
            });
    }

}

```

##  Todos
 - Write Tests
 - Add exemple website
 - Implementing Electron platforms
 - Consider add vanilla Cordova platform

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [AngularJS]: <http://angular.io>
   [Typecript]: <http://typscriptlang.org>
   [Ionic2]: <http://ionicframework.com>
