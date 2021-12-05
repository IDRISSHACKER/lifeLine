<?php 
namespace App\Table;

/**
 * summary
 */
use App\App;

use App\Config;


class Image extends Table
{

    public static function setImage()
    {   
        self::unlinkAvatar();
        
        $img = $_FILES['img'];
        $img_tmp = $img["tmp_name"];
        $file_name = time().$img['name'];
        $path = "./files/avatar/".$file_name;

        if(move_uploaded_file($img_tmp, $path)){

            echo json_encode(["msg"=>"success","img"=>$file_name]);
            self::save("UPDATE admin SET avatar = ?",[$file_name]);
    
        }else{
            echo json_encode(["msg"=>"error","img"=>"default.jpg"]);
        }
    } 
}
