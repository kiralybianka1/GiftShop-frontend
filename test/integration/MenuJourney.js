	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Home",
		"./pages/Products",
		"./pages/Customers",
		"./pages/Sellers",
		"./pages/Orders",
		"./pages/Bills",
		"./pages/Statistics",
		"./pages/CustomerStatistics",
		"./pages/BillsStatistics",
		"./pages/Other"
	], function (opaTest) {
		"use strict";

		QUnit.module("Menü tesztelés");
		
		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			
			// Assertions
			Then.onTheMenuPage.iShouldSeeTheApp();
		});
		
		opaTest("A 'Termékek' menüpontot kiválasztva a termékek oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnProducts();

			// Assertions
			Then.onTheProductsPage.iShouldSeeTheApp();
		});

		opaTest("A 'Vásárlók' menüpontot kiválasztva a vásárlók oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnCustomers();

			// Assertions
			Then.onTheCustomersPage.iShouldSeeTheApp();

		});

		opaTest("Az 'Eladók' menüpontot kiválasztva az eladók oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnSellers();

			// Assertions
			Then.onTheSellersPage.iShouldSeeTheApp();
		});

		opaTest("A 'Megrendelések' menüpontot kiválasztva a megrendelések oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnOrders();

			// Assertions
			Then.onTheOrdersPage.iShouldSeeTheApp();
		});


		opaTest("A 'Számlák' menüpontot kiválasztva a számlák oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnBills();

			// Assertions
			Then.onTheBillsPage.iShouldSeeTheApp();
		});

		opaTest("A 'Statisztikák' menüpontot kiválasztva a statisztikák oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnStatistics();

			// Assertions
			Then.onTheStatisticsPage.iShouldSeeTheApp();
		});

		opaTest("A 'Statisztikák' menüpont alatt a 'Vásárlói' fület kiválasztva a vásárlói statisztikák oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnCustomerStatistics();

			// Assertions
			Then.onTheCustomerStatisticsPage.iShouldSeeTheApp();
		});

		opaTest("A 'Statisztikák' menüpont alatt a 'Pénzügyi' fület kiválasztva a pénzügyi statisztikák oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnBillsStatistics();

			// Assertions
			Then.onTheBillsStatisticsPage.iShouldSeeTheApp();
		});

		opaTest("Az 'Egyéb' menüpontot kiválasztva az egyéb oldal jelenik meg.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnOther();

			// Assertions
			Then.onTheOtherPage.iShouldSeeTheApp();
		});
		
		opaTest("Kijelentkezhetek.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnSignOut();

			// Assertions
			Then.onTheAppPage.iShouldSeeTheApp();

			// Cleanup
			Then.iTeardownMyApp();
		});	

	});