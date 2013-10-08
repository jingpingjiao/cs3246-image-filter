<?php

// place this code inside a php file and call it f.e. "download.php"
// change the path to fit your websites document structure
if (!isset($_POST['image_data'])) {
	echo "there is an error!";
} else {
	$image_data = $_POST['image_data'];
	$image_data = str_replace('data:image/png;base64,', '', $image_data);
	$image_data = str_replace(' ', '+', $image_data);
	$data = base64_decode($image_data);

	$folder = $_SERVER['DOCUMENT_ROOT'] . "/cs3246/userimg/"; ;
	// explode the IP of the remote client into four parts
	$file = $folder . "picit" . '.png';
	file_put_contents($file, $data);
}

$file = "D:\/xampp\/htdocs\/cs3246\/userimg\/picit.png";

if ($fd = fopen($file, "r")) {
	$fsize = filesize($file);
	$path_parts = pathinfo($file);
	$ext = strtolower($path_parts["extension"]);
	switch ($ext) {
		case "png" :
			header("Content-type: image/png");
			// add here more headers for diff. extensions
			header("Content-Disposition: attachment; filename=\"" . $path_parts["basename"] . "\"");
			// use 'attachment' to force a download
			break;
		default :
			header("Content-type: application/octet-stream");
			header("Content-Disposition: filename=\"" . $path_parts["basename"] . "\"");
	}
	header("Content-length: $fsize");
	header("Cache-control: private");
	//use this to open files directly
	while (!feof($fd)) {
		$buffer = fread($fd, 2048);
		echo $buffer;
	}
}
fclose($fd);
exit ;
// example: place this kind of link into the document where the file download is offered:
// <a href="download.php?download_file=some_file.pdf">Download here</a>
?>