sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/matchers/Properties","sap/ui/test/actions/Press"],function(e,a,t){"use strict";var s="Seller";e.createPageObjects({onTheSellerPage:{actions:{iPressOnModifyTab:function(){return this.waitFor({id:"idSellerModifyTab",viewName:s,actions:new t,errorMessage:"Az 'Eladó adatainak módosítása' fül nem található az oldalon."})},iPressOnProductsTab:function(){return this.waitFor({id:"idSellerProductsTab",viewName:s,actions:new t,errorMessage:"Az 'Eladó termékei' fül nem található az oldalon."})},iPressOnBack:function(){return this.waitFor({id:"idSellerPage",viewName:s,actions:new t,errorMessage:"Az vissza gomb nem található az oldalon."})}},assertions:{iShouldSeeTheApp:function(){return this.waitFor({viewName:s,success:function(){e.assert.ok(true,"Az eladó oldal megjelenik.")},errorMessage:"Az eladó oldal nem található."})},theTitleShouldDisplayTheName:function(t){return this.waitFor({success:function(){return this.waitFor({id:"idSellerPage",viewName:s,matchers:new a({title:t}),success:function(a){e.assert.ok(true," a megjegyzett oldalon volt.")},errorMessage:"Az eladó  "+t+" nem látható."})}})}}}})});