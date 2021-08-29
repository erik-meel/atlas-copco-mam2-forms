import {Component, ViewEncapsulation, Input, ViewChild, Renderer, ElementRef} from '@angular/core';

@Component({
    selector: 'ho-cell',
    template: `<div #cell class="ho-cell"><ng-content></ng-content></div>`,
    styleUrls: ['cell.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CellComponent {
    @ViewChild('cell') cell: ElementRef;
    @Input('ho-class') set class(nodeClasses: string){
      nodeClasses.split(" ").forEach((nodeClass)=> {
        this.renderer.setElementClass(this.cell.nativeElement, nodeClass, true);
      });
    }
    constructor(public renderer: Renderer) { }
}
