<?php 

namespace App\Table;

/**
 * summary
 */
use App\App;


class Users extends Table{

    public static function getUsers(){
        $users = self::query("SELECT 
        users.id, 
        users.name, 
        users.surname, 
        users.pays_id, 
        users.email, 
        users.phone, 
        users.groupe_id, 
        users.created_at, 
        groupe.title FROM users 
        LEFT JOIN groupe ON users.groupe_id = groupe.id 
        ORDER BY users.id DESC
        ");

        if(count($users) > 0){
            http_response_code(200);
            echo json_encode($users);
        }else{
            http_response_code(202);
            echo json_encode([]);
        }
    }

    public static function getPhone($tel){
        return self::query("SELECT users.phone FROM users WHERE phone = ?",[$tel]);  
    }

    public static function setUser(){
        $tel = htmlspecialchars($_POST['phone']);
        if(count(self::getPhone($tel))==0){
            $name = htmlspecialchars($_POST['nom']);
            $username = htmlspecialchars($_POST['prenom']);
            $pays = htmlspecialchars($_POST['pays']);
            $phone = htmlspecialchars($_POST['phone']);
            $email = htmlspecialchars($_POST['email']);
            $group = htmlspecialchars($_POST['groupe_id']);

            if(self::save("INSERT INTO users(name, surname, phone, pays_id, email, groupe_id) VALUES(?,?,?,?,?,?)",
                [$name, $username, $phone, $pays, $email, $group])){

                return [
                    "msg"=>"Inscription reusis",
                    "error"=>0,
                    "data"=>self::getUsers()
                ];
            }else{
                return [
                    "msg"=>"Inscription échoué",
                    "error"=>1,
                    "data"=>self::getUsers()
                ];
            }
        }else{
            return [
                "msg"=>"Ce numero de telephone est dejas prise",
                "error"=>1,
                "data"=>self::getUsers()
            ];
        }

        
    }

    public static function setUniqueUser($name = "", $phone = "", $group = "",  $pays = 237, $surname = "", $email = ""){

        if(count(self::getPhone($phone))==0){
            if (self::save(
                "INSERT INTO users(name, surname, phone, pays_id, email, groupe_id) VALUES(?,?,?,?,?,?)",
                [$name, $surname, $phone, $pays, $email, $group]
            )) {

                return true;
            } else {

                return false;
            }
        }else{
            return true;
        }

    }

    public static function updateUser(){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $pays_id = $_POST['pays_id'];
        $group_id = $_POST['groupe_id'];

        self::save("UPDATE `users` SET `users`.`name` = ?, `users`.`surname` = ?, `users`.`email` = ?, `users`.`phone` = ?, `users`.`pays_id` = ?, `users`.`groupe_id` = ? WHERE `users`.`id` = '$id'",[$name, $surname, $email, $phone, $pays_id, $group_id]);

        self::getUsers();
    }

    public static function removeUser(){
        $id = $_POST["id"];
        self::del("DELETE FROM users WHERE id = $id");
        self::getUsers();
    }

}
