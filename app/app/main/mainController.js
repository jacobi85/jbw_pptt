/**
 * @ngdoc function
 * @name pureprofiletechtestApp.controller:MainController
 * @description
 * # MainController
 * Controller of the pureprofiletechtestApp
 */

(function(){
'use strict';

var app = angular
			.module('pureprofiletechtestApp')
			.controller('MainController', ['mainResource','$filter', MainController]);


			function MainController(mainResource, $filter) {
				var vm = this;

					mainResource.query(function(data){
						/* Related header data from the api service */
						vm.headerData = data[0];
						vm.headerData.details[0].message = $filter('date')(new Date(), 'dd MMMM yyyy');
					
						/* Related dashboard summary data from the api service */
						vm.summaryData = data[1][0];

						/* Related dashboard gauge data from the api service */
						vm.gaugeData = data[1][1];

						/* Related dashboard impact ranking data from the api service */
						vm.impactrankingData = data[1][2];

					});

			};

		

}())

