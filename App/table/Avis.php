<?php

namespace App\table;

/**
 * summary
 */
class Avis extends Table
{

    public static function setAvi(){

        $user_id = $_POST["id"];
        $post_id = $_POST["post_id"];
        $title = $_POST["title"];
        $note = $_POST["note"];
        $comment = $_POST["comment"];

        if(!empty($user_id) && !empty($note) && !empty($comment)){

            if(self::save("INSERT INTO avis(post_id, user_id, title, note, comment) VALUES(?,?,?,?,?)",[$post_id,$user_id, $title, $note, $comment])){

                self::getAvis();

            }else{

                echo json_encode("error");

            }
        }else{

            echo json_encode("error");
        };


    }


    public static function getAvis(){

        $post_id = $_POST["post_id"];

        $avis = self::query("SELECT users.id as userId, users.email, users.surname, avis.id, avis.note, avis.title, avis.comment FROM avis INNER JOIN users ON users.id = avis.user_id  WHERE avis.post_id = $post_id ORDER BY avis.id DESC");
        
        echo json_encode($avis);
    }

    public static function updateAvi(){

        $comment_id = $_POST["comment_id"];
        $title = $_POST["title"];
        $comment = $_POST["comment"];

        self::save("UPDATE `avis` SET `title` = '$title', `comment` = '$comment' WHERE `avis`.`id` = $comment_id");

        self::getAvis();

    }

}