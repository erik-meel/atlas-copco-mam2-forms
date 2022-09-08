import {Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormService} from '../../forms';
import {MelVariable} from '../../movilizer';
import {textLiterals, currentLanguage} from "../shared/text-literals";
declare let literalsSet: any;

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
  private textLiteralsSet = textLiterals;
  private browserLocal = navigator.language;
  private dateOptions = {};
  private timeOptions = {};

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
          this.timeOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          this.INPUT = formInput;
          this.language = 'CJV_ZH'; //this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;

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
    this.customerSignatureDate = (new Date()).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
}
