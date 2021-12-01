<?php
/**
*+=======================ATTENTION======================+
*+<<<<<<<<<<<<<! Ne pas modifier les clés>>>>>>>>>>>>>>>>>
*=======Valeurs de configuration globlale de l'App======= 
*/
return [

	"APP_NAME" 		=> "online",
	"APP_URL"       => "http://online/public/server.php",
	"APP_AUTHOR"	=> "IDRISS-HACKER",
	"APP_VERSION"   => "1.0.0",
	"APP_YEAR"      => "2021",
	"APP_TEMPLATE"  => "react",

	"ENV"  			=> "production",
	"DEBUG"  		=> True,

	"DB_NAME"       => "online",
	"DB_HOST"       => "localhost",
	"DB_USER"       => "root",
	"DB_PASS"       => "",

	"connected"     => isset($_SESSION['connected']) AND !empty($_SESSION['connected']) ? 1 : 1,
	"FRAMEWORK"     => [
		"CSS" =>["material_ui"],
		"JS"  =>["reactjs"]
	]

];
