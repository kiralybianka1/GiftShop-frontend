sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "Other";
	Opa5.createPageObjects({
		onTheOtherPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "Az egyéb oldal megjelenik.");
						},
						errorMessage: "Az egyéb oldal nem található."
					});
				}
			}
		}
	});

});