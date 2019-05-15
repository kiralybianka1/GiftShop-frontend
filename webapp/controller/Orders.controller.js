sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Filter, FilterOperator, MessageBox, MessageToast, Sorter, Fragment) {
	"use strict";

	return Controller.extend("Project.Project.controller.Orders", {
		onInit: function () {
			this.oOrdersModel = new JSONModel();
			//this.oOrdersModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/orders.json"), null, false);
			this.oOrdersModel.loadData("http://localhost:8080/GiftShop/api/orders", "", false);
			this.orders = this.oOrdersModel.getData();

			this.oProductsModel = new JSONModel();
			//this.oProductsModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/products.json"), null, false);
			this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products", "", false);
			this.products = this.oProductsModel.getData();

			this.oCustomersModel = new JSONModel();
			//this.oCustomersModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/customers.json"), null, false);
			this.oCustomersModel.loadData("http://localhost:8080/GiftShop/api/customers", "", false);
			this.customers = this.oCustomersModel.getData();

			this.customerSelect = this.getView().byId("customerSelect");
			this.customerSelect.setModel(this.oCustomersModel);

			this.productSelect = this.getView().byId("productSelect");
			this.productSelect.setModel(this.oProductsModel);

			this.oTable = this.getView().byId("ordersTable");
			this.oTable.setModel(this.oOrdersModel);

			this.getView().byId("ordersDate").setDateValue(new Date());

			var orderListItems = this.getView().byId("ordersTable").getItems();
			for (var i = 0; i < orderListItems.length; i++) {
				var context = orderListItems[i].getBindingContext();
				var order = context.getProperty(null, context);
				var fulfillDate = order.fulfillDate;
				if (fulfillDate === null) {
					var cells = orderListItems[i].getCells();
					cells[4].destroy();
					var that = this;
					orderListItems[i].addCell(new sap.m.DatePicker({
						displayFormat: "short",
						change: function (oEvent) {
							that.confirmFulfillDate(order, oEvent.getSource().getValue());
						}
					}));
				}
			}
		},

		//TAB
		handleIconTabBarSelect: function (oEvent) {
			if (oEvent.getParameter("key") === "info") {
				this.getView().byId("footer").setVisible(true);
			} else {
				this.getView().byId("footer").setVisible(false);
			}
		},

		//CONFIRM FULFILL
		confirmFulfillDate: function (order, date) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var that = this;
			MessageBox.confirm(
				i18n.getText("ConfirmFulfillModify"), {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.modify(order, date);
						}
					}
				}
			);
		},

		//DELETE
		onDeleteButtonPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var selectedTableElements = this.oTable.getSelectedItems();
			if (selectedTableElements.length === 0) {
				MessageBox.error(i18n.getText("OrderDeleteErrorMessage"));
			} else {
				var ok = this.checkOrderDelete(selectedTableElements);
				if (ok) {
					var that = this;
					MessageBox.confirm(
						i18n.getText("ConfirmDelete"), {
							actions: [MessageBox.Action.YES, MessageBox.Action.NO],
							onClose: function (sAnswer) {
								if (sAnswer === MessageBox.Action.YES) {
									that.deleteManagement(selectedTableElements);
								}
							}
						}
					);
				} else {
					MessageBox.error(i18n.getText("OrderDeleteErrorMessage"), {
						id: "idOrderDeleteErrorMessageBox"
					});
				}
			}
		},

		//SEARCH
		onSearch: function (oEvent) {
			var SearchState = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				SearchState = new Filter({
					filters: [
						new Filter("customer/lastName", FilterOperator.Contains, sQuery),
						new Filter("customer/firstName", FilterOperator.Contains, sQuery)
					],
					and: false
				});
			}
			this.oTable.getBinding("items").filter(SearchState, "Application");
		},

		//SETTINGS
		onSettingsButtonPressed: function () {
			if (!this.settingsDialog) {
				this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.OrdersSettings", this);
				this.settingsDialog.setModel(this.oOrdersModel);
				this.getView().addDependent(this.settingsDialog);
			}
			this.settingsDialog.open();
		},

		onOpenViewSettings: function (oEvent) {
			var sDialogTab = "filter";
			if (oEvent.getSource() instanceof sap.m.Button) {
				var sButtonId = oEvent.getSource().getId();
				if (sButtonId.match("sort")) {
					sDialogTab = "sort";
				}
			}
			if (!this.byId("idOrdersSettings")) {
				Fragment.load({
					id: this.getView().getId(),
					name: "Project.Project.view.Fragments.OrdersSettings",
					controller: this
				}).then(function (oDialog) {
					oDialog.setModel(this.getView().getModel());
					this.getView().addDependent(oDialog);
					oDialog.open(sDialogTab);
				}.bind(this));
			} else {
				this.byId("idOrdersSettings").open(sDialogTab);
			}
		},

		//SETTINGSCONFIRM
		handleConfirm: function (oEvent) {
			//SORT
			var mParams = oEvent.getParameters(),
				oBinding = this.oTable.getBinding("items"),
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
				if (key === "fulfilled") {
					aFilters.push(new Filter("fulfillDate", "NE", null));
				} else {
					aFilters.push(new Filter("fulfillDate", "EQ", null));
				}
			});
			oBinding.filter(aFilters);
		},

		//CUSTOMER QUICKVIEW
		onCustomerPress: function (oEvent) {
			var orderId = oEvent.getSource().getParent().getCells()[0].getTitle();
			for (var i = 0; i < this.orders.length; i++) {
				if (parseInt(this.orders[i].id, 10) === parseInt(orderId, 10)) {
					this.order = this.orders[i];
				}
			}
			var orderModel = new JSONModel();
			orderModel.setData(this.order);

			if (this.orderQuickView) {
				this.orderQuickView.destroy();
			}

			this.orderQuickView = sap.ui.xmlfragment("Project.Project.view.Fragments.CustomerQuickView", this);
			this.orderQuickView.setModel(orderModel);
			this.getView().addDependent(this.orderQuickView);

			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this.orderQuickView.openBy(oButton);
			});
		},

		//PRODUCTS QUICKVIEW
		onProductsPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var context = oEvent.getSource().getBindingContext();
			var clickedManagement = context.getProperty(null, context);
			var Model = new JSONModel();
			Model.setData(clickedManagement);
			var title = i18n.getText("CustomerOrderProducts");
			var items = {
				path: "/orderProductList/",
				template: new sap.m.StandardListItem({
					title: "{product/name}",
					info: "{quantity}" + " " + i18n.getText("QuantityType")
				})
			};

			this.resizableDialog = new sap.m.Dialog({
				title: title,
				contentWidth: "550px",
				contentHeight: "300px",
				resizable: true,
				content: new sap.m.List({
					items: items
				}),
				beginButton: new sap.m.Button({
					text: i18n.getText("Close"),
					press: function () {
						this.resizableDialog.close();
						this.resizableDialog.destroy();
					}.bind(this)
				})
			});
			this.resizableDialog.setModel(Model);
			this.getView().addDependent(this.resizableDialog);

			this.resizableDialog.open();
		},

		//ADD
		//1.STEP
		customerValidation: function () {
			if (this.getView().byId("customerSelect").getSelectedItem() !== null) {
				this.getView().byId("orderWizard").validateStep(this.getView().byId("customerWizard"));
			} else {
				this.getView().byId("orderWizard").invalidateStep(this.getView().byId("customerWizard"));
			}
		},

		//2.STEP
		onProductAddButtonPress: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (this.getView().byId("productSelect").getSelectedItem() !== null) {

				var selectedProductId = this.getView().byId("productSelect").getSelectedItem().getKey();
				var selectedProductName = this.getView().byId("productSelect").getSelectedItem().getText();
				var productQuantity = this.getView().byId("productQuantity").getValue();

				var listItems = this.getView().byId("productsList").getItems();

				//REPEAT
				var repeat = false;
				for (var i = 0; i < listItems.length; i++) {
					if (listItems[i].getLabel() === (selectedProductName + " (ID: " + selectedProductId + ")")) {
						var oldQuantity = listItems[i].getContent()[0].getValue();
						var newQuantity = oldQuantity + productQuantity;
						if (newQuantity <= listItems[i].getContent()[0].getMax()) {
							listItems[i].getContent()[0].setValue(newQuantity);
						} else {
							MessageBox.error(i18n.getText("OrderAddErrorMessage_MaxProduct"));
							listItems[i].getContent()[0].setValue(listItems[i].getContent()[0].getMax());
						}
						repeat = true;
					}
				}
				//NOREPEAT
				if (!repeat) {
					var max = 0;
					for (i = 0; i < this.products.length; i++) {
						if (parseInt(this.products[i].id, 10) === parseInt(selectedProductId, 10)) {
							max = this.products[i].quantity;
						}
					}
					this.getView().byId("productsList").addItem(new sap.m.InputListItem({
						label: selectedProductName + " (ID: " + selectedProductId + ")",
						content: [new sap.m.StepInput({
								value: productQuantity,
								width: "30%",
								min: 1,
								max: parseInt(max, 10)
							}),
							new sap.m.ObjectIdentifier({
								title: selectedProductId,
								visible: false
							})
						]
					}));
				}
				this.getView().byId("productQuantity").setValue(1);
			} else {
				MessageBox.error(i18n.getText("OrderAddErrorMessage_Product"));
			}
			this.productsValidation();
		},

		handleProductDelete: function (oEvent) {
			this.getView().byId("productsList").removeItem(oEvent.getParameter("listItem"));
			this.productsValidation();
		},

		productsValidation: function () {
			var listItems = this.getView().byId("productsList").getItems();
			if (listItems.length > 0) {
				this.getView().byId("orderWizard").validateStep(this.getView().byId("productWizard"));
			} else {
				this.getView().byId("orderWizard").invalidateStep(this.getView().byId("productWizard"));

			}
		},

		//3.STEP
		orderCompletedHandler: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();

			var customer = this.getView().byId("customerSelect").getSelectedItem().getText();
			var products = this.getView().byId("productsList").getItems();
			var productsText = "";

			for (var i = 0; i < products.length; i++) {
				productsText += products[i].getContent()[0].getValue() + i18n.getText("QuantityType") + " " + products[i].getLabel() + ", ";
			}
			var ordersDate = this.getView().byId("ordersDate").getValue();
			var ordersFulfillDate = this.getView().byId("ordersFulfillDate").getValue();
			var bill = this.getView().byId("bill").getSelectedKey();
			var billText = i18n.getText(bill);

			this.model = new sap.ui.model.json.JSONModel();
			this.model.setProperty("/customer", customer);
			this.model.setProperty("/products", productsText);
			this.model.setProperty("/ordersDate", ordersDate);
			this.model.setProperty("/ordersFulfillDate", ordersFulfillDate);
			this.model.setProperty("/bill", billText);

			if (!this.reviewPage) {
				this.reviewPage = sap.ui.xmlfragment("Project.Project.view.Fragments.ReviewPage", this);
				this.reviewPage.setModel(this.model);
				this.getView().addDependent(this.reviewPage);
			}
			this.reviewPage.open();
		},

		//4.STEP
		onSendOrderButtonPress: function () {
			this.create();
			this.getView().byId("customerSelect").setValue();
			this.clearContent(this.getView().byId("addProductForm").getContent());
			this.clearContent(this.getView().byId("addOrderForm").getContent());

			this.getView().byId("productsList").removeAllItems();
			this.getView().byId("ordersDate").setDateValue(new Date());
			this.getView().byId("bill").setSelectedKey("Yes");

			this.getView().byId("orderWizard").invalidateStep(this.getView().byId("customerWizard"));
			this.getView().byId("orderWizard").discardProgress(this.byId("customerWizard"));

			this.reviewPage.close();
		},

		onCancelOrderButtonPress: function () {
			this.reviewPage.close();
		},

		//CLEAR
		clearContent: function (content) {
			for (var i = 0; i < content.length; i++) {
				if (content[i].setValue) {
					content[i].setValue("");
				}
				if (content[i].getContent) {
					this.clearContent(content[i].getContent());
				}
			}
		},

		checkOrderDelete: function (selectedTableElements) {
			for (var i = 0; i < selectedTableElements.length; i++) {
				var id = selectedTableElements[i].getCells()[0].getTitle();
				for (var j = 0; j < this.orders.length; j++) {
					if (parseInt(this.orders[j].id, 10) === parseInt(id, 10)) {
						if (this.orders[j].fulfillDate === null) {
							return true;
						}
					}
				}
			}
			return false;
		},

		//BACKEND
		deleteManagement: function (selectedTableElements) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();

			for (var i = 0; i < selectedTableElements.length; i++) {
				var id = selectedTableElements[i].getCells()[0].getTitle();
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
			}
			MessageBox.success(
				i18n.getText("OrderDeleteSuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		},

		modify: function (order, date) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			order.fulfillDate = date.replace(/\. /g, '-').replace(/\./g, '');
			jQuery.ajax({
				type: "PUT",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/orders",
				dataType: "json",
				data: JSON.stringify(order),
			});
			MessageBox.success(
				i18n.getText("OrderModifySuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		},

		create: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			for (var i = 0; i < this.customers.length; i++) {
				if (parseInt(this.customers[i].id, 10) === parseInt(this.getView().byId("customerSelect").getSelectedKey(), 10)) {
					var customer = this.customers[i];
				}
			}
			var listItems = this.getView().byId("productsList").getItems();
			var productsOrder = [];

			for (var i = 0; i < listItems.length; i++) {
				for (var j = 0; j < this.products.length; j++) {
					if (parseInt(listItems[i].getContent()[1].getTitle(), 10) === parseInt(this.products[j].id, 10)) {
						var p = this.products[j];
						var product = {
							"product": {
								"id": p.id,
								"name": p.name,
								"description": p.description,
								"category": {
									"id": p.category.id,
									"name": p.category.name,
									"taxRate": p.category.taxRate
								},
								"netPrice": p.netPrice,
								"quantity": p.quantity,
								"stockId": p.stockId
							},
							"quantity": parseInt(listItems[i].getContent()[0].getValue(), 10)
						};
						productsOrder.push(product);
					}
				}
			}
			var fulfillDate = null;
			if (this.getView().byId("ordersFulfillDate").getValue() !== "") {
				fulfillDate = this.getView().byId("ordersFulfillDate").getValue().replace(/\. /g, '-').replace(/\./g, '');
			}
			var data = {
				"customer": {
					"id": parseInt(customer.id, 10),
					"firstName": customer.firstName,
					"lastName": customer.lastName,
					"address": {
						"id": customer.address.id,
						"country": customer.address.country,
						"zipCode": customer.address.zip,
						"city": customer.address.city,
						"street": customer.address.street,
						"houseNumber": customer.address.houseNumber,
						"floor": customer.address.floor,
						"door": customer.address.door,
						"doorbell": customer.address.doorbell
					},

					"phone": customer.phone,
					"email": customer.email,
					"customerType": customer.customerType,
					"accountNumber": customer.accountNumber

				},
				"orderDate": this.getView().byId("ordersDate").getValue().replace(/\. /g, '-').replace(/\./g, ''),
				"fulfillDate": fulfillDate,
				"orderProductList": productsOrder
			};
			jQuery.ajax({
				type: "POST",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/orders",
				dataType: "json",
				data: JSON.stringify(data)
			});

			MessageBox.success(
				i18n.getText("OrderAddSuccess"), {
					id: "idOrderAddSuccessMessageBox",
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		}
	});
});