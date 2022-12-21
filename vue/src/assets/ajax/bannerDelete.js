// const _token = $('meta[name="csrf-token"]').attr('content');

const getValue = (id,url) => {
  $.ajax({
    type: "GET",
    url: "/api/v1/banners/"+id,
    data: {
      id
    },
    success: function(data) {
      document.getElementById('id-view').innerHTML = data.data.id;
      document.getElementById('backgroundImage-view').innerHTML = `<img src="${url+data.data.backgroundImage}" alt="${data.data.title}" style="height:150px; width:auto;" />`;
      document.getElementById('title-view').innerHTML = data.data.title;
      document.getElementById('title-name').innerHTML = 'Sayt ' + data.data.title;
      document.getElementById('description-view').innerHTML = data.data.description;
      document.getElementById('number-view').innerHTML = data.data.number;
      document.getElementById('whatsapp-view').innerHTML = data.data.whatsapp;
      document.getElementById('created_at-view').innerHTML = new Date(data.data.created_at).toLocaleString("az-AZ", { timeZone: "Asia/Baku"});
      document.getElementById('updated_at-view').innerHTML = new Date(data.data.updated_at).toLocaleString("az-AZ", { timeZone: "Asia/Baku"});
      $('#siteModal').modal('show')
    }
});
};

const siteDelete = (id) => {
     swal({
          title: "Diqqət!",
          text: "Silinən informasiya geri qaytarılmır, yenidən əlavə olunmaldır!",
          icon: "warning",
          buttons: ["İmtina et", "Sil"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            $.ajax({
              url:`/api/v1/banners/${id}`,
              type:"POST",
              data: {
                '_method':'delete',
              },
              success:function(){
                window.location.href = "/api/v1/banners";
              }
          });
          } else {
            swal("İmtina Edildi!");
          }
        });
};