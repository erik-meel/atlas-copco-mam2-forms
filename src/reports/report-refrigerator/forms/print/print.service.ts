import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    startsWith, removeCustomTags, replaceImageRefToDataUrl, findExternalResourcesInCssString,
    replaceExternalResourceInText, requestResourceAsBase64, requestResourceAsString
} from './print.utils';

@Injectable()
export class PrintService {
    constructor() { }

    getHTMLEmbedded(): Observable<string> {
        this.updateInputElements();
        return this.replaceExternalImagesToDataUrlsInCss(this.getHTMLCopy())
            .flatMap((html: HTMLHtmlElement): Observable<HTMLHtmlElement> => this.replaceExternalCss(html))
            .flatMap((html: HTMLHtmlElement): Observable<HTMLHtmlElement> => this.replaceExternalImagesToDataUrls(html))
            .flatMap((html: HTMLHtmlElement): Observable<HTMLHtmlElement> => this.removeAllNodesOfTag(html, 'script'))
            .flatMap((html: HTMLHtmlElement): Observable<HTMLHtmlElement> => this.removeAllNodesWithClass(html, 'ho-no-print'))
            .flatMap((html: HTMLHtmlElement): Observable<HTMLHtmlElement> => this.cleanSignatureModals(html))
            .map((html: HTMLHtmlElement): HTMLHtmlElement => this.removeModalClassFromBody(html))
            .map((html: HTMLHtmlElement): string => '<html>' + html.innerHTML + '</html>')
            .map(removeCustomTags);
    }

    private getHTMLCopy(): HTMLHtmlElement {
        let htmlCopy: HTMLHtmlElement = <HTMLHtmlElement>document.createElement('html');
        let nodeList: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');
        if (nodeList.length > 0) {
            htmlCopy = <HTMLHtmlElement>nodeList.item(0).cloneNode(true);
        }
        return htmlCopy;
    }

    private updateInputElements() {
        var arr = document.getElementsByTagName('input');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == 'radio') {
                var checked = arr[i].checked;
                if (arr[i].hasAttribute("checked")) {
                    arr[i].removeAttribute('checked');
                }
                if (checked)
                    arr[i].setAttribute('checked', 'checked');
            }
            else if (arr[i].type == 'text') {
                arr[i].setAttribute('value', arr[i].value);
            }
        }
    }

    private replaceExternalImagesToDataUrls(html: HTMLHtmlElement): Observable<HTMLHtmlElement> {
        let images = html.querySelectorAll('img');
        let out: Observable<HTMLHtmlElement>;
        if (images.length > 0) {
            out = Observable.from(images)
                .map((img: HTMLImageElement): HTMLHtmlElement => {
                    if (!startsWith(img.src, 'data:')) {
                        replaceImageRefToDataUrl(img);
                    }
                    return html;
                })
                .last();
        } else {
            out = Observable.from([html]);
        }
        return out;
    }

    private removeAllNodesOfTag(html: HTMLHtmlElement, tag: string): Observable<HTMLHtmlElement> {
        let scripts = html.querySelectorAll(tag);
        let out: Observable<HTMLHtmlElement>;
        if (scripts.length > 0) {
            out = Observable.from(scripts)
                .map((script: HTMLScriptElement): HTMLHtmlElement => {
                    script.remove();
                    return html;
                })
                .last();
        } else {
            out = Observable.from([html]);
        }
        return out;
    }

    private removeAllNodesWithClass(html: HTMLHtmlElement, className: string): Observable<HTMLHtmlElement> {
        let nodes = html.querySelectorAll('.' + className);
        let out: Observable<HTMLHtmlElement>;
        if (nodes.length > 0) {
            out = Observable.from(nodes)
                .map((node: HTMLElement): HTMLHtmlElement => {
                    node.remove();
                    return html;
                })
                .last();
        } else {
            out = Observable.from([html]);
        }
        return out;
    }

    private cleanSignatureModals(html: HTMLHtmlElement): Observable<HTMLHtmlElement> {
        let signatures = html.querySelectorAll('.modal');
        let out: Observable<HTMLHtmlElement>;
        if (signatures.length > 0) {
            out = Observable.from(signatures)
                .map((modalNode: HTMLDivElement): HTMLHtmlElement => {
                    modalNode.remove();
                    return html;
                })
                .last();
        } else {
            out = Observable.from([html]);
        }
        return out;
    }

    private replaceExternalCss(html: HTMLHtmlElement): Observable<HTMLHtmlElement> {
        return Observable.from(html.querySelectorAll('link[rel="stylesheet"]'))
            .flatMap((linkElement: HTMLLinkElement): Observable<[HTMLLinkElement, string]> => {
                return this.getCssAsOneStringWithAllAssets(this.getExternalResource(linkElement.href))
                    .map((urlWithCss: [string, string]): [HTMLLinkElement, string] => {
                        return [linkElement, urlWithCss[1]];
                    });
            })
            .map((linkElementWithCssAsString: [HTMLLinkElement, string]): [HTMLLinkElement, HTMLStyleElement] => {
                let styleDiv: HTMLStyleElement = <HTMLStyleElement>document.createElement('style');
                styleDiv.innerHTML = linkElementWithCssAsString[1];
                return [linkElementWithCssAsString[0], styleDiv];
            })
            .map((linkElementWithStyleElement: [HTMLLinkElement, HTMLStyleElement]): HTMLHtmlElement => {
                linkElementWithStyleElement[0].parentNode.replaceChild(linkElementWithStyleElement[1], linkElementWithStyleElement[0]);
                return html;
            })
            .last();
    }

    private replaceExternalImagesToDataUrlsInCss(html: HTMLHtmlElement): Observable<HTMLHtmlElement> {
        return Observable.from(html.querySelectorAll('style'))
            .flatMap((styleElement: HTMLStyleElement): Observable<HTMLHtmlElement> => {
                let tupleToComplyWithSignature: [string, string] = ['no-url', styleElement.innerHTML];
                return this.getCssAsOneStringWithAllAssets(Observable.from([tupleToComplyWithSignature]))
                    .map((stylesElementWithAssets: [string, string]): HTMLHtmlElement => {
                        styleElement.innerHTML = stylesElementWithAssets[1];
                        return html;
                    });
            })
            .last();
    }

    private getExternalResource(url: string): Observable<[string, string]> {
        return requestResourceAsString(url)
            .catch((err: any, caught: Observable<string>): Observable<string> => Observable.from(['']))
            .map((response): [string, string] => [url, response]);
    }

    private getExternalResourceAsBase64(url: string): Observable<[string, string]> {
        return requestResourceAsBase64(url)
            .catch((err: any, caught: Observable<string>): Observable<string> => Observable.from(['']))
            .map((response): [string, string] => [url, response]);
    }

    private getCssAsOneStringWithAllAssets(getCssString: Observable<[string, string]>): Observable<[string, string]> {
        let getCssResources = getCssString
            .flatMap((urlContentTuple) => {
                return findExternalResourcesInCssString(urlContentTuple[1]);
            })
            .flatMap(url => {
                return this.getExternalResourceAsBase64(url);
            });
        return getCssString.concat(getCssResources)
            .reduce((acc: [string, string], current: [string, string]): [string, string] => {
                return [acc[0], replaceExternalResourceInText(current[0], current[1], acc[1])];
            });
    }

    private removeModalClassFromBody(html: HTMLHtmlElement): HTMLHtmlElement {
        html.querySelector('body').classList.remove('modal-open');
        return html;
    }
}
