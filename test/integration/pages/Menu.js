sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";
	var sViewName = "Menu";
	Opa5.createPageObjects({
		onTheMenuPage: {

			actions: {
				iPressOnSignOut: function () {
					return this.waitFor({
						id: "idSignOut",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A kijelentkezés gomb nem található az aktuális oldalon."
					});
				},
				iPressOnHome: function () {
					return this.waitFor({
						id: "idHome",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Kezdőlap' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnProducts: function () {
					return this.waitFor({
						id: "idProducts",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Termékek' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnCustomers: function () {
					return this.waitFor({
						id: "idCustomers",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Vásárlók' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnSellers: function () {
					return this.waitFor({
						id: "idSellers",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az 'Eladók' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnOrders: function () {
					return this.waitFor({
						id: "idOrders",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Megrendelések' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnBills: function () {
					return this.waitFor({
						id: "idBills",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Számlák' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnStatistics: function () {
					return this.waitFor({
						id: "idStatistics",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Statisztikák' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnCustomerStatistics: function () {
					return this.waitFor({
						id: "idCustomerStatistics",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Vásárlói statisztikák' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnBillsStatistics: function () {
					return this.waitFor({
						id: "idBillsStatistics",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Pénzügyi statisztikák' gomb nem található az aktuális oldalon."
					});
				},
				iPressOnOther: function () {
					return this.waitFor({
						id: "idOther",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az 'Egyéb' gomb nem található az aktuális oldalon."
					});
				}
			},

			assertions: {
				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "Az menü megjelenik.");
						},
						errorMessage: "A menü nem található."
					});
				}
			}
		}
	});

});