sap.ui.define(["sap/ui/test/opaQunit","./pages/Navigation","./pages/Signin","./pages/Menu","./pages/Home","./pages/Products","./pages/Customers","./pages/Sellers","./pages/Orders","./pages/Bills","./pages/Statistics","./pages/CustomerStatistics","./pages/BillsStatistics","./pages/Other"],function(e){"use strict";QUnit.module("Menü tesztelés");e("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem.",function(e,t,n){e.iStartMyApp();e.onTheSigninPage.iPressOnSignIn();n.onTheMenuPage.iShouldSeeTheApp()});e("A 'Termékek' menüpontot kiválasztva a termékek oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnProducts();n.onTheProductsPage.iShouldSeeTheApp()});e("A 'Vásárlók' menüpontot kiválasztva a vásárlók oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnCustomers();n.onTheCustomersPage.iShouldSeeTheApp()});e("Az 'Eladók' menüpontot kiválasztva az eladók oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnSellers();n.onTheSellersPage.iShouldSeeTheApp()});e("A 'Megrendelések' menüpontot kiválasztva a megrendelések oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnOrders();n.onTheOrdersPage.iShouldSeeTheApp()});e("A 'Számlák' menüpontot kiválasztva a számlák oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnBills();n.onTheBillsPage.iShouldSeeTheApp()});e("A 'Statisztikák' menüpontot kiválasztva a statisztikák oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnStatistics();n.onTheStatisticsPage.iShouldSeeTheApp()});e("A 'Statisztikák' menüpont alatt a 'Vásárlói' fület kiválasztva a vásárlói statisztikák oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnCustomerStatistics();n.onTheCustomerStatisticsPage.iShouldSeeTheApp()});e("A 'Statisztikák' menüpont alatt a 'Pénzügyi' fület kiválasztva a pénzügyi statisztikák oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnBillsStatistics();n.onTheBillsStatisticsPage.iShouldSeeTheApp()});e("Az 'Egyéb' menüpontot kiválasztva az egyéb oldal jelenik meg.",function(e,t,n){t.onTheMenuPage.iPressOnOther();n.onTheOtherPage.iShouldSeeTheApp()});e("Kijelentkezhetek.",function(e,t,n){t.onTheMenuPage.iPressOnSignOut();n.onTheAppPage.iShouldSeeTheApp();n.iTeardownMyApp()})});