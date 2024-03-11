<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

// Записываем в переменные поля форм по атрибуту name

$contactsName = $_POST['contacts-name'];
$contactsPhone = $_POST['contacts-phone'];

try {
  //Server settings
  $mail->SMTPDebug  = SMTP::DEBUG_SERVER;
  $mail->CharSet    = "utf-8";
  $mail->isSMTP();
  $mail->Host       = 'smtp.yandex.ru';                       //SMTP сервер, зависит от почты отправки
  $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  $mail->Username   = 'spabath@yandex.ru';                  //SMTP имя пользователя (почта с которой отправляем письмо)
  $mail->Password   = 'sqzbqtihhvtshdvq';                     //SMTP password (для яндех и мэйл ру генерируем по ссылке в инструкции, для gmail это пороль от почты)
  $mail->SMTPSecure = 'ssl';                                  //Шифрование
  $mail->Port       = 465;                                    //Порт

  //Recipients
  $mail->setFrom('spabath@yandex.ru');                       //Откуда отправляем
  $mail->addAddress('info@siberia-spa.ru');                 //Куда отправляем


  //Content
  $mail->isHTML(true);                                         //Письмо в формате HTML для использования тегов
  $mail->Subject = "Заявка на звонок";               //Тема письмы
  $mail->Body = "ФИО: $contactsName. <br>Телефон: $contactsPhone. "; //Тело письмы

  $mail->send();
  echo 'Письмо отправлено!';
} catch (Exception $e) {
  echo "Письмо не отправлено!. Ошибка отправки: {$mail->ErrorInfo}";
}
?>
