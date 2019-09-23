<?php

// if (isset($_POST["name"]) && isset($_POST["phonenumber"]) ) { 

	// Формируем массив для JSON ответа
    // $result = array(
    // 	'poochInfo__name' => $_POST["poochInfo__name"],
    // 	'poochInfo__size' => $_POST["poochInfo__size"]
    // ); 
		$result='';

    foreach ($_POST as $key => $value) {
		  // добавим в переменную $data имя и значение ключа
		  $result .= $key . ' = ' . $value . ' 
		  ';
		}
    // Переводим массив в JSON
    // echo json_encode($result); 
    echo $result; 
// }

?>