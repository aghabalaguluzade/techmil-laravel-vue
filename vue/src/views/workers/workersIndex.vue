<template>
	<div class="content">
          <div class="block block-rounded">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Dynamic Table <small>Full</small></h3>
                        </div>
                        <div class="block-content block-content-full">
                            <!-- DataTables init on table by adding .js-dataTable-full class, functionality is initialized in js/pages/be_tables_datatables.min.js which was auto compiled from _js/pages/be_tables_datatables.js -->
                            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-control"><option value="5">5</option><option value="10">10</option><option value="20">20</option></select></label></div></div><div class="col-sm-12 col-md-6"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label><input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0"></label></div></div></div><div class="row table-responsive"><div class="col-sm-12"><table class="table table-bordered table-striped table-vcenter js-dataTable-full dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                <thead>
                                   <tr role="row">
                                        <th class="text-center sorting_asc" style="width: 80px;" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending">#</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Ad Soyad</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Vəzifə</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Linkedin</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Github</th>
                                        <th class="d-none d-sm-table-cell sorting" style="width: 30%;" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending">Məzmun</th>
                                        <th style="width: 15%;" class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Registered: activate to sort column ascending">Əməliyatlar</th>
                                   </tr>
                                </thead>
                                <tbody>

                                <template v-for="worker in workers" :key="worker.id">
                                    
                                <tr class="odd">
                                        <td class="text-center sorting_1">{{ worker.id }}</td>
                                        <td class="font-w600">
                                          <p>{{ worker.name.substr(0,16) + '...' }}</p>
                                        </td>
                                        <td class="font-w600">
                                          <p>{{ worker.position.substr(0,17) + '...' }}</p>
                                        </td>
                                        <td class="font-w600">
                                          <a :href="worker.linkedin" id="email">{{ worker.linkedin.substr(0,10) + '...' }}</a>
                                        </td>
                                        <td class="font-w600">
                                          <a :href="worker.github" id="email">{{ worker.github.substr(0,10) + '...' }}</a>
                                        </td>
                                        <td class="d-none d-sm-table-cell">
                                            <em class="text-muted" id="description">{{ worker.description.substr(0,10) + '...' }}</em>
                                        </td>
                                        <td id="operations">
                                            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#workersModal" @click=onMounted(getView(worker.id))>Bax</button>                                        
                                            <button class="btn btn-danger btn-sm" @click="deleteWorker(worker.id)">Sil</button>
                                            <router-link class="btn btn-primary btn-sm mt-1" :to="{ name: 'workers.edit', params: { id: worker.id } }">Redaktə Et</router-link>
                                        </td>
                                    </tr>
                                    
                                </template>
                                    
                                   </tbody>
                            </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Page <strong>1</strong> of <strong>4</strong></div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link"><i class="fa fa-angle-left"></i></a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="5" tabindex="0" class="page-link"><i class="fa fa-angle-right"></i></a></li></ul></div></div></div></div>
                        </div>
                    </div>     
     </div>

                                  <!-- Modal -->
<div class="modal fade" id="workersModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog d-flex justify-content-center">
    <div class="modal-content" style="width:1200px">
      <div class="modal-header">
        <h5 class="modal-title" id="name-name"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-center table-responsive">
<table class="table">
              <tbody>
              <tr>
                  <th>ID</th>
                  <td id="id-view">{{ views.id }}</td>
                </tr>
                <tr>
                  <th>Şəkil</th>
                  <td id="img-view"><img :src="views.img" :alt="views.name" style="width:300px; height:250px" /></td>
                </tr>
                <tr>
                  <th>Ad Soyad</th>
                  <td id="name-view">{{ views.name }}</td>
                </tr>
                <tr>
                  <th>Vəzifə</th>
                  <td id="position-view">{{ views.position }}</td>
                </tr>
                <tr>
                  <th>Linkedin</th>
                  <td id="linkedin-view"><a :href="views.linkedin">{{ views.linkedin }}</a></td>
                </tr>
                <tr>
                  <th>Github</th>
                  <td id="github-view"><a :href="views.github">{{ views.github }}</a></td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td id="website-view"><a :href="views.website">{{ views.website }}</a></td>
                </tr>
                <tr>
                  <th>Məzmun</th>
                  <td id="description-view">{{ views.description }}</td>
                </tr>
                <tr>
                  <th>Əlavə Edilmə Tarixi</th>
                  <td id="created_at-view">{{ new Date(views.created_at).toLocaleString("az-AZ", { timeZone: "Asia/Baku"})}}</td>
                </tr>
                <tr>
                  <th>Redaktə Edilmə Tarixi</th>
                  <td id="updated_at-view">{{ new Date(views.updated_at).toLocaleString("az-AZ", { timeZone: "Asia/Baku"})}}</td>
                </tr>

              </tbody>
            </table>

    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
    import axiosClient from "../../axiosClient.js";

    const workers = ref([])
    const views = ref([])

    const getWorkers = async () => {
    	const response = await axiosClient.get("workers");
    	workers.value  = response.data.data;
    }

    const getView = async (id) => {
 	    let response = await axiosClient.get(`workers/${id}`);
 	    views.value = response.data.data;
 	  }

    const deleteWorker = async (id) => {
        if(!window.confirm("Silmək istədiyindən əminsən ?")) {
                return
            }
        await axiosClient.delete(`workers/${id}`);
        await getWorkers();   
    }

    onMounted(getWorkers);

</script>