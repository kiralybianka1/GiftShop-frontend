sap.ui.define(function () {
	"use strict";

	var Formatter = {

		fulfillState: function (fValue) {
			try {
				if (fValue === null) {
					return "High";
				} else {
					return "Low";
				}
			} catch (err) {
				return "None";
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);