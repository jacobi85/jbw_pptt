(function(){
	
	'use strict';
	var app = angular
	.module("mainResourceMock",
		["ngMockE2E"])

	app.run(function ($httpBackend) {

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

		})

}());