
<!-- Modal -->
<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:none">
	<div class="modal-header">
		<button type="button" class="close cancel" data-dismiss="modal" aria-hidden="true">
			x
		</button>
		<h3 id="myModalLabel">Choose a image to upload</h3>
	</div>
	<div class="modal-body">
		<form name="img_upload" action="" method="post">
			<input id="img" type="file" accept="image/*" name="uploadField" onchange="readURL(this);"/>
		</form>
		<img class="offset2" src="#" alt="" id="preview"/>
	</div>
	<div class="modal-footer">
		<button class="btn cancel" data-dismiss="modal" aria-hidden="true">
			Cancel
		</button>
		<button class="btn btn-primary" id="btn_submit" onclick="upload()">
			Confirm
		</button>
	</div>
</div>