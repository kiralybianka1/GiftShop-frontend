sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, MessageBox, History) {
	"use strict";

	return Controller.extend("Project.Project.controller.Product", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("Products").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Product").attachPatternMatched(this._onProductMatched, this);

			this.oCategoryModel = new JSONModel();
			//this.oCategoryModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/categories.json"), null, false);
			this.oCategoryModel.loadData("http://localhost:8080/GiftShop/api/categories", "", false);
			this.categories = JSON.parse(this.oCategoryModel.getJSON());

			this.getView().setModel(this.oCategoryModel, "category");
		},

		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";

			this.oProductsModel = new JSONModel();
			//this.oProductsModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/products.json"), null, false);
			this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products", "", false);
			this.products = this.oProductsModel.getData();

			for (var i = 0; i < this.products.length; i++) {
				if (parseInt(this._product, 10) === parseInt(this.products[i].id, 10)) {
					this.product = this.products[i];
				}
			}

			this.Model = new JSONModel();
			this.Model.setData(this.product);
			this.getView().setModel(this.Model);
		},

		//TAB
		handleIconTabBarSelect: function (oEvent) {
			if (oEvent.getParameter("key") === "modify") {
				this.getView().byId("footer").setVisible(true);
			} else {
				this.getView().byId("footer").setVisible(false);
			}
		},

		//SAVE
		onSaveButtonPress: function (oEvent) {
			this.modify();
		},

		//CANCEL
		onCancelButtonPress: function () {
			window.location.reload();
		},

		//BACK
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Products", true);
			}
		},

		//CHECK TO DELETE
		checkProductDelete: function () {
			this.oOrdersModel = new JSONModel();
			this.oOrdersModel.loadData("http://localhost:8080/GiftShop/api/orders", "", false);
			this.orders = this.oOrdersModel.getData();
			for (var i = 0; i < (this.orders).length; i++) {
				for (var j = 0; j < (this.orders[i].orderProductList).length; j++) {
					if (parseInt(this.orders[i].orderProductList[j].product.id, 10) === parseInt(this._product, 10)) {
						return false;
					}
				}
			}
			return true;
		},

		//DELETE
		onDeleteButtonPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var ok = this.checkProductDelete();
			if (ok) {
				var that = this;
				MessageBox.confirm(
					i18n.getText("ConfirmDelete"), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						id: "idConfirmDeleteMessageBox",
						onClose: function (sAnswer) {
							if (sAnswer === MessageBox.Action.YES) {
								that.deleteProduct();
							}
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("ProductDeleteErrorMessage"), {
					id: "idProductDeleteErrorMessageBox"
				});
			}
		},

		onExit: function () {
			this.oRouter.getRoute("Products").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Product").detachPatternMatched(this._onProductMatched, this);
		},

		//CHECK DATA
		checkProductData: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (data.name === "" || data.description === "" || Number.isNaN(data.netPrice) || Number.isNaN(data.quantity) || data.stockId ===
				"" || data.category === "") {
				MessageBox.error(i18n.getText("ProductModifyErrorMessage_Empty"), {
					id: "idProductModifyErrorMessageBox"
				});
				return false;
			}
			if (Number(data.netPrice) < 1 || Number(data.netPrice) > 100000) {
				MessageBox.error(i18n.getText("ProductModifyErrorMessage_NetPrice"), {
					id: "idProductModifyErrorMessageBox"
				});
				return false;
			}
			if (Number(data.quantity) < 0 || Number(data.quantity) > 100000 || !Number.isInteger(data.quantity)) {
				MessageBox.error(i18n.getText("ProductModifyErrorMessage_Quantity"), {
					id: "idProductModifyErrorMessageBox"
				});
				return false;
			}
			if ((data.stockId).length !== 7) {
				MessageBox.error(i18n.getText("ProductModifyErrorMessage_StockID"), {
					id: "idProductModifyErrorMessageBox"
				});
				return false;
			}
			return true;
		},

		//BACKEND
		deleteProduct: function () {
			var id = parseInt(this.product.id, 10);
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/products/" + id,
				dataType: "json",
				data: JSON.stringify(data)
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Products", true);
			window.location.reload();
		},

		modify: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			for (var i = 0; i < this.categories.length; i++) {
				if (parseInt(this.categories[i].id, 10) === parseInt(this.getView().byId("categorySelect").getSelectedKey(), 10)) {
					var category = this.categories[i];
				}
			}

			var data = {
				"id": parseInt(this.product.id, 10),
				"name": this.getView().byId("name").getValue(),
				"description": this.getView().byId("description").getValue(),
				"netPrice": this.getView().byId("netPrice").getValue(),
				"stockId": this.getView().byId("stockId").getValue(),
				"quantity": parseInt(this.getView().byId("quantity").getValue(), 10),
				"category": {
					"id": category.id,
					"name": category.name,
					"taxRate": category.taxRate
				}
			};
			var ok = this.checkProductData(data);
			if (ok) {
				jQuery.ajax({
					type: "PUT",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/products",
					dataType: "json",
					data: JSON.stringify(data)
				});
				MessageBox.success(
					i18n.getText("ProductModifySuccess"), {
						id: "idProductModifySuccesMessageBox",
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
				this.getView().byId("idIconTabBarNoIcons").setSelectedKey("info");
			}
		}
	});
});