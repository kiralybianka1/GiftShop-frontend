sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath",
	'sap/ui/test/matchers/Properties',
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/m/MessageToast"
], function (Opa5, Press, EnterText, AggregationLengthEquals, BindingPath, Properties, AggregationFilled, PropertyStrictEquals, MessageToast) {
	"use strict";
	var sViewName = "Customers";
	function createWaitForItemAtPosition (oOptions) {
		var iPosition = oOptions.position;
		return {
			id : "customersList",
			viewName : sViewName,
			matchers : function (oTable) {
				return oTable.getItems()[iPosition];
			},
			actions : oOptions.actions,
			success : oOptions.success,
			errorMessage : "A lista nem tartalmaz elemet ezen a pozíción: '" + iPosition + "'"
		};
	}
	Opa5.createPageObjects({
		onTheCustomersPage: {

			actions: {
				iSearchFor: function (sSearchString) {
					return this.waitFor({
						id: "idCustomersSearchField",
						viewName: sViewName,
						actions: new EnterText({
							text: sSearchString
						}),
						errorMessage: "A keresés mező nem található."
					});
				},
				//SORT
				iSortTheListOnFirstName : function () {
					return this.iChooseASorter("sortButton", "Keresztnév");
				},
				
				iSortTheListOnLastName : function () {
					return this.iChooseASorter("sortButton", "Vezetéknév");
				},
				
				iSortTheListOnCustomerId : function () {
					return this.iChooseASorter("sortButton", "Vásárló azonosító (ID)");
				},
				
				iChooseASorter: function (sSelect, sSort) {
					return this.waitFor({
						id : sSelect,
						viewName : sViewName,
						actions : new Press(),
						success : function () {
							this.waitFor({
								controlType: "sap.m.StandardListItem",
								matchers : new PropertyStrictEquals({name: "title", value: sSort}),
								searchOpenDialogs: true,
								actions : new Press(),
								success : function () {
									this.waitFor({
										controlType: "sap.m.Button",
										matchers: new PropertyStrictEquals({name: "text", value: "OK"}),
										searchOpenDialogs: true,
										actions: new Press(),
										errorMessage: "Az 'ok' gomb nem található az ablakban és nem lehet megnyomni."
									});
								},
								errorMessage : "Nem található a választási lehetőség: " +  sSort 
							});
						},
						errorMessage : "Nem található a választó: " + sSelect 
					});
				},
				
				//FILTER
				iFilterTheListOnTypeCivil: function () {
					return this.iMakeASelection("filterButton", "Típus", "Magánszemély");
				},

				iMakeASelection : function (sSelect, sItem, sOption) {
					return this.waitFor({
						id : sSelect,
						viewName : sViewName,
						actions : new Press(),
						success : function () {
							this.waitFor({
								controlType: "sap.m.StandardListItem",
								matchers: new PropertyStrictEquals({name: "title", value: sItem}),
								searchOpenDialogs: true,
								actions: new Press(),
								success: function () {
									this.waitFor({
										controlType: "sap.m.StandardListItem",
										matchers : new PropertyStrictEquals({name: "title", value: sOption}),
										searchOpenDialogs: true,
										actions : new Press(),
										success: function () {
											this.waitFor({
												controlType: "sap.m.Button",
												matchers: new PropertyStrictEquals({name: "text", value: "OK"}),
												searchOpenDialogs: true,
												actions: new Press(),
												errorMessage: "Az 'ok' gomb nem található az ablakban és nem lehet megnyomni."
											});
										},
										errorMessage : "Nem található a választási lehetőség: " +  sOption + "-" + sItem
									});
								},
								errorMessage : "Nem található a lehetőség: " + sItem 
							});
						},
						errorMessage : "Nem található a választó: " + sSelect 
					});
				},	
				//CUSTOMER PAGE
				iPressATableItemAtPosition : function (iPosition) {
					return this.waitFor(createWaitForItemAtPosition({
						position : iPosition,
						actions : new Press()
					}));
				},
				iRememberTheItemAtPosition : function (iPosition){
					return this.waitFor(createWaitForItemAtPosition({
						position : iPosition,
						success : function (oTableItem) {
							var oBindingContext = oTableItem.getBindingContext();

							// Don't remember objects just strings since IE will not allow accessing objects of destroyed frames
							this.getContext().currentItem = {
								bindingPath: oBindingContext.getPath(),
								id: oBindingContext.getProperty("id"),
								name: oBindingContext.getProperty("firstName") + " " + oBindingContext.getProperty("lastName")
							};
						}
					}));
				},
				
				iOpenViewSettingsDialog : function () {
					return this.waitFor({
						id : "filterButton",
						viewName : sViewName,
						actions : new Press(),
						errorMessage : "Nem található a 'szűrés' gomb."
					});
				},
				iPressOKInViewSelectionDialog : function () {
					return this.waitFor({
						searchOpenDialogs : true,
						controlType : "sap.m.Button",
						matchers :  new Opa5.matchers.PropertyStrictEquals({name : "text", value : "OK"}),
						actions : new Press(),
						errorMessage : "Nem található a beállítások ablak 'OK' gombja."
					});
				},

				iPressResetInViewSelectionDialog : function () {
					return this.waitFor({
						searchOpenDialogs : true,
						controlType : "sap.m.Button",
						matchers: new Opa5.matchers.PropertyStrictEquals({name: "icon", value: "sap-icon://clear-filter"}),
						actions : new Press(),
						errorMessage : "Nem található a beállítások ablak 'Megszakítás' gombja."
					});
				},
				
				//CRUD
				iPressOnAddCustomer: function () {
					return this.waitFor({
						id: "idAddCustomer",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Hozzáadás' gomb."
					});
				},
				
				iPressOnAddCustomerClose: function () {
					return this.waitFor({
						id: "idCloseAddDataSheet",
						actions: new Press(),
						errorMessage: "Nem található a hozzáadás ablak 'Bezárás' gombja."
					});
				},
				
				iPressOnConfirmAdd: function () {
					return this.waitFor({
						id: "idConfirmAddDataSheet",
						actions: new Press(),
						errorMessage: "Nem található a hozzáadás ablak 'Hozzáadás' gombja."
					});
				},
				
				iShouldPressTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idCustomerAddErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressSuccessTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idCustomerAddSuccessMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				//DATA
				iAddTheFirstName:function(data){
					return this.waitFor({
						id: "addCustomerFirstName",
						matchers: new PropertyStrictEquals({name: "id", value: "addCustomerFirstName"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A keresztnév mező nem található."
					});
				},
				
				iAddTheLastName:function(data){
					return this.waitFor({
						id: "addCustomerLastName",
						matchers: new PropertyStrictEquals({name: "id", value: "addCustomerLastName"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A vezetéknév mező nem található."
					});
				},
				
				iAddTheCountry:function(data){
					return this.waitFor({
						id: "addCountry",
						matchers: new PropertyStrictEquals({name: "id", value: "addCountry"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az ország mező nem található."
					});
				},
				
				iAddTheZip:function(data){
					return this.waitFor({
						id: "addZip",
						matchers: new PropertyStrictEquals({name: "id", value: "addZip"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az irányítószám mező nem található."
					});
				},
				
				iAddTheCity:function(data){
					return this.waitFor({
						id: "addCity",
						matchers: new PropertyStrictEquals({name: "id", value: "addCity"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A város mező nem található."
					});
				},
				
				iAddTheStreet:function(data){
					return this.waitFor({
						id: "addStreet",
						matchers: new PropertyStrictEquals({name: "id", value: "addStreet"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az utca mező nem található."
					});
				},
				
				iAddTheHouseNumber:function(data){
					return this.waitFor({
						id: "addHouseNumber",
						matchers: new PropertyStrictEquals({name: "id", value: "addHouseNumber"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A házszám mező nem található."
					});
				},
				iAddTheFloor:function(data){
					return this.waitFor({
						id: "addFloor",
						matchers: new PropertyStrictEquals({name: "id", value: "addFloor"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az emelet mező nem található."
					});
				},
				iAddTheDoor:function(data){
					return this.waitFor({
						id: "addDoor",
						matchers: new PropertyStrictEquals({name: "id", value: "addDoor"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az ajtó mező nem található."
					});
				},
				iAddTheDoorbell:function(data){
					return this.waitFor({
						id: "addDoorbell",
						matchers: new PropertyStrictEquals({name: "id", value: "addDoorbell"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A kapucsengő mező nem található."
					});
				},
				iAddThePhone:function(data){
					return this.waitFor({
						id: "addPhone",
						matchers: new PropertyStrictEquals({name: "id", value: "addPhone"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A telefonszám mező nem található."
					});
				},
				iAddTheEmail:function(data){
					return this.waitFor({
						id: "addEmail",
						matchers: new PropertyStrictEquals({name: "id", value: "addEmail"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "Az email mező nem található."
					});
				},
				iAddTheBankAccount:function(data){
					return this.waitFor({
						id: "addBankAccount",
						matchers: new PropertyStrictEquals({name: "id", value: "addBankAccount"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: data
						}),
						errorMessage: "A bankszámlaszám mező nem található."
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
				
				//SEARCH
				theTableHasZeroItem: function () {
					return this.waitFor({
						id: "customersList",
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "items",
							length: 0
						}),
						success: function () {
							Opa5.assert.ok(true, "A lista 0 megfelelő elemet tartalmaz.");
						},
						errorMessage: "A lista nem 0 megfelelő elemet tartalmaz."
					});
				},
				
				theTableHasOneItem: function () {
					return this.waitFor({
						id: "customersList",
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "items",
							length: 1
						}),
						success: function () {
							Opa5.assert.ok(true, "A lista 1 megfelelő elemet tartalmaz.");
						},
						errorMessage: "A lista nem 1 megfelelő elemet tartalmaz."
					});
				},
				
				//SORT
				theListShouldBeSortedAscendingOnFirstName : function () {
					return this.theListShouldBeSortedAscendingOnField("firstName");
				},
				
				theListShouldBeSortedAscendingOnLastName : function () {
					return this.theListShouldBeSortedAscendingOnField("lastName");
				},
				
				theListShouldBeSortedAscendingOnCustomerId : function () {
					return this.theListShouldBeSortedAscendingOnField("id");
				},
				
				theListShouldBeSortedAscendingOnField : function (sField) {
					function fnCheckSort (oList){
						var oLastValue = null,
							fnSortByField = function (oElement) {
								if (!oElement.getBindingContext()) {
									return false;
								}

								var oCurrentValue = oElement.getBindingContext().getProperty(sField);
								
								if (oCurrentValue === undefined) {
									return false;
								}
								
								if (!oLastValue || oCurrentValue >= oLastValue){
									oLastValue = oCurrentValue;
								}
								
								return true;
							};

						return oList.getItems().every(fnSortByField);
						
					}

					return this.waitFor({
						viewName : sViewName,
						id : "customersList",
						matchers : fnCheckSort,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van rendezve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól rendezve a feltételre: '" + sField + "'."
					});
				},
				
				//FILTER
				theListShouldBeFilteredOnTypeCivil : function () {
					return this.theListShouldBeFilteredOnFieldUsingComparator("customerType", "Magánszemély");
				},
				
				theListShouldBeFilteredOnFieldUsingComparator : function (sField, iComparator) {
					function fnCheckFilter(oList){
						var fnIsFiltered = function (oElement) {
							if (!oElement.getBindingContext()) {
								return false;
							} else {
								var iValue = oElement.getBindingContext().getProperty(sField);
								if (iValue != iComparator) {
									return false;
								} else {
									return true;
								}
							}
						};

						return oList.getItems().every(fnIsFiltered);
					}

					return this.waitFor({
						viewName : sViewName,
						id : "customersList",
						matchers : fnCheckFilter,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van szűrve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól szűrve a feltételre: '" + sField + "'."
					});
				},
				
				//CRUD
				iShouldSeeTheAddCustomerDialog: function () {
					return this.waitFor({
						controlType: "sap.m.Dialog",
						success: function () {
							Opa5.assert.ok(true, "A vásárló hozzáadás ablak megjelenik.");
						},
						errorMessage: "Nem található a hozzáadás ablak."
					});
				},
				
				
				iShouldSeeTheSuccessAddCustomerDialog: function () {
					return this.waitFor({
						id:"idCustomerAddSuccessMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A felugró ablak megnyílt");
						},
						errorMessage: "A felugró ablak nem található."
					});
				},
				
				iShouldSeeTheErrorAddCustomerDialog: function () {
					return this.waitFor({
						id:"idCustomerAddErrorMessageBox",
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