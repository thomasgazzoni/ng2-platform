import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ICameraService, ITakePhotoOptions } from './camera.service';

declare let window;

export class DesktopCameraService implements ICameraService {

    public takePhoto(options: ITakePhotoOptions): Observable<string> {

        return Observable.fromPromise<string>(

            this.getMediaDevices()
                .getUserMedia({ video: true, audio: false })
                .then((stream: any) => {

                    return new Promise((resolve, reject) => {

                        try {
                            const vendorURL = window.URL || window.webkitURL;
                            const doc = document;
                            const videoElement = doc.createElement('video');
                            videoElement.src = vendorURL.createObjectURL(stream);
                            videoElement.play();

                            videoElement.addEventListener('canplay', () => {
                                const canvasElement = doc.createElement('canvas');
                                // Only for landscape, to crop the image into a square image
                                const smallerEdge = Math.min(videoElement.videoWidth, videoElement.videoHeight);
                                const longerEdge = Math.max(videoElement.videoWidth, videoElement.videoHeight);
                                const gap = (longerEdge - smallerEdge) / 2;

                                canvasElement.setAttribute('width', smallerEdge.toString());
                                canvasElement.setAttribute('height', smallerEdge.toString());

                                // Wait a bit before taking a screenshot so the camera has time to adjust lights
                                setTimeout(() => {
                                    const context = canvasElement.getContext('2d');
                                    context.drawImage(videoElement,
                                        gap,
                                        0, videoElement.videoWidth - 2 * gap,
                                        videoElement.videoHeight, 0, 0, smallerEdge, smallerEdge);

                                    const url = canvasElement.toDataURL('image/png');

                                    videoElement.pause();

                                    if (stream.stop) {
                                        stream.stop();
                                    }

                                    if (stream.getAudioTracks) {
                                        stream.getAudioTracks().forEach((track: any) => {
                                            track.stop();
                                        });
                                    }

                                    if (stream.getVideoTracks) {
                                        stream.getVideoTracks().forEach((track: any) => {
                                            track.stop();
                                        });
                                    }

                                    resolve(url);
                                }, 500);
                            });

                        } catch (e) {
                            reject(e);
                        }

                    });

                }));
    }

    public getPhotoLibrary() {

        return Observable
            .create((observer: Observer<string>) => {

                observer.error('Not implemented on desktop yet');
                observer.complete();

            });
    }

    private getMediaDevices(): any {
        const mediaDevices = ((window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia) ? {
            getUserMedia: function (options) {
                return new Promise((resolve, reject) => {
                    (window.navigator.mozGetUserMedia ||
                        window.navigator.webkitGetUserMedia).call(window.navigator, options, resolve, reject);
                });
            }
        } : null) || window.navigator.mediaDevices;

        return mediaDevices;
    }
}
