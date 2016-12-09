import { Observable, Observer } from 'rxjs/Rx';
import { Camera, CameraOptions } from 'ionic-native';

import {
    ICameraService,
    ITakePhotoOptions, IGetPhotoOptions,
    DEFAULT_TAKE_PHOTO_OPTIONS, DEFAULT_GET_PHOTO_OPTIONS
} from './camera.service';

export class CameraServiceIonic implements ICameraService {

    public takePhoto(options: ITakePhotoOptions): Observable<string> {

        return Observable
            .create((observer: Observer<string>) => {

                const cameraOptions: CameraOptions = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true,
                    // saveToPhotoAlbum: false,
                };

                this.setOptions(cameraOptions, options);

                Camera.getPicture(cameraOptions)
                    .then((imageData) => {

                        // imageData is either a base64 encoded string or a file URI
                        // If it's base64:
                        // let base64Image = 'data:image/jpeg;base64,' + imageData;

                        observer.next(imageData);
                        observer.complete();
                    })
                    .catch(error => {
                        console.debug('takePhoto error', error);
                        observer.error(this.getErrorMessage(error));
                        observer.complete();
                    });
            });
    }

    public getPhotoLibrary(options: IGetPhotoOptions) {

        return Observable
            .create((observer: Observer<string>) => {

                const cameraOptions: CameraOptions = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true,
                };

                this.setOptions(cameraOptions, options);

                Camera.getPicture(cameraOptions)
                    .then((imageData) => {
                        observer.next(imageData);
                        observer.complete();
                    })
                    .catch(error => {
                        console.debug('getPhotoLibrary error', error);
                        observer.error(this.getErrorMessage(error));
                        observer.complete();
                    });
            });
    }

    private setOptions(cameraOptions: CameraOptions, customOptions: ITakePhotoOptions) {
        if (customOptions) {
            cameraOptions.allowEdit = customOptions.allowEdit;
            cameraOptions.targetWidth = customOptions.imageSize;
            cameraOptions.targetHeight = customOptions.imageSize;
        } else {
            cameraOptions.allowEdit = DEFAULT_TAKE_PHOTO_OPTIONS.allowEdit;
            cameraOptions.targetWidth = DEFAULT_TAKE_PHOTO_OPTIONS.imageSize;
            cameraOptions.targetHeight = DEFAULT_TAKE_PHOTO_OPTIONS.imageSize;
        }
    }

    private getErrorMessage(error) {

        let errorMessage = error;

        if (error === 20) {
            errorMessage = 'The app do not have permission to access the phone camera';
        }

        return errorMessage;
    }
}
