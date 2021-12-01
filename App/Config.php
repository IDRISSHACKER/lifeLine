<?php 
namespace App;

class Config
{
	private $settings = [];
	private static $_init;

    public function __construct(){

    	$this->settings = require dirname(__DIR__)."/config/env.php";

    }


    public static function init(){

    	if(is_null(self::$_init)){

    		self::$_init = new self();
    	}

    	return self::$_init;
    }

    public function get($key){

    	if(!isset($this->settings[$key])){

    		if($this->settings["DEBUG"]){

    			return "<b style='color:red'>UNDEFINED key $key ".__FILE__." on line ".__LINE__.  "</b>";

    		}else{
    			return null;
    		}

    	}

    	return $this->settings[$key];
    }

    public function getAll(){

        return $this->settings;

    }
}
