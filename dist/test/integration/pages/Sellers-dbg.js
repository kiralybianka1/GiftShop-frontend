sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/PropertyStrictEquals",
], function (Opa5, Press, EnterText, AggregationLengthEquals, PropertyStrictEquals) {
	"use strict";
	var sViewName = "Sellers";
	function createWaitForItemAtPosition (oOptions) {
		var iPosition = oOptions.position;
		return {
			id : "sellersList",
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
		onTheSellersPage: {

			actions: {
				iSearchFor: function (sSearchString) {
					return this.waitFor({
						id: "idSellersSearchField",
						viewName: sViewName,
						actions: new EnterText({
							text: sSearchString
						}),
						errorMessage: "A keresés mező nem található."
					});
				},
				//SORT
				iSortTheListOnName : function () {
					return this.iChooseASorter("sortButton", "Név");
				},
				
				iSortTheListOnSellerId : function () {
					return this.iChooseASorter("sortButton", "Eladó azonosító (ID)");
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
				
				
			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "Az eladók oldal megjelenik.");
						},
						errorMessage: "Az eladók oldal nem található."
					});
				},
				
				//SEARCH
				theTableHasZeroItem: function () {
					return this.waitFor({
						id: "sellersList",
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
						id: "sellersList",
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
				theListShouldBeSortedAscendingOnName : function () {
					return this.theListShouldBeSortedAscendingOnField("name");
				},
				
				theListShouldBeSortedAscendingOnSellerId : function () {
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
						id : "sellersList",
						matchers : fnCheckSort,
						success : function() {
							Opa5.assert.ok(true, "A lista jól van rendezve a feltételre: '" + sField + "'.");
						},
						errorMessage : "A lista nincs jól rendezve a feltételre: '" + sField + "'."
					});
				},
			
			}
		}
	});

});