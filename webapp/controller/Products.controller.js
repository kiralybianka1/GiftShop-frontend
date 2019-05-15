sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"Project/Project/model/productsQuantityFormatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/Dialog",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/f/library",
	"sap/ui/core/Fragment"
], function (Controller, productsQuantityFormatter, JSONModel, Filter,
	FilterOperator, Sorter, Dialog, Export, ExportTypeCSV, MessageBox, fioriLibrary, Fragment) {
	"use strict";

	return Controller.extend("Project.Project.controller.Products", {
		formatter: productsQuantityFormatter,

		onInit: function () {
			this.oTable = this.getView().byId("productsTable");

			this.oProductsModel = new JSONModel();
			//this.oProductsModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/products.json"), null, false);
			this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products", "", false);
			this.products = this.oProductsModel.getData();

			this.oTable.setModel(this.oProductsModel);

			this.oCategoryModel = new JSONModel();
			//this.oCategoryModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/categories.json"), null, false);
			this.oCategoryModel.loadData("http://localhost:8080/GiftShop/api/categories", "", false);
			this.categories = JSON.parse(this.oCategoryModel.getJSON());

			this.loRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		//SEARCH
		onSearch: function (oEvent) {
			var SearchState = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				SearchState = new Filter({
					filters: [new Filter("name", FilterOperator.Contains, sQuery)]
				});
			}
			this.oTable.getBinding("content").filter(SearchState, "Application");
		},

		//EXPORT
		onDataExportButtonPressed: sap.m.Table.prototype.exportData || function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var oExport = new Export({
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),
				models: this.oTable.getModel(),
				rows: {
					path: "/"
				},
				columns: [{
					name: i18n.getText("ProductID"),
					template: {
						content: "{id}"
					}
				}, {
					name: i18n.getText("ProductName"),
					template: {
						content: "{name}"
					}
				}, {
					name: i18n.getText("Description"),
					template: {
						content: "{description}"
					}
				}, {
					name: i18n.getText("Category"),
					template: {
						content: "{category/name}"
					}
				}, {
					name: i18n.getText("NetPrice"),
					template: {
						content: "{netPrice}"
					}
				}, {
					name: i18n.getText("GrossPrice"),
					template: {
						content: "{grossPrice}"
					}
				}, {
					name: i18n.getText("Quantity"),
					template: {
						content: "{quantity}"
					}
				}, {
					name: i18n.getText("StockID"),
					template: {
						content: "{stockId}"
					}
				}]
			});
			oExport.saveFile().catch(function (oError) {
				MessageBox.error(i18n.getText("ProductDownloadErrorMessage") + oError);
			}).then(function () {
				oExport.destroy();
			});
		},

		//SETTINGS
		onOpenViewSettings: function (oEvent) {
			var sDialogTab = "filter";
			if (oEvent.getSource() instanceof sap.m.Button) {
				var sButtonId = oEvent.getSource().getId();
				if (sButtonId.match("sort")) {
					sDialogTab = "sort";
				}
			}
			if (!this.byId("idProductsSettings")) {
				Fragment.load({
					id: this.getView().getId(),
					name: "Project.Project.view.Fragments.ProductsSettings",
					controller: this
				}).then(function (oDialog) {
					oDialog.setModel(this.oCategoryModel, "category");
					this.getView().addDependent(oDialog);
					oDialog.open(sDialogTab);
				}.bind(this));
			} else {
				this.byId("idProductsSettings").open(sDialogTab);
			}
		},

		//SETTINGSCONFIRM
		handleConfirm: function (oEvent) {
			//SORT
			var mParams = oEvent.getParameters(),
				oBinding = this.oTable.getBinding("content"),
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
				var oFilter = new Filter("category/name", "EQ", key);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);
		},

		//NAVTOPRODUCT
		onProductPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext().getPath(),
				product = productPath.split("/").slice(-1).pop();
			var id = JSON.parse(this.oProductsModel.getJSON())[product].id;
			this.loRouter.navTo("Product", {
				layout: fioriLibrary.LayoutType.MidColumnFullScreen,
				product: id
			});
		},

		//ADDPRODUCT
		onAddButtonPress: function () {
			this.addProductDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.AddProduct", this);
			this.addProductDialog.setModel(this.oCategoryModel, "category");
			this.getView().addDependent(this.addProductDialog);
			this.addProductDialog.open();
		},

		//ADD
		onAddProductButtonPress: function () {
			this.create();
		},

		//CLOSE
		onCloseProductButtonPress: function () {
			this.addProductDialog.close();
			this.addProductDialog.destroy();
		},

		//CHECK DATA
		checkProductData: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (data.name === "" || data.description === "" || Number.isNaN(data.netPrice) || Number.isNaN(data.quantity) || data.stockId ===
				"" || data.category === "") {
				MessageBox.error(i18n.getText("ProductAddErrorMessage_Empty"), {
					id: "idProductAddErrorMessageBox"
				});
				return false;
			}
			if (Number(data.netPrice) < 1 || Number(data.netPrice) > 100000) {
				MessageBox.error(i18n.getText("ProductAddErrorMessage_NetPrice"), {
					id: "idProductAddErrorMessageBox"
				});
				return false;
			}
			if (Number(data.quantity) < 0 || Number(data.quantity) > 100000 || !Number.isInteger(data.quantity)) {
				MessageBox.error(i18n.getText("ProductAddErrorMessage_Quantity"), {
					id: "idProductAddErrorMessageBox"
				});
				return false;
			}
			if ((data.stockId).length !== 7) {
				MessageBox.error(i18n.getText("ProductAddErrorMessage_StockID"), {
					id: "idProductAddErrorMessageBox"
				});
				return false;
			}
			return true;
		},

		//BACKEND
		create: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore();
			for (var i = 0; i < this.categories.length; i++) {
				if (parseInt(this.categories[i].id, 10) === parseInt(form.byId("addProductCategorySelect").getSelectedKey(), 10)) {
					var category = this.categories[i];
				}
			}

			var data = {
				"name": form.byId("addProductName").getValue(),
				"description": form.byId("addProductDescription").getValue(),
				"netPrice": form.byId("addProductNetPrice").getValue(),
				"quantity": parseInt(form.byId("addProductQuantity").getValue(), 10),
				"stockId": form.byId("addProductStockId").getValue(),
				"category": {
					"id": category.id,
					"name": category.name,
					"taxRate": category.taxRate
				}
			};
			var ok = this.checkProductData(data);
			if (ok) {
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/products",
					dataType: "json",
					data: JSON.stringify(data)
				});
				this.addProductDialog.destroy();
				MessageBox.success(
					i18n.getText("ProductAddSuccess"), {
						id: "idProductAddSuccessMessageBox",
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
			}
		}
	});
});