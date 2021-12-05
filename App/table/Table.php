<?php

namespace App\Table;

/**
 * summary
 */
use App\App;


class Table
{

	protected static $table;

	/**
     * summary
     */
    public function __get($key)
    {
    	$method = "get".ucfirst($key);

    	$this->$key = $this->$method();

    	return $this->$key;

    }


	private static function getTable()
	{

		if(is_null(static::$table))
		{

			$class = explode("\\", get_called_class());
			static::$table = strtolower(end($class))."s";

		}

		return static::$table;
	}


	public static function find($id)
    {
    	return App::bdd()->prepare(

    		"SELECT * FROM  categories  WHERE id = ? ", [$id], get_called_class(), true
    	); 	
    }

    public static function All()
    {
    	return App::bdd()->query("
    		SELECT * 
    		FROM ".static::getTable()."
    		", 
    		get_called_class(),
    	);
    }

    public function getTitre()
    {
        return $this->title;
    }

    public static function query($statement, $attributes = null, $one = false){
    	
    	if($attributes){

    		return App::bdd()->prepare($statement, $attributes , get_called_class(), $one);

    	}else{

    		return App::bdd()->prepare($statement, $attributes , get_called_class(), $one);

    	}

    }

    public static function save($statement, $attributes = null){
        return App::bdd()->saving($statement, $attributes);
    }

	public static function del($statement, $attributes = null){

		return App::bdd()->saving($statement, $attributes);
	}

	public static function unlinkAvatar(){
		
		$avatar = self::query("SELECT avatar FROM admin WHERE admin.id = 1",[],true)->avatar;
		$avatarPath = "./files/avatar/".$avatar;
		
		if(file_exists($avatarPath) AND $avatar !== "default.svg"){
			unlink($avatarPath);
		}
	}
}
