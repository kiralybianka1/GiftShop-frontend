sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/EnterText",
], function (Opa5, Properties, Press, PropertyStrictEquals, EnterText) {
	"use strict";
	var sViewName = "Customer";
	Opa5.createPageObjects({
		onTheCustomerPage: {

			actions: {
				//MODIFY TAB
				iPressOnModifyTab: function () {
					return this.waitFor({
						id: "idCustomerModifyTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Vásárló adatainak módosítása' fül nem található az oldalon."
					});
				},
				//ORDERS TAB
				iPressOnOrdersTab: function () {
					return this.waitFor({
						id: "idCustomerOrdersTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Vásárló megrendelései' fül nem található az oldalon."
					});
				},
				//INFO TAB
				iPressOnInfoTab: function () {
					return this.waitFor({
						id: "idCustomerInfoTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A 'Vásárló megrendelései' fül nem található az oldalon."
					});
				},
				//BACK
				iPressOnBack: function () {
					return this.waitFor({
						id: "idCustomerPage",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Az vissza gomb nem található az oldalon."
					});
				},
				
				//CRUD
				iPressOnModifyCustomer: function () {
					return this.waitFor({
						id: "saveButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Mentés' gomb."
					});
				},
				
				iShouldPressTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idCustomerModifyErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressSuccessTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idCustomerModifySuccessMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressTheDeleteErrorMessageBoxClose:function(){
					return this.waitFor({
						id: "idCustomerDeleteErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				iModifyTheFirstName:function(data){
					return this.waitFor({
						id: "__xmlview5--firstName",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--firstName"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A keresztnév mező nem található."
					});
				},
				iModifyTheFloor:function(data){
					return this.waitFor({
						id: "__xmlview5--floor",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--floor"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az emelet mező nem található."
					});
				},
				iModifyTheDoor:function(data){
					return this.waitFor({
						id: "__xmlview5--door",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--door"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az ajtó mező nem található."
					});
				},
				iModifyTheDoorbell:function(data){
					return this.waitFor({
						id: "__xmlview5--doorbell",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--doorbell"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A kapucsengő mező nem található."
					});
				},
				iModifyThePhone:function(data){
					return this.waitFor({
						id: "__xmlview5--phone",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--phone"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A telefonszám mező nem található."
					});
				},
				iModifyTheEmail:function(data){
					return this.waitFor({
						id: "__xmlview5--email",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--email"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az email mező nem található."
					});
				},
				iModifyTheBankAccount:function(data){
					return this.waitFor({
						id: "__xmlview5--bankAccount",
						matchers: new PropertyStrictEquals({name: "id", value: "__xmlview5--bankAccount"}),
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A bankszámlaszám mező nem található."
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
							Opa5.assert.ok(true, "A vásárlók oldal megjelenik.");
						},
						errorMessage: "A vásárlók oldal nem található."
					});
				},
				
				theTitleShouldDisplayTheName: function (sName) {
					return this.waitFor({
						success: function () {
							return this.waitFor({
								id: "idCustomerPage",
								viewName: sViewName,
								matchers: new Properties({
									title: sName
								}),
								success: function (oPage) {
									Opa5.assert.ok(true, " a megjegyzett oldalon volt.");
								},
								errorMessage: "A vásárló " + sName + " nem látható."
							});
						}
					});
				},
				//CRUD
				iShouldSeeTheSuccessModifyCustomerDialog: function () {
					return this.waitFor({
						id:"idCustomerModifySuccessMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A felugró ablak megnyílt");
						},
						errorMessage: "A felugró ablak nem található."
					});
				},
				
				iShouldSeeTheErrorModifyCustomerDialog: function () {
					return this.waitFor({
						id:"idCustomerModifyErrorMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A hibaüzenetfelugró ablak megnyílt");
						},
						errorMessage: "A felugró hibaüzenet ablak nem található."
					});
				},
				
				iShouldSeeTheErrorDeleteCustomerDialog: function () {
					return this.waitFor({
						id:"idCustomerDeleteErrorMessageBox",
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