<?php

namespace App\Table;

require dirname(dirname(__DIR__)).'/vendor/autoload.php';

/**
 * summary
 */

use App\App;

use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Spreadsheet;
use \App\Table\Users;
use \App\Table\Groupe;

class Stream{

    public static function OpenFile($filename){
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($filename);
        $reader = $reader->load($filename);
        $data = $reader->getActiveSheet()->toArray();

        return $data;
    }

    public static function read($filename, $ctg="0"){
       if(self::validateExtension($filename)){
            $blob = self::OpenFile($filename);
            $users = self::display($blob, $ctg);
            if (self::saveAllInDatabese($users)) {
                http_response_code(200);
                echo json_encode(["msg" => "Extraction du fichier excel reussis", "error" => 0]);
                return true;
            } else {
                http_response_code(200);
                echo json_encode(["msg" => "Extraction du fichier excel echoue", "error" => 1]);
                return false;
            };
       }else{
            http_response_code(200);
            echo json_encode(["msg" => "Extention de fichier invalide", "error" => 1]);
            return false;
       }
    }

    public static function validateExtension($filename){
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        if($extension == "xlsx" || $extension == "xls" || $extension == "csv"){
            return true;
        }else{
            return false;
        }
    }

    public static function display($blob, $ctg="0"){
        $state = 0;
        $header = ["name", "phone", "ctg"];
        $users = [];
        foreach($blob as $key2 => $value2){
            if($state == 1){
                $user = [];
                foreach($value2 as $key3 => $value3){
                    if($key3 == 0){
                        $user["name"] = $value3;
                    }
                    if($key3 == 1){
                        $value3 = str_replace(".0", "", strval($value3));
                        $user["phone"] = $value3;
                    }
                    if($key3 == 2){
                        $value3 = $value3;
                        $user["ctg"] = $ctg;
                    }

                    
                }
                array_push($users, $user);
            }
            $state = 1;
        }

        return $users;

    }

    public static function saveAllInDatabese($users){
        $error = 0;
        foreach($users as $user){
           if(!self::saveOneInDatabase($user)){
                $error = 1;
           }
        }

        return !$error;
    }

    public static function saveOneInDatabase($user){
        $name = $user['name'];
        $phone = $user['phone'];
        $ctg = $user['ctg'];
        $pays = 237;
        $email = "";
        $groupe = Groupe::verifyIfGroupExist($ctg);
       
        if(!$groupe){
            Groupe::setUniqueGroup($ctg);
            $groupe = Groupe::verifyIfGroupExist($ctg);
        }

        if(Users::setUniqueUser($name = $name, $phone = $phone, $groupe, $pays = $pays, $email = $email)){
            return true;
        }else{
            return false;
        };
    }


    public static function moveFileToTmp($file, $filename){
        if(move_uploaded_file($file, $filename)){
            return true;
        }else{
            return false;
        }
    }

    public static function removeFileFromTmp($filename){
        if(unlink($filename)){
            return true;
        }else{
            return false;
        }
    }

    public static function save(){
        $file = $_FILES['file']['tmp_name'];
        $filename = dirname(dirname(__DIR__))."/tmp/".time().$_FILES['file']['name'];

        if(self::moveFileToTmp($file, $filename)){
            if(self::read($filename, $_FILES['file']['name'])){
                self::removeFileFromTmp($filename);
            }
        } else {
            echo json_encode(["msg" => "Impossible de telecharger le fichier", "error" => 1]);
        }
        //self::uploadExcel($file);
    }


}

