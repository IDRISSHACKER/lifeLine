<?php

namespace App\Table;

/**
 * summary
 */
class Groupe extends Table
{
    /**
     * summary
     */
   public static function getGroups(){

    echo json_encode(self::query("SELECT groupe.id, groupe.title, groupe.description, groupe.created_at, COUNT(users.id) AS nbUser FROM groupe LEFT JOIN users ON groupe.id = users.groupe_id GROUP BY groupe.id ORDER BY id DESC"));

   }

   public static function setGroup(){

    $title  = $_POST['title'];
    $description   = $_POST['description'];

    if(self::save("INSERT INTO groupe(title, description) VALUES(?,?)", [$title, $description])){

      return true;

    }else{

      return false;

    }


   }

   public static function verifyIfGroupExist($groupeName){

    $group = self::query("SELECT * FROM groupe WHERE title = ?", [$groupeName],);

    if(count($group) > 0){
      $groupeId = $group[0]->id;
      return $groupeId;
      
    }else{

      return false;

    }

   }

   public static function setUniqueGroup($title = "", $description = ""){
       
      if(self::save("INSERT INTO groupe(title, description) VALUES(?,?)", [$title, $description])){
  
        return true;
  
      }else{
  
        return false;
  
      }
   }

   public static function updateGroup(){
    $id     = $_POST['id'];
    $title  = $_POST['title'];
    $description   = $_POST['description'];

    self::save("UPDATE `groupe` SET `groupe`.`title` = ?, `groupe`.`description` = ? WHERE `groupe`.`id` = $id",[$title, $description]);

    self::getGroups();

   }

   

  public static function removeGroup(){

    $id = $_POST['id'];

    self::del("DELETE FROM `groupe` WHERE `groupe`.`id` = ?", [$id]);

    self::getGroups();

  }

}
