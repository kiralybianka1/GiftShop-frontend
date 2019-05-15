sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageStrip"
], function (Controller, MessageStrip) {
	"use strict";

	return Controller.extend("Project.Project.controller.Signin", {
		onInit: function () {

		},

		onSigninPress: function (oEvent) {
			//ha sikeres a bejelentkezes
			this.getRouter().navTo("Menu");
			//ha nem sikeres a bejelentkezes
			var signinErrorMessage = this.getView().getModel("i18n").getResourceBundle().getText("SigninErrorMessage");
			var oMs = sap.ui.getCore().byId("msgStrip");
			if (oMs) {
				oMs.setText(signinErrorMessage);
				oMs.setType("Error");
			}
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onCancelPress: function () {
			var cancelMessage = this.getView().getModel("i18n").getResourceBundle().getText("CancelMessage");
			var oMs = sap.ui.getCore().byId("msgStrip");
			if (oMs) {
				oMs.setText(cancelMessage);
				oMs.setType("Warning");
			}
			this.getView().byId("usernameInput").setValue("");
			this.getView().byId("passwordInput").setValue("");
		},

		onHelpPress: function () {
			var oMs = sap.ui.getCore().byId("msgStrip");
			if (oMs) {
				oMs.destroy();
			}
			this._generateMsgStrip();
		},

		_generateMsgStrip: function () {
			var helpMessage = this.getView().getModel("i18n").getResourceBundle().getText("HelpMessage");
			var oVC = this.byId("oVerticalContent"),
				oMsgStrip = new MessageStrip("msgStrip", {
					text: helpMessage,
					showCloseButton: true,
					showIcon: true,
					type: "Information"
				});

			oVC.addContent(oMsgStrip);
		}
	});
});