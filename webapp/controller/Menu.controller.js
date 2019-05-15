sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/f/library"
], function (Controller, fioriLibrary) {
	"use strict";

	return Controller.extend("Project.Project.controller.Menu", {
		onInit: function () {

		},

		//MENU VISIBILITY
		onCollapseExpandPress: function () {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--idAppControl2");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		//HELP
		onHelpPress: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (!this.resizableDialog) {
				this.resizableDialog = new sap.m.Dialog({
					title: i18n.getText("ThemeSettingsTitle"),
					contentWidth: "300px",
					contentHeight: "100px",
					id: "TehemeSettings",
					content: [
						new sap.m.RadioButton({
							groupName: "GroupA",
							text: i18n.getText("ThemeHCB"),
							select: function () {
								sap.ui.getCore().applyTheme("sap_hcb");
							}
						}),
						new sap.m.RadioButton({
							groupName: "GroupA",
							text: i18n.getText("ThemeNormal"),
							select: function () {
								sap.ui.getCore().applyTheme("sap_belize");

							},
							selected: true
						})
					],
					endButton: new sap.m.Button({
						id: "idCloseHelp",
						text: i18n.getText("Close"),
						press: function () {
							this.resizableDialog.close();
						}.bind(this)
					})
				});
				this.getView().addDependent(this.resizableDialog);
			}
			this.resizableDialog.open();
		},

		//NAVIGATION
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onSignoutPress: function () {
			this.getRouter().navTo("Signin");
		},

		goHomeRoute: function (oEvent) {
			this.getRouter().navTo("Home");
		},

		goProductsRoute: function (oEvent) {
			this.getRouter().navTo("Products");
		},

		goCustomersRoute: function (oEvent) {
			this.getRouter().navTo("Customers");
		},

		goSellersRoute: function (oEvent) {
			this.getRouter().navTo("Sellers");
		},

		goOrdersRoute: function (oEvent) {
			this.getRouter().navTo("Orders");
		},

		goBillsRoute: function (oEvent) {
			this.getRouter().navTo("Bills");
		},

		goStatisticsRoute: function (oEvent) {
			this.getRouter().navTo("Statistics");
		},

		goCustomerStatisticsRoute: function (oEvent) {
			this.getRouter().navTo("CustomerStatistics");
		},

		goBillsStatisticsRoute: function (oEvent) {
			this.getRouter().navTo("BillsStatistics");
		},

		goOtherRoute: function (oEvent) {
			this.getRouter().navTo("Other");
		}

	});
});