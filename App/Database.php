<?php

namespace App;

use \PDO;

class Database
{

	private $db_name;
	private $db_user;
	private $db_pass;
	private $db_host;

	public$datass = [];
	private $columss = [];

	private $pdo;
    
	public function __construct($db_name, $db_user="root", $db_pass="", $db_host="localhost"){

		$this->db_name = $db_name;
		$this->db_user = $db_user;
		$this->db_pass = $db_pass;
		$this->db_host = $db_host;

	}

	public function db(){

		if(is_null($this->pdo)){

			try{

				$pdo = new PDO("mysql:host=$this->db_host;dbname=$this->db_name","$this->db_user","$this->db_pass");

			}catch(PDOException $e){

				die("Erreur de connexion à la DB");

			}

			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->pdo = $pdo;

		}

		return $this->pdo;

	}

	public function query($statement, $class_name, $one=false){

		$re = $this->db()->query($statement);

		$re->setFetchMode(PDO::FETCH_CLASS, $class_name);

		if($one){
			
			$datas = $re->fetch();
			return $datas;

		}else{

			$datas = $re->fetchAll();
			return $datas;
		}

	}


	public function All($table, $class_name, $one=false){

		return $this->query("SELECT * FROM $table", $class_name, $one=false);
	}


	public function prepare($statement,$datas=[], $class_name, $one=false){

		$re = $this->db()->prepare($statement);

		$re->execute($datas);

		$re->setFetchMode(PDO::FETCH_CLASS, $class_name);

		if($one){

			$datas = $re->fetch();

		}else {

			$datas = $re->fetchAll();

		}

		return $datas;

	}

	public function add($column, $data){

		$this->datass[] = $data;
		$this->columss[] = $column;
	}

	public function Save($table){

		$interog = "";
		$vall = "";

		foreach ($this->columss as $val) {

		    if($interog == ""){

		    	$interog = "?";
		    	$vall = $val;

		    }else{

		    	$interog .= ",?";
		    	$vall .= ",$val";
		    }

		}

		$re = "INSERT INTO $table($vall) VALUES($interog)";


		return $this->prepare($re, $this->datass);

	}

	public function saving($statement, $datas){
		$re = $this->db()->prepare($statement);

		return $re->execute($datas);
	}

}
