'use strict';

/**
 * @ngdoc function
 * @name poliApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the poliApp
 */
angular.module('poliApp')
.controller('MainCtrl', function ($scope, $timeout, $http, api_host, Page) {
    $scope.setup_components = function() {

            jQuery('a[href*=#]').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = jQuery(this.hash);
                    target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        jQuery('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
            
            $scope.grid = jQuery('.grid').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry'
            });

            var filterFns = {
                numberGreaterThan50: function() {
                  var number = jQuery(this).find('.number').text();
                  return parseInt( number, 10 ) > 50;
                },

                ium: function() {
                  var name = jQuery(this).find('.name').text();
                  return name.match( /iumjQuery/ );
                }
            };
            
            jQuery('.filters-button-group').on( 'click', 'button', function() {
                var filterValue = jQuery( this ).attr('data-filter');
                filterValue = filterFns[ filterValue ] || filterValue;
                $scope.grid.isotope({ filter: filterValue });
            });
            
            jQuery('.button-group').each( function( i, buttonGroup ) {
                var jQuerybuttonGroup = jQuery( buttonGroup );
                jQuerybuttonGroup.on( 'click', 'button', function() {
                  jQuerybuttonGroup.find('.is-checked').removeClass('is-checked');
                  jQuery( this ).addClass('is-checked');
                });
            });
          
            $scope.grid = jQuery('.grid').masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer'
            });

            /*
            $scope.grid.imagesLoaded().progress( function() {
                $scope.grid.masonry();
            });  
            */

    };

    $scope.arrange_items = [];
    $scope.items = [];

    $scope.entities = ['organizations', 'products', 'activities', 'centers'];

    $http.get(api_host+'/api/pages/home').success(function(page) {
        $scope.home = page;

        var data = $scope.home;

        _.each($scope.entities , function(entity) {
            _.each(data[entity], function(item) {
                $scope.items.push(item);
            });
        });

        $scope.arrange_items = _.shuffle($scope.items);

        $timeout(function() {
            $scope.setup_components();
        }, 2000);
    });

})
.controller('EmprendimientoCtrl', function () {

})
.controller('ActividadCtrl', function () {

})
.controller('ProyectoCtrl', function () {

})
;
