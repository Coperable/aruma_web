"use strict";angular.module("config",[]).constant("api_host","http://aruma.app").constant("instagram_token","1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b").constant("instagram_client_id","fedaafacf224447e8aef74872d3820a1").value("debug",!0),angular.module("poliApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","config","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/actividad",{templateUrl:"views/actividad.html",controller:"ActividadCtrl",controllerAs:"actividad"}).when("/proyecto",{templateUrl:"views/proyecto.html",controller:"ProyectoCtrl",controllerAs:"proyecto"}).when("/emprendimiento",{templateUrl:"views/emprendimiento.html",controller:"EmprendimientoCtrl",controllerAs:"emprendimiento"}).when("/organizations/:id",{templateUrl:"views/emprendimiento.html",controller:"organization-controller"}).when("/activities/:id",{templateUrl:"views/actividad.html",controller:"activity-controller"}).when("/aruma",{templateUrl:"views/aruma.html",controller:"ArumaCtrl"}).otherwise({redirectTo:"/"}),moment.locale("es")}]).filter("moment",function(){return function(a,b){return moment(a).format(b)}}),angular.module("poliApp").factory("Organization",["$resource","api_host",function(a,b){return a(b+"/api/organizations/:id",{id:"@id"},{update:{method:"PUT"}})}]).factory("Center",["$resource","api_host",function(a,b){return a(b+"/api/centers/:id",{id:"@id"},{update:{method:"PUT"}})}]).factory("Page",["$resource","api_host",function(a,b){return a(b+"/api/pages/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Activity",["$resource","api_host",function(a,b){return a(b+"/api/activities/:id",{id:"@id"},{update:{method:"POST"}})}]),angular.module("poliApp").controller("MainCtrl",["$scope","$timeout","$location","$http","api_host","Page",function(a,b,c,d,e,f){a.setup_components=function(){jQuery("a[href*=#]").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=jQuery(this.hash);if(a=a.length?a:jQuery("[name="+this.hash.slice(1)+"]"),a.length)return jQuery("html,body").animate({scrollTop:a.offset().top},1e3),!1}}),a.grid=jQuery(".grid").isotope({itemSelector:".grid-item",layoutMode:"masonry"});var b={numberGreaterThan50:function(){var a=jQuery(this).find(".number").text();return parseInt(a,10)>50},ium:function(){var a=jQuery(this).find(".name").text();return a.match(/iumjQuery/)}};jQuery(".filters-button-group").on("click","button",function(){var c=jQuery(this).attr("data-filter");c=b[c]||c,a.grid.isotope({filter:c})}),jQuery(".button-group").each(function(a,b){var c=jQuery(b);c.on("click","button",function(){c.find(".is-checked").removeClass("is-checked"),jQuery(this).addClass("is-checked")})}),a.grid=jQuery(".grid").masonry({itemSelector:".grid-item",percentPosition:!0,columnWidth:".grid-sizer"}),jQuery(".grid").imagesLoaded().always(function(){console.log("finish"),a.grid.masonry(),window.loading_screen.finish()})},a.arrange_items=[],a.items=[],a.heights=["390","189","150","246","257","230","224","173"],a.entities=["organizations","activities","centers"],d.get(e+"/api/pages/home").success(function(c){a.home=c;var d=a.home;_.each(a.entities,function(b){_.each(d[b],function(c){a.items.push(_.extend(c,{type:b}))})}),a.arrange_items=_.shuffle(a.items),b(function(){a.setup_components()},2e3)}),a.view=function(a,b){window.loading_screen=window.pleaseWait({backgroundColor:"#59BC6C",loadingHtml:"<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"}),c.path("/"+a+"/"+b)}}]).controller("center-controller",["$scope","$timeout","$http","$routeParams","api_host","Center",function(a,b,c,d,e,f){a.center={},Organization.get({id:d.id},function(b){a.organization=b,console.dir(a.organization)})}]).controller("organization-controller",["$scope","$timeout","$http","$routeParams","api_host","Organization",function(a,b,c,d,e,f){a.organization={},a.handleTweets=function(a){console.log("tweets");for(var b=a.length,c=0,d=jQuery(".sec_twitter"),e="";b>c;)e+="<p>"+a[c]+"</p>",c++;return e+="",d.innerHTML=e,e},a.medias=[],f.get({id:d.id},function(c){a.organization=c,a.medias=_.filter(a.organization.medias,function(b){return b.name!=a.organization.main_picture}),b(function(){jQuery("#carousel-organization").imagesLoaded().always(function(){window.loading_screen.finish()}),a.organization.instagram_hashtag&&jQuery(".organization-instafeedtag").each(function(){jQuery(this).children(".grilla_instagram").spectragram("getRecentTagged",{query:a.organization.instagram_hashtag,max:12,wrapEachWith:'<div class="col-sm-4"></div>'})}),a.organization.twitter_hashtag&&twitterFetcher.fetch({id:a.organization.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets}),jQuery("#carouser-organization").carousel({interval:2e3})},1e3)})}]).controller("activity-controller",["$scope","$timeout","$http","$routeParams","api_host","Activity",function(a,b,c,d,e,f){a.activity={},a.medias=[],f.get({id:d.id},function(c){a.activity=c,a.medias=_.filter(a.activity.medias,function(b){return b.name!=a.activity.main_picture}),window.loading_screen.finish(),b(function(){a.activity.instagram_hashtag&&jQuery(".activity-instafeedtag").each(function(){jQuery(this).children(".grilla_instagram").spectragram("getRecentTagged",{query:a.activity.instagram_hashtag,max:12,wrapEachWith:'<div class="col-sm-4"></div>'})}),a.activity.twitter_hashtag&&twitterFetcher.fetch({id:a.activity.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets}),jQuery("#carouser-activity").carousel({interval:2e3})},1e3)})}]).controller("footer-controller",["$scope","$http","$timeout","$sce","api_host","instagram_token","instagram_client_id",function(a,b,c,d,e,f,g){a.home={},a.tweets=[],a.handleTweets=function(b){a.tweets=b,a.$apply()},a.tweetText=function(a){return d.trustAsHtml(a)},a.setup_components=function(){jQuery.fn.spectragram.accessData={accessToken:f,clientID:g},jQuery(".instafeed").each(function(){jQuery(this).children("ul").spectragram("getUserFeed",{query:a.home.instagram_username,max:12})}),jQuery(".instafeedtag").each(function(){jQuery(this).children("ul").spectragram("getRecentTagged",{query:jQuery(this).attr("data-user-name"),max:12})}),a.home.twitter_hashtag&&twitterFetcher.fetch({id:a.home.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets})},b.get(e+"/api/pages/home").success(function(b){a.home=b,c(function(){a.setup_components()},2e3)})}]).controller("EmprendimientoCtrl",function(){}).controller("ActividadCtrl",function(){}).controller("ProyectoCtrl",function(){}).controller("center-controller",["$scope","$timeout","$location","$http","api_host","Page",function(a,b,c,d,e,f){a.setup_components=function(){jQuery("a[href*=#]").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=jQuery(this.hash);if(a=a.length?a:jQuery("[name="+this.hash.slice(1)+"]"),a.length)return jQuery("html,body").animate({scrollTop:a.offset().top},1e3),!1}}),a.grid=jQuery(".grid").isotope({itemSelector:".grid-item",layoutMode:"masonry"});var b={numberGreaterThan50:function(){var a=jQuery(this).find(".number").text();return parseInt(a,10)>50},ium:function(){var a=jQuery(this).find(".name").text();return a.match(/iumjQuery/)}};jQuery(".filters-button-group").on("click","button",function(){var c=jQuery(this).attr("data-filter");c=b[c]||c,a.grid.isotope({filter:c})}),jQuery(".button-group").each(function(a,b){var c=jQuery(b);c.on("click","button",function(){c.find(".is-checked").removeClass("is-checked"),jQuery(this).addClass("is-checked")})}),a.grid=jQuery(".grid").masonry({itemSelector:".grid-item",percentPosition:!0,columnWidth:".grid-sizer"})},a.arrange_items=[],a.items=[],a.heights=["390","189","150","246","257","230","224","173"],a.entities=["organizations","products","activities","centers"],d.get(e+"/api/pages/home").success(function(c){a.home=c;var d=a.home;_.each(a.entities,function(b){_.each(d[b],function(c){a.items.push(_.extend(c,{type:b}))})}),a.arrange_items=_.shuffle(a.items),b(function(){a.setup_components()},2e3)}),a.view=function(a,b){c.path("/"+a+"/"+b)}}]),angular.module("poliApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/actividad.html",'<div class="full_width" id="portada"> <img ng-src="http://images.collab-dev.com/aruma/{{activity.main_picture}}"> <div class="degradado"></div> <div class="texto_portada"> <h1>{{activity.title}}</h1> <h4>{{activity.description}}</h4> </div> </div> <div class="row valign"> <div class="col-sm-6"> <div class="centered_90 centrado completo"> <div class="gap"></div> <div class="info_evento"> <span class="fecha">{{activity.event_date |moment: \'dddd D [de] MMMM\'}}</span> <span class="hora">{{activity.event_date |moment: \'HH:mm\'}} hs</span> <span class="lugar">{{activity.location.formatted_address}}</span> <span class="owner">de <a href="">{{activity.coordinators}}</a></span> <p>{{activity.details}}</p> </div> </div> </div> <div class="col-sm-6" style="min-height: 489px; max-height: 489px; width: 100%"> <div id="carousel-activity" class="carousel slide" data-ride="carousel"> <div class="carousel-inner" role="listbox"> <div class="item" ng-repeat="media in medias" ng-class="{active: $first}"> <img ng-src="http://images.collab-dev.com/489x489/smart/aruma/{{media.name}}" width="100%"> </div> </div> <a class="left carousel-control" data-target="#carousel-activity" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" data-target="#carousel-activity" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> <div class="row sec_donde"> <div class="row-height"> <div class="col-sm-4 donde_tit col-sm-height col-sm-middle"> <h1>Dónde podés encon- trarnos</h1> </div> <div class="col-sm-8 donde_map"> <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d105073.23949906467!2d-58.43329845000001!3d-34.615823750000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1446645514133" width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe> </div> </div> </div> <div class="sec_twitter"> <i class="fa fa-twitter"></i> <p>@ana-es: compartiendo un delicioso helado con mis amigos. #haulani</p> </div> <div class="sec_fotos activity-instafeedtag" ng-if="activity.instagram_hashtag"> <h1>#{{activity.instagram_hashtag}}</h1> <h4>{{activity.slogan}}</h4> <div class="row grilla_instagram"> </div> </div> <div class="gap"></div>'),a.put("views/center.html",'<div class="full_screen" id="portada"> <div class="imagen_portada" ng-style="{\'background-image\': \'url(http://images.collab-dev.com/aruma/\'+center.main_picture+\')\'}" ng-style="{\'background-size: cover !important;\'}"></div> <div class="texto_portada"> <h1>Aruma <small>LAB</small></h1> <h4>{{center.description}}</h4> </div> </div> <div id="inicio"></div> <div class="mini_gap"></div> <div> <div class="button-group filters-button-group"> <button class="btn_filtro is-checked" data-filter="*">todo</button> <button class="btn_filtro" data-filter=".products">productos</button> <button class="btn_filtro" data-filter=".organizations">emprendimientos</button> <button class="btn_filtro" data-filter=".activities">actividades</button> <button class="btn_filtro" data-filter=".centers">laboratorio</button> </div> <!--div class="toggle_map">\n        <h4>board <i class="fa fa-toggle-off"></i> mapa</h4>\n    </div--> <div class="mini_gap"></div> <div class="grid" style="min-height: 620px"> <div class="grid-sizer"></div> <div class="grid-item {{item.type}}" ng-class="{\'novedades\':\'item.novelty\'}" ng-repeat="item in arrange_items track by $index |limitTo: 8" ng-click="view(item.type, item.id)"> <img ng-src="http://images.collab-dev.com/trim/336x257/smart/aruma/{{item.main_picture}}"> <div class="caption"><div> <h2>{{item.name}}</h2> <span>{{item.description}}</span> </div> </div> </div> </div> <div class="sec_info"> <div class="info_inner"> <h1>Estamos en contacto</h1> <div class="info_botones"> <button class="btn_action">Newsletter</button> <button class="btn_nav">Escribinos</button> </div> </div> </div></div>'),a.put("views/emprendimiento.html",'<div class="full_screen" id="portada"> <div class="imagen_portada" ng-style="{\'background-image\': \'url(http://images.collab-dev.com/aruma/\'+organization.main_picture+\')\'}" ng-style="{\'background-size: cover !important;\'}"></div> <div class="texto_portada" ng-if="organization.show_title == 1"> <h1>{{organization.name}}</h1> <h4>{{organization.description}}</h4> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="centered_90 centrado completo"> <div class="tabs_lookeadas"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"><a data-target="#tab_paraQue" aria-controls="tab_paraQue" role="tab" data-toggle="tab">{{organization.what_for_title}}</a></li> <li role="presentation"><a data-target="#tab_porQue" aria-controls="tab_porQue" role="tab" data-toggle="tab">{{organization.why_title}}</a></li> <li role="presentation"><a data-target="#tab_como" aria-controls="tab_como" role="tab" data-toggle="tab">{{organization.how_title}}</a></li> </ul> </div> <div class="gap"></div> <div class="tab-content"> <div role="tabpanel" class="tab-pane fade in active" id="tab_paraQue"> <p> {{organization.what_for_text}} </p> </div> <div role="tabpanel" class="tab-pane fade" id="tab_porQue"> <p> {{organization.why_text}} </p> </div> <div role="tabpanel" class="tab-pane fade" id="tab_como"> <p> {{organization.how_text}} </p> </div> </div> </div> </div> <div class="col-sm-6" style="min-height: 489px"> <div id="carousel-organization" class="carousel slide" data-ride="carousel"> <div class="carousel-inner" role="listbox"> <div class="item" ng-repeat="media in medias" ng-class="{active: $first}"> <img ng-src="http://images.collab-dev.com/full-fit-in/489x489/smart/aruma/{{media.name}}" width="100%"> </div> </div> <a class="left carousel-control" data-target="#carousel-organization" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" data-target="#carousel-organization" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> <div class="row sec_productos"> <h1>{{organization.products_legend}}</h1> <div class="col-xs-6 col-sm-3 tarjeta_producto" ng-repeat="product in organization.products"> <img ng-src="http://images.collab-dev.com/aruma/{{product.main_picture}}" class="img-responsive"> <p>{{product.description}}</p> </div> </div> <div class="gap"></div> <div class="row sec_donde"> <div class="row-height"> <div class="col-sm-4 donde_tit col-sm-height col-sm-middle"> <h1>Dónde podés encon- trarnos</h1> </div> <div class="col-sm-8 donde_map"> <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d105073.23949906467!2d-58.43329845000001!3d-34.615823750000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1446645514133" width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe> </div> </div> </div> <div class="sec_twitter"> <i class="fa fa-twitter"></i> <p>@ana-es: compartiendo un delicioso helado con mis amigos. #haulani</p> <!--div class="twitter-feed tweets-slider large">\n        <div class="tweets-feed" data-widget-id="616641300591460353">\n        </div>\n    </div--> </div> <div class="sec_fotos organization-instafeedtag" ng-if="organization.instagram_hashtag"> <h1>#{{organization.instagram_hashtag}}</h1> <h4>{{organization.slogan}}</h4> <div class="row grilla_instagram"> </div> </div> <div class="gap"></div>'),a.put("views/main.html",'<div class="full_screen" id="portada"> <div class="imagen_portada" ng-style="{\'background-image\': \'url(http://images.collab-dev.com/aruma/\'+home.main_picture+\')\'}" ng-style="{\'background-size: cover !important;\'}"></div> <div class="texto_portada"> <h1>Aruma <small>LAB</small></h1> <h4>{{home.description}}</h4> </div> </div> <div id="inicio"></div> <div class="mini_gap"></div> <div> <div class="button-group filters-button-group"> <button class="btn_filtro is-checked" data-filter="*">todo</button> <!--button class="btn_filtro" data-filter=".products">productos</button--> <button class="btn_filtro" data-filter=".organizations">emprendimientos</button> <button class="btn_filtro" data-filter=".activities">actividades</button> <button class="btn_filtro" data-filter=".centers">laboratorio</button> </div> <!--div class="toggle_map">\n        <h4>board <i class="fa fa-toggle-off"></i> mapa</h4>\n    </div--> <div class="mini_gap"></div> <div class="grid" style="min-height: 620px"> <div class="grid-sizer"></div> <div class="grid-item {{item.type}}" ng-class="{\'novedades\':\'item.novelty\'}" ng-repeat="item in arrange_items track by $index |limitTo: 8" ng-click="view(item.type, item.id)"> <img ng-src="http://images.collab-dev.com/trim/336x{{heights[$index]}}/smart/aruma/{{item.main_picture}}" style="width:100%; height: 100%"> <div class="caption"><div> <h2>{{item.name}}</h2> <span>{{item.description}}</span> </div> </div> </div> </div> <div class="sec_info"> <div class="info_inner"> <h1>Estamos en contacto</h1> <div class="info_botones"> <button class="btn_action">Newsletter</button> <button class="btn_nav">Escribinos</button> </div> </div> </div></div>'),a.put("views/proyecto.html","<h1>ARUMA (proyecto)</h1>")}]);