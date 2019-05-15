sap.ui.define([
	"Project/Project/model/invoicePriceFormatter"
], function (invoicePriceFormatter) {
	"use strict";

	QUnit.module("Számla részösszeg számítás");

	function productsQuantityTestCase(oOptions) {
		// Act
		var sState = invoicePriceFormatter.invoicePrice(oOptions.fValue, oOptions.fQuantity);

		// Assert
		oOptions.assert.strictEqual(sState, oOptions.expected, "Az állapot helyes volt.");
	}

	QUnit.test("Az árat (egész szám) szükséges összeszorozni a mennyiséggel (egész szám): (1500 * 2 = 3000)", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			fValue: 1500,
			fQuantity: 2,
			expected: 3000
		});
	});

	QUnit.test("Az árat (nem egész szám) szükséges összeszorozni a mennyiséggel (egész szám): (543.21 * 3 = 1629.63)", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			fValue: 543.21,
			fQuantity: 3,
			expected: 1629.63
		});
	});

});