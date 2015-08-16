"use strict";
luana.factory( 'rating' )
.defineElements( {
	item: "[item]"
} )

.describeScope( {
	data: {},
	classes: {
		empty: "fa-star-o",
		half: "fa-star-half-o",
		full: "fa-star"
	}
})

.controller( function( view ) {
	return {
		eachScope: function( scope ) {
			// get options
			scope.elements.item.each(function(index, item) {
				scope.data[index] = {
					item: item,
					x1: this.getBoundingClientRect().left,
					xMiddle: this.getBoundingClientRect().left + this.getBoundingClientRect().width/2,
					x2: this.getBoundingClientRect().left + this.getBoundingClientRect().width
				};

				if( $(this).hasClass(scope.classes.full) ) {
					scope.data[index].selected = "full";
				} else if($(this).hasClass(scope.classes.half)) {
					scope.data[index].selected = "half";
				} else {
					scope.data[index].selected = "empty";
				}
			});
		},
		move: function( scope, element, event ) {
			for(var item in scope.data) {
				if (scope.data[item].x1 < event.clientX) {
					if (scope.data[item].xMiddle < event.clientX) {
						$(scope.data[item].item).removeClass(scope.classes.empty);
						$(scope.data[item].item).removeClass(scope.classes.half);
						$(scope.data[item].item).addClass(scope.classes.full);
						scope.root.setAttribute("title", ++item);
					} else if(scope.data[item].xMiddle > event.clientX) {
						$(scope.data[item].item).removeClass(scope.classes.empty);
						$(scope.data[item].item).removeClass(scope.classes.full);
						$(scope.data[item].item).addClass(scope.classes.half);
						scope.root.setAttribute("title", item + ".5");
					}
				} else {
					$(scope.data[item].item).removeClass(scope.classes.half);
					$(scope.data[item].item).removeClass(scope.classes.full);
					$(scope.data[item].item).addClass(scope.classes.empty);
				}
			}
		},
		leave: function( scope, element, event) {
			for(var item in scope.data) {
				switch(scope.data[item].selected) {
					case "full":
						$(scope.data[item].item).addClass(scope.classes.full);
						$(scope.data[item].item).removeClass(scope.classes.empty);
						$(scope.data[item].item).removeClass(scope.classes.half);
						break;
					case "half":
						$(scope.data[item].item).addClass(scope.classes.half);
						$(scope.data[item].item).removeClass(scope.classes.empty);
						$(scope.data[item].item).removeClass(scope.classes.full);
						break;
					case "empty":
						$(scope.data[item].item).addClass(scope.classes.empty);
						$(scope.data[item].item).removeClass(scope.classes.full);
						$(scope.data[item].item).removeClass(scope.classes.half);
						break;
				}
			}
		},
		click: function( scope, element, event) {
			scope.elements.item.each(function(index, item) {
				if($(item).hasClass(scope.classes.full)) {
					scope.data[index].selected = "full";
				} else if($(item).hasClass(scope.classes.half)) {
					scope.data[index].selected = "half";
				} else {
					scope.data[index].selected = "empty";
				}
			});
		}
	}
} )

.attachEvents( function( scope ) {
	return {
		move: ['mousemove', scope.root, true],
		leave: ['mouseleave', scope.root, true],
		click: ['click', scope.root, true]
	};
} )

.view( function() {
	return {
		update: function( scope ) {

		}
	}
} );
