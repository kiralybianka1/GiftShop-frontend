sap.ui.define(["sap/ui/test/opaQunit","./pages/Navigation","./pages/Signin","./pages/Menu","./pages/Customers","./pages/Customer"],function(e){"use strict";QUnit.module("Vásárlók tesztelés");e("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Vásárlók' fület. Ez után a vásárlók oldal jelenik meg.",function(e,s,t){e.iStartMyApp();e.onTheSigninPage.iPressOnSignIn();e.onTheMenuPage.iPressOnCustomers();t.onTheCustomersPage.iShouldSeeTheApp()});e("A keresés mezőben kereshetek a vásárlók között. (A keresés a vásárló vezeték- vagy keresztnevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.",function(e,s,t){s.onTheCustomersPage.iSearchFor("NoSearchResult");t.onTheCustomersPage.theTableHasZeroItem();s.onTheCustomersPage.iSearchFor("")});e("A keresés mezőben kereshetek a vásárlók között. (A keresés a vásárló vezeték- vagy keresztnevére lehetséges.) A 'Bátor' szövegre keresve, 1 találatot kapok.",function(e,s,t){s.onTheCustomersPage.iSearchFor("Bátor");t.onTheCustomersPage.theTableHasOneItem();s.onTheCustomersPage.iSearchFor("")});e("A vásárlókat sorba rendezhetem a keresztnevük alapján.",function(e,s,t){s.onTheCustomersPage.iSortTheListOnFirstName();t.onTheCustomersPage.theListShouldBeSortedAscendingOnFirstName()});e("A vásárlókat sorba rendezhetem a vezetéknevük alapján.",function(e,s,t){s.onTheCustomersPage.iSortTheListOnLastName();t.onTheCustomersPage.theListShouldBeSortedAscendingOnLastName()});e("A vásárlókat sorba rendezhetem az azonosítójuk alapján.",function(e,s,t){s.onTheCustomersPage.iSortTheListOnCustomerId();t.onTheCustomersPage.theListShouldBeSortedAscendingOnCustomerId()});e("A vásárlókat szűrhetem a típusuk alapján. A 'Magánszemély' lehetőséget kiválasztva csak a magánszemély típusú vásárlók jelennek meg.",function(e,s,t){s.onTheCustomersPage.iFilterTheListOnTypeCivil();t.onTheCustomersPage.theListShouldBeFilteredOnTypeCivil();s.onTheCustomersPage.iOpenViewSettingsDialog().and.iPressResetInViewSelectionDialog().and.iPressOKInViewSelectionDialog()});e("Rákattinthatok a vásárlókra. Az első pozíción lévő vásárlóra kattintva láthatom annak adatlapját: 'Vásárló adatai'. A 'Vásárló adatainak módosítása' fülre kattintva módosíthatom az adatait. A 'Vásárló megrendelései' fülre kattintva láthatom a megrendeléseit. A vissza nyíl megnyomásával térhetek vissza a vásárlók listájához.",function(e,s,t){s.onTheCustomersPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);t.onTheCustomerPage.iShouldSeeTheApp();s.onTheCustomerPage.iPressOnModifyTab().and.iPressOnOrdersTab().and.iPressOnBack();t.onTheCustomersPage.iShouldSeeTheApp()});e("Kijelentkezhetek.",function(e,s,t){s.onTheMenuPage.iPressOnSignOut();t.onTheAppPage.iShouldSeeTheApp();t.iTeardownMyApp()})});