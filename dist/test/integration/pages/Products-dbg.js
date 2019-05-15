sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/BindingPath",
	'sap/ui/test/matchers/Properties',
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/m/MessageToast"
], function (Opa5, Press, AggregationLengthEquals, EnterText, BindingPath, Properties, AggregationFilled, PropertyStrictEquals,MessageToast) {
	"use strict";
	var sViewName = "Products";
	function createWaitForItemAtPosition (oOptions) {
		var iPosition = oOptions.position;
		return {
			id : "productsTable",
			viewName : sViewName,
			matchers : function (oTable) {
				return oTable.getContent()[iPosition];
			},
			actions : oOptions.actions,
			success : oOptions.success,
			errorMessage : "A lista nem tartalmaz elemet ezen a pozíción: '" + iPosition + "'"
		};
	}
	Opa5.createPageObjects({
		onTheProductsPage: {

			actions: {
				
				//SEARCH
				iSearchFor: function (sSearchString) {
					return this.waitFor({
						id: "idSearchField",
						viewName: sViewName,
						actions: new EnterText({
							text: sSearchString
						}),
						errorMessage: "A keresés mező nem található."
					});
				},
				
				//EXPORT
				iPressOnExport: function () {
					return this.waitFor({
						id: "idExport",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "A letöltés gomb nem található."
					});
				},
				
				//SORT
				iSortTheListOnName : function () {
					return this.iChooseASorter("sortButton", "Név");
				},
				
				iSortTheListOnNetPrice : function () {
					return this.iChooseASorter("sortButton", "Nettó ár");
				},
				
				iSortTheListOnQuantity : function () {
					return this.iChooseASorter("sortButton", "Mennyiség");
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
				iFilterTheListOnCategoryGame: function () {
					return this.iMakeASelection("filterButton", "Kategória", "Játék");
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

				//PRODUCT PAGE
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
								name: oBindingContext.getProperty("name")
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
				iPressOnAddProduct: function () {
					return this.waitFor({
						id: "idAddProduct",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Nem található a 'Hozzáadás' gomb."
					});
				},
				
				iPressOnAddProductClose: function () {
					return this.waitFor({
						id: "idCloseAddProduct",
						actions: new Press(),
						errorMessage: "Nem található a hozzáadás ablak 'Bezárás' gombja."
					});
				},
				
				iPressOnConfirmAdd: function () {
					return this.waitFor({
						id: "idConfirmAddProduct",
						actions: new Press(),
						errorMessage: "Nem található a hozzáadás ablak 'Hozzáadás' gombja."
					});
				},
				
				iShouldPressTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idProductAddErrorMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				
				iShouldPressSuccessTheMessageBoxClose:function(){
					return this.waitFor({
						id: "idProductAddSuccessMessageBox",
						autoWait: false,
						success: function(oMessageBox){
							oMessageBox.destroy();
						}
					});
				},
				//DATA
				iAddTheName:function(name){
					return this.waitFor({
						id: "addProductName",
						matchers: new PropertyStrictEquals({name: "id", value: "addProductName"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: name
						}),
						errorMessage: "A név mező nem található."
					});
				},
				iAddTheDescription:function(description){
					return this.waitFor({
						id: "addProductDescription",
						matchers: new PropertyStrictEquals({name: "id", value: "addProductDescription"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: description
						}),
						errorMessage: "A leírás mező nem található."
					});
				},
				iAddTheNetPrice:function(netPrice){
					return this.waitFor({
						id: "addProductNetPrice",
						matchers: new PropertyStrictEquals({name: "id", value: "addProductNetPrice"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: netPrice
						}),
						errorMessage: "A nettó ár mező nem található."
					});
				},
				iAddTheQuantity:function(quantity){
					return this.waitFor({
						id: "addProductQuantity",
						matchers: new PropertyStrictEquals({name: "id", value: "addProductQuantity"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: quantity
						}),
						errorMessage: "A mennyiség mező nem található."
					});
				},
				
				iAddTheStockId:function(quantity){
					return this.waitFor({
						id: "addProductStockId",
						matchers: new PropertyStrictEquals({name: "id", value: "addProductStockId"}),
						searchOpenDialogs: true,
						viewName: sViewName,
						actions: new EnterText({
							text: quantity
						}),
						errorMessage: "A raktári azonosító mező nem található."
					});
				},
				

			},

			assertions: {
				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "A termékek oldal megjelenik.");
						},
						errorMessage: "A termékek oldal nem található."
					});
				},
				
				//SEARCH
				theTableHasZeroItem: function () {
					return this.waitFor({
						id: "productsTable",
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "content",
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
						id: "productsTable",
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "content",
							length: 1
						}),
						success: function () {
							Opa5.assert.ok(true, "A lista 1 megfelelő elemet tartalmaz.");
						},
						errorMessage: "A lista nem 1 megfelelő elemet tartalmaz."
					});
				},
				
				//SORT
				theListShouldBeSortedAscendingOnName : function () {
					return this.theListShouldBeSortedAscendingOnField("name");
				},
				
				theListShouldBeSortedAscendingOnNetPrice : function () {
					return this.theListShouldBeSortedAscendingOnField("netPrice");
				},
				
				theListShouldBeSortedAscendingOnQuantity : function () {
					return this.theListShouldBeSortedAscendingOnField("quantity");
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

						return oList.getContent().every(fnSortByField);
						
					}

					return this.waitFor({
						viewName : sViewName,
						id : "productsTable",
						matchers : fnCheckSort,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van rendezve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól rendezve a feltételre: '" + sField + "'."
					});
				},
				
				//FILTER
				theListShouldBeFilteredOnCategoryGame : function () {
					return this.theListShouldBeFilteredOnFieldUsingComparator("category/name", "Játék");
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

						return oList.getContent().every(fnIsFiltered);
					}

					return this.waitFor({
						viewName : sViewName,
						id : "productsTable",
						matchers : fnCheckFilter,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van szűrve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól szűrve a feltételre: '" + sField + "'."
					});
				},
				//CRUD
				iShouldSeeTheAddProductDialog: function () {
					return this.waitFor({
						controlType: "sap.m.Dialog",
						success: function () {
							Opa5.assert.ok(true, "A termék hozzáadás ablak megjelenik.");
						},
						errorMessage: "Nem található a hozzáadás ablak."
					});
				},
				
				
				iShouldSeeTheSuccessAddProductDialog: function () {
					return this.waitFor({
						id:"idProductAddSuccessMessageBox",
						autoWait: false,
						success: function () {
							Opa5.assert.ok(true, "A felugró ablak megnyílt");
						},
						errorMessage: "A felugró ablak nem található."
					});
				},
				
				iShouldSeeTheErrorAddProductDialog: function () {
					return this.waitFor({
						id:"idProductAddErrorMessageBox",
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