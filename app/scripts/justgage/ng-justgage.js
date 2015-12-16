angular.module('ngJustGage', [])
  .directive('justGage', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: {
        id: '@',
        className: '@',
        min: '@',
        max: '@',
        decimals: '=?',
        title: '@',
        value: '@',
        valueFontColor: '@',
        levelColors: '@',
        options: '=',
        valueMinFontSize: '=?',
        relativeGaugeSize: '=?'

      },
      template: '<div id="{{id}}-justgage" class="{{className}}"></div>',
      link: function (scope, element, attrs) {
        $timeout(function () {
  

      /* parse json array for colors */
       
       var customSectors = [];
       if (typeof attrs.customSectors !== 'undefined') {
            customSectors = JSON.parse(attrs.customSectors);
        }
          var options = {
            id: scope.id + '-justgage',
            min: scope.min || 0,
            max: scope.max || 100,
            title: scope.title,
            value: scope.value,
            decimals: scope.decimals || 0,
            customSectors: customSectors,
            valueFontColor: scope.valueFontColor || "#282b7c",
            valueMinFontSize: scope.valueMinFontSize || 16,
            relativeGaugeSize: angular.isDefined(scope.relativeGaugeSize) ? scope.relativeGaugeSize : false
          };

          if (scope.options) {
              for (var key in scope.options) {
                  options[key] = scope.options[key];
              }
          }

          var graph = new JustGage(options);

          scope.$watch('max', function (updatedMax) {
            if (updatedMax !== undefined) {
              graph.refresh(scope.value, updatedMax);
            }
          }, true);

          scope.$watch('value', function (updatedValue) {
            if (updatedValue !== undefined) {
              graph.refresh(updatedValue);
            }
          }, true);
        });
      }
    };
  }]);
