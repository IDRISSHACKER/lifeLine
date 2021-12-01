<?php

namespace App;

use App\Database;
use App\Config;
/**
 * summary
 */
class App
{

    private static $database;
    private static $title;
    
    /**
     * summary
     */
    public static function bdd()
    {

       if(is_null(self::$database)){

    		self::$database = new Database(

                Config::init()->get("DB_NAME"),
                Config::init()->get("DB_USER"),
                Config::init()->get("DB_PASS"),
                Config::init()->get("DB_HOST")

            );
       }

    	return self::$database;

    }

    public static function notFound(){

        header("HTTP/1.0 404 Not Found");
        header("location:".Config::init()->get("APP_URL")."/index.php");
    
    }

    public static function setTitle($newTitle){

        self::$title = $newTitle;
    }

    public static function getTitle(){

        return self::$title;

    }
}