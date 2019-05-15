sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/actions/Press"
], function (Opa5, Properties, Press) {
	"use strict";
	var sViewName = "Seller";
	Opa5.createPageObjects({
		onTheSellerPage: {

			actions: {
				
				iPressOnModifyTab: function () {
					return this.waitFor({
						id: "idSellerModifyTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az 'Eladó adatainak módosítása' fül nem található az oldalon."
					});
				},
				
				iPressOnProductsTab: function () {
					return this.waitFor({
						id: "idSellerProductsTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az 'Eladó termékei' fül nem található az oldalon."
					});
				},
				
				iPressOnBack: function () {
					return this.waitFor({
						id: "idSellerPage",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az vissza gomb nem található az oldalon."
					});
				}
			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "Az eladó oldal megjelenik.");
						},
						errorMessage: "Az eladó oldal nem található."
					});
				},
				
				theTitleShouldDisplayTheName: function (sName) {
					return this.waitFor({
						success: function () {
							return this.waitFor({
								id: "idSellerPage",
								viewName: sViewName,
								matchers: new Properties({
									title: sName
								}),
								success: function (oPage) {
									Opa5.assert.ok(true, " a megjegyzett oldalon volt.");
								},
								errorMessage: "Az eladó  " + sName + " nem látható."
							});
						}
					});
				}
				
			}
		}
	});

});