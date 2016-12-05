# Ng2-platforms

The aim of this project is provide some feature available on different platforms (Browser, Mobile and Desktop) by exposing simple properties and methods while handling the native api call base on the platform where the Angular 2 Application is running.

| Feature | Description | Browser | Ionic2 | Electron |
| --- | --- | --- | --- | --- |
| `Camera` | Take or select picture | Available (only take photo) | Available | TODO
| `Clipboard` | Copy and Paste | Available | Available | Available
| `Location` | Get current position | Available | Available | Available
| `Push` | Push notification | Available (with SW) | Available | TODO
| `Qrcode` | Generate and scan QR Code | TODO | Available | TODO
| `Share` | Share link on social network | Available (only Chrome) | Available | TODO
| `Upload` | Upload a file | Available | Available | TODO
| `Core` | Platform service | Available | Available | Available

### Project status
This project is just started, I am looking for collaborator to expand the Electron feature (although the implementations will be same as the Browser for most of the case)
I will use as much as possible native api for Browser that maybe be available only in latest browser versions.
NOTE: the code is not yet optimize but it works in most of the case.

### How it works
Each Feature have a **FooService** containing the abstract class structure, options and result interface and **factoryFooService** to create the right instace of the service base on the platform . Each native platform implementation is Available in the specific file (foo.browser.ts, foo.ionic.ts, foo.electron.ts, etc)

### Install

```sh
npm install thomasgazzoni/ng2-platform (coming soon)
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
   [Typecript]: <http://typscriptlang.org>
   [Ionic2]: <http://ionicframework.com>
