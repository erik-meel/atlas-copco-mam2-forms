import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-avoid-break',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="ho-avoid-break"><ng-content></ng-content></div>`,
    styles: ['.ho-avoid-break { page-break-inside: avoid; }']
})
export class AvoidBreakComponent { }
