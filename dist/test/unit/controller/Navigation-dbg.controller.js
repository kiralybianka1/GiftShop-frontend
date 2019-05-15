/*global QUnit*/

sap.ui.define([
	"Project/Project/controller/Navigation.controller"
], function (oController) {
	"use strict";

	QUnit.module("Navigáció");

	QUnit.test("A navigáció tesztelése", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});