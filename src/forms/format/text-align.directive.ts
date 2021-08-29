import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[ho-text-align]'
})
export class TextAlignDirective {

    private elem: HTMLElement;

    constructor(el: ElementRef, private renderer: Renderer) {
        this.elem = el.nativeElement;
    }

    @Input('ho-text-align') set textAlign(textAlignValue: string) {
        if (this.elem.children.length > 0) {
            this.renderer.setElementStyle(this.elem.children.item(0), 'text-align', textAlignValue);
        }
    }
}
