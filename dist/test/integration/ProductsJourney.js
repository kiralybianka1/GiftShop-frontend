sap.ui.define(["sap/ui/test/opaQunit","./pages/Navigation","./pages/Signin","./pages/Menu","./pages/Products","./pages/Product"],function(e){"use strict";QUnit.module("Termékek tesztelés");e("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Termékek' fület. Ez után a termékek oldal jelenik meg.",function(e,t,a){e.iStartMyApp();e.onTheSigninPage.iPressOnSignIn();e.onTheMenuPage.iPressOnProducts();a.onTheProductsPage.iShouldSeeTheApp()});e("A letöltés gombra kattintva elindul a termékek táblázatának letöltése.",function(e,t,a){t.onTheProductsPage.iPressOnExport();a.onTheProductsPage.iShouldSeeTheApp()});e("A keresés mezőben kereshetek a termékek között. (A keresés a termék nevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.",function(e,t,a){t.onTheProductsPage.iSearchFor("NoSearchResult");a.onTheProductsPage.theTableHasZeroItem();t.onTheProductsPage.iSearchFor("")});e("A keresés mezőben kereshetek a termékek között. (A keresés a termék nevére lehetséges.) A 'Barbie család' szövegre keresve, 1 találatot kapok.",function(e,t,a){t.onTheProductsPage.iSearchFor("Barbie család");a.onTheProductsPage.theTableHasOneItem();t.onTheProductsPage.iSearchFor("")});e("A termékeket sorba rendezhetem a nevük alapján.",function(e,t,a){t.onTheProductsPage.iSortTheListOnName();a.onTheProductsPage.theListShouldBeSortedAscendingOnName()});e("A termékeket sorba rendezhetem a nettó áruk alapján.",function(e,t,a){t.onTheProductsPage.iSortTheListOnNetPrice();a.onTheProductsPage.theListShouldBeSortedAscendingOnNetPrice()});e("A termékeket sorba rendezhetem a mennyiségük alapján.",function(e,t,a){t.onTheProductsPage.iSortTheListOnQuantity();a.onTheProductsPage.theListShouldBeSortedAscendingOnQuantity()});e("A termékeket szűrhetem a kategóriájuk alapján. A 'Játék' lehetőséget kiválasztva csak a játék kategóriájú termékek jelennek meg.",function(e,t,a){t.onTheProductsPage.iFilterTheListOnCategoryGame();a.onTheProductsPage.theListShouldBeFilteredOnCategoryGame();t.onTheProductsPage.iOpenViewSettingsDialog().and.iPressResetInViewSelectionDialog().and.iPressOKInViewSelectionDialog()});e("Az első pozíción lévő termékre kattintva láthatom annak adatlapját: 'Termék információk'. A 'Termék adatainak módosítása' fülre kattintva módosíthatom az adatait. A vissza nyíl megnyomásával térhetek vissza a termékek listájához.",function(e,t,a){t.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);a.onTheProductPage.iShouldSeeTheApp();t.onTheProductPage.iPressOnModifyTab().and.iPressOnBack();a.onTheProductsPage.iShouldSeeTheApp()});e("Kijelentkezhetek.",function(e,t,a){t.onTheMenuPage.iPressOnSignOut();a.onTheAppPage.iShouldSeeTheApp();a.iTeardownMyApp()})});