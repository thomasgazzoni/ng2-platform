import { Observable } from 'rxjs/Observable';

import { PlatformService } from '../index';
import { CameraServiceBrowser } from './camera.browser';
import { CameraServiceIonic } from './camera.ionic';

export const DEFAULT_TAKE_PHOTO_OPTIONS: ITakePhotoOptions = {
    allowEdit: false,
    imageSize: 300,
};

export interface ITakePhotoOptions {
    /**
     * Allow user to adjust the photo after been taken
     */
    allowEdit: boolean;
    imageSize: number;
}

export const DEFAULT_GET_PHOTO_OPTIONS: IGetPhotoOptions = {
    allowEdit: false,
    imageSize: 300,
};

export interface IGetPhotoOptions {
    /**
     * Allow user to adjust the photo after choosen from library
     */
    allowEdit: boolean;
    imageSize: number;
}

export interface ICameraService {
    /**
     * Take photo usign camera
     * options to set
     */
    takePhoto(options?: ITakePhotoOptions): Observable<string>;
    getPhotoLibrary(options?: IGetPhotoOptions): Observable<string>;
}

export abstract class CameraService implements ICameraService {
    public abstract takePhoto(options?: ITakePhotoOptions): Observable<string>;
    public abstract getPhotoLibrary(options?: IGetPhotoOptions): Observable<string>;
}

export function cameraServiceFactory(platformService: PlatformService): ICameraService {

    if (platformService.isMobile) {
        return new CameraServiceIonic();
    }

    return new CameraServiceBrowser();
}
