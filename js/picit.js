$(document).ready(init);
var img_src;
var ctx;

var theme_effects = ["oil", 'old', 'dream', 'cold', 'warm'];
var enhence_effects = ["mean"];
var currentFilter;

var brightnessValueList = new Array(0.6,0.5,0.2,-0.1,-0.2,-0.3);
var exposureValueList = new Array (3.5,3,2.5,2.15,1.85,1.5);
var contrastValueList = new Array( 1.6, 1.4, 1.2, 1.4, 1.9,1.5);
var canvasList = new Array();
function init() {
	ctx = document.getElementById("canvas").getContext("2d");

	$(".xxx").click(function() {
		console.log(this.id);
		if ($(this).attr("id") == '1' || $(this).attr("id") == '3') {
			$("#table").css("display", "none");
			if ($(this).attr("id") == '3') {
				$("#yyy").css("display", "block");
				PicitFilters.hdr.apply(canvasList);
			} else {
				$("#yyy").css("display", "none");
				resetImage();
			}
		} else {
			$("#table").css("display", "block");
			$("#yyy").css("display", "none");
			resetImage();
		}
	});
	$(".cancel").click(function() {
		$("#myModal").css("display", "none");
	});

	$("#btn_upload").click(function() {
		$("#myModal").css("display", "inline");
	});

	$("#btn_apply").click(function() {
		applyEffect();
	});

	document.getElementById("stack").checked = true;
	//=================initialize effect=========================

	addEffectToList(document.getElementById("theme_list"), theme_effects);
	addEffectToList(document.getElementById("enhence_list"), enhence_effects);
}

function addEffectToList(container, list) {
	jQuery.each(list, function() {
		var effectName = this;
		var div = document.createElement("div");
		div.setAttribute("class", "list_wrapper");
		var a = document.createElement("a");
		a.setAttribute("class", "btn_effect");
		a.setAttribute("id", effectName);
		a.setAttribute("href", "#");
		a.setAttribute("onclick", "activate_effect(this)");
		a.innerHTML = effectName;
		div.appendChild(a);
		container.appendChild(div);
	});

}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#preview').attr('src', e.target.result).width(150).height(150);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function upload() {
	console.log("!!!!");
	if ($('#preview').attr('src') != "#") {
		var img = new Image();
		img.onload = function() {
			width = document.getElementById("canvas").width = img.width;
			height = document.getElementById("canvas").height = img.height;
			ctx.drawImage(img, 0, 0, width, height);
			prepareHDR(img.src);

			ready();
			$('#myModal').css("display", "none");
		}
		img.src = $('#preview').attr('src');
		img_src = $('#preview').attr('src');
		//global src
	} else {
		$('#preview').html("Please select a file");
	}

}

function prepareHDR(src) {
	canvasList = [] ;
	var index = 0;
	for (var i = 1; i < 7; i++) {
		var image = new Image();
		image.onload = function() {
			var canvas = document.createElement("canvas");
			canvas.setAttribute("class", "hdr ");
			document.getElementById("hdr_canvas").appendChild(canvas);
			var width = canvas.width = image.width;
			var height = canvas.height = image.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0, width, height);
			var data = ctx.getImageData(0, 0, width, height);
			
			JSManipulate.exposure.filter(data, {
				exposure: exposureValueList[index]
			});
			JSManipulate.brightness.filter(data, {
				amount: brightnessValueList[index]
			});
			JSManipulate.contrast.filter(data, {
				amount : contrastValueList[index]
			});
			ctx.putImageData(data, 0, 0);
			index++;
			canvasList.push(canvas);
		}
		image.src = src;
	}
}

function resetImage() {
	if (img_src != null && img_src != '') {
		var img = new Image();
		img.onload = function() {
			//Set the size of canvas based on the loading picture
			width = document.getElementById("canvas").width = img.width;
			height = document.getElementById("canvas").height = img.height;
			ctx.drawImage(img, 0, 0, width, height);
		}
		img.src = img_src;
	}
}

