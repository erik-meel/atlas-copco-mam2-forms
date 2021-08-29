$global:work_order_cockpit_input = {
  // HEADER
  "CUST_NAME": "Glass Partners (PTY) LTD";
  "CUST_ADDRESS_1": "Remstang street";
  "CUST_ADDRESS_2": "Stormill";
  "CUST_ID": "123456789012";
  "CUST_CONTACT": "KOBUS";
  "REPORT_DATE": "2016/03/24 10:05:10 AM";
  // BODY
  "HIDE_SECTION":{
    // "EQUIPMENT": "not_relevant";
    // "WORK_COMMENTS": "not_relevant";
    // "NEXT_VISIT": "not_relevant";
    // "TIME_CONFIRMATION": "not_relevant";
    // "MATERIAL_CONFIRMATION": "not_relevant";
    // "WORK_DONE": "not_relevant";
    // "MEASUREMENT_POINTS": "not_relevant";
    // "SMARTBOX_INSTALL": "not_relevant";
    // "DATA_USE": "not_relevant";
    // "CONTACT_INFORMATION": "not_relevant";
    // "SPM_PROCEDURE": "not_relevant";
    // "RECOMMENDED_REPAIR": "not_relevant";
    // "COMMISSIONING_PROCEDURE": "not_relevant";
    // "COMMISSIONING_CHECK_LIST": "not_relevant";
    // "SAFETY_FIRST_CHECK_LIST": "not_relevant";
    // "OPERATIONS_LIST": "not_relevant";
    "AUTHORISATION": "not_relevant";
  };
  // -- JOB type
  "PMACTTYPE": "FP";
  // -- Equipment
  "EQUI_ID": "GA45VSDFF A 13";
  "EQUI_SERIAL_NUMBER": "API486502";
  "EQUI_RUNNING_HOURS": "200";
  "EQUI_LOAD_HOURS": "30";
  "EQUI_ACC_VOLUME": "90"; // 1000 m^3 for commisioning report
  "VISIT_DATE": "2016/03/24";
  "ORDER_NUMBER": "664686";
  "CONTRACT_NUMBER": "302305";
  "PO_NUMBER": "COMMISSION";
  // -- Contact information
  "REP_NAME": "Henrik Olsson";
  "REP_DIVISION": "Atlas Copco Compressors Canada";
  "REP_ADDRESS_1": "30 Montrose";
  "REP_ADDRESS_2": "Dollard-des-Ormeaux";
  "REP_ADDRESS_3": "Québec; Canada H9B 3J9";
  "REP_PHONE": "514.421.8543";
  "REP_EMAIL": "henrik.olsson@ca.atlascopco.com";
  // -- SmartBox install
  "SB_SERIAL_NUMBER": "SB23153725r3";
  "SB_IMEA_NUMBER": "dg352412980";
  "SB_INSTALL_DATE": "2015/04/28";
  // -- Contact information

  // -- Recommended Repair
  "REC_REPAIRS_ENTRIES": {
    "0": {
      "DESC": "Clean drive";
      "EST_HOURS": "3 H";
    };
    "1": {
      "DESC": "Change percolator";
      "EST_HOURS": "1 H";
    }
  };
  // -- SPM procedure
  "SPM_ID": "ZR250VSD-FF-8.6-50";
  "SPM_TEXT": "The SPM measurement of a compressor is an event of special significance. Proper SPM measurement is the first step in building up the machine history of your GA compressor. The machine history is essential for proper follow-up.";
  "SPM_IMG": "data:image/png;base64;iVBORw0KGgoAAAA .......... ";
  // -- Safety first check list
  "SAFETY_CHECK_LIST_ENTRIES": {
    "0": {
      "DONE": "true";
      "DESC": "Do I know the safety instructions risk assessment for the task & do I adhere to them?";
      "COMMENT": "";
    };
    "1": {
      "DONE": "true";
      "DESC": "Do I know the content of work permit (if required as per company or customer rules) & do I adhere to the conditions?";
      "COMMENT": "";
    };
    "2": {
      "DONE": "true";
      "DESC": "Do I consider the planned working method is safe to perform?";
      "COMMENT": "";
    }
  };
  // -- Commissioning procedure
  "CO_PROC_ID": "ZR250VSD-FF-8.6-50";
  "CO_PROC_TEXT": "The commissioning of a compressor is of special significance. Correct commissioning is the first step in building up the equipment history. The equipment history is essential for proper follow-up.";
  "CO_PROC_IMG": "data:image/png;base64,iVBORw0KGgoAAAA .......... ";
  // -- Commissioning check list
  "CO_PROC_CHECK_LIST_ENTRIES": {
    "0": {
      "DONE": "true"; //ignored
      "DESC": "Air receiver installed";
      "COMMENT": "Yes";
    };
    "1": {
      "DONE": "false"; //ignored
      "DESC": "Filter(s) installed behind compressor";
      "COMMENT": "No";
    };
    "2": {
      "DONE": "true"; //ignored
      "DESC": "Dryer installed";
      "COMMENT": "7.0 /7.3 Bar";
    }
  };
  // -- Operations List
  "CO_PROC_OPERATIONS_LIST_ENTRIES": {
    "0": {
      "DONE": "true";
      "DESC": "Give machine description";
      "COMMENT": "";
    };
    "1": {
      "DONE": "true";
      "DESC": "Record machine serial number";
      "COMMENT": "";
    };
    "2": {
      "DONE": "true";
      "DESC": "Record elements part nr & serial nr";
      "COMMENT": "";
    }
  };
  // -- Work Comments
  "WORK_COMMENTS": "Removed transport bolts. Checked oil level. Put oil in element. Checked all pipes and fittings. Checked direction on dryer fan motor, and cooling fan motor and main motor. Start comp and checked pressure and temperatures. Set pressure to 12 bar. All in order.";
  // -- Next Visit
  "NEXT_VISIT_DATE": "2016/03/24";
  "NEXT_VISIT_TYPE" : "ordinary";
  "NEXT_VISIT_HEADLINE" : "Engine check";
  "NEXT_VISIT_HOURS" : "3";
  "NEXT_VISIT_DESCRIPTION" : "Internal surface contour";
  // -- Time Confirmation
  "TIME_CONFIRMATION_ENTRIES": {
    "124": {
      "DATE": "2016/03/25";
      "SERVICE_ENG_NAME": "Leon Rautenbach";
      "ACTIVITY_TYPE": "NORMAL TIME";
      "EFFORT": "3.00 H";
    };
    "125": {
      "DATE": "2016/03/26";
      "SERVICE_ENG_NAME": "Leon Rautenbach";
      "ACTIVITY_TYPE": "TRAVEL TIME";
      "EFFORT": "2.00 H";
    };
    "123": {
      "DATE": "2016/03/24";
      "SERVICE_ENG_NAME": "Leon Rautenbach";
      "ACTIVITY_TYPE": "MILEAGE";
      "EFFORT": "120.00 KM";
    }
  };
  // -- Material Confirmation
  "MATERIAL_CONFIRMATION_ENTRIES": {
    "0": {
      "PART_NUMBER": "1930052400";
      "PART_DESC": "SCREW - APX23D";
      "QUANTITY": "2"
    };
    "1": {
      "PART_NUMBER": "2335489123";
      "PART_DESC": "WASHER - D3 - 12mm";
      "QUANTITY": "10";
    };
  };
  // -- Work Done
  "WORK_DONE_ENTRIES": {
    "5": {
      "DONE": "false";
      "DESC": "5 - Check display+settings:digital panel(s)";
      "COMMENT": "";
    };
    "4": {
      "DONE": "true";
      "DESC": "4 - Check electrical components";
      "COMMENT": "";
    };
    "1": {
      "DONE": "true";
      "DESC": "1 - Check condenser (AC) and clean extern.";
      "COMMENT": "";
    };

    "10": {
      "DONE": "true";
      "DESC": "10 - Check setting of overload relay";
      "COMMENT": "";
    };
    "3": {
      "DONE": "true";
      "DESC": "3 - Check cycle of air intake throttle valve";
      "COMMENT": "";
    };



    "8": {
      "DONE": "true";
      "DESC": "8 - Check function of after cooler";
      "COMMENT": "";
    };
    "7": {
      "DONE": "true";
      "DESC": "7 - Check LAT (FF units)";
      "COMMENT": "";
    };

    "9": {
      "DONE": "true";
      "DESC": "9 - Check oil level";
      "COMMENT": "";
    };
    "2": {
      "DONE": "false";
      "DESC": "2 - Check blow-off operation";
      "COMMENT": "";
    };
    "6": {
      "DONE": "false";
      "DESC": "6 - Check the approach temp. coolers";
      "COMMENT": "";
    };
    "11": {
      "DONE": "true";
      "DESC": "11 - Inspect bear. controller repl. when nec.";
      "COMMENT": "";
    }
  };
  // -- Measurement Points
  "MEASUREMENT_POINTS_LAST_VISIT": "2016/03/29";
  "MEASUREMENT_POINTS_ENTRIES": {
    "0": {
      "COUNTER": "Running hours";
      "READ_AFTER": "5002";
      "READ_UNIT": "H";
      "READ_BEFORE": "5000";
      "READ_LAST_VISIT": "2003";
    };
    "1": {
      "COUNTER": "Accumulated volume";
      "READ_AFTER": "0";
      "READ_UNIT": "m3 x (1000)";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "2": {
      "COUNTER": "Motor start";
      "READ_AFTER": "5";
      "READ_UNIT": "#";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "3": {
      "COUNTER": "Load relay";
      "READ_AFTER": "7";
      "READ_UNIT": "#";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "4": {
      "COUNTER": "VSD 1-20% RPM";
      "READ_AFTER": "1";
      "READ_UNIT": "%";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "5": {
      "COUNTER": "VSD 20-40% RPM";
      "READ_AFTER": "29";
      "READ_UNIT": "%";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "6": {
      "COUNTER": "VSD 40-60% RPM";
      "READ_AFTER": "3";
      "READ_UNIT": "%";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "7": {
      "COUNTER": "VSD 60-80% RPM";
      "READ_AFTER": "27";
      "READ_UNIT": "%";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "8": {
      "COUNTER": "VSD 80-100% RPM";
      "READ_AFTER": "39";
      "READ_UNIT": "%";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "9": {
      "COUNTER": "Working pressure";
      "READ_AFTER": "12";
      "READ_UNIT": "bar";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "10": {
      "COUNTER": "Ambient temperature";
      "READ_AFTER": "23";
      "READ_UNIT": "°C";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "11": {
      "COUNTER": "Outlet temperature element 1";
      "READ_AFTER": "80";
      "READ_UNIT": "°C";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "12": {
      "COUNTER": "Motor Current U1";
      "READ_AFTER": "75";
      "READ_UNIT": "A";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "13": {
      "COUNTER": "Motor Current V1";
      "READ_AFTER": "77";
      "READ_UNIT": "A";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "";
    };
    "14": {
      "COUNTER": "Motor Current W1";
      "READ_AFTER": "75";
      "READ_UNIT": "A";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "74";
    };
    "15": {
      "COUNTER": "Fan Starts";
      "READ_AFTER": "11";
      "READ_UNIT": "#";
      "READ_BEFORE": "";
      "READ_LAST_VISIT": "13";
    }
  };
  // -- Authorisation
  "SERV_ENG_CONFIRMATION": {
    "SIGN_NAME": "Leon Rautenbach"
  };
  // FOOTER
  "FOOTER_QUALITY_LOGO": "";
  // 1st row
  "COMPANY_GROUP_NAME": "Atlas Copco Group Center";
  // 2st row
  "COMPANY_LEGAL_NAME": "Atlas Copco AB";
  "COMPANY_PHONE": "+48 (0)8 743 8000";
  "FOOTER_ADDITIONAL_INFO_1": "A Public Company (publ)";
  // 3rd row
  "COMPANY_ADDRESS_1": "SE-105 23 Stockholm";
  "VISITOR_ADDRESS_1": "Sickla Induxtfiväg 19";
  "COMPANY_FAX": "+46 (0)8 644 9045";
  "FOOTER_ADDITIONAL_INFO_2": "Reg. No: 558014-2720";
  // 4th row
  "COMPANY_ADDRESS_2": "Sweden";
  "VISITOR_ADDRESS_2": "Nacka";
  "COMPANY_URL": "www.atlascopco.com";
  "FOOTER_ADDITIONAL_INFO_3": "Reg. Office Nacka";
};
