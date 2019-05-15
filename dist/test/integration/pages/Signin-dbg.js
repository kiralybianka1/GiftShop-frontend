sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";
	var sViewName = "Signin";
	Opa5.createPageObjects({
		onTheSigninPage: {

			actions: {
				iPressOnSignIn: function () {}
			},

			assertions: {
				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A bejelentkezés oldal megjelenik.");
						},
						errorMessage: "A bejelentkezés oldal nem található."
					});
				}
			}
		}
	});

});