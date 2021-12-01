<?php
namespace App\table;

use App\Table\Table;

class ChartSale extends Table{

    public static function chartSaleByDay()
    {
        $stats = self::query("SELECT 
            commande.id,
            SUM(articles.price * commande.qtt) AS totalPrice,
            SUM(commande.qtt) as totalQtt,
            DATE(commande.created_at) AS created_at
            FROM commande
            INNER JOIN users
            ON commande.user_id = users.id
            INNER JOIN articles
            ON commande.post_id = articles.id
            INNER JOIN category
            ON articles.category_id = category.id
            WHERE commande.user_solved = '1'
            AND commande.admin_solved = '1' 
            AND commande.reverse = '0'
            GROUP BY DAY(commande.created_at)"
        );

        echo json_encode($stats);

    }

    public static function chartSaleByMonth()
    {
        $stats = self::query("SELECT 
            commande.id,
            SUM(articles.price * commande.qtt) AS totalPrice,
            SUM(commande.qtt) as totalQtt,
            commande.created_at
            FROM commande
            INNER JOIN users
            ON commande.user_id = users.id
            INNER JOIN articles
            ON commande.post_id = articles.id
            INNER JOIN category
            ON articles.category_id = category.id
            WHERE commande.user_solved = '1'
            AND commande.admin_solved = '1' 
            AND commande.reverse = '0'
            GROUP BY MONTH(commande.created_at)"
        );

        echo json_encode($stats);

    }

    public static function chartSaleByYear()
    {
        $stats = self::query("SELECT 
            commande.id,
            SUM(articles.price * commande.qtt) AS totalPrice,
            SUM(commande.qtt) as totalQtt,
            commande.created_at
            FROM commande
            INNER JOIN users
            ON commande.user_id = users.id
            INNER JOIN articles
            ON commande.post_id = articles.id
            INNER JOIN category
            ON articles.category_id = category.id
            WHERE commande.user_solved = '1'
            AND commande.admin_solved = '1' 
            AND commande.reverse = '0'
            GROUP BY YEAR(commande.created_at)"
        );

        echo json_encode($stats);

    }
}