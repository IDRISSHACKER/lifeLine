<?php 

namespace App\Table;

/**
 * summary
 */
use App\App;


class Users extends Table{

    public static function getUsers(){
        $users = self::query("SELECT users.id, users.name, users.surname, users.pays_id, users.email, users.phone, users.groupe_id, users.created_at, groupe.title FROM users LEFT JOIN groupe ON users.groupe_id = groupe.id ORDER BY users.id DESC");

        echo json_encode($users);
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


    public static function updateUser(){
        if($_SESSION["id"]){
            $id = $_SESSION['id'];
            $name = $_POST['name'];
            $username = $_POST['name'];
            $pseudo = $_POST['name'];
            $email = $_POST['name'];
            $tel = $_POST['name'];

            self::query("UPDATE users set name = ?, username = ?, pseudo = ?, email = ?, tel = ? WHERE id = $id",
                [$name, $username, $pseudo, $tel]);
        }
    }

    public static function removeUser(){
        $id = $_POST["id"];
        self::del("DELETE FROM users WHERE id = $id");
        self::getUsers();
    }

}
