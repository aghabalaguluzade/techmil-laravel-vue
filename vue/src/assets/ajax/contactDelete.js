// const _token = $('meta[name="csrf-token"]').attr('content');

const getValue = (id) => {
  $.ajax({
    type: "GET",
    url: "/api/v1/contacts/"+id,
    data: {
      id
    },
    success: function(data) {
      document.getElementById('id-view').innerHTML = data.data.id;
      document.getElementById('subject-view').innerHTML = data.data.subject;
      document.getElementById('subject-name').innerHTML = 'Əlaqə - ' + data.data.subject;
      document.getElementById('name-view').innerHTML = data.data.name;
      document.getElementById('surname-view').innerHTML = data.data.surname;
      document.getElementById('email-view').innerHTML = data.data.email;
      document.getElementById('message-view').innerHTML = data.data.message;
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
              url:`/api/v1/contacts/${id}`,
              type:"POST",
              data: {
                '_method':'delete',
              },
              success:function(){
                window.location.href = "/api/v1/contacts";
              }
          });
          } else {
            swal("İmtina Edildi!");
          }
        });
};