<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

// Записываем в переменные поля форм по атрибуту name

$bookingName = $_POST['booking-name'];
$bookingPhone = $_POST['booking-phone'];
$bookingEmail = $_POST['booking-email'];
$bookingComment = $_POST['booking-comment'];
$bookingPaymentType = $_POST['payment-type'];
$bookingBath = $_POST['bath-choice'];
$bookingClubCard = $_POST['club-card'];
$bookingDate = $_POST['date-and-time'];
$bookingTime = $_POST['time-choice'];
$bookingAdults = $_POST['adults-qty'];
$bookingChilds = $_POST['child-qty'];
$bookingBaby = $_POST['baby-qty'];
$bookingTotalPrice = $_POST['total-price'];
$bookingPrepayment = $_POST['prepayment'];



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
  $mail->Subject = "Новое бронирование";               //Тема письмы
  $mail->Body = "ФИО: $bookingName. <br>Телефон: $bookingPhone. <br>Почта: $bookingEmail. <br>Комментарий: $bookingComment. <br>Клубная карта: $bookingClubCard.
<br>Cпособ оплаты: $bookingPaymentType. <br>Выбранная баня: $bookingBath. <br>Дата бронирования: $bookingDate. <br>Время бронирования: $bookingTime.
<br>Кол-во взрослых: $bookingAdults. <br>Кол-во детей: $bookingChilds. <br>Кол-во детей до 7 лет: $bookingBaby.
<br>Общая сумма: $bookingTotalPrice. <br>Сумма предоплаты: $bookingPrepayment."; //Тело письмы

  $mail->send();
  echo 'Письмо отправлено!';
} catch (Exception $e) {
  echo "Письмо не отправлено!. Ошибка отправки: {$mail->ErrorInfo}";
}
?>
