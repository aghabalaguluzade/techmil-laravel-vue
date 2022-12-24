<template>
	<div class="content">
                    <!-- Elements -->
                    <div class="block block-rounded">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Elements</h3>
                        </div>
                        <div class="block-content">
                        	<div v-if="success">
                                <p v-show="success" class="alert alert-success">Əməliyyat Uğurlu Oldu</p>
                            </div>
                            <div v-if="errors">
                                <div v-for="(v,k) in errors" :key="k">
                                    <p v-for="error in v" :key="error" class="text-sm alert alert-danger">
                                        {{ error }}
                                    </p>
                                </div>
                            </div>
                            <form @submit.prevent="saveBanner">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Başlıq</label>
                                            <input type="text" class="form-control" id="example-text-input" name="title" placeholder="Başlıq Daxil Edin..." v-model="form.title" />
                                        </div>
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="form.description"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Nömrə</label>
                                            <input type="number" class="form-control" id="example-price-input" name="number" placeholder="Nömrəni Daxil Edin..." v-model="form.number" />
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Whatsapp</label>
                                            <input type="url" class="form-control" id="example-price-input" name="whatsapp" placeholder="Link Daxil Edin..." v-model="form.whatsapp" />
                                        </div>
                                        <div class="form-group">
                                            {{ form.status }}
                                            <label for="example-select">Status</label>
                                            <select class="form-control" id="example-select" name="status" @change="changeStatus($event)">
                                                <option selected disabled>Statusu seçin</option>
                                                <option value="1">Aktiv</option>
                                                <option value="0">Deaktiv</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                                <br />
                                                <div id="preview" class="mb-3 float-left">
                                                    <img :src="form.previewImg" />
                                                </div>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input js-custom-file-input-enabled" data-toggle="custom-file-input" id="example-file-input-multiple-custom" name="backgroundImage" @change="onFileChange" />
                                                <label class="custom-file-label" for="example-file-input-multiple-custom">Şəkil Əlavə Et</label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary">Əlavə et</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- END Elements -->
                </div>
</template>

<script setup>
	import { ref } from 'vue';
    import axiosClient from "../../axiosClient.js";


    const form = ref({
        'backgroundImage' : '',
        'title' : '',
        'price' : '', 
        'description' : '',
        'number' : '',
        'whatsapp' : '',
        'status' : '',
        'previewImg' : null
    });

    const errors = ref("");
    const success = ref(false); 

    const saveBanner = async () => {
      errors.value = ""
      success.value = false
      try {
           const formdata = new FormData();
           formdata.append('backgroundImage',form.value.backgroundImage)
           formdata.append('title',form.value.title)
           formdata.append('description',form.value.description)
           formdata.append('number',form.value.number)
           formdata.append('whatsapp',form.value.whatsapp)
           formdata.append('status',form.value.status)
           let config = 
           { headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
            await axiosClient.post("banners", formdata, config)
           success.value = true
           form.value.backgroundImage = ''
           form.value.title = ''
           form.value.description = ''
           form.value.number = ''
           form.value.whatsapp  = ''
           form.value.status = ''
           form.value.previewImg = '' 
      } catch (error) {
           if(error.response.status === 422) {
                errors.value = error.response.data.errors;
           }
                errors.value = error.response.data.errors;
      }
 };

 const onFileChange = async (e) => {
    form.value.backgroundImage = e.target.files[0]
    form.value.previewImg = URL.createObjectURL(form.value.backgroundImage);
 };

 const changeStatus = async (e) => {
    form.value.status = e.target.value;
 };
</script>

<style scoped>
body {
  background-color: #e2e2e2;
}

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 150px;
}
</style>