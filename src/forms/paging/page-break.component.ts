import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-page-break',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="ho-page-break"></div>`,
    styles: ['.ho-page-break { page-break-after: always }']
})
export class PageBreakComponent { }
