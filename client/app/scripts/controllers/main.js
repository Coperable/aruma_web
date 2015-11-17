'use strict';

/**
 * @ngdoc function
 * @name poliApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the poliApp
 */
angular.module('poliApp')
.controller('MainCtrl', function ($scope, $timeout) {
    $scope.setup_components = function() {

        $timeout(function() {
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

        }, 1);

    };

    $scope.setup_components();
})
.controller('EmprendimientoCtrl', function () {

})
.controller('ActividadCtrl', function () {

})
.controller('ProyectoCtrl', function () {

})
;
