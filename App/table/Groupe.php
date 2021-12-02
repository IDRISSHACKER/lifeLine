<?php

namespace App\table;

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

      self::getGroups();

    }else{

      self::getGroups();

    }


   }

   public static function editGroup(){
    $ctg_id     = $_POST['id'];
    $ctg_title  = $_POST['title'];
    $ctg_desc   = $_POST['description'];

    self::save("UPDATE `category` SET `category`.`category_name` = ?, `category`.`category_desc` = ? WHERE `category`.`id` = $ctg_id",[$ctg_title, $ctg_desc]);

    echo json_encode(self::getCategories());

   }

  public static function removeGroup(){

    $id = $_POST['id'];

    self::del("DELETE FROM `groupe` WHERE `groupe`.`id` = ?", [$id]);

    self::getGroups();

  }

}
