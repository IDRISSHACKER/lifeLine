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

use App\Table\Admin;
use App\Table\Users;
use App\Table\Groupe;
use App\Table\Messenger;

$page = "";

if (!empty($_GET["page"])) {

  $page = $_GET["page"];

}else{

  $page = "home/";

}

if($page === "setUser" OR $page === "setUser/"){
  Users::setUser();
}else if($page === "getUsers" OR $page === "getUsers/"){
  users::getUsers();
}else if($page === "removeUser" OR $page === "removeUser/"){
  Users::removeUser();
}else if($page === "getGroups" OR $page === "getGroups/"){
  Groupe::getGroups();
}else if($page == "setGroup" OR $page === "setGroup/"){
  Groupe::setGroup();
}else if($page === "removeGroup" OR $page === "removeGroup/"){
  Groupe::removeGroup();
}else if($page === "sendMessage" OR $page === "sendMessage/"){
  Messenger::sendMessage();
}else if($page === "getMessages" OR $page === "getMessages/"){
  Messenger::getMessages();
}else if($page === "removeMessage" OR $page === "removeMessage/"){
  Messenger::removeMessage();
}else if($page === "admin" OR $page === "admin/"){
    Admin::getAdmin();
}
