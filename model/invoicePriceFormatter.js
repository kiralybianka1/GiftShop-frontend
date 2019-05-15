sap.ui.define(function () {
	"use strict";

	var Formatter = {

		invoicePrice: function (fValue, fQuantity) {
			return fValue * fQuantity;
		}
	};

	return Formatter;

}, /* bExport= */ true);