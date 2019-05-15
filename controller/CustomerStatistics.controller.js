sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("Project.Project.controller.CustomerStatistics", {
		onInit: function () {	
			this.oOrdersModel = new JSONModel();
			this.oOrdersModel.loadData("http://localhost:8080/GiftShop/api/orders", "", false);
			this.orders = this.oOrdersModel.getData();
			
			this.oCategoryModel = new JSONModel();
			this.oCategoryModel.loadData("http://localhost:8080/GiftShop/api/categories", "", false);
			this.categories = this.oCategoryModel.getData();
				
			this.oCustomersModel = new JSONModel();
			this.oCustomersModel.loadData("http://localhost:8080/GiftShop/api/customers", "", false);
			this.customers = this.oCustomersModel.getData();
			
			this.oRSModel = new JSONModel();
			this.oRSModel.loadData("http://localhost:8080/GiftShop/api/regionstatistics", "", false);
			this.regionstats = this.oRSModel.getData();
			
			this.loadCategoryChart();
			this.loadMap();
		},
		
		loadCategoryChart: function () {
			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var chartData = [];
			for (var i = 0; i < this.categories.length; i++) {
				var data = {
					"name": this.categories[i].name,
					"quantity": 0
				};	
				chartData.push(data);
			}
			for (i = 0; i < this.orders.length; i++) {
				var orderedProducts = this.orders[i].orderProductList;
				for (var j = 0; j < orderedProducts.length; j++) {
					var product = orderedProducts[j].product;
					for (var k = 0; k < chartData.length; k++) {
						if (chartData[k].name === product.category.name) {
							chartData[k].quantity = chartData[k].quantity + orderedProducts[j].quantity;
						}
					}
				}
			}
			var Model = new JSONModel();
			Model.setData(chartData);

			var categoryChart = this.getView().byId("categoryChart");
			categoryChart.setModel(Model);

			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: i18n.getText("Category"),
					value: "{name}"
				}],
				measures: [{
					name: i18n.getText("CategoryQuantity"),
					value: "{quantity}"
				}],
				data: {
					path: "/"
				}
			});
			categoryChart.setDataset(oDataset);
		},
		
		loadMap:function(){
			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			this.router = this.getOwnerComponent().getRouter();
			var oGeoMap = this.getView().byId("GeoMap");
			var oMapConfig = {
				"MapProvider": [{
					"name": "Openstreetmap",
					"type": "",
					"description": "",
					"tileX": "256",
					"tileY": "256",
					"maxLOD": "20",
					"centerPosition": "13.407965;52.517906",
					"copyright": i18n.getText("Copyright"),
					"Source": [{
						"id": "s1",
						"url": i18n.getText("GeoMap")
					}]
				}],
				"MapLayerStacks": [{
					"name": "DEFAULT",
					"MapLayer": {
						"name": "layer1",
						"refMapProvider": "Openstreetmap",
						"opacity": "1",
						"colBkgnd": "RGB(255,255,255)"
					}
				}]
			};

			oGeoMap.setMapConfiguration(oMapConfig);
			oGeoMap.setRefMapLayerStack("DEFAULT");

			this.oCSeatsModel = new JSONModel();
			this.oCSeatsModel.loadData(jQuery.sap.getModulePath("Project.Project.model", "/countrySeats.json"), null, false);
			this.cSeats = JSON.parse(this.oCSeatsModel.getJSON());

			this.oMapSpots = this.getView().byId("spots");
			this.oMapSpots.setModel(this.oCSeatsModel);
			
			var total = 0;
			for (var i = 0; i < this.regionstats.length; i++) {
				total = total + parseInt(this.regionstats[i].soldProducts, 10);
			}
			
			var items = this.oMapSpots.getItems();
			for (i = 0; i < items.length; i++) {
				for (var j = 0; j < this.regionstats.length; j++) {
					if (items[i].getKey() === this.regionstats[j].region) {
						var pers = (parseInt(this.regionstats[j].soldProducts, 10) / total * 100).toPrecision(2);
						items[i].getItem().setPercentage(parseFloat(pers,10));
					}
				}
			}
		}
	});
});