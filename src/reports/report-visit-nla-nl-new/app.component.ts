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
  private dateLocale = '';
  private dateOptions = {};

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;
          if(this.language != 'NLA_NL'&&this.language != 'NLA_EN') {
            this.language = 'NLA_NL';
          
          }
          if(this.language =='NLA_NL') {
            this.dateLocale = 'nl-NL';
          } else {
            this.dateLocale = 'en-US';
          }
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
    this.customerSignatureDate = (new Date()).toLocaleString(this.dateLocale);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.dateLocale);
    this.formService.saveHtmlToMel();
  }

  onTechSignatureClear(): void {
    this.techSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  text(name: string): string{
    return textLiterals[this.language][name];
  }

  cDate(indate: string): string {
    var dt = new Date(indate);
    return dt.toLocaleString(this.dateLocale,this.dateOptions);
  }

  onLanguageSelect(selection: any): void {
    
    let checkVal = selection.target.value;
    this.language = checkVal;
    if(this.language =='NLA_NL') {
      this.dateLocale = 'nl-NL';
    } else {
      this.dateLocale = 'en-US';
    }

    this.formService.saveHtmlToMel();
  }
}
