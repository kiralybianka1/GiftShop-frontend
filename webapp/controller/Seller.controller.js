sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./Client",
	"Project/Project/model/fulfillmentFormatter",
	"Project/Project/model/productsQuantityFormatter",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Client, fulfillmentFormatter, productsQuantityFormatter, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Client.extend("Project.Project.controller.Seller", {
		formatter: [fulfillmentFormatter, productsQuantityFormatter],
		name: "seller",
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("Sellers").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Seller").attachPatternMatched(this._onProductMatched, this);

		},

		_onProductMatched: function (oEvent) {
			this._seller = oEvent.getParameter("arguments").seller || this._seller || "0";

			this.oSellerModel = new JSONModel();
			////this.oSellerModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/sellers.json"), null, false);
			this.oSellerModel.loadData("http://localhost:8080/GiftShop/api/sellers", "", false);
			this.sellers = this.oSellerModel.getData();

			for (var i = 0; i < this.sellers.length; i++) {
				if (parseInt(this._seller, 10) === parseInt(this.sellers[i].id, 10)) {
					this.seller = this.sellers[i];
				}
			}

			var Model = new JSONModel();
			Model.setData(this.seller);
			this.getView().setModel(Model);

			this.oSellersProductModel = new JSONModel();
			////this.oSellersProductModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/sellerProducts.json"), null, false);
			this.oSellersProductModel.loadData("http://localhost:8080/GiftShop/api/sellers/" + this.seller.id + "/products", "", false);
			this.sellersProducts = this.oSellersProductModel.getData();
			this.getView().byId("sellersProductList").setModel(this.oSellersProductModel);

		},

		onExit: function () {
			this.oRouter.getRoute("Sellers").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Seller").detachPatternMatched(this._onProductMatched, this);
		},

		//TAB
		handleIconTabBarSelect: function (oEvent) {
			if (oEvent.getParameter("key") === "modify") {
				this.getView().byId("footer").setVisible(true);
				this.getView().byId("saveButton").setVisible(true);
				this.getView().byId("cancelButton").setVisible(true);
				this.getView().byId("idSellerAddProduct").setVisible(false);
			} else if (oEvent.getParameter("key") === "products") {
				this.getView().byId("footer").setVisible(true);
				this.getView().byId("saveButton").setVisible(false);
				this.getView().byId("cancelButton").setVisible(false);
				this.getView().byId("idSellerAddProduct").setVisible(true);
			} else {
				this.getView().byId("footer").setVisible(false);
			}
		},

		//ADD PRODUCT TO SELLER
		onSellerProductButtonPress: function () {
			this.addSellerProductDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.AddSellerProduct", this);
			this.addSellerProductDialog.setModel(this.getView().getModel());
			this.getView().addDependent(this.addSellerProductDialog);
			this.addSellerProductDialog.open();
		},

		//ADD
		onAddSellerProductButtonPress: function () {
			this.createSellerProduct();
		},
		//CLOSE
		onCloseSellerProductButtonPress: function () {
			this.addSellerProductDialog.close();
			this.addSellerProductDialog.destroy();
		},

		//CHECK DATA
		checkSellerData: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (data.name === "" || data.address.country === "" || Number.isNaN(data.address.zipCode) || data.address.city === "" || data.address
				.street === "" || data.address.houseNumber === "") {
				MessageBox.error(i18n.getText("SellersModifyErrorMessage_Empty"));
				return false;
			}
			if ((data.accountNumber).length < 24) {
				MessageBox.error(i18n.getText("SellersModifyErrorMessage_AccountNumber"));
				return false;
			}
			var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!((data.email).match(rexMail))) {
				MessageBox.error(i18n.getText("SellersModifyErrorMessage_Email"));
				return false;
			}
			var rexPhone = /((?:\+?3|0)6)(?:-|\(|\s)?(\d{1,2})(?:-|\)|\s)?(\d{3})(?:-|\)|\s)?(\d{3,4}|)/;
			if (!((data.phone).match(rexPhone))) {
				MessageBox.error(i18n.getText("SellersModifyErrorMessage_Phone"));
				return false;
			}
			if (!Number.isNaN(data.address.floor)) {
				if (Number(data.address.floor) < -20 || Number(data.address.floor) > 20) {
					MessageBox.error(i18n.getText("SellersModifyErrorMessage_Floor"));
					return false;
				}
			}
			if (!Number.isNaN(data.address.door)) {
				if (Number(data.address.door) < 0 || Number(data.address.door) > 1000) {
					MessageBox.error(i18n.getText("SellersModifyErrorMessage_Door"));
					return false;
				}
			}
			if (!Number.isNaN(data.address.doorbell)) {
				if (Number(data.address.doorbell) < 0 || Number(data.address.doorbell) > 1000) {
					MessageBox.error(i18n.getText("SellersModifyErrorMessage_Doorbell"));
					return false;
				}
			}
			return true;
		},

		checkSellerProductData: function (data) {
			if (data.name === "" || Number.isNaN(data.price)) {
				return false;
			}
			if (Number(data.price) < 0 || Number(data.price) > 100000) {
				return false;
			}
			return true;
		},
		//CHECK TO DELETE
		checkSellerDelete: function () {
			this.oSellerInvoiceModel = new JSONModel();
			this.oSellerInvoiceModel.loadData("http://localhost:8080/GiftShop/api/sellerinvoices", "", false);
			this.sellerInvoices = this.oSellerInvoiceModel.getData();
			for (var i = 0; i < (this.sellerInvoices).length; i++) {
				if (parseInt(this.sellerInvoices[i].id, 10) === parseInt(this._seller)) {
					return false;
				}
			}
			return true;
		},
		//DELETE
		onDeleteButtonPress: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var ok = this.checkSellerDelete();
			if (ok) {
				var that = this;
				MessageBox.confirm(
					i18n.getText("ConfirmDelete"), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						onClose: function (sAnswer) {
							if (sAnswer === MessageBox.Action.YES) {
								that.deleteClient();
							}
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("SellerDeleteErrorMessage"), {
					id: "idSellerDeleteErrorMessageBox"
				});
			}

		},

		//BACKEND
		deleteClient: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var id = parseInt(this.seller.id, 10);
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/sellers/" + id,
				dataType: "json",
				data: JSON.stringify(data)
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Sellers", true);
			window.location.reload();
		},

		modify: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var data = {
				"id": parseInt(this.seller.id, 10),
				"name": this.getView().byId("name").getValue(),
				"address": {
					"id": parseInt(this.seller.address.id, 10),
					"country": this.getView().byId("country").getValue(),
					"zipCode": this.getView().byId("zip").getValue(),
					"city": this.getView().byId("city").getValue(),
					"street": this.getView().byId("street").getValue(),
					"houseNumber": this.getView().byId("houseNumber").getValue(),
					"floor": parseInt(this.getView().byId("floor").getValue(), 10),
					"door": parseInt(this.getView().byId("door").getValue(), 10),
					"doorbell": parseInt(this.getView().byId("doorbell").getValue(), 10)
				},
				"phone": this.getView().byId("phone").getValue(),
				"email": this.getView().byId("email").getValue(),
				"accountNumber": this.getView().byId("bankAccount").getValue()
			};
			var ok = this.checkSellerData(data);
			if (ok) {
				jQuery.ajax({
					type: "PUT",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/sellers",
					dataType: "json",
					data: JSON.stringify(data)
				});

				var that = this;
				MessageBox.success(
					i18n.getText("SellerModifySuccess"), {
						onClose: function (sAnswer) {
							window.location.reload();
							that.getView().byId("idIconTabBarNoIcons").setSelectedKey("info");
						}
					}
				);
			}
		},

		createSellerProduct: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore();

			var data = {
				"name": form.byId("addSellerProductName").getValue(),
				"description": form.byId("addSellerProductDescription").getValue(),
				"price": form.byId("addSellerProductPrice").getValue(),
				"seller": this.seller
			};
			var ok = this.checkSellerProductData(data);
			if (ok) {
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/sellerproducts",
					dataType: "json",
					data: JSON.stringify(data)
				});
				this.addSellerProductDialog.destroy();
				MessageBox.success(
					i18n.getText("ProductAddSuccess"), {
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("SellerProductAddErrorMessage"));
			}
		},

		modifySellerProduct: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore();
			var data = {
				"id": parseInt(form.byId("sellerProductId").getText(), 10),
				"name": form.byId("modifySellerProductName").getValue(),
				"description": form.byId("modifySellerProductDescription").getValue(),
				"price": form.byId("modifySellerProductPrice").getValue(),
				"seller": this.seller
			};
			var ok = this.checkSellerProductData(data);
			if (ok) {
				jQuery.ajax({
					type: "PUT",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/sellerproducts",
					dataType: "json",
					data: JSON.stringify(data)
				});
				this.onCloseModifySPButtonPress();
				MessageBox.success(
					i18n.getText("ProductModifySuccess"), {
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("SellerProductModifyErrorMessage"));
			}

		},

		deleteSellerProduct: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore();
			var id = parseInt(form.byId("sellerProductId").getText(), 10)
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/sellerproducts/" + id,
				dataType: "json",
				data: JSON.stringify(data)
			});
			this.onCloseModifySPButtonPress();
			MessageBox.success(
				i18n.getText("ProductDeleteSuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		},

		//TO MODIFY SELLERPRODUCT
		onSellerProductPress: function (oEvent) {
			var context = oEvent.getSource().getBindingContext();
			var id = parseInt(context.getProperty(null, context).id, 10);
			for (var i = 0; i < this.sellersProducts.length; i++) {
				if (this.sellersProducts[i].id === id) {
					var sellerProduct = this.sellersProducts[i];
					var Model = new JSONModel();
					Model.setData(sellerProduct);
				}
			}
			this.modifySellerProductDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.ModifySellerProduct", this);
			this.modifySellerProductDialog.setModel(Model);
			this.getView().addDependent(this.modifySellerProductDialog);
			this.modifySellerProductDialog.open();
		},

		//DELETE
		onDeleteSPButtonPress: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var that = this;
			MessageBox.confirm(
				i18n.getText("ConfirmDelete"), {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.deleteSellerProduct();
						}
					}
				}
			);
		},

		//MODIFY
		onModifySPButtonPress: function () {
			this.modifySellerProduct();
		},

		//CLOSE
		onCloseModifySPButtonPress: function () {
			this.modifySellerProductDialog.close();
			this.modifySellerProductDialog.destroy();
		},

		onProductSearch: function (oEvent) {
			var SearchState = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				SearchState = new Filter({
					filters: [new Filter("name", FilterOperator.Contains, sQuery)]
				});
			}
			this.getView().byId("sellersProductList").getBinding("items").filter(SearchState, "Application");
		}

	});
});