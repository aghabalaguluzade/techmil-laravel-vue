// const _token = $('meta[name="csrf-token"]').attr('content');

const getValue = (id) => {
  $.ajax({
    type: "GET",
    url: "/api/v1/portfolios/"+id,
    data: {
      id
    },
    success: function(data) {
      document.getElementById('id-view').innerHTML = data.data.id;
      document.getElementById('title-view').innerHTML = data.data.title;
      document.getElementById('title-name').innerHTML = 'Portfolio - ' + data.data.title;
      document.getElementById('url-view').innerHTML = data.data.url;
      for(let i = 0; i < data.data.tags.length; i++) {
        console.log(data.data.tags[i].name);
        document.getElementById('tag-view').innerHTML = data.data.tags[i].name;
      };
      document.getElementById('description-view').innerHTML = data.data.description;
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
              url:`/api/v1/portfolios/${id}`,
              type:"POST",
              data: {
                '_method':'delete',
              },
              success:function(){
                window.location.href = "/api/v1/portfolios";
              }
          });
          } else {
            swal("İmtina Edildi!");
          }
        });
};