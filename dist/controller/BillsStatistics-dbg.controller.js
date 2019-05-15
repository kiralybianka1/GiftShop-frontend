sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/api/env/Format"
], function (Controller, JSONModel, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("Project.Project.controller.BillsStatistics", {
		onInit: function () {
			this.oProductsModel = new JSONModel();
			this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products", "", false);
			this.products = this.oProductsModel.getData();

			this.oSellerInvoiceModel = new JSONModel();
			this.oSellerInvoiceModel.loadData("http://localhost:8080/GiftShop/api/sellerinvoices", "", false);

			this.getView().setModel(this.oSellerInvoiceModel, "acI");

			this.loadExpenseChart();
			this.loadProductChart();
		},

		loadProductChart: function () {
			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();

			var chartData = [];
			for (var i = 0; i < this.products.length; i++) {
				var data = {
					"name": this.products[i].name,
					"netPrice": this.products[i].netPrice,
					"grossPrice": this.products[i].grossPrice,
					"grossSalePrice": this.products[i].grossSalePrice,
					"taxPrice": (this.products[i].grossPrice - this.products[i].netPrice),
					"incomePrice": (this.products[i].grossSalePrice - this.products[i].grossPrice)
				};
				chartData.push(data);
			}
			var Model = new JSONModel();
			Model.setData(chartData);

			var oVizFrame = this.getView().byId("productChart");
			this.getView().byId("productChart").setModel(Model);

			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: i18n.getText("ProductName"),
					value: "{name}"
				}],
				measures: [{
					name: i18n.getText("IncomePrice"),
					value: "{incomePrice}"
				}, {
					name: i18n.getText("TaxPrice"),
					value: "{taxPrice}"
				}, {
					name: i18n.getText("NetPrice"),
					value: "{netPrice}"
				}],
				data: {
					path: "/"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setVizType("stacked_bar");

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			oVizFrame.setVizProperties({
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: false
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					}
				},

				title: {
					visible: "false"
				}
			});

			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": [i18n.getText("IncomePrice"), i18n.getText("TaxPrice"), i18n.getText("NetPrice")]
				}),
				feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": [i18n.getText("ProductName")]
				});
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
		},

		loadExpenseChart: function () {
			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var oVizFrame = this.getView().byId("expenseChart");
			oVizFrame.setModel(this.oSellerInvoiceModel);

			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: i18n.getText("InvoiceDate"),
					value: "{invoiceDate}"
				}],
				measures: [{
					name: i18n.getText("InvoiceTotal"),
					value: "{totalPrice}"
				}],
				data: {
					path: "/"
				}
			});

			oVizFrame.setDataset(oDataset);
			oVizFrame.setVizType("line");

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					}
				},
				title: {
					visible: "false"
				}
			});

			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": [i18n.getText("InvoiceTotal")]
				}),
				feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": [i18n.getText("InvoiceDate")]
				});
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
		}
	});
});