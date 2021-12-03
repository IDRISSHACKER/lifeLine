<?php
namespace App\table;

use App\Table\Table;

class Chart extends Table{

    public static function chartSaleByMonth()
    {
        $stats = self::query("SELECT messages.id, COUNT(messages.content) as nb,  CONCAT('Month ', MONTH(messages.created_at)) as created_at FROM messages GROUP BY MONTH(messages.created_at)"
        );

        echo json_encode($stats);

    }

    public static function chartSaleByDay()
    {
        $stats = self::query("SELECT messages.id, COUNT(messages.content) as nb,  messages.created_at FROM messages GROUP BY CONCAT(MONTH(messages.created_at),DAY(messages.created_at))"
        );

        echo json_encode($stats);

    }

}