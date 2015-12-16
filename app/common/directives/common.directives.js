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

			function DashBoardSummaryController ($scope) {
			}

			function DashBoardAdMeasuresController ($scope) {
			}

			function DashBoardImpactRankingController ($scope) {
			}



}());