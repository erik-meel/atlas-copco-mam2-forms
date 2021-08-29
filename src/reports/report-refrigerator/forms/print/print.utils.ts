import {Observable, Observer} from 'rxjs';
import {isNullOrUndefined} from "util";

export function startsWith(stringInstance: string, searchString: string): boolean {
    return stringInstance.substr(0, searchString.length) === searchString;
}

export function urlIsRelative(url: string): boolean {
    let protocol = url.split('//');
    if (protocol.length === 1) {
        return !startsWith(url, '/');
    } else {
        return false;
    }
}

export function toRelativeUrl(cssUrl: string): string {
    let base = window.location.toString().split('/').slice(0, -1).join('/');
    return cssUrl.replace(base + '/', '');
}

export function extractCssRelativeBase(cssUrl: string): string {
    return cssUrl.split('/').slice(0, -1).join('/');
}

export function eliminateNewLinesAndSpaces(text: string): string {
    return text.replace(/[\n\s\r]+/g, '');
}

export function removeCustomTags(htmlText: string): string {
    return htmlText.replace(/<[/]?ho-[\w\s"=%:;-]*>/g, '');
}

export function requestResourceAsString(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
        let xhr: any = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onabort = Observable.throw;
        xhr.onerror = Observable.throw;
        xhr.onload = function () {
            if (this.status === 200 || this.status === 0) { // 0  for fetching local file in phantomJS
                observer.next(this.responseText);
            } else {
                Observable.throw('Couldn\'t access to resource with url: ' + url);
            }
            observer.complete();
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}

function guessContentType(url: string): string {
  let contentType = 'image/png; base64';
  try {
    let urlSplit = url.split('.');
    let extension = urlSplit[urlSplit.length - 1];
    switch (extension) {
      case 'jpg':
        contentType = 'image/jpg';
        break;
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
    }
  } catch (e) {
    console.log(`Error while guessing type of url "${url}". ${e}`);
  }
  return contentType;
}

export function requestResourceAsBase64(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
        let xhr: any = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.onabort = Observable.throw;
        xhr.onerror = Observable.throw;
        xhr.onload = function () {
            if (this.status === 200 || this.status === 0) { // 0  for fetching local file in phantomJS
                let uInt8Array = new Uint8Array(this.response);
                let i = uInt8Array.length;
                let binaryString = new Array(i);
                while (i--) { binaryString[i] = String.fromCharCode(uInt8Array[i]); }
                let data = binaryString.join('');
                let contentType = this.getResponseHeader('content-type');
                if (isNullOrUndefined(contentType)) {
                  contentType = guessContentType(url);
                }
                //Clean possible encodings
                if (contentType.indexOf('ASCII') != -1 || contentType.indexOf('UTF-8') != -1) {
                  contentType = contentType.split(";")[0];
                }
                if (contentType.indexOf('base64') == -1) {
                  observer.next('data:' + contentType + '; base64,' + window.btoa(data));
                } else {
                  observer.next('data:' + contentType + ',' + data);
                }

            } else {
                Observable.throw('Couldn\'t access to resource with url: ' + url);
            }
            observer.complete();
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}

export function getExtensionFromUrl(url: string) {
    let urlSplitted = url.split('.');
    let extension = 'png';
    if (urlSplitted.length > 1) {
        extension = urlSplitted[urlSplitted.length - 1];
    }
    return extension;
}

export function replaceImageRefToDataUrl(image: HTMLImageElement): HTMLImageElement {
    let canvas = <HTMLCanvasElement> document.createElement('CANVAS');
    let ctx = canvas.getContext('2d');
    let dataURL: string;
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    // Transform image to displayed size so there's less bandwidth in use TODO: Do this on the build pipeline
    // ctx.scale(image.width / image.naturalWidth, image.height / image.naturalHeight);
    // canvas.height = image.height;
    // canvas.width = image.width;
    dataURL = <string> canvas.toDataURL(getExtensionFromUrl(image.src));
    // dataURL = eliminateNewLinesAndSpaces(dataURL);
    canvas = null;
    image.src = dataURL;
    return image;
}

export function replaceExternalResourceInText(url: string, resourceData: string, cssStyleSheetString: string) {
    return cssStyleSheetString.replace(new RegExp(url, 'g'), '\'' + resourceData + '\'');
}

export function findExternalResourcesInCssString(styleContentAsString: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
        try {
            let allUrlRegex = /url\(["|']?([A-Za-z0-9_\-:./]+)["|']?\)/gi;
            let match = allUrlRegex.exec(styleContentAsString);
            if (match) {
                while (match != null) {
                    observer.next(match[1]);
                    match = allUrlRegex.exec(styleContentAsString);
                }
            }
        } catch (e) {
            Observable.throw(e);
        }
        observer.complete();
    });
}



