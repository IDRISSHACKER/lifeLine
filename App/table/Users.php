<?php 

namespace App\Table;

/**
 * summary
 */
use App\App;


class Users extends Table{

    public static function getUser(){
        $id = $_POST["id"];
        return self::query("SELECT users.id, users.name, users.surname, users.pseudo, users.email, users.tel, users.password, users.created_at, users.updated_at, roles.role_name as role FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE users.id = $id");
    }

    public static function getUsers(){
        $users = self::query("SELECT users.id, users.name, users.surname, users.pseudo, users.email, users.tel, users.password, users.created_at, users.updated_at, roles.role_name as role FROM users LEFT JOIN roles ON users.role_id = roles.id ORDER BY users.id DESC");

        echo json_encode($users);
    }

    public static function getUserInfos(){
        $id = $_POST["id"];
        return self::query("SELECT users.id, users.name, users.surname, users.pseudo, users.email, users.tel, users.password, users.created_at, users.updated_at, roles.role_name as role FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE users.id = $id ");  
    }

    public static function getEmail($email){
        return self::query("SELECT users.email FROM users WHERE email = ?",[$email]);  
    }
    public static function verifyPassword($email="idrisscoder@gmail.com", $password="1234"){
        $pass = self::query("SELECT users.password FROM users WHERE email = ? LIMIT 1",[$email]);
        if(password_verify($password,$pass[0]->password)){
            return 1;
        }else{
            return 0;
        }  
    }

    public static function setUser(){
        $email = htmlspecialchars($_POST['email']);
        if(count(self::getEmail($email))==0){
            $name = htmlspecialchars($_POST['name']);
            $username = htmlspecialchars($_POST['username']);
            $pseudo = htmlspecialchars($_POST['pseudo']);
            $tel = htmlspecialchars($_POST['tel']);
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

            if(self::save("INSERT INTO users(name, surname, pseudo, email, tel, password) VALUES(?,?,?,?,?,?)",
                [$name, $username, $pseudo, $email,$tel, $password])){

                return ["msg"=>"Inscription reusis","code"=>1];
            }else{
                return ["msg"=>"Inscription échoué","code"=>0];
            }
        }else{
            return ["msg"=>"Cet email est dejas prise","code"=>0];
        }

        
    }

    public static function connexion(){

        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);

        if(count(self::getEmail($email)) != 0){

            $pass = self::query("SELECT users.password FROM users WHERE email = ? LIMIT 1",[$email]);

            if(password_verify($password, $pass[0]->password)){
               
                $infos = self::query("SELECT * FROM users WHERE email = ?",[$email]);
                
                $_SESSION['id'] = $infos[0]->id;
                $_SESSION['connected'] = 1;


                return ["data"=>$infos,
                        "code"=>1
                ];
            }else{
                return ["data"=>"Mot de passe incorect !",
                        "code"=>0,
                        "info"=>$pass,
                ];
            }
        }else{
            return ["data"=>"Compte introuvable",
                    "code"=>0,
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
