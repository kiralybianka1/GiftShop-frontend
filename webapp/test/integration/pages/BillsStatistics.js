sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "BillsStatistics";
	Opa5.createPageObjects({
		onTheBillsStatisticsPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A pénzügyi statisztikák oldal megjelenik.");
						},
						errorMessage: "A pénzügyi statisztikák oldal nem található."
					});
				}
			}
		}
	});
});