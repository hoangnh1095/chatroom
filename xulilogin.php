<?php
	session_start();
	include 'ket_noi.php';
	if(isset($_SESSION['username'])){
		echo "Xin chao ".$_SESSION['username'];
		header("location:main.php");
		}
	else{	
		
		if(isset($_POST['btn_dangnhap'])){
			$sql=mysql_query('select* from users where username="'.$_POST['user'].'"and password="'.$_POST['pass'].'"');
			$count=mysql_num_rows($sql);
			
			if($count>0){
				echo "Đăng nhập thành công.Xin Chào ".$_POST['user'];
				$_SESSION['username']=$_POST['user'];
				header('Location:main.php');
			}
			else{
				echo "Đăng Nhập thất bại.";
			}
		}
	}
?>