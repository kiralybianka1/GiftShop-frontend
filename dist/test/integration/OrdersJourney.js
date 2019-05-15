sap.ui.define(["sap/ui/test/opaQunit","./pages/Navigation","./pages/Signin","./pages/Menu","./pages/Orders"],function(e){"use strict";QUnit.module("Megrendelések tesztelés");e("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Megrendelések' fület. Ez után a megrendelések oldal jelenik meg.",function(e,n,s){e.iStartMyApp();e.onTheSigninPage.iPressOnSignIn();e.onTheMenuPage.iPressOnOrders();s.onTheOrdersPage.iShouldSeeTheApp()});e("A keresés mezőben kereshetek a megrendelések között. (A keresés a megrendelő vezeték- vagy keresztnevére lehetséges.) A 'NoSearchResult' szövegre keresve, 0 találatot kapok.",function(e,n,s){n.onTheOrdersPage.iSearchFor("NoSearchResult");s.onTheOrdersPage.theTableHasZeroItem();n.onTheOrdersPage.iSearchFor("")});e("A keresés mezőben kereshetek a megrendelések között. (A keresés a megrendelő vezeték- vagy keresztnevére lehetséges.) A 'Kovácsné' szövegre keresve, 1 találatot kapok.",function(e,n,s){n.onTheOrdersPage.iSearchFor("Kovácsné");s.onTheOrdersPage.theTableHasOneItem();n.onTheOrdersPage.iSearchFor("")});e("A megrendeléseket sorba rendezhetem az azonosítójuk alapján.",function(e,n,s){n.onTheOrdersPage.iSortTheListOnOrderId();s.onTheOrdersPage.theListShouldBeSortedAscendingOnOrderId()});e("A megrendeléseket sorba rendezhetem a megrendelő keresztneve alapján.",function(e,n,s){n.onTheOrdersPage.iSortTheListOnFirstName();s.onTheOrdersPage.theListShouldBeSortedAscendingOnFirstName()});e("A megrendeléseket sorba rendezhetem a megrendelő vezetékneve alapján.",function(e,n,s){n.onTheOrdersPage.iSortTheListOnLastName();s.onTheOrdersPage.theListShouldBeSortedAscendingOnLastName()});e("A megrendeléseket szűrhetem a megrendelés teljesítettsége alapján. A 'Nem teljesített' lehetőséget kiválasztva csak a még nem teljesített megrendelések jelennek meg.",function(e,n,s){n.onTheOrdersPage.iFilterTheListOnFulfillment();s.onTheOrdersPage.theListShouldBeFilteredOnFulfillment();n.onTheOrdersPage.iOpenViewSettingsDialog().and.iPressResetInViewSelectionDialog().and.iPressOKInViewSelectionDialog()});e("A megrendelések oldalon átkattinthatok az 'Új megrendelés hozzáadása' fülre.",function(e,n,s){n.onTheOrdersPage.iPressOnNewTab();s.onTheOrdersPage.iShouldSeeTheApp();n.onTheOrdersPage.iPressOnListTab()});e("Kijelentkezhetek.",function(e,n,s){n.onTheMenuPage.iPressOnSignOut();s.onTheAppPage.iShouldSeeTheApp();s.iTeardownMyApp()})});