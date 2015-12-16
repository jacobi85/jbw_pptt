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