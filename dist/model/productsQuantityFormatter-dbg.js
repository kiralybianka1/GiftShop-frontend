sap.ui.define(function() {
	"use strict";

	var Formatter = {

		quantityState :  function (fValue) {
			try {
				if (parseFloat(fValue) <= 50) {
					return "Error";
				} else if (parseFloat(fValue) <= 100) {
					return "Critical";//return "Warning";
				} else if (parseFloat(fValue) > 100) {
					return "Good";//return "Success";
				} else {
					return "Error";
				}
			} catch (err) {
				return "None";
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);