// variables
var canvas, ctx;
var imgObj;

// filter strength
var strength = 0.5;

// shifting matrix
//(emboss)  var matrix = [-2, -1, 0, -1, 1, 1, 0, 1, 2];

//(sharpen) var matrix = [-1,-1,-1,-1,9,-1,-1,-1,-1];

// (excessive edge) var matrix = [1,1,1,1,-7,1,1,1,1];

/* (mean)*/ //var matrix = [1,1,1,1,1,1,1,1,1];

//(motion blur)
/*	var matrix = [ 1, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 1, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 1, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 1, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 1, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 1, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 1, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 1, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 1,];*/

var effect = 1;
var extent = 5;

var matrix = generate_matrix(effect, extent);
// extent goes from 3*3 to 9*9,odd number only,   1 for mean
function generate_matrix(effect, extent) {
	if ((extent != 3) && (extent != 5) && (extent != 7) && (extent != 9))
		return;
	switch(effect) {
		case 1:
			switch(extent) {
				case 3:
					var matrix = new Array(9);
					for ( i = 0; i < 9; i++) {
						matrix[i] = 1;
					}
					return matrix;
					break;
				case 5:
					var matrix = new Array(25);
					for ( i = 0; i < 25; i++) {
						matrix[i] = 1;
					}
					return matrix;
					break;
			}
			break;

		default:
			var matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			return matrix;
	}

}

// normalize matrix
function normalizeMatrix(m) {
	var j = 0;
	for (var i = 0; i < m.length; i++) {
		j = j + m[i];
	}
	for (var i = 0; i < m.length; i++) {
		m[i] = m[i] / j;
	}
	return m;
}

// convert x-y coordinates into pixel position
function convertCoordinates(x, y, w) {
	return x + (y * w);
}

// find a specified distance between two colours
function findColorDiff(dif, dest, src) {
	return dif * dest + (1 - dif) * src;
}

// transform matrix
function transformMatrix(img, pixels) {

	// create a second canvas and context to keep temp results
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	ctx2.width = canvas2.width = img.width;
	ctx2.height = canvas2.height = img.height;

	// draw image
	ctx2.drawImage(img, 0, 0, img.width, img.height);
	var buffImageData = ctx2.getImageData(0, 0, canvas.width, canvas.height);

	var data = pixels.data;
	var bufferedData = buffImageData.data;

	// normalize matrix
	matrix = normalizeMatrix(matrix);
	var mSize = Math.sqrt(matrix.length);

	for (var i = 1; i < img.width - 1; i++) {
		for (var j = 1; j < img.height - 1; j++) {

			var sumR = sumG = sumB = 0;

			// loop through the matrix
			for (var h = 0; h < mSize; h++) {
				for (var w = 0; w < mSize; w++) {
					var r = convertCoordinates(i + h - 1, j + w - 1, img.width) << 2;

					// RGB for current pixel
					var currentPixel = {
						r : bufferedData[r],
						g : bufferedData[r + 1],
						b : bufferedData[r + 2]
					};

					sumR += currentPixel.r * matrix[w + h * mSize];
					sumG += currentPixel.g * matrix[w + h * mSize];
					sumB += currentPixel.b * matrix[w + h * mSize];
				}
			}

			var rf = convertCoordinates(i, j, img.width) << 2;
			data[rf] = findColorDiff(strength, sumR, data[rf]);
			data[rf + 1] = findColorDiff(strength, sumG, data[rf + 1]);
			data[rf + 2] = findColorDiff(strength, sumB, data[rf + 2]);
		}
	}
	return pixels;
}

// process emboss function
function processEmboss() {

	// clear context
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw image
	ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);

	// get image data
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	// transform image data
	imageData = transformMatrix(imgObj, imageData);

	// draw data back
	ctx.putImageData(imageData, 0, 0);
};
