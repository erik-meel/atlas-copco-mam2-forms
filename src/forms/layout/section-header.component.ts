import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-section-header',
    template: `<div class="ho-section-header"><ng-content></ng-content></div>`,
    styleUrls: ['section-header.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SectionHeaderComponent { }
