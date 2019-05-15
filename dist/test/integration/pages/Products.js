sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/actions/Press","sap/ui/test/matchers/AggregationLengthEquals","sap/ui/test/actions/EnterText","sap/ui/test/matchers/BindingPath","sap/ui/test/matchers/Properties","sap/ui/test/matchers/AggregationFilled","sap/ui/test/matchers/PropertyStrictEquals","sap/m/MessageToast"],function(e,t,r,a,s,n,i,o,u){"use strict";var c="Products";function l(e){var t=e.position;return{id:"productsTable",viewName:c,matchers:function(e){return e.getContent()[t]},actions:e.actions,success:e.success,errorMessage:"A lista nem tartalmaz elemet ezen a pozíción: '"+t+"'"}}e.createPageObjects({onTheProductsPage:{actions:{iSearchFor:function(e){return this.waitFor({id:"idSearchField",viewName:c,actions:new a({text:e}),errorMessage:"A keresés mező nem található."})},iPressOnExport:function(){return this.waitFor({id:"idExport",viewName:c,actions:new t,errorMessage:"A letöltés gomb nem található."})},iSortTheListOnName:function(){return this.iChooseASorter("sortButton","Név")},iSortTheListOnNetPrice:function(){return this.iChooseASorter("sortButton","Nettó ár")},iSortTheListOnQuantity:function(){return this.iChooseASorter("sortButton","Mennyiség")},iChooseASorter:function(e,r){return this.waitFor({id:e,viewName:c,actions:new t,success:function(){this.waitFor({controlType:"sap.m.StandardListItem",matchers:new o({name:"title",value:r}),searchOpenDialogs:true,actions:new t,success:function(){this.waitFor({controlType:"sap.m.Button",matchers:new o({name:"text",value:"OK"}),searchOpenDialogs:true,actions:new t,errorMessage:"Az 'ok' gomb nem található az ablakban és nem lehet megnyomni."})},errorMessage:"Nem található a választási lehetőség: "+r})},errorMessage:"Nem található a választó: "+e})},iFilterTheListOnCategoryGame:function(){return this.iMakeASelection("filterButton","Kategória","Játék")},iMakeASelection:function(e,r,a){return this.waitFor({id:e,viewName:c,actions:new t,success:function(){this.waitFor({controlType:"sap.m.StandardListItem",matchers:new o({name:"title",value:r}),searchOpenDialogs:true,actions:new t,success:function(){this.waitFor({controlType:"sap.m.StandardListItem",matchers:new o({name:"title",value:a}),searchOpenDialogs:true,actions:new t,success:function(){this.waitFor({controlType:"sap.m.Button",matchers:new o({name:"text",value:"OK"}),searchOpenDialogs:true,actions:new t,errorMessage:"Az 'ok' gomb nem található az ablakban és nem lehet megnyomni."})},errorMessage:"Nem található a választási lehetőség: "+a+"-"+r})},errorMessage:"Nem található a lehetőség: "+r})},errorMessage:"Nem található a választó: "+e})},iPressATableItemAtPosition:function(e){return this.waitFor(l({position:e,actions:new t}))},iRememberTheItemAtPosition:function(e){return this.waitFor(l({position:e,success:function(e){var t=e.getBindingContext();this.getContext().currentItem={bindingPath:t.getPath(),id:t.getProperty("id"),name:t.getProperty("name")}}}))},iOpenViewSettingsDialog:function(){return this.waitFor({id:"filterButton",viewName:c,actions:new t,errorMessage:"Nem található a 'szűrés' gomb."})},iPressOKInViewSelectionDialog:function(){return this.waitFor({searchOpenDialogs:true,controlType:"sap.m.Button",matchers:new e.matchers.PropertyStrictEquals({name:"text",value:"OK"}),actions:new t,errorMessage:"Nem található a beállítások ablak 'OK' gombja."})},iPressResetInViewSelectionDialog:function(){return this.waitFor({searchOpenDialogs:true,controlType:"sap.m.Button",matchers:new e.matchers.PropertyStrictEquals({name:"icon",value:"sap-icon://clear-filter"}),actions:new t,errorMessage:"Nem található a beállítások ablak 'Megszakítás' gombja."})},iPressOnAddProduct:function(){return this.waitFor({id:"idAddProduct",viewName:c,actions:new t,errorMessage:"Nem található a 'Hozzáadás' gomb."})},iPressOnAddProductClose:function(){return this.waitFor({id:"idCloseAddProduct",actions:new t,errorMessage:"Nem található a hozzáadás ablak 'Bezárás' gombja."})},iPressOnConfirmAdd:function(){return this.waitFor({id:"idConfirmAddProduct",actions:new t,errorMessage:"Nem található a hozzáadás ablak 'Hozzáadás' gombja."})},iShouldPressTheMessageBoxClose:function(){return this.waitFor({id:"idProductAddErrorMessageBox",autoWait:false,success:function(e){e.destroy()}})},iShouldPressSuccessTheMessageBoxClose:function(){return this.waitFor({id:"idProductAddSuccessMessageBox",autoWait:false,success:function(e){e.destroy()}})},iAddTheName:function(e){return this.waitFor({id:"addProductName",matchers:new o({name:"id",value:"addProductName"}),searchOpenDialogs:true,viewName:c,actions:new a({text:e}),errorMessage:"A név mező nem található."})},iAddTheDescription:function(e){return this.waitFor({id:"addProductDescription",matchers:new o({name:"id",value:"addProductDescription"}),searchOpenDialogs:true,viewName:c,actions:new a({text:e}),errorMessage:"A leírás mező nem található."})},iAddTheNetPrice:function(e){return this.waitFor({id:"addProductNetPrice",matchers:new o({name:"id",value:"addProductNetPrice"}),searchOpenDialogs:true,viewName:c,actions:new a({text:e}),errorMessage:"A nettó ár mező nem található."})},iAddTheQuantity:function(e){return this.waitFor({id:"addProductQuantity",matchers:new o({name:"id",value:"addProductQuantity"}),searchOpenDialogs:true,viewName:c,actions:new a({text:e}),errorMessage:"A mennyiség mező nem található."})},iAddTheStockId:function(e){return this.waitFor({id:"addProductStockId",matchers:new o({name:"id",value:"addProductStockId"}),searchOpenDialogs:true,viewName:c,actions:new a({text:e}),errorMessage:"A raktári azonosító mező nem található."})}},assertions:{iShouldSeeTheApp:function(){return this.waitFor({viewName:c,success:function(){e.assert.ok(true,"A termékek oldal megjelenik.")},errorMessage:"A termékek oldal nem található."})},theTableHasZeroItem:function(){return this.waitFor({id:"productsTable",viewName:c,matchers:new r({name:"content",length:0}),success:function(){e.assert.ok(true,"A lista 0 megfelelő elemet tartalmaz.")},errorMessage:"A lista nem 0 megfelelő elemet tartalmaz."})},theTableHasOneItem:function(){return this.waitFor({id:"productsTable",viewName:c,matchers:new r({name:"content",length:1}),success:function(){e.assert.ok(true,"A lista 1 megfelelő elemet tartalmaz.")},errorMessage:"A lista nem 1 megfelelő elemet tartalmaz."})},theListShouldBeSortedAscendingOnName:function(){return this.theListShouldBeSortedAscendingOnField("name")},theListShouldBeSortedAscendingOnNetPrice:function(){return this.theListShouldBeSortedAscendingOnField("netPrice")},theListShouldBeSortedAscendingOnQuantity:function(){return this.theListShouldBeSortedAscendingOnField("quantity")},theListShouldBeSortedAscendingOnField:function(t){function r(e){var r=null,a=function(e){if(!e.getBindingContext()){return false}var a=e.getBindingContext().getProperty(t);if(a===undefined){return false}if(!r||a>=r){r=a}return true};return e.getContent().every(a)}return this.waitFor({viewName:c,id:"productsTable",matchers:r,success:function(){e.assert.ok(true,"A lista jól van rendezve a feltételre: '"+t+"'.")},errorMessage:"A lista nincs jól rendezve a feltételre: '"+t+"'."})},theListShouldBeFilteredOnCategoryGame:function(){return this.theListShouldBeFilteredOnFieldUsingComparator("category/name","Játék")},theListShouldBeFilteredOnFieldUsingComparator:function(t,r){function a(e){var a=function(e){if(!e.getBindingContext()){return false}else{var a=e.getBindingContext().getProperty(t);if(a!=r){return false}else{return true}}};return e.getContent().every(a)}return this.waitFor({viewName:c,id:"productsTable",matchers:a,success:function(){e.assert.ok(true,"A lista jól van szűrve a feltételre: '"+t+"'.")},errorMessage:"A lista nincs jól szűrve a feltételre: '"+t+"'."})},iShouldSeeTheAddProductDialog:function(){return this.waitFor({controlType:"sap.m.Dialog",success:function(){e.assert.ok(true,"A termék hozzáadás ablak megjelenik.")},errorMessage:"Nem található a hozzáadás ablak."})},iShouldSeeTheSuccessAddProductDialog:function(){return this.waitFor({id:"idProductAddSuccessMessageBox",autoWait:false,success:function(){e.assert.ok(true,"A felugró ablak megnyílt")},errorMessage:"A felugró ablak nem található."})},iShouldSeeTheErrorAddProductDialog:function(){return this.waitFor({id:"idProductAddErrorMessageBox",autoWait:false,success:function(){e.assert.ok(true,"A hibaüzenetfelugró ablak megnyílt")},errorMessage:"A felugró hibaüzenet ablak nem található."})}}}})});