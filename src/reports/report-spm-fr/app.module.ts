import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MovilizerModule} from '../../movilizer/movilizer.module';

import {AppComponent} from './app.component';
import {FormModule} from '../../forms/form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MovilizerModule,
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
