sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "Home";
	Opa5.createPageObjects({
		onTheHomePage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A kezdőlap megjelenik.");
						},
						errorMessage: "A kezdőlap oldal nem található."
					});
				}
			}
		}
	});

});