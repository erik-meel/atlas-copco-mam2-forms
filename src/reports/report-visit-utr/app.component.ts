import {Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormService} from '../../forms';
import {MelVariable} from '../../movilizer';
import {textLiterals, currentLanguage} from "../shared/text-literals";

@Component({
  selector: 'my-form',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private INPUT: MelVariable = new MelVariable({});

  private customerSignatureName = '';
  private customerSignatureDate = '';
  private techSignatureDate = '';
  private dateMask = '';
  private language = currentLanguage;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          // this.language = this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;
          this.language = 'UTR_EN';
          this.customerSignatureName = this.INPUT.get('CUST_CONTACT');
          let that = this;
            Observable.timer(200).subscribe(
              () => {
                that.formService.saveHtmlToMel();
              }
            );
        });
      },
      (error: any) => {
        console.log(error);
        this.formService.writeErrors(error, false);
      });
  }

  ngAfterViewInit() {
  //   let that = this;
  //   Observable.timer(500).subscribe(
  //     () => {
  //       that.formService.saveHtmlToMel();
  //     }
  //   ); // In cordova it takes to much time to render the view so we have to wait for it
  }

  onCustomerSignatureEnd(): void {
    this.customerSignatureDate = (new Date()).toLocaleString(this.language.slice(-2), this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.language.slice(-2), this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onTechSignatureClear(): void {
    this.techSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  //filter out timestamp from format
  date(name: string): string {
    var date = this.INPUT.tag(name);
    date = date.slice(0,-13);
    return date;
  }

  //convert date format
  localdate(name: string): string {
    var parts = name.split('/');
    if(parts[2].length > 2)
    {
      parts[2] = parts[2].substr(0,2);
    }
    var day = Number(parts[0]);
    var month = Number(parts[1]) - 1;
    var year = Number(parts[2]);
    var mydate = new Date(day,month,year).toLocaleString(this.language.slice(-2), this.formService.dateTimeFormat).slice(0,-13);

    return mydate;
  }

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  text(name: string): string{
    return textLiterals[this.language][name];
  }
}
