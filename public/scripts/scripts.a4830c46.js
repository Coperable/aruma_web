"use strict";angular.module("config",[]).constant("api_host","http://arumalab.com").constant("instagram_token","1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b").constant("instagram_client_id","fedaafacf224447e8aef74872d3820a1").value("debug",!0),angular.module("poliApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","config","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:function(){console.log("resolve"),window.loading_screen=window.pleaseWait({backgroundColor:"#59BC6C",loadingHtml:"<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"})}}).when("/actividad",{templateUrl:"views/actividad.html",controller:"ActividadCtrl",controllerAs:"actividad"}).when("/proyecto",{templateUrl:"views/proyecto.html",controller:"ProyectoCtrl",controllerAs:"proyecto"}).when("/emprendimiento",{templateUrl:"views/emprendimiento.html",controller:"EmprendimientoCtrl",controllerAs:"emprendimiento"}).when("/organizations/:id",{templateUrl:"views/emprendimiento.html",controller:"organization-controller"}).when("/centers/:id",{templateUrl:"views/center.html",controller:"center-controller"}).when("/activities/:id",{templateUrl:"views/actividad.html",controller:"activity-controller"}).when("/aruma",{templateUrl:"views/aruma.html",controller:"ArumaCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){moment.locale("es")}]).filter("moment",function(){return function(a,b){return moment(a).locale("es").format(b)}}),angular.module("poliApp").factory("Organization",["$resource","api_host",function(a,b){return a(b+"/api/organizations/:id",{id:"@id"},{update:{method:"PUT"}})}]).factory("Center",["$resource","api_host",function(a,b){return a(b+"/api/centers/:id",{id:"@id"},{update:{method:"PUT"}})}]).factory("Page",["$resource","api_host",function(a,b){return a(b+"/api/pages/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Activity",["$resource","api_host",function(a,b){return a(b+"/api/activities/:id",{id:"@id"},{update:{method:"POST"}})}]),angular.module("poliApp").controller("MainCtrl",["$rootScope","$scope","$timeout","$location","$http","$sce","api_host","Page",function(a,b,c,d,e,f,g,h){a.initied&&(window.loading_screen=window.pleaseWait({backgroundColor:"#59BC6C",loadingHtml:"<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"})),b.setup_components=function(){b.grid=jQuery(".grid").isotope({itemSelector:".grid-item",layoutMode:"masonry"});var c={numberGreaterThan50:function(){var a=jQuery(this).find(".number").text();return parseInt(a,10)>50},ium:function(){var a=jQuery(this).find(".name").text();return a.match(/iumjQuery/)}};jQuery(".filters-button-group").on("click","button",function(){var a=jQuery(this).attr("data-filter");a=c[a]||a,b.grid.isotope({filter:a})}),jQuery(".button-group").each(function(a,b){var c=jQuery(b);c.on("click","button",function(){c.find(".is-checked").removeClass("is-checked"),jQuery(this).addClass("is-checked")})}),b.grid=jQuery(".grid").masonry({itemSelector:".grid-item",percentPosition:!0,columnWidth:".grid-sizer"}),jQuery(".grid").imagesLoaded().always(function(){console.log("loading"),jQuery(".grid").masonry({itemSelector:".grid-item",percentPosition:!0,columnWidth:".grid-sizer"}),window.loading_screen.finish(),a.initied=!0}),jQuery(".background-image-holder").each(function(){var a=jQuery(this).children("img").attr("src");jQuery(this).css("background",'url("'+a+'")'),jQuery(this).children("img").hide(),jQuery(this).css("background-position","initial")}),setTimeout(function(){jQuery(".background-image-holder").each(function(){jQuery(this).addClass("fadeIn")})},200),jQuery(window).width()>768&&jQuery(".parallax:nth-of-type(1) .background-image-holder").css("top",-jQuery("nav").outerHeight(!0)),jQuery(window).width()>768&&jQuery("section.fullscreen:nth-of-type(1)").css("height",jQuery(window).height()-jQuery("nav").outerHeight(!0))},b.getImageSrc=function(a,b,c){return f.trustAsResourceUrl("http://images.collab-dev.com/"+b+"x"+c+"/aruma/"+a)},b.arrange_items=[],b.items=[],b.heights=["390","189","150","246","257","230","224","173"],b.entities=["organizations","activities","centers"],e.get(g+"/api/pages/home").success(function(a){b.home=a;var d=b.home;_.each(b.entities,function(a){_.each(d[a],function(c){"activities"==a&&c.center_activity||b.items.push(_.extend(c,{type:a}))})}),b.arrange_items=_.shuffle(b.items),c(function(){b.setup_components()},3e3)}),b.view=function(a,b){window.loading_screen=window.pleaseWait({backgroundColor:"#59BC6C",loadingHtml:"<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"}),console.log("type: "+a+" - id: "+b),d.path("/"+a+"/"+b)}}]).controller("_center-controller",["$scope","$timeout","$http","$routeParams","api_host","Center",function(a,b,c,d,e,f){a.center={},Organization.get({id:d.id},function(b){a.organization=b,window.loading_screen.finish()},function(){window.loading_screen.finish()})}]).controller("organization-controller",["$scope","$timeout","$http","$routeParams","api_host","Organization","instagram_token","instagram_client_id",function(a,b,c,d,e,f,g,h){a.organization={},a.handleTweets=function(a){for(var b=a.length,c=0,d=jQuery(".sec_twitter"),e="";b>c;)e+="<p>"+a[c]+"</p>",c++;return e+="",d.innerHTML=e,e},a.medias=[],f.get({id:d.id},function(c){a.organization=c,a.medias=_.filter(a.organization.medias,function(b){return b.name!=a.organization.main_picture}),a.geopoints=_.filter(a.organization.geopoints,function(a){return a.location&&a.location.longitude&&a.location.latitude}),b(function(){a.setup_components()},1e3)}),a.setup_components=function(){jQuery("#carousel-organization").imagesLoaded().always(function(){window.loading_screen.finish()}),a.organization.instagram_hashtag&&(jQuery.fn.spectragram.accessData={accessToken:g,clientID:h},jQuery(".organization-instafeedtag").each(function(){jQuery(this).children(".grilla_instagram").spectragram("getRecentTagged",{query:a.organization.instagram_hashtag,max:12,wrapEachWith:'<div class="col-sm-4"></div>'})})),a.organization.twitter_hashtag&&twitterFetcher.fetch({id:a.organization.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets}),jQuery("#carouser-organization").carousel({interval:2e3});var b=0,c=0;a.geopoints.length>0&&(_.each(a.geopoints,function(a){b=parseFloat(b)+parseFloat(a.location.latitude),c=parseFloat(c)+parseFloat(a.location.longitude)}),b=parseFloat(b)/parseFloat(a.geopoints.length),c=parseFloat(c)/parseFloat(a.geopoints.length)),a.map=new google.maps.Map(document.getElementById("map"),{center:{lng:c,lat:b},zoom:12,scrollwheel:!1,draggable:!1}),a.openWindow=function(b,c){a.infoWindow=b,a.infoWindow.open(a.map,c)},_.each(a.geopoints,function(b){var c=new google.maps.LatLng(b.location.latitude,b.location.longitude),d='<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>'+b.description+"</p><p><b>"+b.location.formatted_address+"</b></p></div></div>",e=new google.maps.InfoWindow({content:d}),f=new google.maps.Marker({position:c,map:a.map,title:b.description});f.addListener("click",function(){a.openWindow(e,f)})})}}]).controller("activity-controller",["$scope","$timeout","$http","$routeParams","api_host","Activity",function(a,b,c,d,e,f){a.activity={},a.medias=[],f.get({id:d.id},function(c){a.activity=c,a.medias=_.filter(a.activity.medias,function(b){return b.name!=a.activity.main_picture}),window.loading_screen.finish(),b(function(){if(a.activity.instagram_hashtag&&jQuery(".activity-instafeedtag").each(function(){jQuery(this).children(".grilla_instagram").spectragram("getRecentTagged",{query:a.activity.instagram_hashtag,max:12,wrapEachWith:'<div class="col-sm-4"></div>'})}),a.activity.twitter_hashtag&&twitterFetcher.fetch({id:a.activity.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets}),jQuery("#carouser-activity").carousel({interval:2e3}),c.location){a.map=new google.maps.Map(document.getElementById("map"),{center:{lng:c.location.longitude,lat:c.location.latitude},zoom:12});var b=new google.maps.LatLng(c.location.latitude,c.location.longitude),d='<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p><b>'+c.location.formatted_address+"</b></p></div></div>",e=new google.maps.InfoWindow({content:d}),f=new google.maps.Marker({position:b,map:a.map,title:c.title});f.addListener("click",function(){a.openWindow(e,f)})}},1e3)})}]).controller("footer-controller",["$scope","$http","$timeout","$sce","api_host","instagram_token","instagram_client_id",function(a,b,c,d,e,f,g){a.home={},a.tweets=[],a.handleTweets=function(b){a.tweets=b,a.$apply()},a.tweetText=function(a){return d.trustAsHtml(a)},a.setup_components=function(){jQuery.fn.spectragram.accessData={accessToken:f,clientID:g},jQuery(".instafeed").each(function(){jQuery(this).children("ul").spectragram("getUserFeed",{query:a.home.instagram_username,max:12})}),jQuery(".instafeedtag").each(function(){jQuery(this).children("ul").spectragram("getRecentTagged",{query:jQuery(this).attr("data-user-name"),max:12})}),a.home.twitter_hashtag&&twitterFetcher.fetch({id:a.home.twitter_hashtag,domId:"",maxTweets:5,enableLinks:!0,showUser:!0,showTime:!0,dateFunction:"",showRetweet:!1,customCallback:a.handleTweets})},b.get(e+"/api/pages/home").success(function(b){a.home=b,c(function(){a.setup_components()},2e3)})}]).controller("EmprendimientoCtrl",function(){}).controller("ActividadCtrl",function(){}).controller("ProyectoCtrl",function(){}).controller("center-controller",["$rootScope","$scope","$timeout","$location","$http","api_host","Page",function(a,b,c,d,e,f,g){b.setup_components=function(){jQuery(".background-image-holder").each(function(){var a=jQuery(this).children("img").attr("src");jQuery(this).css("background",'url("'+a+'")'),jQuery(this).children("img").hide(),jQuery(this).css("background-position","initial")}),jQuery(window).width()>768&&jQuery(".parallax:nth-of-type(1) .background-image-holder").css("top",-jQuery("nav").outerHeight(!0)),jQuery(window).width()>768&&jQuery("section.fullscreen:nth-of-type(1)").css("height",jQuery(window).height()-jQuery("nav").outerHeight(!0))},b.getImageSrc=function(a,b,c){return $sce.trustAsResourceUrl("http://images.collab-dev.com/"+b+"x"+c+"/aruma/"+a)},b.arrange_items=[],b.items=[],b.heights=["390","189","150","246","257","230","224","173"],b.entities=["organizations","activities"],e.get(f+"/api/pages/home").success(function(a){b.home=a,b.center=_.first(a.centers);var d=b.home;_.each(b.entities,function(a){_.each(d[a],function(c){b.items.push(_.extend(c,{type:a}))})}),b.arrange_items=_.shuffle(b.items),c(function(){b.setup_components(),window.loading_screen.finish()},2e3)}),b.view=function(a,b){d.path("/"+a+"/"+b)}}]),angular.module("poliApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/actividad.html",'<!-- \n\nELIMINAMOS LA IMAGEN DE PORTADA EN LA PÁGINA DE ACTIVIDAD. \nSE UTILIZARÁ ÚNICAMENTE UNA IMAGEN, EN EL ESPACIO DEL SLIDER\n\n<div class="full_width" id="portada">\n\n    <img ng-src="http://images.collab-dev.com/aruma/{{activity.main_picture}}">\n\n    <div class="degradado"></div>\n\n    <div class="texto_portada">\n      \n        <h1>{{activity.title}}</h1>\n\n        <h4>{{activity.description}}</h4>\n\n    </div>\n\n</div>--> <div class="flex-container"> <div class="row valign"> <div class="col-sm-6"> <div class="centered_90 centrado completo"> <div class="gap"></div> <h1>{{activity.title}}</h1> <div class="info_evento"> <span class="fecha">{{activity.event_date |moment: \'dddd D [de] MMMM\'}}</span> <span class="hora">{{activity.event_date |moment: \'HH:mm\'}} hs</span> <span class="lugar">{{activity.location.formatted_address}}</span> <span class="owner">de <a href="">{{activity.coordinators}}</a></span> <p>{{activity.details}}</p> </div> </div> </div> <div class="col-sm-6" style="min-height: 489px; max-height: 489px"> <div id="carousel-activity" class="carousel slide" data-ride="carousel"> <div class="carousel-inner" role="listbox"> <div class="item" ng-repeat="media in medias" ng-class="{active: $first}"> <img ng-src="http://images.collab-dev.com/aruma/{{activity.main_picture}}" width="100%" class="img-responsive"> </div> </div> <a class="left carousel-control" data-target="#carousel-activity" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" data-target="#carousel-activity" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> </div> <div class="row sec_donde" ng-if="activity.location"> <div class="row-height"> <div class="col-sm-4 donde_tit col-sm-height col-sm-middle"> <h1>Dónde podés encon- trarnos</h1> </div> <div class="col-sm-8 donde_map"> <div id="map"></div> <!--iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d105073.23949906467!2d-58.43329845000001!3d-34.615823750000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1446645514133" width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe--> </div> </div> </div> <!--div class="sec_twitter">\n\n	<i class="fa fa-twitter"></i>\n	\n	<p>@ana-es: compartiendo un delicioso helado con mis amigos. #haulani</p>\n\n</div--> <div class="sec_fotos activity-instafeedtag" ng-if="activity.instagram_hashtag"> <h1>#{{activity.instagram_hashtag}}</h1> <h4>{{activity.slogan}}</h4> <div class="row grilla_instagram"> </div> </div> <div class="gap"></div>'),a.put("views/center.html",'<div class="full_screen" id="portada"> <div class="imagen_portada" ng-style="{\'background-image\': \'url(http://images.collab-dev.com/aruma/\'+center.main_picture+\')\'}" ng-style="{\'background-size: cover !important;\'}"></div> <div class="texto_portada"> <h1> {{center.name}} </h1> <h4>{{centar.description}}</h4> </div> </div> <div class="sec_twitter"> <p> <b>ARUMA LAB</b> es un laboratorio humano en continua transformación, construido desde una experiencia comunitaria enfocada en el crecimiento espiritual. El resultado, una PLATAFORMA que potencia y acompaña emprendedores conscientes, personas comprometidas con su evolución personal a partir de la materialización de proyectos que dirigen. El corazón y mayor particularidad de esta plataforma es que funciona en base a un paradigma de común acuerdo entre todos los que la integran: el de ser creadores de su propia realidad, y por ende, responsables de todo lo que sucede en sus emprendimientos y sus vidas. Esta premisa clave transforma a cada emprendimiento en el vehículo y espejo del emprendedor, ampliando como una lupa las conquistas y limitaciones personales, que luego permiten a los emprendedores conducir con mayor consciencia en el viaje que los lleva más allá de sí mismos. </p> </div> <div class="sec_twitter" style="background-color: #FFFFFF; color: #00000"> <p style="color: #000000 !important"> El acompañamiento se hace tanto desde lo denso y tangible, a través de herramientas y servicios que se ofrecen de acuerdo a las necesidades particulares del emprendimiento, tales como: locación (espacio de producción, sala de reuniones y coworking), asesoramiento técnico, charlas temáticas, y consultorías en áreas específicas (administrativo, contable, etc) como desde lo sutil, a través de un acompañamiento personalizado con un focalizador, círculos de escucha, y abordando técnicas y terapias de autoconocimiento para la ampliación de conciencia. </p> </div>'),a.put("views/emprendimiento.html",'<style>#map {\n    height: 100%\n}</style> <div class="full_screen" id="portada"> <div class="imagen_portada" ng-style="{\'background-image\': \'url(http://images.collab-dev.com/aruma/\'+organization.main_picture+\')\'}" ng-style="{\'background-size: cover !important;\'}"></div> <div class="social_portada"> <a href="" target="_blank"><i class="fa fa-facebook-square fa-fw"></i></a> <a href="" target="_blank"><i class="fa fa-twitter-square fa-fw"></i></a> <a href="" target="_blank"><i class="fa fa-instagram fa-fw"></i></a> </div> <div class="texto_portada" ng-if="organization.show_title == 1"> <h1> <!--{{organization.name}} --></h1> <h4>{{organization.description}}</h4> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="centered_90 centrado completo"> <div class="tabs_lookeadas"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"><a data-target="#tab_paraQue" aria-controls="tab_paraQue" role="tab" data-toggle="tab">{{organization.what_for_title}}</a></li> <li role="presentation"><a data-target="#tab_porQue" aria-controls="tab_porQue" role="tab" data-toggle="tab">{{organization.why_title}}</a></li> <li role="presentation"><a data-target="#tab_como" aria-controls="tab_como" role="tab" data-toggle="tab">{{organization.how_title}}</a></li> </ul> </div> <div class="gap"></div> <div class="tab-content"> <div role="tabpanel" class="tab-pane fade in active" id="tab_paraQue"> <p> {{organization.what_for_text}} </p> </div> <div role="tabpanel" class="tab-pane fade" id="tab_porQue"> <p> {{organization.why_text}} </p> </div> <div role="tabpanel" class="tab-pane fade" id="tab_como"> <p> {{organization.how_text}} </p> </div> </div> </div> </div> <div class="col-sm-6" style="min-height: 489px"> <div id="carousel-organization" class="carousel slide" data-ride="carousel"> <div class="carousel-inner" role="listbox"> <div class="item" ng-repeat="media in medias" ng-class="{active: $first}" style="min-height: 300px"> <img ng-src="http://images.collab-dev.com/800x600/smart/aruma/{{media.name}}" width="100%" class="img-responsive"> </div> </div> <a class="left carousel-control" data-target="#carousel-organization" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" data-target="#carousel-organization" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> <div class="row sec_productos"> <h1>{{organization.products_legend}}</h1> <div ng-repeat="product in organization.products"> <div class="col-xs-6 col-sm-4 col-md-3 tarjeta_producto"> <h4>{{product.name}}</h4> <div class="img_container"> <a href data-toggle="modal" data-target="#product_{{product.id}}"> <img ng-src="http://images.collab-dev.com/600x800/smart/aruma/{{product.main_picture}}" class="img-responsive"> </a> </div> <!-- p>{{product.description}}</p --> <!-- Modal --> </div> </div> </div> <div ng-repeat="product in organization.products"> <div class="modal modal-producto fade" id="product_{{product.id}}" tabindex="1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">{{product.name}}</h4> </div> <div class="modal-body"> <img ng-src="http://images.collab-dev.com/600x800/smart/aruma/{{product.main_picture}}" class="img-responsive"> <div> <p>{{product.description}}</p> <p>{{product.detailis}}</p> </div> </div> </div> </div> </div> </div> <div class="gap"></div> <div class="row sec_donde" ng-if="organization.geopoints.length"> <div class="row-height"> <div class="col-sm-4 col-md-4 donde_tit col-sm-height col-sm-middle"> <h1>Dónde podés encon- trarnos</h1> </div> <div class="col-sm-8 col-md-8 donde_map" style="height: 600px; width: 900px"> <div id="map"></div> <!--iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d105073.23949906467!2d-58.43329845000001!3d-34.615823750000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1446645514133&markers=color:green%7Clabel:A%7C-34.6082517,-58.6980597" width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe--> </div> </div> </div> <div class="row sec_productos" ng-if="organization.activities.length"> <h1>Actividades</h1> <div class="col-xs-6 col-sm-3 tarjeta_producto" ng-repeat="activity in organization.activities"> <h4>{{activity.title}}</h4> <a href="/#/activities/{{activity.id}}"><img ng-src="http://images.collab-dev.com/aruma/{{activity.main_picture}}" class="img-responsive"></a> <div class="fecha"> <p>{{activity.event_date |moment: \'dddd D [de] MMMM\'}}</p> <p>{{activity.event_date |moment: \'HH:mm\'}} hs</p> </div> </div> </div> <div class="sec_twitter"> <i class="fa fa-twitter"></i> <p>@ana-es: compartiendo un delicioso helado con mis amigos. #haulani</p> <!--div class="twitter-feed tweets-slider large">\n        <div class="tweets-feed" data-widget-id="616641300591460353">\n        </div>\n    </div--> </div> <div class="sec_fotos organization-instafeedtag" ng-if="organization.website"> <h4>Visitanos en </h4> <h1><a href="http://{{organization.website}}" target="_blank">{{organization.website}}</a></h1> </div> <div class="sec_fotos organization-instafeedtag" ng-if="organization.instagram_hashtag"> <h1>#{{organization.instagram_hashtag}}</h1> <h4>{{organization.slogan}}</h4> <div class="row grilla_instagram"> </div> </div> <div class="gap"></div>'),a.put("views/main.html",'<div class="main-container"> <section class="cover fullscreen parallax"> <div class="background-image-holder"> <img alt="image" class="background-image" ng-src="http://images.collab-dev.com/aruma/{{home.main_picture}}"> </div> <div class="container v-align-transform"> <div class="row"> <div class="text-center texto_portada"> <h1>Aruma <small>LAB</small></h1> <h4>{{home.description}}</h4> </div> </div> </div> </section> </div> <div id="inicio"></div> <div class="mini_gap"></div> <div class=""> <div class="button-group filters-button-group"> <!-- button class="btn_filtro is-checked" data-filter="*">todo</button --> <!--button class="btn_filtro" data-filter=".products">productos</button--> <button class="btn_filtro" data-toggle="modal" data-target="#modalAruma">Aruma laboratorio</button> <button class="btn_filtro" data-filter=".organizations">emprendimientos</button> <button class="btn_filtro" data-filter=".activities">actividades</button> </div> <!--div class="toggle_map">\n        <h4>board <i class="fa fa-toggle-off"></i> mapa</h4>\n    </div--> <div class="mini_gap"></div> <div class="grid" style="min-height: 620px"> <div class="grid-sizer"></div> <div class="grid-item {{item.type}}" ng-class="{\'novedades\':\'item.novelty\'}" ng-repeat="item in arrange_items track by $index |limitTo: 8" ng-click="view(item.type, item.id)" style="padding: 0px; margin: 0px"> <img ng-src="http://images.collab-dev.com/trim/336x{{heights[$index]}}/smart/aruma/{{item.main_picture}}" class="img-responsive"> <div class="caption"> <div> <h2>{{item.name}}</h2> <span>{{item.description}}</span> </div> </div> </div> </div> <!-- Modal --> <div class="modal fade modal-aruma" id="modalAruma" tabindex="-1" role="dialog" aria-labelledby="modalArumaLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="modalArumaLabel">ARUMALAB</h4> </div> <div class="modal-body"> <p> <b>ARUMA LAB</b> es un laboratorio humano en continua transformación, construido desde una experiencia comunitaria enfocada en el crecimiento espiritual. El resultado, una PLATAFORMA que potencia y acompaña emprendedores conscientes, personas comprometidas con su evolución personal a partir de la materialización de proyectos que dirigen. El corazón y mayor particularidad de esta plataforma es que funciona en base a un paradigma de común acuerdo entre todos los que la integran: el de ser creadores de su propia realidad, y por ende, responsables de todo lo que sucede en sus emprendimientos y sus vidas. Esta premisa clave transforma a cada emprendimiento en el vehículo y espejo del emprendedor, ampliando como una lupa las conquistas y limitaciones personales, que luego permiten a los emprendedores conducir con mayor consciencia en el viaje que los lleva más allá de sí mismos. </p> <p> El acompañamiento se hace tanto desde lo denso y tangible, a través de herramientas y servicios que se ofrecen de acuerdo a las necesidades particulares del emprendimiento, tales como: locación (espacio de producción, sala de reuniones y coworking), asesoramiento técnico, charlas temáticas, y consultorías en áreas específicas (administrativo, contable, etc) como desde lo sutil, a través de un acompañamiento personalizado con un focalizador, círculos de escucha, y abordando técnicas y terapias de autoconocimiento para la ampliación de conciencia. </p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button> </div> </div> </div> </div> <div class="sec_info"> <div class="info_inner"> <h1>Estamos en contacto</h1> <div class="info_botones"> <a href="https://docs.google.com/forms/d/1ZmljYAit6fvk3RO2N3qZQ-njWKI7Jw_AwfXB-xZ2_5g/viewform" target="_blank" class="btn_action">Newsletter</a> <a href="mailto:info@arumalab.com" class="btn_nav">Escribinos</a> </div> </div> </div> </div>'),a.put("views/proyecto.html","<h1>ARUMA (proyecto)</h1>")}]);