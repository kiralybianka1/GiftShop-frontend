sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/EnterText",
], function (Opa5, Properties, Press, PropertyStrictEquals, EnterText) {
	"use strict";
	var sViewName = "Product";
	Opa5.createPageObjects({
		onTheProductPage: {

			actions: {
				//MODIFY TAB
				iPressOnModifyTab: function () {
					return this.waitFor({
						id: "idProductModifyTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Termék adatainak módosítása' fül."
					});
				},
				iPressOnInfoTab: function () {
					return this.waitFor({
						id: "idProductInfoTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem találahtó a 'Termék információk' fül."
					});
				},
				//BACK
				iPressOnBack: function () {
					return this.waitFor({
						id: "page",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a vissza gomb."
					});
				},
				
				//CRUD
				iPressOnModifyProduct: function () {
					return this.waitFor({
						id: "saveButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Mentés' gomb."
					});
				},
				
				iShouldPressTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idProductModifyErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressTheDeleteErrorMessageBoxClose:function(){
					return this.waitFor({
						id: "idProductDeleteErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressSuccessTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idProductModifySuccesMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iModifyTheName:function(name){
					return this.waitFor({
						id: "__xmlview5--name",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--name"}),
						viewName: sViewName,
						actions: new EnterText({
							text: name
						}),
						errorMessage: "A név mező nem található."
					});
				},
				iModifyTheDescription:function(description){
					return this.waitFor({
						id: "__xmlview5--description",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--description"}),
						viewName: sViewName,
						actions: new EnterText({
							text: description
						}),
						errorMessage: "A leírás mező nem található."
					});
				},
				iModifyTheNetPrice:function(netPrice){
					return this.waitFor({
						id: "__xmlview5--netPrice",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--netPrice"}),
						viewName: sViewName,
						actions: new EnterText({
							text: netPrice
						}),
						errorMessage: "A nettó ár mező nem található."
					});
				},
				iModifyTheQuantity:function(quantity){
					return this.waitFor({
						id: "__xmlview5--quantity",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--quantity"}),
						viewName: sViewName,
						actions: new EnterText({
							text: quantity
						}),
						errorMessage: "A mennyiség mező nem található."
					});
				},
				
				iModifyTheStockId:function(quantity){
					return this.waitFor({
						id: "__xmlview5--stockId",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--stockId"}),
						viewName: sViewName,
						actions: new EnterText({
							text: quantity
						}),
						errorMessage: "A raktári azonosító mező nem található."
					});
				},
				
				iPressOnDelete: function () {
					return this.waitFor({
						id: "deleteButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Törlés' gomb."
					});
				},
				iConfirmTheDelete: function () {
					return this.waitFor({
						id: "idConfirmDeleteMessageBox",
						viewName: sViewName,
						searchOpenDialogs: true,
						actions: new Press(),
						errorMessage: "Nem található az 'Igen' gomb."
					});
				},
			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A termék oldal megjelenik.");
						},
						errorMessage: "A termék oldal nem található."
					});
				},

				theTitleShouldDisplayTheName: function (sName) {
					return this.waitFor({
						success: function () {
							return this.waitFor({
								id: "page",
								viewName: sViewName,
								matchers: new Properties({
									title: sName
								}),
								success: function (oPage) {
									Opa5.assert.ok(true, "a megjegyzett oldalon volt.");
								},
								errorMessage: "A termék: " + sName + " nem található."
							});
						}
					});
				},
				
				//CRUD
				iShouldSeeTheSuccessModifyProductDialog: function () {
					return this.waitFor({
						id:"idProductModifySuccesMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A felugró ablak megnyílt");
						},
						errorMessage: "A felugró ablak nem található."
					});
				},
				
				iShouldSeeTheErrorModifyProductDialog: function () {
					return this.waitFor({
						id:"idProductModifyErrorMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A hibaüzenetfelugró ablak megnyílt");
						},
						errorMessage: "A felugró hibaüzenet ablak nem található."
					});
				},
				
				iShouldSeeTheErrorDeleteProductDialog: function () {
					return this.waitFor({
						id:"idProductDeleteErrorMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A hibaüzenetfelugró ablak megnyílt");
						},
						errorMessage: "A felugró hibaüzenet ablak nem található."
					});
				},
			}
		}
	});

});