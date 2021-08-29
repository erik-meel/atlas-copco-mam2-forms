import {Component, ViewEncapsulation, Input, ViewChild, Renderer, ElementRef} from '@angular/core';

@Component({
    selector: 'ho-row',
    template: `<div #row class="ho-row"><ng-content></ng-content></div>`,
    styleUrls: ['row.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RowComponent {
    @ViewChild('row') row: ElementRef;
    @Input('ho-class') set class(nodeClasses: string){
        nodeClasses.split(" ").forEach((nodeClass)=> {
          this.renderer.setElementClass(this.row.nativeElement, nodeClass, true);
        });
    }
    constructor(public renderer: Renderer) { }
}
