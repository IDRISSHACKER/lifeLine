<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');  
header("Access-Control-Allow-Methods: *");

define("ROOT", dirname(__DIR__));
require(ROOT.'/App/autoload.php');
autoload::register();

use App\Table\Admin;
use App\Table\Chart;
use App\Table\Users;
use App\Table\Groupe;
use App\Table\Image;
use App\Table\Messenger;
use App\Table\Stream;   

$page = !empty($_GET["page"]) ? $_GET["page"] : "home/";

if($page === "setUser" OR $page === "setUser/"){
  Users::setUser();
}else if($page === "getUsers" OR $page === "getUsers/"){
  Users::getUsers();
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
}else if($page === "updateAdmin" OR $page === "updateAdmin/"){
  Admin::updateAdmin();
}else if($page === "chartMonth" OR $page === "chartMonth/"){
  Chart::chartSaleByMonth();
}else if($page === "chartDay" OR $page === "chartDay/"){
  Chart::chartSaleByDay();
}else if($page === "setAvatar" OR $page === "setAvatar/"){
  Image::setImage();
}else if($page === "reset" OR $page === "reset/"){
  Admin::reset();
}else if($page === "updateUser" OR $page === "updateUser/"){
  Users::updateUser();
}else if($page === "updateGroup" OR $page ==="updateGroup/"){
  Groupe::updateGroup();
}else if($page === "setExcel" OR $page === "setExcel/"){
  Stream::read(dirname(__DIR__)."/public/files/download/model.xlsx");
};
