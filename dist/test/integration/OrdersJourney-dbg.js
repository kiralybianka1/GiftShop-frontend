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
		
		//SEARCH
		opaTest("A keresés mezőben kereshetek a megrendelések között. (A keresés a megrendelő vezeték- vagy keresztnevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iSearchFor("NoSearchResult");

			// Assertions
			Then.onTheOrdersPage.theTableHasZeroItem();
			When.onTheOrdersPage.iSearchFor("");
		});
		
		opaTest("A keresés mezőben kereshetek a megrendelések között. (A keresés a megrendelő vezeték- vagy keresztnevére lehetséges.) A 'Kovácsné' szövegre keresve, 1 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iSearchFor("Kovácsné");

			// Assertions
			Then.onTheOrdersPage.theTableHasOneItem();
			When.onTheOrdersPage.iSearchFor("");
		});
		
		//SORT
		opaTest("A megrendeléseket sorba rendezhetem az azonosítójuk alapján.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iSortTheListOnOrderId();
			// Assertions
			Then.onTheOrdersPage.theListShouldBeSortedAscendingOnOrderId();
		});
		
		opaTest("A megrendeléseket sorba rendezhetem a megrendelő keresztneve alapján.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iSortTheListOnFirstName();
			// Assertions
			Then.onTheOrdersPage.theListShouldBeSortedAscendingOnFirstName();
		});
		
		opaTest("A megrendeléseket sorba rendezhetem a megrendelő vezetékneve alapján.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iSortTheListOnLastName();
			// Assertions
			Then.onTheOrdersPage.theListShouldBeSortedAscendingOnLastName();
		});
		
		//FILTER
		opaTest("A megrendeléseket szűrhetem a megrendelés teljesítettsége alapján. A 'Nem teljesített' lehetőséget kiválasztva csak a még nem teljesített megrendelések jelennek meg.", function(Given, When, Then) {
			// Action
			When.onTheOrdersPage.iFilterTheListOnFulfillment();

			// Assertion
			Then.onTheOrdersPage.theListShouldBeFilteredOnFulfillment();
			
			When.onTheOrdersPage.iOpenViewSettingsDialog().
			and.iPressResetInViewSelectionDialog().
			and.iPressOKInViewSelectionDialog();
		});
		
		
		//NEW TAB
		opaTest("A megrendelések oldalon átkattinthatok az 'Új megrendelés hozzáadása' fülre.", function (Given, When, Then) {
			//Actions
			When.onTheOrdersPage.iPressOnNewTab();

			// Assertions
			Then.onTheOrdersPage.iShouldSeeTheApp();
			When.onTheOrdersPage.iPressOnListTab();
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