<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');  
header("Access-Control-Allow-Methods: *");

define("ROOT", dirname(__DIR__));
require ROOT.'/'.'App/autoload.php';
autoload::register();

use App\Database;
use App\Config;
use App\Table\Users;

$page = "";

if (!empty($_GET["page"])) {

  $page = $_GET["page"];

}else{

  $page = "home/";

}

if($page == "setUser" OR $page == "setUser/"){
  Users::setUser();
}else if($page == "getUsers" OR $page == "getUsers/"){
  users::getUsers();
}else if($page === "removeUser" OR $page === "removeUser/"){
  Users::removeUser();
}
