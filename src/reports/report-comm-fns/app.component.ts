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
  private Q1 = '';
  private Q2 = '';
  private chkMotor = 0;
  private chkCooler = 0;
  private chkElectrical = 0;
  private chkOISElement = 0;
  private dateMask = '';
  private language = currentLanguage;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;
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
    this.customerSignatureDate = (new Date()).toLocaleString(this.language, this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.language, this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onTechSignatureClear(): void {
    this.techSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onSettingSectionCheck(): void {
    var motor = <HTMLInputElement>document.getElementById("chkMotor");
    var cooler = <HTMLInputElement>document.getElementById("chkCooler");
  //  var electrical = <HTMLInputElement>document.getElementById("chkElectrical");
    var OISElement = <HTMLInputElement>document.getElementById("chkOISElement");

    if(motor.checked) { this.chkMotor = 1; } else { this.chkMotor = 0; }
    if(cooler.checked) { this.chkCooler = 1; } else { this.chkCooler = 0; }
  //  if(electrical.checked) { this.chkElectrical = 1; } else { this.chkElectrical = 0; }
    if(OISElement.checked) { this.chkOISElement = 1; } else { this.chkOISElement = 0; }
  }

  onSettingValue(): void {
    var id = "";
  }

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  text(name: string): string{
    return textLiterals[this.language][name];
  }
}
