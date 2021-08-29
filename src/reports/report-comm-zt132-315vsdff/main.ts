import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from '.';

declare var window: Window;
declare var document: any;
declare var console: any;

// Detect platform
let platform = 'movilizer-client';
if (!!window['callPhantom']) {
  platform = 'phantomjs';
} else if (window['cordova'] === undefined) {
  platform = 'browser';
}

// Setup prod mode for Angular
if (process.env.ENV == 'production') {
  enableProdMode();
}

//Check box sizing support (for correct width in %)
window['SUPPORTS_BOX_SIZING'] = document.documentMode === undefined || document.documentMode > 7;

console.log(`Running mode '${process.env.ENV}' on platform '${platform}'`);

// Apply config for platform
switch (platform) {
  case 'browser':
    // document.addEventListener("DOMContentLoaded", APP_INIT, false);
    console.log("Init report in browser");
    platformBrowserDynamic().bootstrapModule(AppModule);
    break;
  case 'phantomjs':
    window['saveReport'] = function (report: any) {
      alert(JSON.stringify([].slice.call(['generate_form.done', report])));
    };
    // document.addEventListener("DOMContentLoaded", APP_INIT, false);
    console.log("Init report in phantomjs");
    platformBrowserDynamic().bootstrapModule(AppModule);
    break;
  case 'movilizer-client':
    //To avoid racing conditions this is best (don't use onload or on domReady if executed on device)
    // document.addEventListener("deviceready", APP_INIT, false);
    console.log("Init report by deviceready");
    document.addEventListener("deviceready", function () {
      platformBrowserDynamic().bootstrapModule(AppModule);
    }, false);
    break;
}
