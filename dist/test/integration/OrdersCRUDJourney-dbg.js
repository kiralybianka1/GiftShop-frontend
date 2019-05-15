	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Orders"
	], function (opaTest) {
		"use strict";

		QUnit.module("Megrendelések tesztelés");

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Megrendelések' fület. Ez után a megrendelések oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnOrders();
			
			// Assertions
			Then.onTheOrdersPage.iShouldSeeTheApp();
		});
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltése nem megengedett. Első lépésként a vásárló kiválasztása kötelező. Amíg nincs kiválasztva vásárló addig nem lehetséges a továbblépés. Második lépés a termék(ek) hozzáadása. Amíg nincs kiválasztva termék addig nem lehetséges a továbblépés. A raktáron lévőnél nagyobb mennyiség megadása sem lehetséges." +
				"[Vásárló azon.:1, Termék azon.:1,2,3 Mennyiség:1]", function (Given, When, Then) {
			When.onTheOrdersPage.iPressOnNewTab();
			
			When.onTheOrdersPage.iSelectCustomerToAdd("1");
			When.onTheOrdersPage.iPressOnNextButton();
			When.onTheOrdersPage.iSelectProductToAdd("1");
			When.onTheOrdersPage.iPressOnAddProduct();
			When.onTheOrdersPage.iSelectProductToAdd("2");
			When.onTheOrdersPage.iPressOnAddProduct();
			When.onTheOrdersPage.iSelectProductToAdd("3");
			When.onTheOrdersPage.iPressOnAddProduct();
			When.onTheOrdersPage.iPressOnNextButton();
			When.onTheOrdersPage.iPressOnNextButton();
			When.onTheOrdersPage.iPressOnConfirm();
			When.onTheOrdersPage.iShouldPressSuccessTheMessageBoxClose();
			
			When.onTheOrdersPage.iPressOnListTab();
			
			Then.onTheOrdersPage.iShouldSeeTheApp();
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