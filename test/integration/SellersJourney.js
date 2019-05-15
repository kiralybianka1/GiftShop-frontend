	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Sellers",
		"./pages/Seller"
	], function (opaTest) {
		"use strict";

		QUnit.module("Eladók tesztelés");

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom az 'Eladók' fület. Ez után az eladók oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnSellers();
			
			// Assertions
			Then.onTheSellersPage.iShouldSeeTheApp();
		});
		
		//SEARCH
		opaTest("A keresés mezőben kereshetek az eladók között. (A keresés az eladó nevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheSellersPage.iSearchFor("NoSearchResult");

			// Assertions
			Then.onTheSellersPage.theTableHasZeroItem();
			When.onTheSellersPage.iSearchFor("");
		});
		
		opaTest("A keresés mezőben kereshetek az eladók között. (A keresés az eladó nevére lehetséges.) A 'Home Decor' szövegre keresve, 1 találatot kapok.", function (Given, When, Then) {
			//Actions
			When.onTheSellersPage.iSearchFor("Home Decor");

			// Assertions
			Then.onTheSellersPage.theTableHasOneItem();
			When.onTheSellersPage.iSearchFor("");
		});
		
		
		//SORT
		opaTest("Az eladókat sorba rendezhetem a nevük alapján.", function (Given, When, Then) {
			//Actions
			When.onTheSellersPage.iSortTheListOnName();
			// Assertions
			Then.onTheSellersPage.theListShouldBeSortedAscendingOnName();
		});
		
		opaTest("Az eladókat sorba rendezhetem az azonosítójuk alapján.", function (Given, When, Then) {
			//Actions
			When.onTheSellersPage.iSortTheListOnSellerId();
			// Assertions
			Then.onTheSellersPage.theListShouldBeSortedAscendingOnSellerId();
		});
		
				
		
		//Seller PAGE
		opaTest("Rákattinthatok az eladókra. Az első pozíción lévő eladóra kattintva láthatom annak adatlapját: 'Eladó adatai'. Az 'Eladó adatainak módosítása' fülre kattintva módosíthatom az adatait. A 'Eladó termékei' fülre kattintva láthatom a termékeit. A vissza nyíl megnyomásával térhetek vissza az eladók listájához.", function (Given, When, Then) {
			//Actions
			When.onTheSellersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);

			// Assertions
			Then.onTheSellerPage.iShouldSeeTheApp();
			
			
			//Actions
			When.onTheSellerPage.iPressOnModifyTab().
			and.iPressOnProductsTab().
			and.iPressOnBack();
			
			// Assertions
			Then.onTheSellersPage.iShouldSeeTheApp();
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