import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[ho-avoid-break]'
})
export class AvoidBreakDirective {

    private elem: HTMLElement;

    constructor(el: ElementRef, private renderer: Renderer) {
        this.elem = el.nativeElement;
    }

    @Input('ho-avoid-break') set avoidBreak(isAvoidBreak: string) {
        if (this.elem.children.length > 0) {
            this.renderer.setElementClass(this.elem.children.item(0), 'ho-avoid-break', true);
        }
    }
}
