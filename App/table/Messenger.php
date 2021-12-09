<?php

namespace App\Table;

//use Twilio\Rest\Client; 
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
        
        /*$sid    = "ACe0dc493300fce94bc13c6864b1cfb91f"; 
        $token  = "4f02807c32c8609b93a5f91f2f97301e"; 
        $twilio = new Client($sid, $token); 
 
        $message = $twilio->messages 
                        ->create("+19472085059", // to 
                                array(
                                    "from" => "+237693342860",        
                                    "body" => "Your message" 
                                ) 
                        ); 
        
        print($message->sid);*/
    }

   public static function sendMessage(){

    $users  = json_decode($_POST['users']);
    $message   = $_POST['message'];
    $err = 0;

    foreach ($users as $user) {
        glob($err);
        $phone = "+".$user->pays_id.$user->phone;
        $sms   = $message;
        self::setMessageInOperator($phone, $sms);
        if(self::setMessageInDb($user->id, $message)){
            $err = 0;
        }else{
            $err = 1;
        }
    }

    self::getMessages();

   }

}
