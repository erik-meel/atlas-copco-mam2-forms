import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[ho-bordered]'
})
export class BorderedDirective {

    private elem: HTMLElement;

    constructor(el: ElementRef, private renderer: Renderer) {
        this.elem = el.nativeElement;
    }

    @Input('ho-bordered') set bordered(isBordered: string) {
        if (this.elem.children.length > 0) {
          this.renderer.setElementClass(this.elem.children.item(0), 'ho-bordered', true);
        }
    }
}
