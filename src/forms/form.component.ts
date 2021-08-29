import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-form',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="ho-form"><ng-content></ng-content></div>`,
    styleUrls: [
        'form.component.css',
        'form.component.typography.css',
        // Directives can't have css ¬¬
        'format/bordered.directive.css' // TODO: find a better way of doing this
    ]
})
export class FormComponent { }
