sap.ui.define([
	"Project/Project/model/fulfillmentFormatter"
], function (fulfillmentFormatter) {
	"use strict";

	QUnit.module("Teljesítési dátum állapot fromázó");

	function productsQuantityTestCase(oOptions) {
		// Act
		var sState = fulfillmentFormatter.fulfillState(oOptions.fulfillDate);

		// Assert
		oOptions.assert.strictEqual(sState, oOptions.expected, "Az állapot helyes volt.");
	}

	QUnit.test("A megrendelések teljesítésének dátuma a teljesítettség alapján van formázva. Ha van teljesítési dátum a megrendelés zöld színű. Ehhez a várt visszatérési érték: 'Low'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			fulfillDate: "2019-01-01",
			expected: "Low"
		});
	});

	QUnit.test("A megrendelések teljesítésének dátuma a teljesítettség alapján van formázva. Ha nincs teljesítési dátum a megrendelés piros színű. Ehhez a várt visszatérési érték: 'High'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			fulfillDate: null,
			expected: "High"
		});
	});

});