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
  private debug_info:string = "";
  private debug_mode:boolean = false;
  private our_console:any;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = 'ASA_DE';
          //this.activateDebugConsole();
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

  activateDebugConsole(){
    this.debug_mode = true;
    if (typeof console  != "undefined") {
      this.our_console = console;
      if (typeof this.our_console.log != 'undefined')
        this.our_console.olog = this.our_console.log;
      else
          this.our_console.olog = function() {};

      var screen = this;
      this.our_console.log = function(message:string) {
          screen.our_console.olog(message);
          screen.debug_info += "\n" + message;
      };
      this.our_console.error = this.our_console.debug = this.our_console.info =  this.our_console.log
    }
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

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  //filter out timestamp from format
  date(name: string): string {
    var date = this.INPUT.tag(name);
    date = date.substring(0, 10);
    return date;
  }

  //remove everything after dot
  round(name: string): string {
    var round = parseInt(name);
    return round.toString();
  }

  text(name: string): string{
    return textLiterals[this.language][name];
  }
}
