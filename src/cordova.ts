// This file will be replace when on a cordova device
import {mockData} from './mockdata/mockdata';
import {Movilizer} from './movilizer/cordova.plugin';

console.log("Mocking movilizer cordova plugin");

declare var window: Window;

window['movilizer'] = new Movilizer();
mockData(window['movilizer']);
