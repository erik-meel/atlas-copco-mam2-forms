/**
 ************************************************************
 * THIS IS A MOCK MOVILIZER ACCESS FUCTIONS, WHICH WILL BE
 * REPLACED IN THE APPLICATION WITH REAL PROCESSING CODE
 ************************************************************
 */
Movilizer = function () {
};

/*
 * ================ Global variables handling ==============================
 */

/**
 * Returns value for given global variable.
 * @param varName variable name
 * @param successCB success callback
 * @param errorCB error callback
 *
 * @return Value of global variable
 */
Movilizer.prototype.readGlobalVariable = function (varName, successCB, errorCB) {
  var result = "OK";
  if (varName === "FORM_INPUT") {
    result = {
      // HEADER
      'CUST_NAME': 'Glass Partners (PTY) LTD',
      'CUST_ADDRESS_1': 'Remstang street',
      'CUST_ADDRESS_2': 'Stormill',
      'CUST_ID': '123456789012',
      'CUST_CONTACT': 'KOBUS',
      'REPORT_DATE': '2016/03/24 10:05:10 AM',
      // BODY
      'HIDE_SECTION': {
        // 'EQUIPMENT': 'not_relevant',
        // 'WORK_COMMENTS': 'not_relevant',
        // 'NEXT_VISIT': 'not_relevant',
        // 'TIME_CONFIRMATION': 'not_relevant',
        // 'MATERIAL_CONFIRMATION': 'not_relevant',
        // 'WORK_DONE': 'not_relevant',
        // 'MEASUREMENT_POINTS': 'not_relevant',
        // 'SMARTBOX_INSTALL': 'not_relevant',
        // 'DATA_USE': 'not_relevant',
        // 'CONTACT_INFORMATION': 'not_relevant',
        // 'SPM_PROCEDURE': 'not_relevant',
        // 'RECOMMENDED_REPAIR': 'not_relevant',
        // 'COMMISSIONING_PROCEDURE': 'not_relevant',
        // 'COMMISSIONING_CHECK_LIST': 'not_relevant',
        // 'SAFETY_FIRST_CHECK_LIST': 'not_relevant',
        // 'OPERATIONS_LIST': 'not_relevant',
        'AUTHORISATION': 'not_relevant'
      },
      // -- Equipment
      'EQUI_ID': 'GA45VSDFF A 13',
      'EQUI_SERIAL_NUMBER': 'API486502',
      'EQUI_RUNNING_HOURS': '200',
      'EQUI_LOAD_HOURS': '30',
      'EQUI_ACC_VOLUME': '90', // 1000 m^3 for commisioning report
      'VISIT_DATE': '2016/03/24',
      'ORDER_NUMBER': '664686',
      'CONTRACT_NUMBER': '302305',
      'PO_NUMBER': 'COMMISSION',
      // -- Contact information
      'REP_NAME': 'Henrik Olsson',
      'REP_DIVISION': 'Atlas Copco Compressors Canada',
      'REP_ADDRESS_1': '30 Montrose',
      'REP_ADDRESS_2': 'Dollard-des-Ormeaux',
      'REP_ADDRESS_3': 'Québec, Canada H9B 3J9',
      'REP_PHONE': '514.421.8543',
      'REP_EMAIL': 'henrik.olsson@ca.atlascopco.com',
      // -- SmartBox install
      'SB_SERIAL_NUMBER': 'SB23153725r3',
      'SB_IMEA_NUMBER': 'dg352412980',
      'SB_INSTALL_DATE': '2015/04/28',
      // -- Contact information

      // -- Recommended Repair
      'REC_REPAIRS_ENTRIES': {
        '0': {
          'DESC': 'Clean drive',
          'EST_HOURS': '3 H'
        },
        '1': {
          'DESC': 'Change percolator',
          'EST_HOURS': '1 H'
        }
      },
      // -- SPM procedure
      'SPM_ID': 'ZR250VSD-FF-8.6-50',
      'SPM_TEXT': 'The SPM measurement of a compressor is an event of special significance. Proper SPM measurement is the first step in building up the machine history of your GA compressor. The machine history is essential for proper follow-up.',
      'SPM_IMG': 'iVBORw0KGgoAAAA .......... ',
      // -- Safety first check list
      'SAFETY_CHECK_LIST_ENTRIES': {
        '0': {
          'DONE': 'true',
          'DESC': 'Do I know the safety instructions risk assessment for the task & do I adhere to them?',
          'COMMENT': ''
        },
        '1': {
          'DONE': 'true',
          'DESC': 'Do I know the content of work permit (if required as per company or customer rules) & do I adhere to the conditions?',
          'COMMENT': ''
        },
        '2': {
          'DONE': 'true',
          'DESC': 'Do I consider the planned working method is safe to perform?',
          'COMMENT': ''
        }
      },
      // -- Commissioning procedure
      'CO_PROC_ID': 'ZR250VSD-FF-8.6-50',
      'CO_PROC_TEXT': 'The commissioning of a compressor is of special significance. Correct commissioning is the first step in building up the equipment history. The equipment history is essential for proper follow-up.',
      'CO_PROC_IMG': 'iVBORw0KGgoAAAA .......... ',
      // -- Commissioning check list
      'CO_PROC_CHECK_LIST_ENTRIES': {
        '0': {
          'DONE': 'true', //ignored
          'DESC': 'Air receiver installed',
          'COMMENT': 'Yes'
        },
        '1': {
          'DONE': 'false', //ignored
          'DESC': 'Filter(s) installed behind compressor',
          'COMMENT': 'No'
        },
        '2': {
          'DONE': 'true', //ignored
          'DESC': 'Dryer installed',
          'COMMENT': '7.0 /7.3 Bar'
        }
      },
      // -- Operations List
      'CO_PROC_OPERATIONS_LIST_ENTRIES': {
        '0': {
          'DONE': 'true',
          'DESC': 'Give machine description',
          'COMMENT': ''
        },
        '1': {
          'DONE': 'true',
          'DESC': 'Record machine serial number',
          'COMMENT': ''
        },
        '2': {
          'DONE': 'true',
          'DESC': 'Record elements part nr & serial nr',
          'COMMENT': ''
        }
      },
      // -- Work Comments
      'WORK_COMMENTS': 'Removed transport bolts. Checked oil level. Put oil in element. Checked all pipes and fittings. Checked direction on dryer fan motor, and cooling fan motor and main motor. Start comp and checked pressure and temperatures. Set pressure to 12 bar. All in order.',
      // -- Next Visit
      'NEXT_VISIT_DATE': 'ordinary',
      'NEXT_VISIT_TASKS': {
        '0': {
          'TASK_DESC': 'Engine check',
          'TASK_ESTIMATION_IN_HOURS': '2'
        },
        '1': {
          'TASK_DESC': 'Tubes alignment',
          'TASK_ESTIMATION_IN_HOURS': '0.5'
        }
      },
      // -- Time Confirmation
      'TIME_CONFIRMATION_ENTRIES': {
        '0': {
          'DATE': '2016/03/24',
          'SERVICE_ENG_NAME': 'Leon Rautenbach',
          'ACTIVITY_TYPE': 'NORMAL TIME',
          'EFFORT': '3.00 H'
        },
        '1': {
          'DATE': '2016/03/24',
          'SERVICE_ENG_NAME': 'Leon Rautenbach',
          'ACTIVITY_TYPE': 'TRAVEL TIME',
          'EFFORT': '2.00 H'
        },
        '2': {
          'DATE': '2016/03/24',
          'SERVICE_ENG_NAME': 'Leon Rautenbach',
          'ACTIVITY_TYPE': 'MILEAGE',
          'EFFORT': '120.00 KM'
        }
      },
      // -- Material Confirmation
      'MATERIAL_CONFIRMATION_ENTRIES': {
        '0': {
          'PART_NUMBER': '1930052400',
          'PART_DESC': 'SCREW - APX23D',
          'QUANTITY': '2'
        },
        '1': {
          'PART_NUMBER': '2335489123',
          'PART_DESC': 'WASHER - D3 - 12mm',
          'QUANTITY': '10'
        }
      },
      // -- Work Done
      'WORK_DONE_ENTRIES': {
        '0': {
          'DONE': 'true',
          'DESC': 'Check condenser (AC) and clean extern.',
          'COMMENT': ''
        },
        '1': {
          'DONE': 'false',
          'DESC': 'Check blow-off operation',
          'COMMENT': ''
        },
        '2': {
          'DONE': 'true',
          'DESC': 'Check cycle of air intake throttle valve',
          'COMMENT': ''
        },
        '3': {
          'DONE': 'true',
          'DESC': 'Check electrical components',
          'COMMENT': ''
        },
        '4': {
          'DONE': 'false',
          'DESC': 'Check display+settings:digital panel(s)',
          'COMMENT': ''
        },
        '5': {
          'DONE': 'false',
          'DESC': 'Check the approach temp. coolers',
          'COMMENT': ''
        },
        '6': {
          'DONE': 'true',
          'DESC': 'Check LAT (FF units)',
          'COMMENT': ''
        },
        '7': {
          'DONE': 'true',
          'DESC': 'Check function of after cooler',
          'COMMENT': ''
        },
        '8': {
          'DONE': 'true',
          'DESC': 'Check oil level',
          'COMMENT': ''
        },
        '9': {
          'DONE': 'true',
          'DESC': 'Check setting of overload relay',
          'COMMENT': ''
        },
        '10': {
          'DONE': 'true',
          'DESC': 'Inspect bear. controller repl. when nec.',
          'COMMENT': ''
        }
      },
      // -- Measurement Points
      'MEASUREMENT_POINTS_LAST_VISIT': '2016/03/29',
      'MEASUREMENT_POINTS_ENTRIES': {
        '0': {
          'COUNTER': 'Running hours',
          'READ_AFTER': '0',
          'READ_UNIT': 'H',
          'READ_BEFORE': '0',
          'READ_LAST_VISIT': '2016/03/29'
        },
        '1': {
          'COUNTER': 'Accumulated volume',
          'READ_AFTER': '0',
          'READ_UNIT': 'm3 x (1000)',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '2': {
          'COUNTER': 'Motor start',
          'READ_AFTER': '5',
          'READ_UNIT': '#',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '3': {
          'COUNTER': 'Load relay',
          'READ_AFTER': '7',
          'READ_UNIT': '#',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '4': {
          'COUNTER': 'VSD 1-20% RPM',
          'READ_AFTER': '1',
          'READ_UNIT': '%',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '5': {
          'COUNTER': 'VSD 20-40% RPM',
          'READ_AFTER': '29',
          'READ_UNIT': '%',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '6': {
          'COUNTER': 'VSD 40-60% RPM',
          'READ_AFTER': '3',
          'READ_UNIT': '%',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '7': {
          'COUNTER': 'VSD 60-80% RPM',
          'READ_AFTER': '27',
          'READ_UNIT': '%',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '8': {
          'COUNTER': 'VSD 80-100% RPM',
          'READ_AFTER': '39',
          'READ_UNIT': '%',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '9': {
          'COUNTER': 'Working pressure',
          'READ_AFTER': '12',
          'READ_UNIT': 'bar',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '10': {
          'COUNTER': 'Ambient temperature',
          'READ_AFTER': '23',
          'READ_UNIT': '°C',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '11': {
          'COUNTER': 'Outlet temperature element 1',
          'READ_AFTER': '80',
          'READ_UNIT': '°C',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '12': {
          'COUNTER': 'Motor Current U1',
          'READ_AFTER': '75',
          'READ_UNIT': 'A',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '13': {
          'COUNTER': 'Motor Current V1',
          'READ_AFTER': '77',
          'READ_UNIT': 'A',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '14': {
          'COUNTER': 'Motor Current W1',
          'READ_AFTER': '75',
          'READ_UNIT': 'A',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        },
        '15': {
          'COUNTER': 'Fan Starts',
          'READ_AFTER': '11',
          'READ_UNIT': '#',
          'READ_BEFORE': '',
          'READ_LAST_VISIT': ''
        }
      },
      // -- Authorisation
      'CUST_CONFIRMATION': {
        'SIGN_NAME': 'Theo van Wyk',
        'SIGN_DATA': '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',
        'SIGN_TIME': '2016/03/24 10:06:20 AM'
      },
      'SERV_ENG_CONFIRMATION': {
        'SIGN_NAME': 'Leon Rautenbach',
        'SIGN_DATA': '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',
        'SIGN_TIME': '2016/03/24 10:06:20 AM'
      },
      'JOB_RATING': 'Excellent',
      // FOOTER
      'COMPANY_NAME': 'Atlas Copco India (Ltd)',
      'COMPANY_DESC': 'A Company Within the At las Copco Group',
      'COMPANY_URL_DESC': 'www.atlascopco.com',
      'COMPANY_URL': 'www.atlascopco.com',
      'QUALITY_STAMP': '', //SVG

      'FOOTER_LEFT_LINE1': 'Postal address:',
      'FOOTER_CENTER_LINE1': 'Visitors address:',
      'FOOTER_RIGHT_LINE1': 'Phone: +27 (0)11 821 9000',

      'FOOTER_LEFT_LINE2': 'P.O. Box 14110',
      'FOOTER_CENTER_LINE2': 'Innes Road',
      'FOOTER_RIGHT_LINE2': 'E-Mail: air.compressors@za.atlascopco.com',

      'FOOTER_LEFT_LINE3': 'Witfield, 14678',
      'FOOTER_CENTER_LINE3': 'JetPark',
      'FOOTER_RIGHT_LINE3': 'Reg No. 1911/003838/07',

      'FOOTER_LEFT_LINE4': 'South Africa',
      'FOOTER_CENTER_LINE4': 'Boksburg',
      'FOOTER_RIGHT_LINE4': '',

      'FOOTER_LEFT_LINE5': 'last left',
      'FOOTER_CENTER_LINE5': 'last center',
      'FOOTER_RIGHT_LINE5': 'last right'

      // 'COMPANY_ADDRESS_1': 'Sveanagar,',
      // 'COMPANY_ADDRESS_2': 'Dapodi,',
      // 'COMPANY_ADDRESS_3': 'Pune 411012',
      // 'COMPANY_VISIT_ADDRESS_1': 'Sveanagar,',
      // 'COMPANY_VISIT_ADDRESS_2': 'Dapodi,',
      // 'COMPANY_VISIT_ADDRESS_3': 'Pune 411012',
      // 'COMPANY_PHONE': '+ 91-20-39852100',
      // 'COMPANY_PHONE_2': '+ 254 721 265778',
      // 'COMPANY_PHONE_3': '+ 254 721 383808',
      // 'COMPANY_PHONE_4': '+ 254 733 333201',
      // 'COMPANY_PHONE_5': '+ 254 20 6605000',
      // 'COMPANY_FAX': '+ 91-20-39857009',
      // 'COMPANY_FAX_2': '+ 254 20 6605101',
      // 'COMPANY_EMAIL': 'info.acea@ke.atlascopco.com',
      // 'COMPANY_EMAIL_2': 'info.acea@ke.atlascopco.com',
      // 'COMPANY_DIRECTOR': 'Paul N. Ndungu (Chairman)',
      // 'COMPANY_DIRECTOR_2': 'Frans Van Niekerk (South African)',
      // 'COMPANY_DIRECTOR_3': 'Erik Pieder (Swedish)',
      // 'COMPANY_DIRECTOR_4': 'Lawrence Githinji',
      // 'COMPANY_SECRETARY': 'Livingstone Associates',
    };

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
Movilizer.prototype.readGlobalVariableWithNamespace = function (varName, successCB, errorCB, namespace) {
  var result = "OK";
  successCB(result);
}

/**
 * Returns value for given global variable.
 * @param varName variable name
 * @param successCB success callback
 * @param errorCB error callback
 * @return Value of global variable
 */
Movilizer.prototype.writeGlobalVariable = function (varName, varValue) {
  console.log("Saved variable " + varName + " with content:");
  var valueString = JSON.stringify(varValue, null, 4);
  console.log(valueString.substring(0, valueString.length < 1024 ? valueString.length : 1024) + " .... (content clipped)");
}

/**
 * Returns value for given global variable.
 * @param varName variable name
 * @param successCB success callback
 * @param errorCB error callback
 * @param namespace global variable namespace
 * @return Value of global variable
 */
Movilizer.prototype.writeGlobalVariableWithNamespace = function (varName, varValue, namespace) {

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
Movilizer.prototype.queryMasterData = function (pool, group, filter, returnSpec, successCB, errorCB) {
  var result = "OK";
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
Movilizer.prototype.listDocument = function (pool, successCB, errorCB) {
  var result = "OK";
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
Movilizer.prototype.getDocument = function (pool, docKey, successCB, errorCB) {
  var result = "OK";
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
Movilizer.prototype.listContainerNames = function (namePrefix, successCB, errorCB) {
  var result = "OK";
  successCB(result);
}

/**
 * Call MEL method to write container
 * @param name Name of the container
 * @param value MEL object to be written
 * @param replicPriority Replication priority
 */
Movilizer.prototype.writeContainer = function (name, value, replicPriority) {

}
/**
 * Call MEL method to read container
 * @param name Name of the container
 * @param successCB Callback function to be called for return value
 * @param errorCB Error callback function - when some error occurs
 */
Movilizer.prototype.readContainer = function (name, successCB, errorCB) {
  var result = "OK";
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
Movilizer.prototype.writeOnlineContainer = function (name, value) {

}

/**
 * Call MEL method to read online container
 * @param name Name of the online container
 * @param successCB Callback function to be called for return value
 * @param errorCB Error callback function - when some error occurs
 */
Movilizer.prototype.readOnlineContainer = function (name, successCB, errorCB) {
  var result = "OK";
  successCB(result);
}

/**
 * Executes triggerOnlineSync MEL procedure. Note that this does not trigger online sync,
 * rather than raise a flag to trigger sync on screen transition
 */
Movilizer.prototype.triggerOnlineSync = function () {

}

/**
 * Triggers OK Event on user interface. Particulary useful when Cordova screen is set to Full screen
 */
Movilizer.prototype.triggerOKEvent = function () {

}

/**
 * Triggers Back Event on user interface. Particulary useful when Cordova screen is set to Full screen
 */
Movilizer.prototype.triggerBackEvent = function () {

}

movilizer = new Movilizer();
