sap.ui.define(["sap/ui/test/opaQunit","./pages/Navigation","./pages/Signin","./pages/Menu","./pages/Products","./pages/Product"],function(e){"use strict";QUnit.module("Termék (műveletek) tesztelés");e("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Termékek' fület. Ez után a termékek oldal jelenik meg.",function(e,o,t){e.iStartMyApp();e.onTheSigninPage.iPressOnSignIn();e.onTheMenuPage.iPressOnProducts();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott mezők: "+"[Név:Test name, Leírás:, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("");o.onTheProductsPage.iAddTheNetPrice(5e3);o.onTheProductsPage.iAddTheQuantity(50);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): "+"[Név:Test name, Leírás:Test description, Nettó ár: -10, Mennyiség: 50, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(-10);o.onTheProductsPage.iAddTheQuantity(50);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): "+"[Név:Test name, Leírás:Test description, Nettó ár: 500000, Mennyiség: 50, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(5e5);o.onTheProductsPage.iAddTheQuantity(50);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): "+"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: -10, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(5e3);o.onTheProductsPage.iAddTheQuantity(-10);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve  (nem 0-100000 közé esik): "+"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 500000, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(5e3);o.onTheProductsPage.iAddTheQuantity(5e5);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A raktári azonosító helytelen kitöltése (nem 7 karakter hosszú): "+"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 123456]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(5e3);o.onTheProductsPage.iAddTheQuantity(50);o.onTheProductsPage.iAddTheStockId("123456");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheErrorAddProductDialog();o.onTheProductsPage.iShouldPressTheMessageBoxClose();o.onTheProductsPage.iPressOnAddProductClose();t.onTheProductsPage.iShouldSeeTheApp()});e("HOZZÁADÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres hozzáadás üzenetet kell látnom. "+"[Név:Test name, Leírás:Test description, Nettó ár: 5000, Mennyiség: 50, Raktári azon.: 1234567]",function(e,o,t){o.onTheProductsPage.iPressOnAddProduct();o.onTheProductsPage.iAddTheName("A Test name");o.onTheProductsPage.iAddTheDescription("A Test description");o.onTheProductsPage.iAddTheNetPrice(5e3);o.onTheProductsPage.iAddTheQuantity(50);o.onTheProductsPage.iAddTheStockId("1234567");o.onTheProductsPage.iPressOnConfirmAdd();t.onTheProductsPage.iShouldSeeTheSuccessAddProductDialog();o.onTheProductsPage.iShouldPressSuccessTheMessageBoxClose();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott mezők: "+"[Név:]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheName("");o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): "+"[Nettó ár: -10]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheNetPrice(-10);o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban  hibaüzenetet kell látnom. A nettó ár helytelenül van kitöltve  (nem 1-100000 közé esik): "+"[Nettó ár: 500000]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheNetPrice(5e5);o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): "+"[Mennyiség: -10]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheQuantity(-10);o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A mennyiség helytelenül van kitöltve (nem 0-100000 közé esik): "+"[Mennyiség: 500000]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheQuantity(5e5);o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A raktári azonosító helytelen kitöltése (nem 7 karakter hosszú): "+"[Raktári azon.: 123456]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheStockId("123456");o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheErrorModifyProductDialog();o.onTheProductPage.iShouldPressTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("MÓDOSÍTÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres módosítás üzenetet kell látnom. "+"[Név:Test name modify, Leírás:Test description modify, Nettó ár: 6000, Mennyiség: 60, Raktári azon.: 1234568]",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnModifyTab();t.onTheProductPage.iShouldSeeTheApp();o.onTheProductPage.iModifyTheName("A Test name modify");o.onTheProductPage.iModifyTheDescription("Test description modify");o.onTheProductPage.iModifyTheNetPrice(6e3);o.onTheProductPage.iModifyTheQuantity(60);o.onTheProductPage.iModifyTheStockId("1234568");o.onTheProductPage.iPressOnModifyProduct();t.onTheProductPage.iShouldSeeTheSuccessModifyProductDialog();o.onTheProductPage.iShouldPressSuccessTheMessageBoxClose();o.onTheProductPage.iPressOnInfoTab();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("TÖRLÉS:A törlés nem megengedett, ha egy vagy annál több megrendelésben szereplő termékről van szó. Ekkor a felugró ablakban hibaüzenetet kell látnunk.",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(2).and.iPressATableItemAtPosition(2);o.onTheProductPage.iPressOnDelete();t.onTheProductPage.iShouldSeeTheErrorDeleteProductDialog();o.onTheProductPage.iShouldPressTheDeleteErrorMessageBoxClose();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("TÖRLÉS:A törlés akkor megengedett, ha megrendelésben nem szereplő termékről van szó.",function(e,o,t){o.onTheProductsPage.iRememberTheItemAtPosition(0).and.iPressATableItemAtPosition(0);o.onTheProductPage.iPressOnDelete();o.onTheProductPage.iConfirmTheDelete();o.onTheProductPage.iPressOnBack();t.onTheProductsPage.iShouldSeeTheApp()});e("Kijelentkezhetek.",function(e,o,t){o.onTheMenuPage.iPressOnSignOut();t.onTheAppPage.iShouldSeeTheApp();t.iTeardownMyApp()})});