sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "CustomerStatistics";
	Opa5.createPageObjects({
		onTheCustomerStatisticsPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A vásárlói statisztikák oldal megjelenik.");
						},
						errorMessage: "A vásárlói statisztikák oldal nem található."
					});
				}
			}
		}
	});
});