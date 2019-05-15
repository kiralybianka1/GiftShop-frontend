sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./Clients",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Clients, MessageBox, Fragment) {
	"use strict";

	return Clients.extend("Project.Project.controller.Customers", {
		name: "customer",
		onInit: function () {
			this.oCustomerModel = new JSONModel();
			//this.oCustomerModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/customers.json"), null, false);
			this.oCustomerModel.loadData("http://localhost:8080/GiftShop/api/customers", "", false);
			this.customers = this.oCustomerModel.getData();

			this.oList = this.getView().byId("customersList");
			this.oList.setModel(this.oCustomerModel);

			this.loRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onOpenViewSettings: function (oEvent) {
			var sDialogTab = "filter";
			if (oEvent.getSource() instanceof sap.m.Button) {
				var sButtonId = oEvent.getSource().getId();
				if (sButtonId.match("sort")) {
					sDialogTab = "sort";
				}
			}
			if (!this.byId("idCustomersSettings")) {
				Fragment.load({
					id: this.getView().getId(),
					name: "Project.Project.view.Fragments.CustomersSettings",
					controller: this
				}).then(function (oDialog) {
					oDialog.setModel(this.getView().getModel());
					this.getView().addDependent(oDialog);
					oDialog.open(sDialogTab);
				}.bind(this));
			} else {
				this.byId("idCustomersSettings").open(sDialogTab);
			}
		},

		//CHECK DATA
		checkCustomerData: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (data.firstName === "" || data.lastName === "" || data.address.country === "" || Number.isNaN(data.address.zipCode) || data.address
				.city === "" || data.address.street === "" || data.address.houseNumber === "" || data.customerType === "") {
				MessageBox.error(i18n.getText("CustomersAddErrorMessage_Empty"), {
					id: "idCustomerAddErrorMessageBox"
				});
				return false;
			}
			if ((data.accountNumber).length < 24) {
				MessageBox.error(i18n.getText("CustomersAddErrorMessage_AccountNumber"), {
					id: "idCustomerAddErrorMessageBox"
				});
				return false;
			}
			var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!((data.email).match(rexMail))) {
				MessageBox.error(i18n.getText("CustomersAddErrorMessage_Email"), {
					id: "idCustomerAddErrorMessageBox"
				});
				return false;
			}
			var rexPhone = /((?:\+?3|0)6)(?:-|\(|\s)?(\d{1,2})(?:-|\)|\s)?(\d{3})(?:-|\)|\s)?(\d{3,4}|)/;
			if (!((data.phone).match(rexPhone))) {
				MessageBox.error(i18n.getText("CustomersAddErrorMessage_Phone"), {
					id: "idCustomerAddErrorMessageBox"
				});
				return false;
			}
			if (!Number.isNaN(data.address.floor)) {
				if (Number(data.address.floor) < -20 || Number(data.address.floor) > 50) {
					MessageBox.error(i18n.getText("CustomersAddErrorMessage_Floor"), {
						id: "idCustomerAddErrorMessageBox"
					});
					return false;
				}
			}
			if (!Number.isNaN(data.address.door)) {
				if (Number(data.address.door) < 0 || Number(data.address.door) > 1000) {
					MessageBox.error(i18n.getText("CustomersAddErrorMessage_Door"), {
						id: "idCustomerAddErrorMessageBox"
					});
					return false;
				}
			}
			if (!Number.isNaN(data.address.doorbell)) {
				if (Number(data.address.doorbell) < 0 || Number(data.address.doorbell) > 1000) {
					MessageBox.error(i18n.getText("CustomersAddErrorMessage_Doorbell"), {
						id: "idCustomerAddErrorMessageBox"
					});
					return false;
				}
			}
			return true;
		},

		//CREATE
		create: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore();
			var data = {
				"firstName": form.byId("addCustomerFirstName").getValue(),
				"lastName": form.byId("addCustomerLastName").getValue(),
				"address": {
					"country": form.byId("addCountry").getValue(),
					"zipCode": form.byId("addZip").getValue(),
					"city": form.byId("addCity").getValue(),
					"street": form.byId("addStreet").getValue(),
					"houseNumber": form.byId("addHouseNumber").getValue(),
					"floor": parseInt(form.byId("addFloor").getValue(), 10),
					"door": parseInt(form.byId("addDoor").getValue(), 10),
					"doorbell": parseInt(form.byId("addDoorbell").getValue(), 10)
				},
				"phone": form.byId("addPhone").getValue(),
				"email": form.byId("addEmail").getValue(),
				"customerType": form.byId("addCustomerType").getSelectedKey(),
				"accountNumber": form.byId("addBankAccount").getValue()
			};
			var ok = this.checkCustomerData(data);
			if (ok) {
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/customers",
					dataType: "json",
					data: JSON.stringify(data)
				});
				this.dataSheetDialog.destroy();
				MessageBox.success(
					i18n.getText("CustomerAddSuccess"), {
						id: "idCustomerAddSuccessMessageBox",
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
			}
		}
	});
});