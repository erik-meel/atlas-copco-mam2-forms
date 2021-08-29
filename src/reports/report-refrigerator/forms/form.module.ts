import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {BorderedDirective} from './format/bordered.directive';
import {TextAlignDirective} from './format/text-align.directive';
import {BodyComponent} from './layout/body.component';
import {CellComponent} from './layout/cell.component';
import {FooterComponent} from './layout/footer.component';
import {HeaderComponent} from './layout/header.component';
import {RowComponent} from './layout/row.component';
import {SectionHeaderComponent} from './layout/section-header.component';
import {WidthDirective} from './layout/width.directive';
import {AvoidBreakComponent} from './paging/avoid-break.component';
import {AvoidBreakDirective} from './paging/avoid-break.directive';
import {PageBreakComponent} from './paging/page-break.component';
import {PageNumberDirective} from './paging/page-number.directive';
import {FormComponent} from './form.component';
import {PrintService} from './print/print.service';
import {FormService} from './form.service';
import {SignatureComponent} from './signature/signature.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        CheckboxComponent,
        BorderedDirective,
        TextAlignDirective,
        BodyComponent,
        CellComponent,
        FooterComponent,
        HeaderComponent,
        RowComponent,
        SectionHeaderComponent,
        WidthDirective,
        AvoidBreakComponent,
        AvoidBreakDirective,
        PageBreakComponent,
        PageNumberDirective,
        FormComponent,
        SignatureComponent
    ],
    exports: [
      CheckboxComponent,
      BorderedDirective,
      TextAlignDirective,
      BodyComponent,
      CellComponent,
      FooterComponent,
      HeaderComponent,
      RowComponent,
      SectionHeaderComponent,
      WidthDirective,
      AvoidBreakComponent,
      AvoidBreakDirective,
      PageBreakComponent,
      PageNumberDirective,
      FormComponent,
      SignatureComponent
    ],
    providers: [
        PrintService,
        FormService
    ]
})
export class FormModule {
}
