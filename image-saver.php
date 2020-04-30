<?php 
	
	//$id = '1dzi_LkKXsB-doaP0i5dIrg8lietNQXAK';
	$id = htmlspecialchars($_GET["id"]);
	$file_url = "https://script.google.com/macros/s/AKfycbzdFJeGVkmXVIUdT2dPz7isrvldWF_QfKSqdk5D4ZJH7s1KCHE/exec?id=".$id;
	$json = file_get_contents($file_url);
    $data = json_decode($json);
    $name = $data->name;
    echo $name;
    $file = 'data:image/jpeg;base64,' . strval($data->bytes);
    var_dump($file);
	//$img = 'data:image/png;base64,gAAAQ8AAAC6CAMAAACHgTh+AA=';

	list($type, $file) = explode(';', $file);
	list(, $file)      = explode(',', $file);
	$file = base64_decode($file);

	file_put_contents('imgs/'.$name.'.jpg', $file);

;?>