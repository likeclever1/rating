$(document).ready(function() {
	console.log("init");
	var data = {};
	var cls = {
		empty: "fa-star-o",
		half: "fa-star-half-o",
		full: "fa-star"
	}

	// create object with coord starts
	$(".rating__item").each(function(index, item) {
		data[index] = {
			item: item,
			x1: this.getBoundingClientRect().left,
			xMiddle: this.getBoundingClientRect().left + this.getBoundingClientRect().width/2,
			x2: this.getBoundingClientRect().left + this.getBoundingClientRect().width
		}

		if( $(this).hasClass(cls.full) ) {
			data[index].selected = "full";
		} else if($(this).hasClass(cls.half)) {
			data[index].selected = "half";
		} else {
			data[index].selected = "empty";
		}
	});
		// console.log( this.getBoundingClientRect() );

	$(".rating").on("mousemove", function(e) {

		for(var item in data) {
			if (data[item].x1 < e.clientX) {
				if (data[item].xMiddle < e.clientX) {
					$(data[item].item).removeClass(cls.empty);
					$(data[item].item).removeClass(cls.half);
					$(data[item].item).addClass(cls.full);
				} else if(data[item].xMiddle > e.clientX) {
					$(data[item].item).removeClass(cls.empty);
					$(data[item].item).removeClass(cls.full);
					$(data[item].item).addClass(cls.half);
				}
			} else {
				$(data[item].item).removeClass(cls.half);
				$(data[item].item).removeClass(cls.full);
				$(data[item].item).addClass(cls.empty);
			}
		}
	});

	$(".rating").on("mouseleave", function(e) {
		for(var item in data) {
			switch(data[item].selected) {
				case "full":
					$(data[item].item).addClass(cls.full);
					$(data[item].item).removeClass(cls.empty);
					$(data[item].item).removeClass(cls.half);
					break;
				case "half":
					$(data[item].item).addClass(cls.half);
					$(data[item].item).removeClass(cls.empty);
					$(data[item].item).removeClass(cls.full);
					break;
				case "empty":
					$(data[item].item).addClass(cls.empty);
					$(data[item].item).removeClass(cls.full);
					$(data[item].item).removeClass(cls.half);
					break;
			}
		}
	});

	$(".rating").on("click", function(e) {
		$(".rating__item").each(function(index, item) {
			if($(item).hasClass(cls.full)) {
				data[index].selected = "full";
			} else if($(item).hasClass(cls.half)) {
				data[index].selected = "half";
			} else {
				data[index].selected = "empty";
			}
		});
	});
});