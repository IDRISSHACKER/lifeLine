<?php 

namespace App\Table;

/**
 * summary
 */
use App\App;


class Home
{
    private static $_init;
    /**
     *@return new Base()
     *@param void
     *singleton intialisation
     */

  public static function init(){

    if(is_null(self::$_init)){

        self::$_init = new self();
    }

    return self::$_init;
  }

  public function start(){

    var_dump($_SERVER);

  }

  public function getAppInfos(){
    
  }
}