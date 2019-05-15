sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "Bills";
	Opa5.createPageObjects({
		onTheBillsPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A számlák oldal megjelenik.");
						},
						errorMessage: "A számlák oldal nem található."
					});
				}
			}
		}
	});
});