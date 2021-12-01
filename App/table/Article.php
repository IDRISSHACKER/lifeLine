<?php

namespace App\Table;

/**
 * summary
 */

use App\App;


class Article extends Table
{

    public static function get_articles()
    {
        //sleep(3);
        return self::query("SELECT 
        articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, articles.category_id AS ctgId, 
        category.category_name, articles.created_at, 
        AVG(avis.note) AS notes,
        COUNT(avis.note) as navis,
        articles.isSoftware,
        articles.showPrice
        FROM avis 
        RIGHT JOIN articles 
        ON articles.id = avis.post_id 
        INNER JOIN category 
        ON category.id = articles.category_id 
        GROUP BY articles.id
        ORDER BY articles.id DESC");
    }

    public static function get_article()
    {
        $id = $_GET['id'];

        return self::query("SELECT 
        articles.id, 
        articles.title, 
        articles.slug, 
        articles.img, 
        articles.qtt, 
        articles.price, 
        articles.description, 
        category.category_name,
        articles.category_id,
        articles.isSoftware,
        articles.showPrice, 
        articles.created_at 
        FROM category 
        INNER JOIN articles 
        ON category.id = category_id 
        WHERE articles.id = ?", 
        [$id]);
    }

    public function getImgForArticle()
    {
        $post_id = $_POST['id'];

        if (isset($post_id) and !empty($post_id)) {

            return self::query("SELECT files.id, files.file, files.file_type FROM files WHERE files.article_id = $post_id ");
        } else {
            return [];
        }
    }

    public static function getArticleLikeCtg()
    {
        $ctg_id = $_POST['ctg_id'];
        $id = $_POST['post_id'];

        if (isset($ctg_id) and !empty($ctg_id)) {

           // return self::query("SELECT articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, category.category_name FROM articles INNER JOIN category ON category.id = articles.category_id WHERE category.id = $ctg_id AND articles.id != $id");

            return self::query("SELECT 
                articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, articles.category_id AS ctgId, 
                category.category_name, articles.created_at, 
                AVG(avis.note) AS notes,
                COUNT(avis.note) as navis,
                articles.isSoftware,
                articles.showPrice
                FROM avis 
                RIGHT JOIN articles 
                ON articles.id = avis.post_id 
                INNER JOIN category 
                ON category.id = articles.category_id
                WHERE category.id = $ctg_id AND articles.id != $id 
                GROUP BY articles.id
                ORDER BY articles.id DESC
            ");
        } else {
            return [];
        }
    }

    public static function getCtg()
    {
        $ctg_id = $_POST['ctg_id'];

        if (isset($ctg_id) and !empty($ctg_id)) {

           // return self::query("SELECT articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, category.category_name FROM articles INNER JOIN category ON category.id = articles.category_id WHERE category.id = $ctg_id AND articles.id != $id");

            echo json_encode(self::query("SELECT 
                articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, articles.category_id AS ctgId, 
                category.category_name, articles.created_at, 
                AVG(avis.note) AS notes,
                COUNT(avis.note) as navis,
                articles.isSoftware,
                articles.showPrice
                FROM avis 
                RIGHT JOIN articles 
                ON articles.id = avis.post_id 
                INNER JOIN category 
                ON category.id = articles.category_id
                WHERE category.id = $ctg_id
                GROUP BY articles.id
                ORDER BY articles.id DESC
            "));
        }
    }

    public static function getArticleLikeNote(){
        echo json_encode(self::query("SELECT 
        articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, articles.category_id AS ctgId, 
        category.category_name, articles.created_at, 
        AVG(avis.note) AS notes,
        COUNT(avis.note) as navis,
        articles.isSoftware,
        articles.showPrice
        FROM avis 
        RIGHT JOIN articles 
        ON articles.id = avis.post_id 
        INNER JOIN category 
        ON category.id = articles.category_id 
        GROUP BY articles.id
        ORDER BY notes DESC
        "));
    }

    public static function setArticle(){

        $title = $_POST['title'];
        $slug = $_POST['slug'];
        $img = $_POST['img'];
        $price = $_POST['price'];
        $qtt = $_POST['qtt'];
        $category_id = $_POST['category_id'];
        $description = $_POST['description'];
        $isSoftware = $_POST['isSoftware'];
        $showPrice = $_POST['showPrice'];

        if(self::save("INSERT INTO  articles(title, slug, img, price, qtt, category_id, description, showPrice, isSoftware) VALUES(?,?,?,?,?,?,?, ?, ?)",[$title, $slug, $img, $price, $qtt, $category_id, $description, $showPrice, $isSoftware])){

            echo json_encode(self::get_articles());

        }else{

            echo json_encode("error");
        }
    }

    public static function updateArticle(){

        $id = $_POST['id'];
        $title = $_POST['title'];
        $slug = $_POST['slug'];
        $img = $_POST['img'];
        $price = $_POST['price'];
        $qtt = $_POST['qtt'];
        $category_id = $_POST['category_id'];
        $description = $_POST['description'];
        $isSoftware = $_POST['isSoftware'];
        $showPrice = $_POST['showPrice'];

        self::save("UPDATE `articles` SET 
        `title` = '$title', 
        `slug` = '$slug', 
        `img` = '$img', 
        `price` = '$price', 
        `qtt` = '$qtt', 
        `category_id` = '$category_id', 
        `description` = '$description', 
        `showPrice` = '$showPrice', 
        `isSoftware` = '$isSoftware'   
        WHERE `articles`.`id` = $id
        ");

        echo json_encode(self::get_articles());

    }

    public static function removeArticle(){
        
        $id = $_POST['id'];

        self::del("DELETE FROM `articles` WHERE `articles`.`id` = ?", [$id]);

        echo json_encode(self::get_articles());

    }
}
