
/**
 * @ngdoc overview
 * @name pureprofiletechtestApp
 * @description
 * # created by Jacob on 9/12/2015
 * # pureprofiletechtestApp
 *
 * Main module of the application.
 */

(function(){
'use strict';

// Define a module

var app = angular
    .module('pureprofiletechtestApp', [
      'common.services',
      'common.directives',
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngRoute',
      'mainResourceMock',
      'angularCharts',
      'ngJustGage'
    ])
    .config(["$routeProvider", function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

}());

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


(function(){
	'use strict';

	angular
		.module('common.services', ['ngResource'])
 
}());
(function(){

	'use strict';
	angular
	.module('d3', [])
	.factory('d3Service', ['$document', '$q', '$rootScope', d3serviceController]);

	
	function d3serviceController ($document, $q, $rootScope) {
		var d = $q.defer();
		function onScriptLoad() {
		        // Load client in the browser
		        $rootScope.$apply(function() { d.resolve(window.d3); });
		    }
		      // Create a script tag with d3 as the source
		      // and call our onScriptLoad callback when it
		      // has been loaded
		      var scriptTag = $document[0].createElement('script');
		      scriptTag.type = 'text/javascript'; 
		      scriptTag.async = true;
		      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
		      scriptTag.onreadystatechange = function () {
		      	if (this.readyState == 'complete') onScriptLoad();
		      }
		      scriptTag.onload = onScriptLoad;
		      
		      var s = $document[0].getElementsByTagName('body')[0];
		      s.appendChild(scriptTag);
		      
		      return {
		      	d3: function() { return d.promise; }
		      };
		  }

		}());

(function(){
	
	'use strict';
	angular
		.module("common.services")
		.factory("mainResource",
				["$resource",
				mainResource])

		function mainResource($resource){
			return $resource('data');
		}

}());
(function(){
	
	'use strict';
	var app = angular
	.module("mainResourceMock",
		["ngMockE2E"])

	app.run(["$httpBackend", function ($httpBackend) {

		/* Mock data from a backend api server - replaces json file */
		var dataModel = [
		{
			"title": "Cottee's Dashboard",
			"details": [
			{ 	
				"title": "Last updated: ",
				"message": "",
				"icon": "glyphicon-repeat"
			},
			{ 	
				"title": "Viewing data for: ",
				"message": "January - June",
				"icon": "glyphicon-calendar"
			}
			]
		},
		[
		{
			"mainTitle": "Cottee's",
			"description": "Sample description about this board here",
			"buttons": [
			{
				"label": "all filters",
				"icon": true
			}
			],
			"details": {
				"validResponders": {label:"Valid responders", value: 90},
				"eliminated": {label:"Eliminated", value: 6},
				"flatliners": {label:"Flatliners", value: 2},
				"inconsistensy": {label:"Inconsistensy", value: 4},
				"completes": {label:"Completes", value: 96}
			} 
		},
		{
			"mainTitle": "Key Effective Ad measures",
			"buttons": [
			{
				"label": "chart filters",
				"icon": true
			},
			{
				"label": "export"
			}
			],
			"gauges": [
			{
				"title": "Attention",
				"questionLabel": "Will your ad get noticed?",
				"data": {
					"range": 10,
					"value": 6,
					"colors":  [{
						color : "#ff0000",
						lo : 0,
						hi : 25
					},{
						color : "#ff0000",
						lo : 25,
						hi : 50
					}, {
						color : "#ff0000",
						lo : 50,
						hi : 100
					}]
				}
			},
			{
				"title": "Brand Bonding",
				"questionLabel": "How does the ad make viewers feel about the brand?",
				"data": {
					"range": 10,
					"value": 7.2,
					"colors":  [{
						color : "#282b7c",
						lo : 0,
						hi : 25
					},{
						color : "#282b7c",
						lo : 25,
						hi : 50
					}, {
						color : "#282b7c",
						lo : 50,
						hi : 100
					}]
				}
			}
			]
		},
		{
			"mainTitle": "Add + Impact Ranking",
			"description": "When comparing this ad to the add+impact global database a tick indicates that this ad is in the top quartile of ads for that category.",
			"buttons": [
			{
				"label": "chart filters",
				"icon": true
			}
			],
			"data": [
								{
									"title": "Product Service", 
									"description": "Cordial (37 ads)",
									"score": 37,
									"color":"#282b7c"
								},
					            {
									"title": "Brand", 
									"description": "Cottees (15 ads)",
									"score": 72,
									"color":"#ff0000"
								},
								{
									"title": "Country", 
									"description": "Australia (1473 ads)",
									"score": 55,
									"color":"#282b7c"
								},
								{
									"title": "Category", 
									"description": "Cold drinks (324 ads)",
									"score": 55,
									"color":"#282b7c"
								}

					]
		}
		]
		];

		var dataUrl = "data";

		$httpBackend.whenGET(dataUrl).respond(dataModel);

		// Pass through any requests for application files
		$httpBackend.whenGET(/views/).passThrough();

		}])

}());
(function(){
	'use strict';

	var app = angular
				.module('common.directives', ['d3'])
 
 	app.directive('dashboardHeader', function(){


				return {
					restrict: "E",
					scope: { data: '=' },
					templateUrl: "views/sections/dashboardHeader.html",
					controller: DashBoardHeaderController,
					link: function (scope, elem, attrs) {

					}
				}
			});

			function DashBoardSummaryController ($scope) {
			}

			app.directive('dashboardSummary', function(){
				return {
					restrict: "E",
					templateUrl: "views/sections/dashboardSummary.html",
					replace: true,
					controller: DashBoardSummaryController,
					/*controllerAs: summary,*/
					link: function (scope, elem, attrs) {

					}
				}
			});

				app.directive('dashboardAdMeasures', function(){
				return {
					restrict: "E",
					templateUrl: "views/sections/dashboardAdMeasures.html",
					replace: true,
					controller: DashBoardAdMeasuresController,
					/*controllerAs: summary,*/
					link: function (scope, elem, attrs) {
					}
				}
			});

				app.directive('dashboardImpactRanking', ['d3Service', '$window', function(d3Service, $window) {
				return {
					restrict: "E",
					templateUrl: "views/sections/dashboardImpactRanking.html",
					replace: true,
					controller: DashBoardImpactRankingController,
					/*controllerAs: summary,*/
					link: function (scope, elem, attrs) {
						d3Service.d3().then(function(d3){

							var margin = parseInt(attrs.margin) || 10,
								barHeight = parseInt(attrs.barHeight) || 25,
								barWidth = 200,
								barPadding = parseInt(attrs.barPadding) || 25;
	
							scope.data = JSON.parse(attrs.data);


							var chartContainer = elem[0].children[1];

							var aside = document.createElement('aside');
								aside.classList.add("col-xs-5");
								aside.classList.add("col-md-5");

							var section = document.createElement('section');
								section.classList.add("col-xs-12");
								section.classList.add("col-sm-9");
								section.classList.add("col-md-10");
								section.classList.add("col-lg-10");

							var definitionList = document.createElement('dl');

							for(var i = 0; i < scope.data.length; i++){

								var definitionListHeading = document.createElement('dt');
								definitionListHeading.innerHTML = scope.data[i].title;

								var definitionListDesc = document.createElement('dd');
								definitionListDesc.innerHTML = scope.data[i].description;

								definitionList.appendChild(definitionListHeading);
								definitionList.appendChild(definitionListDesc);

							}

							aside.appendChild(definitionList);
							chartContainer.appendChild(aside);
							chartContainer.appendChild(section);
							
							var svg = d3.select(section)
											.append("svg")
											.attr("class", "chart")
											.attr("width", "100%");

							// Browser onresize event
							window.onresize = function() {
								scope.$apply();
							}

							

							// Watch for resize event
							scope.$watch(function() {
								return angular.element($window)[0].innerWidth;
							}, function () {
								scope.render(scope.data, section);
							});

							scope.render = function(data, section){
								// remove all previous items before render
							    svg.selectAll('*').remove();
							 
							    // If we don't pass any data, return out of the element
							    if (!data) return;
							 
							    // setup variables
							    var width = d3.select(chartContainer).node().offsetWidth,
							        // calculate the height
							        height = scope.data.length * (barHeight + barPadding),
							        // Use the category20() scale function for multicolor support
							        color = d3.scale.category10(1),
							        // our xScale
							        xScale = d3.scale.linear()
							          .domain([0, 100])
							          .range([0, "100%"]);
							 
							    // set the height based on the calculations above
							    svg.attr('height', height);
							 
							 	// create the ruler
								svg.selectAll("text.rule")
										    .data(xScale.ticks(10))
										  	.enter().append("svg:text")
										    .attr("class", "rule")
										    .attr("x", xScale)
										    .attr("y", 0)
										    .attr("dy", height + 20)
										    .attr("text-anchor", "middle")
										    .text(function(String) { return String + "%"});

							    //create the lines for the bar chart
							    svg.selectAll("line")
											.data(xScale.ticks(10))
											.enter().append("svg:line")
											.attr("x1", xScale)
											.attr("x2", xScale)
											.attr("y1", 0)
											.attr("y2", height)
											.attr("stroke", "#999");

								

							    //create the rectangles for the bar chart
							    svg.selectAll('rect')
							      .data(data).enter()
							        .append('rect')
							        .attr('height', barHeight)
							        .attr('width', barWidth)
							        .attr('x', 0)
							        .attr('y', function(d,i) {
							          return i * (barHeight + barPadding);
							        })
							        .attr('fill', function(d) { return d.color; })
							        .transition()
							          .duration(1000)
							          .attr('width', function(d) {
							            return xScale(d.score);
							          });

							    svg.append("svg:line")
							    		.attr("y1", 0)
							    		.attr("y2", height)
							    		.attr("stroke", "#000");




							}

						});
					}
				}
			}]);

			function DashBoardHeaderController ($scope) {
			}
			DashBoardHeaderController.$inject = ["$scope"];

			function DashBoardSummaryController ($scope) {
			}
			DashBoardSummaryController.$inject = ["$scope"];

			function DashBoardAdMeasuresController ($scope) {
			}
			DashBoardAdMeasuresController.$inject = ["$scope"];

			function DashBoardImpactRankingController ($scope) {
			}
			DashBoardImpactRankingController.$inject = ["$scope"];



}());