sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Project.Project.controller.Statistics", {
		onInit: function () {},

		onCustomerStatPress: function (oEvent) {
			this.getRouter().navTo("CustomerStatistics");
		},

		onBillsStatPress: function (oEvent) {
			this.getRouter().navTo("BillsStatistics");
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});
});