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
        $password = $_POST['password'];

        self::save("UPDATE `admin` SET `admin`.`name` = ?, `admin`.`surname` = ?, `admin`.`email` = ?, `admin`.`phone` = ?, `admin`.`pays_id` = ?, `admin`.`password` = ? WHERE `admin`.`id` = '$id'",[$name, $surname, $email, $phone, $pays_id, $password]);

        self::getAdmin();
    }

    public static function reset(){
        self::save("DELETE FROM users");
        self::save("DELETE FROM messages");
        self::save("DELETE FROM groupe");
        $id = 1;
        $name = "root";
        $surname = "root";
        $email = "root@gmail.com";
        $phone = "693342860";
        $pays_id = "237";
        $avatar = "default.svg";
        $password = "root";

        self::save("UPDATE `admin` SET `admin`.`name` = ?, `admin`.`surname` = ?, `admin`.`email` = ?, `admin`.`phone` = ?, `admin`.`pays_id` = ?, `admin`.`avatar` = ?, `admin`.`password` = ? WHERE `admin`.`id` = '$id'",[$name, $surname, $email, $phone, $pays_id, $avatar, $password]);

        echo json_encode("success");
    }


}
