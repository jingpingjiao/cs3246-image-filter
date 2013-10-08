<div id="control" class="control">

	<dl>

		<dt>
			Red Channel:
		</dt>

		<dd>
			<input type="range" min="-10" max="10" step="1" value="0" id="redChannel" />
		</dd>

	</dl>

	<dl>

		<dt>
			Green Channel:
		</dt>

		<dd>
			<input type="range" min="-10" max="10" step="1" value="0" id="greenChannel"/>
		</dd>

	</dl>

	<dl>

		<dt>
			Blue Channel:
		</dt>

		<dd>
			<input type="range" min="-10" max="10" step="1" value="0" id="blueChannel"/>
		</dd>

	</dl>

	<dl>

		<dt>
			brightChannel:
		</dt>

		<dd>
			<input type="range" min="-8" max="8" step="0.5" value="0" id="brightChannel"/>
		</dd>

	</dl>

	<dl>

		<dt>
			grayChannel:
		</dt>

		<dd>
			<input type="range" min="-10" max="10" step="1" value="0" id="greyChannel"/>
		</dd>

	</dl>

</div>
<script type="text/javascript">
	function ready() {
		var canvas = document.getElementById("canvas").getContext("2d"), original = null, current = null, width = 0, height = 0;
		width = document.getElementById("canvas").width;
		height = document.getElementById("canvas").height;
		current = canvas.getImageData(0, 0, width, height);
		original = canvas.getImageData(0, 0, width, height);
			
		document.getElementById("redChannel").onchange = function() {

			var local = canvas.getImageData(0, 0, width, height);
			var level = this.value / 10;
			for (var i = 0; i < current.data.length; i += 4) {

				local.data[i] = current.data[i] + (255 - current.data[i]) * level;
			}

			canvas.putImageData(local, 0, 0, 0, 0, width, height);

			this.onblur = function() {

				current = local;

			}
		}

		document.getElementById("greenChannel").onchange = function() {

			var local = canvas.getImageData(0, 0, width, height), level = this.value / 10;

			for (var i = 0; i < current.data.length; i += 4) {

				local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;

			}

			canvas.putImageData(local, 0, 0, 0, 0, width, height);

			this.onblur = function() {

				current = local;

			}
		}

		document.getElementById("blueChannel").onchange = function() {

			var local = canvas.getImageData(0, 0, width, height), level = this.value / 10;

			for (var i = 0; i < current.data.length; i += 4) {

				local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;

			}

			canvas.putImageData(local, 0, 0, 0, 0, width, height);

			this.onblur = function() {

				current = local;

			}
		}

		document.getElementById("brightChannel").onchange = function() {

			var local = canvas.getImageData(0, 0, width, height), level = this.value * 25;

			for (var i = 0; i < current.data.length; i += 4) {

				local.data[i] = current.data[i] + level;

				local.data[i + 1] = current.data[i + 1] + level;

				local.data[i + 2] = current.data[i + 2] + level;

			}

			canvas.putImageData(local, 0, 0, 0, 0, width, height);

			this.onblur = function() {

				current = local;

			}
		}

		document.getElementById("greyChannel").onchange = function() {

			var local = canvas.getImageData(0, 0, width, height), level = this.value / 10;

			for (var i = 0; i < current.data.length; i += 4) {

				local.data[i] = current.data[i] + (255 - current.data[i]) * level;

				local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;

				local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;

			}

			canvas.putImageData(local, 0, 0, 0, 0, width, height);

			this.onblur = function() {

				current = local;

			}
		}
	}
</script>