function applyEffect() {
	//if not stacked effect
	if (document.getElementById("stack").checked == false) {
		var img = new Image();
		img.onload = function() {
			//Set the size of canvas based on the loading picture
			width = document.getElementById("canvas").width = img.width;
			height = document.getElementById("canvas").height = img.height;
			ctx.drawImage(img, 0, 0, width, height);
			var filter = currentFilter;
			var params = getParams();
			var canvas_width = document.getElementById("canvas").width;
			var canvas_height = document.getElementById("canvas").height;
			var data = ctx.getImageData(0, 0, canvas_width, canvas_height);
			filter.apply(ctx, data, params);
			console.log(filter.name);
		}
		img.src = img_src;
	} else {
		var filter = currentFilter;
		var params = getParams();
		var canvas_width = document.getElementById("canvas").width;
		var canvas_height = document.getElementById("canvas").height;
		var data = ctx.getImageData(0, 0, canvas_width, canvas_height);
		filter.apply(ctx, data, params);
		console.log(filter.name);
	}
}

function activate_effect(button) {
	var filterName = button.id;
	console.log("choose filter:" + filterName);

	var filter = PicitFilters.filterName;

	switch(filterName) {
		case'oil':
			filter = PicitFilters.oil;
			break;
		case'old':
			filter = PicitFilters.old;
			break;
		case'dream':
			filter = PicitFilters.dream;
			break;
		case'cold':
			filter = PicitFilters.cold;
			break;
		case'warm':
			filter = PicitFilters.warm;
			break;
		case'mean':
			//for test
			filter = PicitFilters.mean;
			break;
	}

	currentFilter = filter;
	var params = filter.params;
	activate_option(params);
	document.getElementById("filter_name").innerHTML = currentFilter.name;
}

function getParams() {
	var table = document.getElementById("table");
	var result = new Array();
	for (var i = 0; i < table.rows.length; i = i + 2) {
		var value = table.rows[i+1].cells[1].childNodes[0].value;
		var param = table.rows[i].cells[0].childNodes[0].innerHTML;
		result.push([param, value]);
	}
	console.log("Params are:" + result);
	return result;
}

function activate_option(params) {

	var table = document.getElementById("table");
	clear_table(table);
	//[['range', 3, [0, 5]]];
	for (var i = 0; i < params.length; i++) {
		//load data
		var labelName = params[i][0];
		var defaultValue = params[i][1];
		var min = params[i][2][0];
		var max = params[i][2][1];
		var steps = params[i][3];
		var step = (max - min + 1) / steps;
		//create elements
		var label = document.createElement("span");
		label.setAttribute("class", "label label-info");
		label.innerHTML = labelName;

		var slider = document.createElement("input");
		slider.setAttribute("class", "slider");
		slider.setAttribute("id", labelName);
		slider.setAttribute("min", min);
		slider.setAttribute("max", max);
		slider.setAttribute("step", step);
		slider.setAttribute("value", defaultValue);
		slider.setAttribute("type", "range");

		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("value", defaultValue);
		input.setAttribute("id", labelName);
		input.setAttribute("class", "input");
		slider.setAttribute("onchange", "changeInput(this)");
		input.setAttribute("onchange", "changeSlider(this)");
		//add change listener

		var row1 = table.insertRow(2 * i);
		var cell1 = row1.insertCell(0);
		var row2 = table.insertRow(2 * i + 1);
		var cell2 = row2.insertCell(0);
		var cell3 = row2.insertCell(1);
		cell1.appendChild(label);
		cell2.appendChild(slider);
		cell3.appendChild(input);

	}
}

function changeInput(slider) {
	$(":input#" + slider.id + ".input").val(slider.value);
}

function changeSlider(input) {
	$(":input#" + input.id + ".slider").val(input.value);
}

function clear_table(table) {
	for (var i = table.rows.length; i > 0; i--) {
		table.deleteRow(i - 1);
	}
}

