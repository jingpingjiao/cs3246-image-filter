<!DOCTYPE html>
<html>
	<head>
		<title>Picit</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<!-- sources -->
		<link href="css/bootstrap-responsive.css" rel="stylesheet">
		<link href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet">
		<link href="css/index.css" rel="stylesheet">
		<link href="css/bootstrap.css" rel="stylesheet">
		<script src="js/jquery-1.8.1.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/jsmanipulate.min.js"></script>
		<script src="js/jquery-ui-1.8.23.custom.js"></script>
		<!-- Button to trigger modal -->
		<script src="js/picit.js"></script>
		<script src="js/PicitFilters.js"></script>
		<script src="js/mean.js"></script>
		<script src="js/hdr.js"></script>

	</head>

	<body>
		<div class="container">
			<br>
			<br>
			<div class="container-fluid">
				<div class="tabbable">
					<!-- Only required for left/right tabs -->
					<ul class="nav nav-tabs big-font" >
						<li class="active">
							<a class="xxx" href="#tab1" id="1" data-toggle="tab">Basic Adjust</a>
						</li>
						<li>
							<a class="xxx"href="#tab2" id="2" data-toggle="tab">Effects</a>
						</li>
						<li>
							<a class="xxx"href="#tab3" id="3" data-toggle="tab">HDR</a>
						</li>
						<img id="icon" src="img/icon.png"></img>
					</ul>
				</div>
				<div class="row-fluid" id="test">
					<!--sidebar-->
					<div class="span2">
						<div class="tab-content">
							<div class="tab-pane active" id="tab1">
								<?php include "adjust.php"
								?>
							</div>
							<div class="tab-pane" id="tab2">
								<?php include "effects.php"
								?>
							</div>
							<div class="tab-pane" id="tab3">

							</div>
						</div>
					</div>

					<!--Image-->
					<div class="span10">
						<?php include "image.php"
						?>
					</div>
				</div>

				<div>
					<button id="btn_save" style="float:right" onclick="download()" role="button" class="btn btn-success" data-toggle="modal">
						Save my work
					</button>
				</div>
				<div>
					<a id="btn_upload" style="float:right" href="#myModal" role="button" class="btn btn-primary" data-toggle="modal">Upload a image</a>
				</div>
				<div>
					<button id="btn_reset" style="float:right" onclick="resetImage()" role="button" class="btn btn-danger" data-toggle="modal">
						Reset image
					</button>
				</div>
				<script>
					function download() {
						var callback = function() {
							$("#notify").css("display", "block");
						};
						var dataURL = document.getElementById("canvas").toDataURL();
						var jqxhr = $.post("download.php", {
							'image_data' : dataURL,
						}, callback);

					}
				</script>
			</div>
			<!--footer-->
			<ul class="nav nav-list">
				<li class="divider"></li>
			</ul>
			<?php include "modal.php"
			?>
			<?php include "notify.php"
			?>
		</div>
		<?php include "hdrsource.php"
		?>
	</body>
</html>