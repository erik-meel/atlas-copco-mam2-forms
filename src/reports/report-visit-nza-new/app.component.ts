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
  private custID = '';
  private customerSignatureDate = '';
  private techSignatureDate = '';
  private dateMask = '';
  private language = currentLanguage;
  private browserLocal = navigator.language;
  private dateOptions = {};
  private timeOptions = {};
  private showAcap = 0;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
          this.timeOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          this.INPUT = formInput;
          this.language = this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;

          this.customerSignatureName = this.INPUT.get('CUST_CONTACT');
          this.custID = this.INPUT.get('CUST_ID');
          switch(this.custID) {
            case '1000946506':
            case '1000946507': 
            case '1000946508':
            case '1000945353':
            case '1000945376':
            case '1000945333':
            case '1000945387':
            case '1000945361':
            case '1000945331':
            case '1000945365':
            case '1000946026':
            case '1000945384':
            case '1000945335':
            case '1001460977':
            case '1000945339':
            case '1001083695':
            case '1000945355':
            case '1000945360':
            case '1000945406':
            case '1000945412':
            case '1000945913':
            case '1000945914':
            case '1000945915':
            case '1000946041':  
              this.showAcap = 1;
              break;
            default: this.showAcap = 0;
          }

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
    this.customerSignatureDate = (new Date()).toLocaleString(this.browserLocal, this.timeOptions);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.browserLocal, this.timeOptions);
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
