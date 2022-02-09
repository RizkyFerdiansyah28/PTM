$(document).ready(function () {
  bacaData();

  //button insert data
  $(".btn-tambah").click(function () {
    tambahData();
  });

  //button update data
  $(".btn-ubah").click(function () {
    ubahData();
  });

  //button utk cancel / batal
  $(".btn-batal").click(function () {
    resetForm();
    bacaData();
  });

  //untuk select data =
  function bacaData() {
    //agar table tidak terduplikasi saat insert data
    $(".targetData").html("");
    $(".btn-tambah").show(); //menampilkan tombol tambah lagi setelah melakukan program
    $(".btn-ubah").hide();
    $(".btn-batal").hide();
    $.ajax({
      type: "GET",
      url: "php/getData.php",
      dataType: "JSON",
      success: function (response) {
        //memasukkan data dari database ke dalam tabel
        var i;
        var data = "";
        for (i = 0; i < response.length; i++) {
          data +=
            `
                  <tr>
                      <td>` +
            (i + 1) +
            `</td>
                      <td>` +
            response[i].nama_barang +
            `</td>
                      <td>` +
            response[i].harga_barang +
            `</td>
                      <td>` +
            response[i].stok +
            `</td>
                      <td>
                          <button class='btn-edit' id='` +
            response[i].id +
            `'>Edit</button>
                          <button class='btn-delete' id='` +
            response[i].id +
            `'>Delete</button>
                      </td>
                  </tr>
                  `;
        }
        $(".targetData").append(data);

        // untuk edit
        $(".btn-edit").click(function () {
          //alert($(this).attr('id'));
          getSingleData($(this).attr("id"));
        });

        //untukk delete data
        $(".btn-delete").click(function () {
          //alert($(this).attr('id'));
          deleteData($(this).attr("id"));
        });
      },
    });
  }

  //untukk update data
  function ubahData() {
    let id = $(".txt_id").val();
    let nama_barang = $(".txt_nama_barang").val();
    let harga_barang = $(".txt_harga_barang").val();
    let stok = $(".txt_stok").val();

    $.ajax({
      type: "POST",
      url: "php/ubahData.php",
      data:
        "id=" +
        id +
        "&nama_barang=" +
        nama_barang +
        "&harga_barang=" +
        harga_barang +
        "&stok=" +
        stok,
      dataType: "JSON",
      success: function (response) {
        if (response.status == "1") {
          alert(response.msg);
          bacaData();
          resetForm();
        } else {
          alert(response.msg);
          bacaData();
          resetForm();
        }
      },
    });
  }

  //function insert data
  function tambahData() {
    let nama_barang = $(".txt_nama_barang").val();
    let harga_barang = $(".txt_harga_barang").val();
    let stok = $(".txt_stok").val();
    //mengirim value ke addData.php
    $.ajax({
      type: "POST",
      url: "php/addData.php",
      data:
        "nama_barang=" +
        nama_barang +
        "&harga_barang=" +
        harga_barang +
        "&stok=" +
        stok,
      dataType: "JSON",
      success: function (response) {
        //diambil dr file adddata.php
        if (response.status == "1") {
          alert(response.msg);
          bacaData();
          resetForm();
        } else {
          alert(response.msg);
          bacaData();
          resetForm();
        }
      },
    });
  }

  //untuk mengambil salah satu data dari database
  function getSingleData(x) {
    $.ajax({
      type: "POST",
      url: "php/getSingleData.php",
      data: "id=" + x,
      dataType: "JSON",
      success: function (response) {
        //menampilkan satudata tadi ke dalam form :
        $(".txt_id").val(response.id);
        $(".txt_nama_barang").val(response.nama_barang);
        $(".txt_harga_barang").val(response.harga_barang);
        $(".txt_stok").val(response.stok);

        //menampilkan button edit saat menekan edit
        $(".btn-tambah").hide();
        $(".btn-ubah").show();
        $(".btn-batal").show();
      },
    });
  }

  //untuk delete data
  function deleteData(x) {
    $.ajax({
      type: "POST",
      url: "php/deleteData.php",
      data: "id=" + x,
      dataType: "JSON",
      success: function (response) {
        if (response.status == "1") {
          alert(response.msg);
          bacaData();
        } else {
          alert(response.msg);
          bacaData();
        }
      },
    });
  }

  //function untuk reset form
  function resetForm() {
    $(".txt_id").val("");
    $(".txt_nama_barang").val("");
    $(".txt_harga_barang").val("");
    $(".txt_stok").val("");
  }
});
