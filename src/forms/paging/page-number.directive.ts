import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[ho-page-number]'
})
export class PageNumberDirective {
    private elem: HTMLElement;

    constructor(el: ElementRef, private renderer: Renderer) {
        this.elem = el.nativeElement;
    }

    @Input('ho-page-number') set pageNumber(pageNumberText: string) {
        if (!pageNumberText) {
          pageNumberText = '"Page "counter(page)" of "counter(pages)';
        }
        if (this.elem.children.length > 0) {
            this.renderer.setElementClass(this.elem.children.item(0), 'ho-page-number', true);
            this.renderer.setElementStyle(this.elem.children.item(0), 'content', pageNumberText);
        }
    }
}
