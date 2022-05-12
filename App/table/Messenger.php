<?php

namespace App\Table;
require dirname(dirname(__DIR__))."/vendor/autoload.php";

use Twilio\Rest\Client; 
/**
 * summary
 */
class Messenger extends Table
{
    /**
     * summary
     */
    public static function getMessages(){
        echo json_encode(self::query("SELECT messages.id, messages.content, messages.created_at, users.name, users.surname, users.phone, users.pays_id, users.email FROM messages INNER JOIN users ON messages.receiver = users.id ORDER BY messages.id DESC"));

    }

    public static function removeMessage(){
        $id = $_POST["id"];
        if(self::del("DELETE FROM `messages` WHERE `messages`.`id` = ?", [$id])){
            self::getMessages();
        }
    }

    public static function setMessageInDb($receiver, $content){
        if(self::save("INSERT INTO messages(receiver, content) VALUES(?,?)",[$receiver, $content])){
            return true;
        }else{
            return false;
        }
    }

    public static function setMessageInOperator($phone, $sms){
        
        $sid = "ACe0dc493300fce94bc13c6864b1cfb91f";
        $token = "994db2473cc0294d70b039105bd8f485";
        $twilio = new Client($sid, $token);

        $message = $twilio->messages
                  ->create($phone, // to
                           ["from" => "LIFELINE", "body" => $sms]
                  );
        
        return $message;
    }

   public static function sendMessage(){

    $users  = json_decode($_POST['users']);
    $message   = $_POST['message'];
    $err = 0;
    $res = "";

    foreach ($users as $user) {
        glob($err);
        $phone = "+".$user->pays_id.$user->phone;
        $sms   = $message;
        $twilioSend = self::setMessageInOperator($phone, $sms);
        $res = $res.$twilioSend->sid;
        if($twilioSend->sid){
            self::setMessageInDb($user->id, $message);
        }else{
            $err = 1;
        }
    }

    if($err){
        echo json_encode("error");
    }else{
        echo json_encode($res);
    }

   }

}
