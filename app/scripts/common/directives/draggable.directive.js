'use strict';
var mySharedService = angular.module('sioWebApp.common').factory('mySharedService', function($rootScope) {
	var sharedService = {};

	sharedService.zIndex = 1;
	sharedService.message = '';

	sharedService.prepForBroadcast = function(msg) {
		this.message = msg;
		this.broadcastItem();
	};

	sharedService.broadcastItem = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	sharedService.clearAll = function() {
		$rootScope.$broadcast('clearAll');
	};

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

			$scope.removeElement = function(){
				$element.remove();
			};

			$scope.moveUp = function(){
				//var imgElement = angular.element($element.children()[0]);
				var imgElement = $element;
				var zIndex = parseInt(imgElement.css( "zIndex"));
				console.log(zIndex)
				imgElement.css( "zIndex", zIndex+1 );
			};

			$scope.moveDown = function(){
				///var imgElement = angular.element($element.children()[0]);
				var imgElement = $element;
				var zIndex = parseInt(imgElement.css( "zIndex"));
				console.log(zIndex)
				if(zIndex == 0) return;
				imgElement.css( "zIndex", zIndex-1  );
			};

			mySharedService.prepForBroadcast($element);
		},
		link: function (scope, element) {

			element.css({top:scope.top,left:scope.left});

			scope.$on('handleBroadcast', function() {
				var tmpIsSelected = (mySharedService.message == element);
				var needRefresh = tmpIsSelected != scope.isSelected;
				scope.isSelected = tmpIsSelected;
				scope.$apply();
				if(needRefresh){
					verifyBorder();
				}
			});

			scope.$on('clearAll', function() {
				scope.removeElement();
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

			interact(element.get( 0 ))
					.draggable({
						onStart:function (event) {
							var targetElement = angular.element(target);
							var imgElement = angular.element(targetElement.children()[0]);
							if(!imgElement.hasClass("selectedDraggable")){
								interact.stop(event);
							}
						},
						onmove: function (event) {
							var target = event.target;
							target.x = (target.x|0) + event.dx;
							target.y = (target.y|0) + event.dy;
							target.style.webkitTransform = target.style.transform =
									'translate(' + target.x + 'px, ' + target.y + 'px)';
						}
					})
					.on('dragend', function (event) {
						console.log('dragged a distance of ' + Math.sqrt(event.dx*event.dx + event.dy*event.dy) + ' pixels to ' + event.pageX + ', ' + event.pageY);
					})
					.inertia(true)
					.restrict({ drag: 'parent' });


			//resize
			var angle = 0;

			interact(element.get( 0 )).gesturable({
				onmove: function (event) {
					var arrow = element.get( 0 );
					angle += event.da;
					arrow.style.webkitTransform = arrow.style.transform = 'rotate(' + angle + 'deg)';
				}
			});

			var scale = 1;
			var scaleElement =  element.get( 0 );
			var resetTimeout;

			interact(element.get( 0 )).gesturable({
				onstart: function (event) {
					clearTimeout(resetTimeout);
					scaleElement.classList.remove('reset');
				},
				onmove: function (event) {
					scale = scale * (1 + event.ds);
					scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(' + scale + ')';

				},
				onend: function (event) {
					resetTimeout = setTimeout(reset, 1000);
					scaleElement.classList.add('reset');
				}
			});
			function reset () {
				scale = 1;
				scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(1)';
			}

			// prevent browser's native drag on the image
			element.on('dragstart', function (event) {
				event.preventDefault();
			})

			element.bind('click touchstart', function (event) {
				mySharedService.prepForBroadcast(element);
			})
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
					var ext = data["items"][i].ext;
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
					var offsetTop = (containerElement.height() - heightAttr)/2;
					var offsetLeft = (containerElement.width() - widthAttr)/2;
					var newElement = $compile('<draggable-item id="1" src="'+srcAttr+'" top="'+offsetTop+'px" left="'+offsetLeft+'px"/>')(scope);


					//newElement.css({top:offsetTop+"px",left:offsetLeft+"px"});
					containerElement.append(newElement);
				})
			}
		}
	};
});