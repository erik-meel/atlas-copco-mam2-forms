import {Directive, ElementRef, Input} from '@angular/core';

declare var SUPPORTS_BOX_SIZING: boolean;

const PADDING_CORRECTION = 2;

@Directive({
    selector: '[ho-width]'
})
export class WidthDirective {
    private defaultWidth: string = 'auto';
    private el: HTMLElement;

    @Input('ho-width') set width(width: string){
        // This sets the width in the pdf
        if (this.el.childElementCount > 0) {
            let divElem: HTMLDivElement = <HTMLDivElement> this.el.children.item(0);
            divElem.style.width = (SUPPORTS_BOX_SIZING? width : this.correctWidth(width)) || this.defaultWidth;
        }
        // This sets the width in the browser
        // this.el.style.width = width || this.defaultWidth;
    }

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    private correctWidth(width: string): string {
        let out = width;
        if(width.indexOf('%') !== -1) {
            let widthPercent = Number(width.slice(0, width.length-1));
            out = (widthPercent - PADDING_CORRECTION).toString() + '%';
        }
        return out;
    }
}
