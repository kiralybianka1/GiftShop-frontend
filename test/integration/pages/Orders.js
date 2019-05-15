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
	var sViewName = "Orders";
	function createWaitForItemAtPosition (oOptions) {
		var iPosition = oOptions.position;
		return {
			id : "ordersTable",
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
		onTheOrdersPage: {

			actions: {
				iSearchFor: function (sSearchString) {
					return this.waitFor({
						id: "idOrdersSearchField",
						viewName: sViewName,
						actions: new EnterText({
							text: sSearchString
						}),
						errorMessage: "A keresés mező nem található."
					});
				},
				//SORT
				iSortTheListOnOrderId : function () {
					return this.iChooseASorter("sortButton", "Megrendelés azonosító");
				},
				
				iSortTheListOnFirstName : function () {
					return this.iChooseASorter("sortButton", "Megrendelő-Keresztnév");
				},
				
				iSortTheListOnLastName : function () {
					return this.iChooseASorter("sortButton", "Megrendelő-Vezetéknév");
				},
				
				iSortTheListOnOrderDate : function () {
					return this.iChooseASorter("sortButton", "Megrendelési dátum");
				},
				
				iSortTheListOnFulfillDate : function () {
					return this.iChooseASorter("sortButton", "Megrendelés teljesítési dátum");
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
				iFilterTheListOnFulfillment: function () {
					return this.iMakeASelection("filterButton", "Teljesítettség", "Nem teljesített");
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
										errorMessage : "Nem található a választási lehetőség:" +  sOption + "-" + sItem
									});
								},
								errorMessage : "Nem található a lehetőség: " + sItem 
							});
						},
						errorMessage : "Nem található a választó: " + sSelect
					});
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
				//NEW TAB
				iPressOnNewTab: function () {
					return this.waitFor({
						id: "idNewOrderTab",
						viewName: sViewName,
						actions: new Press(),
						success: function() {
                            Opa5.assert.ok(true,  "Az 'Új megrendelés hozzáadása' fül kiválasztva.");
                        },
						errorMessage: "Nem található az 'Új megrendelés hozzáadása' fül az aktuális oldalon."
					});
				},
				iPressOnListTab: function () {
					return this.waitFor({
						id: "idOrderListTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található az 'Megrendelések' fül az aktuális oldalon."
					});
				},
				//CRUD
				iSelectCustomerToAdd: function (id) {
					return this.waitFor({
						id: "customerSelect",
						controlType: "sap.m.ComboBox",
						viewName: sViewName,
						actions: new Press(),
						success: function(){
							this.waitFor({
								controlType: "sap.ui.core.ListItem",
								matchers: new PropertyStrictEquals({name: "key", value: id}),
								actions: new Press(),
								success: function() {
                                    Opa5.assert.ok(true, id + " azonosítójú vásárló kiválasztva.");
                                },
                                errorMessage: id + " azonosítójú vásárlót nem lehet kiválasztani."
							});
						},
						errorMessage: "Nem található az vásárlók mező az aktuális oldalon."
					});
				},
				
				iSelectProductToAdd: function (id) {
					return this.waitFor({
						id: "productSelect",
						controlType: "sap.m.ComboBox",
						viewName: sViewName,
						actions: new Press(),
						success: function(){
							this.waitFor({
								controlType: "sap.ui.core.ListItem",
								matchers: new PropertyStrictEquals({name: "key", value: id}),
								actions: new Press(),
								success: function() {
                                    Opa5.assert.ok(true, id + " azonosítójú termék kiválasztva.");
                                },
                                errorMessage: id + " azonosítójú terméket nem lehet kiválasztani."
							});
						},
						errorMessage: "Nem található az termékek mező az aktuális oldalon."
					});
				},
				iPressOnAddProduct:function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						id: "idAddProduct",
						viewName: sViewName,
						actions: new Press(),
						success: function() {
                            Opa5.assert.ok(true,  "Hozzáadás gomb megnyomása. Termék sikeresen hozzáadva.");
                        },
						errorMessage: "Nem található az 'Hozzáadás' gomb"
					});
				},
				
				iPressOnNextButton:function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						//id: "idNewOrderTab",
						viewName: sViewName,
						actions: new Press(),
						success: function() {
                            //Opa5.assert.ok(true,  "Továbblépés.");
                        },
						errorMessage: "Nem található az 'Tovább' gomb"
					});
				},
				
				iPressOnConfirm : function () {
					return this.waitFor({
						id: "idConfirmOrder",
						searchOpenDialogs : true,
						controlType : "sap.m.Button",
						matchers :  new Opa5.matchers.PropertyStrictEquals({name : "id", value : "idConfirmOrder"}),
						actions : new Press(),
						success: function() {
                            Opa5.assert.ok(true,  "A megerősítés ablak megjelenik. Megrendelés gomb megnyomása.");
                        },
						errorMessage : "Nem található a megerősítés ablak 'Megrendelés' gombja."
					});
				},
				
				iShouldPressSuccessTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idOrderAddSuccessMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
							 Opa5.assert.ok(true,  "A sikeres megrendelés ablak megjelenik. OK gomb megnyomása.");
						}
					});
				}
			},

			assertions: {
				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A megrendelések oldal megjelenik.");
						},
						errorMessage: "A megrendelések oldal nem található."
					});
				},
				//SEARCH
				theTableHasZeroItem: function () {
					return this.waitFor({
						id: "ordersTable",
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
						id: "ordersTable",
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
				theListShouldBeSortedAscendingOnOrderId : function () {
					return this.theListShouldBeSortedAscendingOnField("id");
				},
				
				theListShouldBeSortedAscendingOnFirstName : function () {
					return this.theListShouldBeSortedAscendingOnField("customer/firstName");
				},
				
				theListShouldBeSortedAscendingOnLastName : function () {
					return this.theListShouldBeSortedAscendingOnField("customer/lastName");
				},
				
				theListShouldBeSortedAscendingOnOrderDate : function () {
					return this.theListShouldBeSortedAscendingOnOrderDate("orderDate");
				},
				
				theListShouldBeSortedAscendingOnFulfillDate : function () {
					return this.theListShouldBeSortedAscendingOnFulfillDate("fulfillDate");
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
						id : "ordersTable",
						matchers : fnCheckSort,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van rendezve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól rendezve a feltételre: '" + sField + "'."
					});
				},
				
				//FILTER
				theListShouldBeFilteredOnFulfillment : function () {
					return this.theListShouldBeFilteredOnFieldUsingComparator("fulfillDate", null);
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
						id : "ordersTable",
						matchers : fnCheckFilter,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van szűrve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól szűrve a feltételre: '" + sField + "'."
					});
				}
			}
		}
	});
});