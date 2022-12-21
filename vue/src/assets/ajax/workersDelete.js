// const _token = $('meta[name="csrf-token"]').attr('content');

const getValue = (id,url) => {
  $.ajax({
    type: "GET",
    url: "/api/v1/workers/"+id,
    data: {
      id
    },
    success: function(data) {
      document.getElementById('id-view').innerHTML = data.data.id;
      document.getElementById('img-view').innerHTML = `<img src="${url+data.data.img}" alt="${data.data.name}" style="height:150px; width:auto;" />`;
      document.getElementById('name-view').innerHTML = data.data.name;
      document.getElementById('name-name').innerHTML = 'Developer ' + data.data.name;
      document.getElementById('description-view').innerHTML = data.data.description;
      document.getElementById('position-view').innerHTML = data.data.position;
      document.getElementById('linkedin-view').innerHTML = `<a href="${data.data.linkedin}">${data.data.linkedin}</a>`;
      document.getElementById('github-view').innerHTML = `<a href="${data.data.github}">${data.data.github}</a>`;
      document.getElementById('website-view').innerHTML = `<a href="${data.data.website}">${data.data.website}</a>`;
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
              url:`/api/v1/workers/${id}`,
              type:"POST",
              data: {
                '_method':'delete',
              },
              success:function(){
                window.location.href = "/api/v1/workers";
              }
          });
          } else {
            swal("İmtina Edildi!");
          }
        });
};