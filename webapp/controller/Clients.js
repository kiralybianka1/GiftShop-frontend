sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/f/library",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function (Controller, fioriLibrary, MessageBox, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("Project.Project.controller.Clients", {
		onInit: function () {},

		//ADDFORM
		onAddButtonPress: function () {
			this.dataSheetDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.AddDataSheet", this);

			var c = this.dataSheetDialog.getContent()[0].getContent();
			for (var i = 0; i < c.length; i++) {
				if (c[i].getId() === "addSellerName" || c[i].getId() === "addSellerNameText") {
					c[i].setVisible(this.name === "seller");
				}
				if (c[i].getId() === "addCustomerNameText" || c[i].getId() === "addCustomerFirstName" || c[i].getId() === "addCustomerLastName" ||
					c[i].getId() === "addCustomerTypeText" || c[i].getId() === "addCustomerType") {
					c[i].setVisible(this.name === "customer");
				}
			}

			this.dataSheetDialog.setModel(this.getView().getModel());
			this.getView().addDependent(this.dataSheetDialog);
			this.dataSheetDialog.open();
		},

		//CLOSE
		onAddCloseButtonPress: function () {
			this.dataSheetDialog.close();
			this.dataSheetDialog.destroy();
		},

		//ADD
		onAddConfirmButtonPress: function () {
			this.create();
		},

		//NAV
		onNavigationButtonPress: function (oEvent) {
			var personPath = oEvent.getSource().getBindingContext().getPath(),
				person = personPath.split("/").slice(-1).pop();
			var id = -1;
			if (this.name === "customer") {
				id = JSON.parse(this.oCustomerModel.getJSON())[person].id;
				this.loRouter.navTo("Customer", {
					layout: fioriLibrary.LayoutType.MidColumnFullScreen,
					customer: id
				});
			} else if (this.name === "seller") {
				id = JSON.parse(this.oSellerModel.getJSON())[person].id;
				this.loRouter.navTo("Seller", {
					layout: fioriLibrary.LayoutType.MidColumnFullScreen,
					seller: id
				});
			}

		},

		//SEARCH
		onSearch: function (oEvent) {
			var SearchState = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				if (this.name === "customer") {
					SearchState = new Filter({
						filters: [
							new Filter("lastName", FilterOperator.Contains, sQuery),
							new Filter("firstName", FilterOperator.Contains, sQuery)
						],
						and: false
					});
				} else if (this.name === "seller") {
					SearchState = new Filter({
						filters: [
							new Filter("name", FilterOperator.Contains, sQuery)
						],
						and: false
					});
				}
			}
			this.oList.getBinding("items").filter(SearchState, "Application");
		},

		//SETTINGS
		onSettingsButtonPress: function () {
			if (!this.settingsDialog) {
				if (this.name === "customer") {
					this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.CustomersSettings", this);
				} else if (this.name === "seller") {
					this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.SellersSettings", this);
				}
				this.settingsDialog.setModel(this.getView().getModel());
				this.getView().addDependent(this.settingsDialog);
			}
			this.settingsDialog.open();
		},

		//CONFIRM SETTINGS
		handleConfirm: function (oEvent) {
			//SORT
			var mParams = oEvent.getParameters(),
				oBinding = this.oList.getBinding("items"),
				sPathSort,
				bDescending,
				aSorters = [],
				aFilters = [];

			sPathSort = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPathSort, bDescending));
			oBinding.sort(aSorters);
			//FILTER
			mParams.filterItems.forEach(function (oItem) {
				var key = oItem.getKey();
				var oFilter = new Filter("customerType", "EQ", key);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);
		},

		//BACKEND
		create: function () {}
	});
});