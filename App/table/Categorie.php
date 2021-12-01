<?php

namespace App\table;

/**
 * summary
 */
class Categorie extends Table
{
    /**
     * summary
     */
   public static function getCategories(){

    return self::query("SELECT * FROM category ORDER BY id DESC");

   }

   public static function setCategory(){

    $ctg_title  = $_POST['title'];
    $ctg_desc   = $_POST['description'];
    $ctg_img    = $_POST['img'];

    if(self::save("INSERT INTO category(category_name, category_desc, category_img) VALUES(?,?,?)", [$ctg_title, $ctg_desc, $ctg_img])){

      echo json_encode(self::getCategories());

    }else{

      echo json_encode(["error"]);

    }


   }

   public static function editCategory(){
    $ctg_id     = $_POST['id'];
    $ctg_title  = $_POST['title'];
    $ctg_desc   = $_POST['description'];

    self::save("UPDATE `category` SET `category`.`category_name` = ?, `category`.`category_desc` = ? WHERE `category`.`id` = $ctg_id",[$ctg_title, $ctg_desc]);

    echo json_encode(self::getCategories());

   }

  public static function removeCtg(){

    $id = $_POST['id'];

    self::del("DELETE FROM `category` WHERE `category`.`id` = ?", [$id]);

    echo json_encode(self::getCategories());

  }

}
