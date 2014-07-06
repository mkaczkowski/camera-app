'use strict';
var mySharedService = angular.module('sioWebApp.common').factory('mySharedService', function($rootScope) {
    var sharedService = {};

    var elements = {};

    var elementData = {
        posX : 0,
        posY : 0,
        lastPosX : 0,
        lastPosY : 0,
        bufferX : 0,
        bufferY : 0,
        scale : 1,
        last_scale : 1,
        rotation : 0,
        last_rotation : 0,
        dragReady : 0,
        isMirror:false
    }

    var currentElement = {};
    var currentElementData = {};

    sharedService.init = function() {
        var options = {
            transform_always_block: true,
            transform_min_scale: 1,
            drag_block_horizontal: true,
            drag_block_vertical: true,
            drag_min_distance: 0
        };

        angular.element("#draggableContainer").hammer(options).on('touch drag dragend transform transformend', function(ev) {
            if(angular.element(ev.target).is( "button" )){
                return true;
            }

            if(!ev.gesture){
                return;
            }

            ev.gesture.preventDefault();

            if(ev.gesture.target.id == "draggableContainer"){
                sharedService.prepForBroadcast(null);
                return;
            }

            if(ev.type == "touch"){
                sharedService.currentElement = ev.gesture.target.parentNode;
                sharedService.currentElementData = sharedService.getElement(sharedService.currentElement.className)
            }

            manageMultitouch(ev,sharedService.currentElement,sharedService.currentElementData);
        });
    };

    function manageMultitouch(ev,elementObj,elementData) {
            var transform;
        switch (ev.type) {
            case 'touch':
                break;
            case 'drag':
                elementData.posX = ev.gesture.deltaX + elementData.lastPosX;
                elementData.posY = ev.gesture.deltaY + elementData.lastPosY;
                transform = "translate(" + elementData.posX + "px," + elementData.posY + "px)";
                transform += "rotate(" + elementData.last_rotation + "deg) ";
                transform += "scale(" + (elementData.isMirror ? -elementData.last_scale : elementData.last_scale) + "," + elementData.last_scale + ")";
                break;
            case 'transform':
                elementData.rotation = elementData.last_rotation + ev.gesture.rotation;
                elementData.scale = Math.max(0.4, Math.min(elementData.last_scale * ev.gesture.scale, 5));
                transform = "translate(" + elementData.lastPosX + "px," + elementData.lastPosY + "px) ";
                transform += "rotate(" + elementData.rotation + "deg) ";
                transform += "scale(" + (elementData.isMirror ? -(elementData.scale) : elementData.scale) + "," + elementData.scale + ")";
                break;
            case 'transformend':
                elementData.last_scale = elementData.scale;
                elementData.last_rotation = elementData.rotation;
                break;
            case 'dragend':
                elementData.lastPosX = elementData.posX;
                elementData.lastPosY = elementData.posY;
                break;
        }

        sharedService.applyTransform(elementObj,transform)
    }

    sharedService.applyTransform = function (elementObj, transform) {
        console.info("trans:"+transform)
        if(transform){
            elementObj.style.transform = transform;
            elementObj.style.oTransform = transform;
            elementObj.style.msTransform = transform;
            elementObj.style.mozTransform = transform;
            elementObj.style.webkitTransform = transform;
        }
    }

    sharedService.addElement = function (element, scope) {
        element.first().css({top:scope.top,left:scope.left});
        element.addClass(makeid());

        var newElement = element.get(0);
        var newData = JSON.parse(JSON.stringify(elementData));
        elements[newElement.className] = newData;

        sharedService.currentElement = newElement;
        sharedService.currentElementData = newData;

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
    };

    sharedService.getElement = function (element) {
        return elements[element];
    };

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    sharedService.moveUp = function(){
        $rootScope.$broadcast('moveUp');
    };

    sharedService.moveDown = function(){
        $rootScope.$broadcast('moveDown');
    };

    sharedService.mirror = function(){

        sharedService.currentElementData.isMirror = !sharedService.currentElementData.isMirror;
        var transform = "translate(" + sharedService.currentElementData.lastPosX + "px," + sharedService.currentElementData.lastPosY + "px) ";
        transform += "rotate(" + sharedService.currentElementData.last_rotation + "deg) ";
        transform += "scale(" + (sharedService.currentElementData.isMirror ? -sharedService.currentElementData.last_scale : sharedService.currentElementData.last_scale) + "," + sharedService.currentElementData.last_scale + ")";
        sharedService.applyTransform(sharedService.currentElement,transform);
    };

    sharedService.removeElement = function(){
        $rootScope.$broadcast('removeElement');
        this.prepForBroadcast(null);
    };

    sharedService.clearAll = function() {
        $rootScope.$broadcast('clearAll');
        this.prepForBroadcast(null);
    };

    sharedService.resetElement = function(){
        sharedService.currentElementData = JSON.parse(JSON.stringify(elementData));
        elements[currentElement.className] = currentElementData;
        var transform = "translate(" + sharedService.currentElementData.lastPosX + "px," + sharedService.currentElementData.lastPosY + "px) ";
        transform += "rotate(" + sharedService.currentElementData.rotation + "deg) ";
        transform += "scale(" + sharedService.currentElementData.scale + "," + sharedService.currentElementData.scale + ")";
        sharedService.applyTransform(sharedService.currentElement, transform);
    };

    sharedService.message;

    return sharedService;
});

