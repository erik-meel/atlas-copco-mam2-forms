
/**
 ************************************************************
 * THIS IS A MOCK MOVILIZER ACCESS FUNCTIONS, WHICH WILL BE
 * REPLACED IN THE APPLICATION WITH REAL PROCESSING CODE
 ************************************************************
 */
import {isUndefined} from 'util';
import 'core-js/es6/map';

declare var window: Window;

export class Movilizer {

  private readVariableResult: Map<string, any> = new Map<string, any>();
  private queryMasterDataResult: Map<number, Map<string, any>> = new Map<number, Map<string, any>>();

  constructor() {
  }

  mockResultForReadVariable(varName: string, result: any) {
    this.readVariableResult.set(varName, result);
  }

  mockResultForQueryMasterData(pool: number, filter: any, result: any) {
    if (!this.queryMasterDataResult.has(pool)) {
      this.queryMasterDataResult.set(pool, new Map<string, any>());
    }
    let poolMap = this.queryMasterDataResult.get(pool);
    poolMap.set(JSON.stringify(filter), result);
  }

  /**
   * Returns value for given global variable.
   * @param varName variable name
   * @param successCB success callback
   * @param errorCB error callback
   *
   * @return Value of global variable
   */
  readGlobalVariable(varName: string, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    if (this.readVariableResult.has(varName)) {
      result = this.readVariableResult.get(varName);
    }
    successCB(result);
  }

  /**
   * Returns value for given global variable.
   * @param varName variable name
   * @param successCB success callback
   * @param errorCB error callback
   * @param namespace global variable namespace
   * @return Value of global variable
   */
  readGlobalVariableWithNamespace(varName: string, successCB: Function, errorCB: Function, namespace: string): void {
    let result: any = 'OK';
    successCB(result);
  }

  /**
   * Returns value for given global variable.
   * @param varName variable name
   * @param successCB success callback
   * @param errorCB error callback
   * @return Value of global variable
   */
  writeGlobalVariable(varName: string, varValue: any): void {
    console.log(varValue);
    let valueString = JSON.stringify(varValue, null, 4);
    if (!valueString) {
      valueString = 'undefined';
    }
    console.log(valueString.substring(0, valueString.length < 1024 ? valueString.length : 1024) + ' .... (content clipped)');
    if (varName === "FORM_OUTPUT_HTML" && !isUndefined(window['saveReport'])) {
      window['saveReport'](varValue);
    }
  }

  /**
   * Returns value for given global variable.
   * @param varName variable name
   * @param successCB success callback
   * @param errorCB error callback
   * @param namespace global variable namespace
   * @return Value of global variable
   */
  writeGlobalVariableWithNamespace(varName: string, varValue: any, namespace: string): void {

  }

  /*
   * ================ Masterdata handling ==============================
   */
  /**
   * Executes query masterdata MEL function and return the result
   * @param pool MD Pool - make sure this is obtained from MEL ($global:mdPool = $masterdata:poolId)
   * @param group MD Group
   * @param filter Array/table specifying the filter condition
   * @param returnSpec Array/table specifying the return specification
   * @param successCB success callback
   * @param errorCB error callback
   * @return Array with results
   */
  queryMasterData(pool: number, group: string, filter: Object, returnSpec: Object, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    if (this.queryMasterDataResult.has(pool)) {
      let poolMap = this.queryMasterDataResult.get(pool);
      let filterString = JSON.stringify(filter);
      if (poolMap.has(filterString)) {
        result = poolMap.get(filterString);
      }
    }
    successCB(result);
  }

  /*
   * ================ Documents handling ==============================
   */
  /**
   * Calls MEL method listDocument, which returns key/value hashtable containing documentKey/documentName
   * @param pool PoolID (note that this id should be passed to JS via global variable and assignment of $document:pool)
   * @param successCB success callback
   * @param errorCB error callback
   * @return Hashtable with document keys/document names
   */
  listDocument(pool: number, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    successCB(result);
  }

  /**
   * Calls MEL method getDocument, which returns file location of the document on the local file system
   * @param pool PoolID (note that this id should be passed to JS via global variable and assignment of $document:pool)
   * @param docKey Document key
   * @param successCB success callback
   * @param errorCB error callback
   * @return String with document file location
   */
  getDocument(pool: number, docKey: string, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    successCB(result);
  }

  /*
   * ================ Container handling ==============================
   */
  /**
   * Calls MEL method listContainerNames
   * @param namePrefix Prefix to be used for filtering.
   * @param successCB success callback
   * @param errorCB error callback
   * @return Array with strings
   */
  listContainerNames(namePrefix: string, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    successCB(result);
  }

  /**
   * Call MEL method to write container
   * @param name Name of the container
   * @param value MEL object to be written
   * @param replicPriority Replication priority
   */
  writeContainer(name: string, value: any, replicPriority: number): void {

  }

  /**
   * Call MEL method to read container
   * @param name Name of the container
   * @param successCB Callback function to be called for return value
   * @param errorCB Error callback function - when some error occurs
   */
  readContainer(name: string, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    successCB(result);
  }

  /*
   * ================ Online container handling ==============================
   */
  /**
   * Call MEL method to write online container
   * @param name Name of the online container
   * @param value MEL object to be written
   */
  writeOnlineContainer(name: string, value: any): void {

  }

  /**
   * Call MEL method to read online container
   * @param name Name of the online container
   * @param successCB Callback function to be called for return value
   * @param errorCB Error callback function - when some error occurs
   */
  readOnlineContainer(name: string, successCB: Function, errorCB: Function): void {
    let result: any = 'OK';
    successCB(result);
  }

  /**
   * Executes triggerOnlineSync MEL procedure. Note that this does not trigger online sync,
   * rather than raise a flag to trigger sync on screen transition
   */
  triggerOnlineSync(): void {

  }

  /**
   * Triggers OK Event on user interface. Particulary useful when Cordova screen is set to Full screen
   */
  triggerOKEvent(): void {

  }

  /**
   * Triggers Back Event on user interface. Particulary useful when Cordova screen is set to Full screen
   */
  triggerBackEvent(): void {

  }
}
