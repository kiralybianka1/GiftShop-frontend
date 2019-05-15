	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Products",
		"./pages/Product"
	], function (opaTest) {
		"use strict";

		QUnit.module("Termékek tesztelés");	

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Termékek' fület. Ez után a termékek oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnProducts();
			
			// Assertions
			Then.onTheProductsPage.iShouldSeeTheApp();
		});
		
		//EXPORT
		opaTest("A letöltés gombra kattintva elindul a termékek táblázatának letöltése.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iPressOnExport();

			// Assertions
			Then.onTheProductsPage.iShouldSeeTheApp();
		});
		
		//SEARCH
		opaTest("A keresés mezőben kereshetek a termékek között. (A keresés a termék nevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iSearchFor("NoSearchResult");

			// Assertions
			Then.onTheProductsPage.theTableHasZeroItem();
			When.onTheProductsPage.iSearchFor("");
		});
		
		opaTest("A keresés mezőben kereshetek a termékek között. (A keresés a termék nevére lehetséges.) A 'Barbie család' szövegre keresve, 1 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iSearchFor("Barbie család");

			// Assertions
			Then.onTheProductsPage.theTableHasOneItem();
			When.onTheProductsPage.iSearchFor("");
		});
		
		//SORT
		opaTest("A termékeket sorba rendezhetem a nevük alapján.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iSortTheListOnName();
			// Assertions
			Then.onTheProductsPage.theListShouldBeSortedAscendingOnName();
		});
		
		opaTest("A termékeket sorba rendezhetem a nettó áruk alapján.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iSortTheListOnNetPrice();
			// Assertions
			Then.onTheProductsPage.theListShouldBeSortedAscendingOnNetPrice();
		});
		
		opaTest("A termékeket sorba rendezhetem a mennyiségük alapján.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iSortTheListOnQuantity();
			// Assertions
			Then.onTheProductsPage.theListShouldBeSortedAscendingOnQuantity();
		});
		
		//FILTER
		opaTest("A termékeket szűrhetem a kategóriájuk alapján. A 'Játék' lehetőséget kiválasztva csak a játék kategóriájú termékek jelennek meg.", function(Given, When, Then) {
			// Action
			When.onTheProductsPage.iFilterTheListOnCategoryGame();

			// Assertion
			Then.onTheProductsPage.theListShouldBeFilteredOnCategoryGame();
			When.onTheProductsPage.iOpenViewSettingsDialog().
			and.iPressResetInViewSelectionDialog().
			and.iPressOKInViewSelectionDialog();
			
		});
		
		//PRODUCT PAGE
		opaTest("Az első pozíción lévő termékre kattintva láthatom annak adatlapját: 'Termék információk'. A 'Termék adatainak módosítása' fülre kattintva módosíthatom az adatait. A vissza nyíl megnyomásával térhetek vissza a termékek listájához.", function (Given, When, Then) {
			//Actions
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);

			// Assertions
			Then.onTheProductPage.iShouldSeeTheApp();
			//Then.onTheProductPage.theTitleShouldDisplayTheName("Barbie család");
			
			
			//Actions
			When.onTheProductPage.iPressOnModifyTab().
			and.iPressOnBack();
			
			// Assertions
			Then.onTheProductsPage.iShouldSeeTheApp();
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