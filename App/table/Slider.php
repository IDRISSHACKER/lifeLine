<?php

namespace App\table;

/**
 * summary
 */
class Slider extends Table
{

    public static function setSlide(){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $image = $_POST['image'];
        $post_id = $_POST['post_id'];

        self::save("INSERT INTO Slider(post_id, img, title, description) VALUES(?,?,?,?)",[$post_id, $image, $title, $description]);

        self::getSlide();

       

    }

    public static function getSlide(){
        $sliders = self::query("SELECT 
        slider.id, slider.title as stitle, slider.img, slider.description, 
        articles.id as pId, articles.title, articles.slug 
        FROM slider 
        INNER JOIN articles 
        ON  slider.post_id = articles.id 
        ORDER BY id DESC 
        LIMIT 5");

       echo json_encode($sliders);
    }

    public static function removeSlide(){
        $id = $_POST['id'];

        self::del("DELETE FROM `slider` WHERE `slider`.`id` = ?", [$id]);
    
        self::getSlide();
    }

    public static function updateSlide(){
        $title       = $_POST['title'];
        $description = $_POST['description'];
        $id          = $_POST['id'];
        $pId         = $_POST['pId'];

        self::save("UPDATE `slider` SET `slider`.`post_id` = ?, `slider`.`title` = ?, `slider`.`description` = ? WHERE `slider`.`id` = '$id' AND `slider`.`post_id` = '$pId'",[$pId, $title, $description]);

        self::getSlide();
    }
    

}