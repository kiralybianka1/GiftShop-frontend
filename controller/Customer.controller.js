sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./Client",
	"Project/Project/model/fulfillmentFormatter",
	"sap/m/MessageBox"
], function (Controller, JSONModel, Client, fulfillmentFormatter, MessageBox) {
	"use strict";

	return Client.extend("Project.Project.controller.Customer", {
		formatter: fulfillmentFormatter,
		name: "customer",
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("Customers").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Customer").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._customer = oEvent.getParameter("arguments").customer || this._customer || "0"; //id

			this.oCustomerModel = new JSONModel();
			//this.oCustomerModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/customers.json"), null, false);
			this.oCustomerModel.loadData("http://localhost:8080/GiftShop/api/customers", "", false);
			this.customers = this.oCustomerModel.getData();

			for (var i = 0; i < this.customers.length; i++) {
				if (parseInt(this._customer, 10) === parseInt(this.customers[i].id, 10)) {
					this.customer = this.customers[i];
				}
			}
			var Model = new JSONModel();
			Model.setData(this.customer);
			this.getView().setModel(Model);

			this.oCustomerOrdersModel = new JSONModel();
			//this.oCustomerOrdersModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/orders.json"), null, false);
			this.oCustomerOrdersModel.loadData("http://localhost:8080/GiftShop/api/customers/" + this._customer + "/orders", "", false);
			this.orders = this.oCustomerOrdersModel.getData();

			this.getView().byId("customersOrderList").setModel(this.oCustomerOrdersModel);

			var orderListItems = this.getView().byId("customersOrderList").getItems();
			for (i = 0; i < orderListItems.length; i++) {
				if (orderListItems[i].getPriority() === "Low") {
					orderListItems[i].setShowButtons(false);
				}
			}

		},

		onExit: function () {
			this.oRouter.getRoute("Customers").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("Customer").detachPatternMatched(this._onProductMatched, this);
		},

		//CHECK DATA
		checkCustomerData: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (data.firstName === "" || data.lastName === "" || data.address.country === "" || Number.isNaN(data.address.zipCode) || data.address
				.city === "" || data.address.street === "" || data.address.houseNumber === "" || data.customerType === "") {
				MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Empty"), {
					id: "idCustomerModifyErrorMessageBox"
				});
				return false;
			}
			if ((data.accountNumber).length < 24) {
				MessageBox.error(i18n.getText("CustomersModifyErrorMessage_AccountNumber"), {
					id: "idCustomerModifyErrorMessageBox"
				});
				return false;
			}
			var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!((data.email).match(rexMail))) {
				MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Email"), {
					id: "idCustomerModifyErrorMessageBox"
				});
				return false;
			}
			var rexPhone = /((?:\+?3|0)6)(?:-|\(|\s)?(\d{1,2})(?:-|\)|\s)?(\d{3})(?:-|\)|\s)?(\d{3,4}|)/;
			if (!((data.phone).match(rexPhone))) {
				MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Phone"), {
					id: "idCustomerModifyErrorMessageBox"
				});
				return false;
			}
			if (!Number.isNaN(data.address.floor)) {
				if (Number(data.address.floor) < -20 || Number(data.address.floor) > 20) {
					MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Floor"), {
						id: "idCustomerModifyErrorMessageBox"
					});
					return false;
				}
			}
			if (!Number.isNaN(data.address.door)) {
				if (Number(data.address.door) < 0 || Number(data.address.door) > 1000) {
					MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Door"), {
						id: "idCustomerModifyErrorMessageBox"
					});
					return false;
				}
			}
			if (!Number.isNaN(data.address.doorbell)) {
				if (Number(data.address.doorbell) < 0 || Number(data.address.doorbell) > 1000) {
					MessageBox.error(i18n.getText("CustomersModifyErrorMessage_Doorbell"), {
						id: "idCustomerModifyErrorMessageBox"
					});
					return false;
				}
			}
			return true;
		},
		//CHECK TO DELETE
		checkCustomerDelete: function () {
			if (this.orders.length > 0) {
				return false;
			}
			return true;
		},

		//DELETE
		onDeleteButtonPress: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var ok = this.checkCustomerDelete();
			if (ok) {
				var that = this;
				MessageBox.confirm(
					i18n.getText("ConfirmDelete"), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						id: "idConfirmDeleteMessageBox",
						onClose: function (sAnswer) {
							if (sAnswer === MessageBox.Action.YES) {
								that.deleteClient();
							}
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("CustomersDeleteErrorMessage"), {
					id: "idCustomerDeleteErrorMessageBox"
				});
			}
		},

		//BACKEND
		deleteClient: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var id = parseInt(this.customer.id, 10);
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/customers/" + id,
				dataType: "json",
				data: JSON.stringify(data),
				success: function (data, textStatus, jqXHR) {}
			});

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Customers", true);
			window.location.reload();
		},

		deleteManagement: function (id) {
			var i18n = this.getView().getModel("i18n").getResourceBundle()
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/orders/" + id,
				dataType: "json",
				data: JSON.stringify(data)
			});

			MessageBox.success(
				i18n.getText("OrderDeleteSuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		},

		modify: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var data = {
				"id": parseInt(this.customer.id, 10),
				"firstName": this.getView().byId("firstName").getValue(),
				"lastName": this.getView().byId("lastName").getValue(),
				"address": {
					"id": parseInt(this.customer.address.id, 10),
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
				"customerType": this.getView().byId("type").getSelectedKey(),
				"accountNumber": this.getView().byId("bankAccount").getValue()
			};
			var ok = this.checkCustomerData(data);
			if (ok) {
				jQuery.ajax({
					type: "PUT",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/customers",
					dataType: "json",
					data: JSON.stringify(data)
				});

				var that = this;
				MessageBox.success(
					i18n.getText("CustomerModifySuccess"), {
						id: "idCustomerModifySuccessMessageBox",
						onClose: function (sAnswer) {
							window.location.reload();
							that.getView().byId("idIconTabBarNoIcons").setSelectedKey("info");
						}
					}
				);
			}
		}
	});
});