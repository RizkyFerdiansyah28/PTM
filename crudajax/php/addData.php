<?php

    include('connection.php');

    $nama_barang = $_POST['nama_barang'];
    $harga_barang = $_POST['harga_barang'];
    $stok = $_POST['stok'];

    $sql = mysqli_query($connection, "INSERT INTO tbl_data VALUES (null,'$nama_barang','$harga_barang','$stok')" );
        // untukk mengumpan balik
        if($sql) {
            $result['status'] = '1';
            $result['msg'] = 'Insert data berhasil';

        } else {
            $result['status'] = '0';
            $result['msg'] = 'Insert data gagal!';
        }
        echo json_encode($result);

?>

