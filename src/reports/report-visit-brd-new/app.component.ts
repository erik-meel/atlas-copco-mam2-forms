import {Component, OnInit, AfterViewInit, NgZone, ViewChild} from '@angular/core';
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
  private blockTimeHr = '';
  private unblockTimeHr = '';
  private blockTimeMin = '';
  private unblockTimeMin = '';
  private blockingInfoEntered = false;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = 'BRD_PT';
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
    this.customerSignatureDate = (new Date()).toLocaleString("pt-BR");
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString("pt-BR");
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

  ChangeBlocking(selection: any): void {
    var chkd = selection.target.checked;
    if(chkd) {
      let hr = (new Date()).getHours();
      let min = (new Date()).getMinutes();
      if(hr<10) {
        this.blockTimeMin = "0"+hr.toString();
      } else {
        this.blockTimeHr  = hr.toString();
      }
      if(min<10) {
        this.blockTimeMin = "0"+min.toString();
      }
      else  {
        this.blockTimeMin = min.toString();
      }
    } else {
      this.blockTimeHr = "";
      this.blockTimeMin = "";
    }
    this.blockingInfoEntered = this.BlockingInfoProvided();
  }

  ChangeUnBlocking(selection: any): void {
    var chkd = selection.target.checked;
    if(chkd) {
      let hr = (new Date()).getHours();
      let min = (new Date()).getMinutes();
      if(hr<10) {
        this.unblockTimeHr = "0"+hr.toString();
      }
      else {
        this.unblockTimeHr = hr.toString();
      }
      if(min<10) {
        this.unblockTimeMin = "0"+min.toString();
      } else {
        this.unblockTimeMin = min.toString();
      }
    } else {
      this.unblockTimeHr = "";
      this.unblockTimeMin = "";
    }
    this.blockingInfoEntered = this.BlockingInfoProvided();
  }

  ChangeVoltage(selection:any): void {
    this.blockingInfoEntered = this.BlockingInfoProvided();
  }

  ChangeCurrent(selection:any): void {
    this.blockingInfoEntered = this.BlockingInfoProvided();
  }

  BlockingInfoProvided(): boolean {
    var blockChk = <HTMLInputElement>document.getElementById('Blocking');
    var unBlockChk = <HTMLInputElement>document.getElementById('UnBlocking');
    var volt = <HTMLInputElement>document.getElementById('Voltage');
    var curr = <HTMLInputElement>document.getElementById('Current');

    if(!blockChk.checked||!unBlockChk.checked) {
      return false;
    }
    if(volt.value==''||curr.value=='') {
      return false;
    }

    return true;
  }
}
