<?php 

namespace App\Table;

/**
 * summary
 */
use App\App;


class Admin extends Table{

    public static function getAdmin(){
        $admin = self::query("SELECT * FROM admin",[],true);
        echo json_encode($admin);
    }

    public static function updateAdmin(){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $pays_id = $_POST['pays_id'];
        $changed  = $_POST["changed"];
        $password = $changed === "1" ? password_hash($_POST['password'], PASSWORD_DEFAULT) : $_POST['password'];

        self::save("UPDATE `admin` SET `admin`.`name` = ?, `admin`.`surname` = ?, `admin`.`email` = ?, `admin`.`phone` = ?, `admin`.`pays_id` = ?, `admin`.`password` = ? WHERE `admin`.`id` = '$id'",[$name, $surname, $email, $phone, $pays_id, $password]);

        self::getAdmin();
    }


}
