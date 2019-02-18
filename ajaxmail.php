<?php
$un=$_POST['username'];
$em=$_POST['useremail'];
$su=$_POST['useresubject'];
$msg=$_POST['mesg'];
if(trim($un)!="" && trim($msg)!="" && trim($su)!="" && trim($em)!="")
{
	if(filter_var($em, FILTER_VALIDATE_EMAIL))
	{
		$message="Hi Admin..<p>".$un." has sent a query having subject".$su."email id as ".$em."</p><p>Query is : ".$msg."</p>";
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <grapeckua@gmail.com>' . "\r\n";

		if(mail('grapeckua@gmail.com','Query for Exito',$message,$headers ))
		{
		echo '1#<p style="color:green;">Mail has been sent successfully.</p>';
		}
		else
		{
		echo '2#<p style="color:red;">Please, Try Again.</p>';
		}
	}
	else
		echo '2#<p style="color:red">Please, provide valid Email.</p>';
}
else
{
echo '2#<p style="color:red">Please, fill all the details.</p>';
}?>