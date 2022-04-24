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

    private static function OpenFile($filename){
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($filename);
        $reader = $reader->load($filename);
        $data = $reader->getActiveSheet()->toArray();

        return $data;
    }

    public static function read($filename){
        $blob = self::OpenFile($filename);
        $users = self::display($blob);
       if(self::saveAllInDatabese($users)){
           echo json_encode(["msg"=>"Extraction du fichier excel reussis", "error"=>0]);
           http_response_code(200);
           return true;
       }else{
              echo json_encode(["msg"=>"Extraction du fichier excel echoue", "error"=>1]);
              http_response_code(500);
              return false;
       };
    }

    private static function display($blob){
        $state = 0;
        $header = ["name", "phone", "ctg"];
        $users = [];
        foreach($blob as $key2 => $value2){
            if($state == 1){
                $user = [];
                foreach($value2 as $key3 => $value3){
                    if($key3 == 1){
                        $value3 = str_replace(".0", "", strval($value3));
                    }
                    $user[$header[$key3]] = $value3;
                }
                array_push($users, $user);
            }
            $state = 1;
        }

        return $users;

    }

    private static function saveAllInDatabese($users){
        $error = 0;
        foreach($users as $user){
           if(!self::saveOneInDatabase($user)){
                $error = 1;
           }
        }

        return !$error;
    }

    private static function saveOneInDatabase($user){
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

}