angular.module('sioWebApp.common').directive("draggableItem", function (mySharedService) {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/draggable.html',
        replace: true,
        piority: 10000,
        scope: {
            src:  '@',
            top:  '@',
            left: '@'
        },
        controller: function($scope, $element, mySharedService){
            $scope.isSelected = true;
            mySharedService.prepForBroadcast($element);

            $scope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
        },
        link: function (scope, element) {

            mySharedService.addElement(element, scope);

            scope.$on('handleBroadcast', function() {
                var tmpIsSelected = (mySharedService.message == element);
                var needRefresh = tmpIsSelected != scope.isSelected;
                scope.isSelected = tmpIsSelected;

                scope.safeApply();
                if(needRefresh){
                    verifyBorder();
                }
            });

            scope.$on('removeElement', function() {
                if(scope.isSelected){
                    element.remove();
                }
            });

            scope.$on('moveUp', function() {
                if(scope.isSelected){
                    var zIndex = parseInt(element.css( "zIndex"));
                    console.log(zIndex)
                    element.css( "zIndex", zIndex+1 );
                }
            });

            scope.$on('moveDown', function() {
                if(scope.isSelected){
                    var zIndex = parseInt(element.css( "zIndex"));
                    console.log(zIndex)
                    if(zIndex == 0) return;
                    element.css( "zIndex", zIndex-1  );
                }
            });


            scope.$on('clearAll', function() {
                element.remove();
            });

            var verifyBorder = function(){
                var imgElement = angular.element(element.children()[0]);
                if(!scope.isSelected){
                    imgElement.removeClass("selectedDraggable").css("border","");
                }else{
                    imgElement.addClass("selectedDraggable").css("border","3px dashed #545565");
                }
            }

            verifyBorder();

            element.bind('click touchstart', function (event) {
                mySharedService.prepForBroadcast(element);
            })

            element.on('$destroy', function() {
                //console.log("destroy element");
            });
        }
    };
})

angular.module('sioWebApp.common').directive('carousel', function($compile, mySharedService) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="myCarousel" style="width: 100%;" ng-transclude></div>',
        link: function(scope, element) {

            element.owlCarousel({
                jsonPath : 'data/data.json',
                jsonSuccess : customDataSuccess,
                singleItem: false,
                lazyLoad : true,
                navigation : true,
                pagination: false,
                items : 4
            });

            function customDataSuccess(data){
                var content = "";
                for(var i in data["items"]){
                    var width = data["items"][i].width;
                    var height = data["items"][i].height;
                    var img = data["items"][i].img;
                    var ext = ".png";//data["items"][i].ext;
                    var path = img + ext;
                    var thumb = img +".min" + ext;
                    content += "<div ><img class='thumb-img' style='max-width: 100%' data-width='"+width+"' data-height='"+height+"' src='"+path+"' ></div>";
                }
                element.html(content);
                applyHandlers();
            }

            function applyHandlers() {
                angular.element(".thumb-img").bind('click', function (event) {
                    var targetElement = angular.element(event.target);
                    var widthAttr = parseInt(targetElement.attr("data-width"));
                    var heightAttr = parseInt(targetElement.attr("data-height"));
                    var srcAttr = targetElement.attr("src");

                    var containerElement = angular.element(document.getElementById('draggableContainer'));
                    var offsetTop = (containerElement.height() - heightAttr - 56)/2;
                    var offsetLeft = (containerElement.width() - widthAttr)/2;
                    var newElement = $compile('<draggable-item id="1" src="'+srcAttr+'" top="'+offsetTop+'px" left="'+offsetLeft+'px"/>')(scope);


                    //newElement.css({top:offsetTop+"px",left:offsetLeft+"px"});
                    containerElement.append(newElement);
                })
            }


        }
    };
});