<?php
//Сбор данных из полей формы.
$name = trim($_POST['name']);// Берём данные из input c атрибутом name="name"
$phone = trim($_POST['tel']); // Берём данные из input c атрибутом name="tel"

$token = "1321113302:AAHVEq_5BGJJ9-og7QgO7YUr2QIh4MUxi3w"; // Тут пишем токен
$chat_id = "-438463858"; // Тут пишем ID группы, куда будут отправляться сообщения
$sitename = "servicelife.ru"; //Указываем название сайта

$arr = array(
  'Заказ с сайта: ' => $sitename,
  'Имя: ' => $name,
  'Телефон: ' => $phone,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

if (strlen($phone) > 0) {
	$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
}

?>