'use strict';

angular.module('poliApp')
.controller('MainCtrl', function ($scope, $timeout, $location, $http, $sce, api_host, Page) {
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
                $scope.grid.masonry();
                window.loading_screen.finish(); 
            });  






            jQuery('.background-image-holder').each(function() {
                var imgSrc = jQuery(this).children('img').attr('src');
                jQuery(this).css('background', 'url("' + imgSrc + '")');
                jQuery(this).children('img').hide();
                jQuery(this).css('background-position', 'initial');
            });

            setTimeout(function() {
                jQuery('.background-image-holder').each(function() {
                    jQuery(this).addClass('fadeIn');
                });
            }, 200);


            if (jQuery(window).width() > 768) {
                jQuery('.parallax:nth-of-type(1) .background-image-holder').css('top', -(jQuery('nav').outerHeight(true)));
            }

            if (jQuery(window).width() > 768) {
                jQuery('section.fullscreen:nth-of-type(1)').css('height', (jQuery(window).height() - jQuery('nav').outerHeight(true)));
            }

    };

    $scope.getImageSrc = function (image_name, height, width) {
        return $sce.trustAsResourceUrl('http://images.collab-dev.com/'+height+'x'+width+'/aruma/'+image_name);
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
    });


    
})
.controller('organization-controller', function ($scope, $timeout, $http, $routeParams, api_host, Organization, instagram_token, instagram_client_id) {

    $scope.organization = {};
    $scope.handleTweets = function(tweets) {
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

        $scope.geopoints = _.filter($scope.organization.geopoints, function(geopoint) {
            return geopoint.location && geopoint.location.longitude && geopoint.location.latitude;
        });

        $timeout(function() {
            $scope.setup_components();
        }, 1000);
    });
    
    $scope.setup_components = function() {
        jQuery('#carousel-organization').imagesLoaded().always( function() {
            window.loading_screen.finish(); 
        });  


        if($scope.organization.instagram_hashtag) {
            jQuery.fn.spectragram.accessData = {
                accessToken: instagram_token,
                clientID: instagram_client_id
            };

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


        var center_lat = 0,
            center_lng = 0;

        if($scope.geopoints.length > 0) {
            _.each($scope.geopoints, function(geopoint) {
                center_lat = parseFloat(center_lat) + parseFloat(geopoint.location.latitude);
                center_lng = parseFloat(center_lng) + parseFloat(geopoint.location.longitude);
            });
            center_lat = parseFloat(center_lat) / parseFloat($scope.geopoints.length);
            center_lng = parseFloat(center_lng) / parseFloat($scope.geopoints.length);

        }

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {lng: center_lng, lat: center_lat},
            zoom: 12
        });

        $scope.openWindow = function(infoWindow, marker) {
            $scope.infoWindow = infoWindow;
            $scope.infoWindow.open($scope.map, marker);
        };

        _.each($scope.geopoints, function(geopoint) {
            var position = new google.maps.LatLng(geopoint.location.latitude, geopoint.location.longitude),
            contentString = '<div id="content">'+
                  '<div id="siteNotice"></div>'+
                  '<div id="bodyContent">'+
                  '<p>'+geopoint.description+'</p>'+
                  '<p><b>'+geopoint.location.formatted_address+'</b></p>'+
                  '</div>'+
                  '</div>';
            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                position: position,
                map: $scope.map,
                title: geopoint.description
            });
            marker.addListener('click', function() {
                $scope.openWindow(infoWindow, marker);
            });
        });

    };

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


            if(activity.location) {
                $scope.map = new google.maps.Map(document.getElementById('map'), {
                    center: {lng: activity.location.longitude, lat: activity.location.latitude},
                    zoom: 12
                });

                var position = new google.maps.LatLng(activity.location.latitude, activity.location.longitude),
                contentString = '<div id="content">'+
                      '<div id="siteNotice"></div>'+
                      '<div id="bodyContent">'+
                      '<p><b>'+activity.location.formatted_address+'</b></p>'+
                      '</div>'+
                      '</div>';
                var infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });
                var marker = new google.maps.Marker({
                    position: position,
                    map: $scope.map,
                    title: activity.title
                });
                marker.addListener('click', function() {
                    $scope.openWindow(infoWindow, marker);
                });
            }

        }, 1000);

    });
    
})
.controller('footer-controller', function ($scope, $http, $timeout, $sce, api_host, instagram_token, instagram_client_id) {
    $scope.home = {};

    $scope.tweets = [];
    $scope.handleTweets = function(tweets) {
        $scope.tweets = tweets;
        $scope.$apply();
    };

    $scope.tweetText = function(tweet) {
        return $sce.trustAsHtml(tweet);
    };

    $scope.setup_components = function() {
        //accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        //clientID: 'fedaafacf224447e8aef74872d3820a1'

        jQuery.fn.spectragram.accessData = {
            accessToken: instagram_token,
            clientID: instagram_client_id
        };

        jQuery('.instafeed').each(function() {
            jQuery(this).children('ul').spectragram('getUserFeed', {
                query: $scope.home.instagram_username,
                max: 12
            });
        });
        jQuery('.instafeedtag').each(function() {
            jQuery(this).children('ul').spectragram('getRecentTagged', {
                query: jQuery(this).attr('data-user-name'),
                max: 12
            });
        });

        if($scope.home.twitter_hashtag) {
            twitterFetcher.fetch({
                id: $scope.home.twitter_hashtag, 
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
    };

    $http.get(api_host+'/api/pages/home').success(function(page) {
        $scope.home = page;
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
