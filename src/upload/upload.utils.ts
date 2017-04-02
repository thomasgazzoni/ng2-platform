/**
 * UploadUtils
 */
export class UploadUtils {

    protected apiUploadHeaders: { [key: string]: string };

    constructor() {
        this.apiUploadHeaders = {};
    }

    setApiHeaders(headers: { [key: string]: string }) {
        this.apiUploadHeaders = headers;
    }

    getFilePreview(data: string | File) {

        return new Promise<string>((resolver, reject) => {

            if (typeof data === 'string') {
                resolver(data);
            } else {

                const isImage = this.getAttachemntType(data.type) === 'image';

                if (isImage) {
                    // convert image to base64
                    let reader: FileReader = new FileReader();
                    reader.addEventListener('load', () => {
                        resolver(reader.result);
                    });
                    reader.readAsDataURL(data);
                } else {
                    resolver(this.getFileDefaultPreview(data.type));
                }
            }

        });
    }

    getFileToUpload(data: string | Blob): Blob {
        if (typeof data === 'string') {
            return this.dataURItoBlob(data);
        } else {
            return data;
        }
    }

    getAttachemntType(mime: string) {

        if (mime.substring(0, 6) === 'image/') {
            return 'image';
        } else {
            return 'file';
        }
    }

    getFileDefaultPreview(fileType: string) {

        const fileExtension = fileType.replace('application/', '').replace('audio/', '').replace('text/', '');
        let filetypeLogo = '';

        switch (fileExtension) {
            case 'ai':
            case 'avi':
            case 'doc':
            case 'docx':
            case 'html':
            case 'mp3':
            case 'mpeg':
            case 'mp4':
            case 'pdf':
            case 'ppt':
            case 'ps':
            case 'xls':
            case 'zip':
                filetypeLogo = '../images/filetypes/file_type_' + fileExtension + '.png';
                break;
            default:
                filetypeLogo = '../images/default/attachment.png';
                break;
        }

        return filetypeLogo;
    }

    dataURItoBlob(dataURI: string, imageType = undefined) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        const byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        const mimeString = imageType || dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        const blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    humanizeBytes(bytes: number): string {

        if (bytes === 0) {
            return '0 Byte';
        }
        const k = 1024;
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '/s';
    }
}
