sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "Statistics";
	Opa5.createPageObjects({
		onTheStatisticsPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A statisztikák oldal megjelenik.");
						},
						errorMessage: "A statisztikák oldal nem található."
					});
				}
			}
		}
	});
});