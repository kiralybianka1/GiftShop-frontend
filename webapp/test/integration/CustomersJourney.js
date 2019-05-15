	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Customers",
		"./pages/Customer"
	], function (opaTest) {
		"use strict";

		QUnit.module("Vásárlók tesztelés");

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Vásárlók' fület. Ez után a vásárlók oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnCustomers();
			
			// Assertions
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});
		
		//SEARCH
		opaTest("A keresés mezőben kereshetek a vásárlók között. (A keresés a vásárló vezeték- vagy keresztnevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iSearchFor("NoSearchResult");

			// Assertions
			Then.onTheCustomersPage.theTableHasZeroItem();
			When.onTheCustomersPage.iSearchFor("");
		});
		
		opaTest("A keresés mezőben kereshetek a vásárlók között. (A keresés a vásárló vezeték- vagy keresztnevére lehetséges.) A 'Bátor' szövegre keresve, 1 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iSearchFor("Bátor");

			// Assertions
			Then.onTheCustomersPage.theTableHasOneItem();
			When.onTheCustomersPage.iSearchFor("");
		});
		
		
		//SORT
		opaTest("A vásárlókat sorba rendezhetem a keresztnevük alapján.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iSortTheListOnFirstName();
			// Assertions
			Then.onTheCustomersPage.theListShouldBeSortedAscendingOnFirstName();
		});
		
		opaTest("A vásárlókat sorba rendezhetem a vezetéknevük alapján.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iSortTheListOnLastName();
			// Assertions
			Then.onTheCustomersPage.theListShouldBeSortedAscendingOnLastName();
		});
		
		opaTest("A vásárlókat sorba rendezhetem az azonosítójuk alapján.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iSortTheListOnCustomerId();
			// Assertions
			Then.onTheCustomersPage.theListShouldBeSortedAscendingOnCustomerId();
		});
		
		//FILTER
		opaTest("A vásárlókat szűrhetem a típusuk alapján. A 'Magánszemély' lehetőséget kiválasztva csak a magánszemély típusú vásárlók jelennek meg.", function(Given, When, Then) {
			// Action
			When.onTheCustomersPage.iFilterTheListOnTypeCivil();

			// Assertion
			Then.onTheCustomersPage.theListShouldBeFilteredOnTypeCivil();
			
			When.onTheCustomersPage.iOpenViewSettingsDialog().
			and.iPressResetInViewSelectionDialog().
			and.iPressOKInViewSelectionDialog();
		});
		
		
		//CUSTOMER PAGE
		opaTest("Rákattinthatok a vásárlókra. Az első pozíción lévő vásárlóra kattintva láthatom annak adatlapját: 'Vásárló adatai'. A 'Vásárló adatainak módosítása' fülre kattintva módosíthatom az adatait. A 'Vásárló megrendelései' fülre kattintva láthatom a megrendeléseit. A vissza nyíl megnyomásával térhetek vissza a vásárlók listájához.", function (Given, When, Then) {
			//Actions
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);

			// Assertions
			Then.onTheCustomerPage.iShouldSeeTheApp();
			//Then.onTheCustomerPage.theTitleShouldDisplayTheName("Bátor Balázs");
			
			
			//Actions
			When.onTheCustomerPage.iPressOnModifyTab().
			and.iPressOnOrdersTab().
			and.iPressOnBack();
			
			// Assertions
			Then.onTheCustomersPage.iShouldSeeTheApp();
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