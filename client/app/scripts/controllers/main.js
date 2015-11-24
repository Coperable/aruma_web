'use strict';

angular.module('poliApp')
.controller('MainCtrl', function ($scope, $timeout, $location, $http, api_host, Page) {
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


            jQuery('.grid').imagesLoaded().always( function() {
                console.log('finish');
                $scope.grid.masonry();
                window.loading_screen.finish(); 
            });  

    };

    $scope.arrange_items = [];
    $scope.items = [];
    $scope.heights = [
        '390', '189', '150', '246', '257', '230', '224', '173'
    ];

    //$scope.entities = ['organizations', 'products', 'activities', 'centers'];
    $scope.entities = ['organizations', 'activities', 'centers'];

    $http.get(api_host+'/api/pages/home').success(function(page) {
        $scope.home = page;

        var data = $scope.home;

        _.each($scope.entities , function(entity) {
            _.each(data[entity], function(item) {
                $scope.items.push(_.extend(item, {
                    type: entity
                }));
            });
        });

        $scope.arrange_items = _.shuffle($scope.items);

        $timeout(function() {
            $scope.setup_components();
        }, 2000);
    });

    $scope.view = function(type, id) {
        window.loading_screen = window.pleaseWait({
            backgroundColor: '#59BC6C',
            loadingHtml: "<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"
        });

        $location.path('/'+type+'/'+id);
    };

})
.controller('center-controller', function ($scope, $timeout, $http, $routeParams, api_host, Center) {

    $scope.center = {};

    Organization.get({
        id: $routeParams.id
    }, function(organization) {
        $scope.organization = organization;
        console.dir($scope.organization);
    });


    
})
.controller('organization-controller', function ($scope, $timeout, $http, $routeParams, api_host, Organization) {

    $scope.organization = {};
    $scope.handleTweets = function(tweets) {
        console.log('tweets');
        var x = tweets.length;
        var n = 0;
        var element = jQuery('.sec_twitter');
        var html = '';
        while (n < x) {
            html += '<p>' + tweets[n] + '</p>';
            n++;
        }
        html += '';
        element.innerHTML = html;
        return html;
    };

    $scope.medias = [];

    Organization.get({
        id: $routeParams.id
    }, function(organization) {
        $scope.organization = organization;
        $scope.medias = _.filter($scope.organization.medias, function(media) {
            return media.name != $scope.organization.main_picture;
        });

        $timeout(function() {
            jQuery('#carousel-organization').imagesLoaded().always( function() {
                window.loading_screen.finish(); 
            });  


            if($scope.organization.instagram_hashtag) {
                jQuery('.organization-instafeedtag').each(function() {
                    jQuery(this).children('.grilla_instagram').spectragram('getRecentTagged', {
                        query: $scope.organization.instagram_hashtag,
                        max: 12,
                        wrapEachWith: '<div class="col-sm-4"></div>'
                    });
                });
            }
            if($scope.organization.twitter_hashtag) {
                twitterFetcher.fetch({
                    id: $scope.organization.twitter_hashtag, 
                    domId: '', 
                    maxTweets: 5,
                    enableLinks: true,
                    showUser:true, 
                    showTime: true, 
                    dateFunction: '', 
                    showRetweet: false,
                    customCallback:  $scope.handleTweets
                });
            }
            jQuery('#carouser-organization').carousel({
                interval: 2000
            })
        }, 1000);

    });
    
})
.controller('activity-controller', function ($scope, $timeout, $http, $routeParams, api_host, Activity) {

    $scope.activity = {};

    $scope.medias = [];

    Activity.get({
        id: $routeParams.id
    }, function(activity) {
        $scope.activity = activity;
        $scope.medias = _.filter($scope.activity.medias, function(media) {
            return media.name != $scope.activity.main_picture;
        });

        window.loading_screen.finish(); 

        $timeout(function() {
            if($scope.activity.instagram_hashtag) {
                jQuery('.activity-instafeedtag').each(function() {
                    jQuery(this).children('.grilla_instagram').spectragram('getRecentTagged', {
                        query: $scope.activity.instagram_hashtag,
                        max: 12,
                        wrapEachWith: '<div class="col-sm-4"></div>'
                    });
                });
            }
            if($scope.activity.twitter_hashtag) {
                twitterFetcher.fetch({
                    id: $scope.activity.twitter_hashtag, 
                    domId: '', 
                    maxTweets: 5,
                    enableLinks: true,
                    showUser:true, 
                    showTime: true, 
                    dateFunction: '', 
                    showRetweet: false,
                    customCallback:  $scope.handleTweets
                });
            }
            jQuery('#carouser-activity').carousel({
                interval: 2000
            })
        }, 1000);

    });
    
})
.controller('footer-controller', function ($scope) {
    $scope.setup_components = function() {
        console.log('spectagram');
        jQuery.fn.spectragram.accessData = {
            accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
            clientID: 'fedaafacf224447e8aef74872d3820a1'
        };

        jQuery('.instafeed').each(function() {
            jQuery(this).children('ul').spectragram('getUserFeed', {
                query: $(this).attr('data-user-name'),
                max: 12
            });
        });
        jQuery('.instafeedtag').each(function() {
            jQuery(this).children('ul').spectragram('getRecentTagged', {
                query: jQuery(this).attr('data-user-name'),
                max: 12
            });
        });
    };
    $scope.setup_components();
})

.controller('EmprendimientoCtrl', function () {

})
.controller('ActividadCtrl', function () {

})
.controller('ProyectoCtrl', function () {

})
.controller('center-controller', function ($scope, $timeout, $location, $http, api_host, Page) {
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
    $scope.heights = [
        '390', '189', '150', '246', '257', '230', '224', '173'
    ];

    $scope.entities = ['organizations', 'products', 'activities', 'centers'];

    $http.get(api_host+'/api/pages/home').success(function(page) {
        $scope.home = page;

        var data = $scope.home;

        _.each($scope.entities , function(entity) {
            _.each(data[entity], function(item) {
                $scope.items.push(_.extend(item, {
                    type: entity
                }));
            });
        });

        $scope.arrange_items = _.shuffle($scope.items);

        $timeout(function() {
            $scope.setup_components();
        }, 2000);
    });

    $scope.view = function(type, id) {
        $location.path('/'+type+'/'+id);
    };

})
;
