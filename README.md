# Ng2-Platfoms

The aim of this project is provide feature avaiable on different platforms (Browser, Mobile and Desktop) by exposing simple properties and methods while handling the native api call base on the platform where the Angular 2 Application is running. 

| Feature | Description | Browser | Ionic2 | Electron |
| --- | --- | --- | --- | --- |
| `Camera` | Take or select picture | Avaiable (only photo) | Avaiable | TODO
| `Clipboard` | Copy and Paste | Avaiable | Avaiable | Avaiable
| `Location` | Get current position | Avaiable | Avaiable | Avaiable
| `Push` | Push notification | Avaiable (with SW) | Avaiable | TODO
| `Qrcode` | Generate and scan QR Code | TODO | Avaiable | TODO
| `Share` | Share link on social network | Avaiable (only Chrome) | Avaiable | TODO
| `Upload` | Upload a file | Avaiable | Avaiable | TODO
| `Core` | Platform service | Avaiable | Avaiable | Avaiable

### Project status
This project is just started, I am looking for collaborator to expand the Electron feature (although the implementations will be same as the Browser for most of the case)
I will use as much as possible native api for Browser that maybe be avaiable only in vendor latest versions.
NOTE: the code is not yet optimize but it works in most of the case.

### How it works
Each Feature have a ***FooService*** containing the abstract class structure, options and result interface and ***factoryFooService*** to create the right instace of the service base on the platform . Each native platform implementation is avaiable in the specific file (foo.browser.ts, foo.ionic.ts, foo.electron.ts, etc) 

### Install

```sh
npm install thomasgazzoni/ng2-platform
```

### Todos

 - Write Tests
 - Add exemple website
 - Implement missing Electron platforms
 - Consider including Cordova Platform

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [AngularJS]: <http://angular.io>
   [Gulp]: <http://gulpjs.com>
   [Ionic2]: <http://ionicframework.com>
