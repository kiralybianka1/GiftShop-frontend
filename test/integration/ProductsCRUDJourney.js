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

		QUnit.module("Termék (műveletek) tesztelés");	

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Termékek' fület. Ez után a termékek oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnProducts();
			
			// Assertions
			Then.onTheProductsPage.iShouldSeeTheApp();
		});
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott mezők: " +
				"[Név:Test name, Leírás:, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("");
			When.onTheProductsPage.iAddTheNetPrice(5000);
			When.onTheProductsPage.iAddTheQuantity(50);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): " +
				"[Név:Test name, Leírás:Test description, Nettó ár: -10, Mennyiség: 50, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(-10);
			When.onTheProductsPage.iAddTheQuantity(50);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): " +
				"[Név:Test name, Leírás:Test description, Nettó ár: 500000, Mennyiség: 50, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(500000);
			When.onTheProductsPage.iAddTheQuantity(50);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): " +
				"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: -10, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(5000);
			When.onTheProductsPage.iAddTheQuantity(-10);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve  (nem 0-100000 közé esik): " +
				"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 500000, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(5000);
			When.onTheProductsPage.iAddTheQuantity(500000);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A raktári azonosító helytelen kitöltése (nem 7 karakter hosszú): " +
				"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 123456]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(5000);
			When.onTheProductsPage.iAddTheQuantity(50);
			When.onTheProductsPage.iAddTheStockId("123456")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();
			
			When.onTheProductsPage.iShouldPressTheMessageBoxClose();
			When.onTheProductsPage.iPressOnAddProductClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres hozzáadás üzenetet kell látnom. " +
				"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 1234567]", function (Given, When, Then) {
			When.onTheProductsPage.iPressOnAddProduct();
			When.onTheProductsPage.iAddTheName("A Test name");
			When.onTheProductsPage.iAddTheDescription("A Test description");
			When.onTheProductsPage.iAddTheNetPrice(5000);
			When.onTheProductsPage.iAddTheQuantity(50);
			When.onTheProductsPage.iAddTheStockId("1234567")
			When.onTheProductsPage.iPressOnConfirmAdd();

			Then.onTheProductsPage.iShouldSeeTheSuccessAddProductDialog();
			
			When.onTheProductsPage.iShouldPressSuccessTheMessageBoxClose();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott mezők: " +
				"[Név:]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheName("");
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): " +
				"[Nettó ár: -10]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheNetPrice(-10);
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban  hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): " +
				"[Nettó ár: 500000]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheNetPrice(500000);
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): " +
				"[Mennyiség: -10]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheQuantity(-10);
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): " +
				"[Mennyiség: 500000]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheQuantity(500000);
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A raktári azonosító helytelen kitöltése (nem 7 karakter hosszú): " +
				"[Raktári azon.: 123456]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheStockId("123456");
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();
			
			When.onTheProductPage.iShouldPressTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres módosítás üzenetet kell látnom. " +
				"[Név:Test name modify, Leírás:Test description modify, Nettó ár: 6000, Mennyiség: 60, Raktári azon.: 1234568]", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnModifyTab();
			
			Then.onTheProductPage.iShouldSeeTheApp();
			
			When.onTheProductPage.iModifyTheName("A Test name modify");
			When.onTheProductPage.iModifyTheDescription("Test description modify");
			When.onTheProductPage.iModifyTheNetPrice(6000);
			When.onTheProductPage.iModifyTheQuantity(60);
			When.onTheProductPage.iModifyTheStockId("1234568")
			When.onTheProductPage.iPressOnModifyProduct();
			
			Then.onTheProductPage.iShouldSeeTheSuccessModifyProductDialog();
			
			When.onTheProductPage.iShouldPressSuccessTheMessageBoxClose();
			When.onTheProductPage.iPressOnInfoTab();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
			
			//Then.onTheProductPage.iShouldSeeTheApp();
		});	
		
		opaTest("TÖRLÉS:A törlés nem megengedett, ha egy vagy annál több megrendelésben szereplő termékről van szó. Ekkor a felugró ablakban hibaüzenetet kell látnunk.", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(2).
			and.iPressATableItemAtPosition(2);
			When.onTheProductPage.iPressOnDelete();
			//When.onTheProductPage.iConfirmTheDelete();
			
			Then.onTheProductPage.iShouldSeeTheErrorDeleteProductDialog();
			
			When.onTheProductPage.iShouldPressTheDeleteErrorMessageBoxClose();
			When.onTheProductPage.iPressOnBack();
			
			Then.onTheProductsPage.iShouldSeeTheApp();
		});	
		
		opaTest("TÖRLÉS:A törlés akkor megengedett, ha megrendelésben nem szereplő termékről van szó.", function (Given, When, Then) {
			When.onTheProductsPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheProductPage.iPressOnDelete();
			When.onTheProductPage.iConfirmTheDelete();
			When.onTheProductPage.iPressOnBack();
			
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