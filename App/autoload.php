<?php 

/**
 * Autoloader for my web application
 */
class Autoload
{

	private $pos = "App";
	
	static function register(){

		spl_autoload_register(array(__CLASS__, "load"));

	}


	static function load($class){
		$class = dirname(__DIR__)."/".$class.".php";

		$class = str_replace("\\", "/", $class);

		require $class;

	}

}