var PicitFilters = {
	oil : new Picit_OilFilter(),
	old : new Picit_OldFilter(),
	dream : new Picit_DreamFilter(),
	cold : new Picit_ColdFilter(),
	warm : new Picit_WarmFilter(),
	mean : new Picit_MeanFilter(),
	hdr : new Picit_HDR_Filter()
	//add more filters here
};

//define filter here
function Picit_OilFilter() {

	//name of the filter
	this.name = "Oil Painting";
	/**
	 *params is to used to display slide bar
	 * for example, params= [['range', 3, [0, 5]]] means I will need one slide bar called "range", has a default value 3, with range from 0 to 5
	 */
	this.params = [['range', 3, [0, 5], 20]];

	/**
	 * fcuntion: apply
	 * a API to be called upon applying filters
	 * input is in the form of list of pairs as in [[param1,value1],[param2,value2]......]
	 */

	this.apply = function(ctx, data, input) {
		//user jsmani to filter
		JSManipulate.oil.filter(data, {
			range : input[0][1]
		});
		ctx.putImageData(data, 0, 0);
	};
}

function Picit_OldFilter() {

	//name of the filter
	this.name = "Old";
	/**
	 *params is to used to display slide bar
	 * for example, params= [['range', 3, [0, 5]]] means I will need one slide bar called "range", has a default value 3, with range from 0 to 5
	 */
	this.params = [['amount', 10, [0, 20], 20]];

	/**
	 * fcuntion: apply
	 * a API to be called upon applying filters
	 * input is in the form of list of pairs as in [[param1,value1],[param2,value2]......]
	 */

	this.apply = function(ctx, data, input) {
		//user jsmani to filter
		JSManipulate.sepia.filter(data, {
			amount : input[0][1]
		});
		JSManipulate.blur.filter(data, {
			amount : input[0][1] / 50
		});
		JSManipulate.noise.filter(data, {
			amount : 20 + input[0][1] / 3 * 4,
			density : 0.7,
		});
		ctx.putImageData(data, 0, 0);
	};
}

function Picit_DreamFilter() {

	//name of the filter
	this.name = "Dream";
	/**
	 *params is to used to display slide bar
	 * for example, params= [['range', 3, [0, 5]]] means I will need one slide bar called "range", has a default value 3, with range from 0 to 5
	 */
	this.params = [['amount', 1.2, [1.2, 1.7], 20]];

	/**
	 * fcuntion: apply
	 * a API to be called upon applying filters
	 * input is in the form of list of pairs as in [[param1,value1],[param2,value2]......]
	 */

	this.apply = function(ctx, data, input) {
		//user jsmani to filter
		JSManipulate.vignette.filter(data, {
			amount : 0.8
		});
		JSManipulate.contrast.filter(data, {
			amount : input[0][1]
		});
		JSManipulate.rgbadjust.filter(data, {
			blue : 0.3
		});
		JSManipulate.sharpen.filter(data, {

		});
		ctx.putImageData(data, 0, 0);

	};
}

function Picit_ColdFilter() {

	//name of the filter
	this.name = "Cold";
	/**
	 *params is to used to display slide bar
	 * for example, params= [['range', 3, [0, 5]]] means I will need one slide bar called "range", has a default value 3, with range from 0 to 5
	 */
	this.params = [];

	/**
	 * fcuntion: apply
	 * a API to be called upon applying filters
	 * input is in the form of list of pairs as in [[param1,value1],[param2,value2]......]
	 */

	this.apply = function(ctx, data, input) {
		//user jsmani to filter
		JSManipulate.rgbadjust.filter(data, {
			blue : 1.6,
			green : 1.25,
			red : 0.74
		});

		ctx.putImageData(data, 0, 0);
	};
}

function Picit_WarmFilter() {

	//name of the filter
	this.name = "Warm";
	/**
	 *params is to used to display slide bar
	 * for example, params= [['range', 3, [0, 5]]] means I will need one slide bar called "range", has a default value 3, with range from 0 to 5
	 */
	this.params = [];

	/**
	 * fcuntion: apply
	 * a API to be called upon applying filters
	 * input is in the form of list of pairs as in [[param1,value1],[param2,value2]......]
	 */

	this.apply = function(ctx, data, input) {
		//user jsmani to filter
		JSManipulate.rgbadjust.filter(data, {
			blue : 0.39,
			green : 0.9,
			red : 1.38
		});
		JSManipulate.sharpen.filter(data, {

		});
		ctx.putImageData(data, 0, 0);
	};
}

function Picit_MeanFilter() {

	this.name = "Mean";
	this.params = [['extent', 1, [1, 4], 4]]
	this.apply = function(ctx, data, input) {
		var data = processEmboss(ctx, data, parseInt(input[0][1]) * 2 + 1, 1);
		ctx.putImageData(data, 0, 0);
	};

}

function Picit_HDR_Filter() {
	this.apply = function(canvasList) {
		hdr(prepareImage(canvasList));
	};
}

function prepareImage(canvasList) {
	var result = new Array();
	for (var i = 0; i < canvasList.length; i++) {
		result.push(canvasList[i].toDataURL());
	}
	return result;
}
