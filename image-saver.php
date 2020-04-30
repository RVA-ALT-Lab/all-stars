<?php 
	
	//$id = '1dzi_LkKXsB-doaP0i5dIrg8lietNQXAK';
	$id = htmlspecialchars($_GET["id"]);
	$file_url = "https://script.google.com/macros/s/AKfycbzdFJeGVkmXVIUdT2dPz7isrvldWF_QfKSqdk5D4ZJH7s1KCHE/exec?id=".$id;
	$json = file_get_contents($file_url);
    $data = json_decode($json);
    $name = $data->name;
    echo $name;
    $clean_name = (explode( ' - ', $name)[0]);//nice clean image name so people don't go insane
    $clean_name = str_replace(' ', '', $clean_name);
    $clean_name = strtolower($clean_name);
    $file = 'data:image/jpeg;base64,' . strval($data->bytes);
    var_dump($clean_name);
    //thanks to https://stackoverflow.com/questions/11511511/how-to-save-a-png-image-server-side-from-a-base64-data-string
	list($type, $file) = explode(';', $file);
	list(, $file)      = explode(',', $file);
	$file = base64_decode($file);

	file_put_contents('work/' . $clean_name . '.jpg', $file);

;?>