<template>
	<div class="content">
                    <!-- Elements -->
                    <div class="block block-rounded">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Elements</h3>
                        </div>
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
                        <div class="block-content">
                            <form @submit.prevent="saveWorkers">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Ad</label>
                                            <input type="text" class="form-control" id="example-text-input" name="name" placeholder="Ad Soyad Daxil Edin..." v-model="form.name" />
                                        	<div v-if="errors && errors.name" class="bg-red">
                                                <small style="color:red">{{ errors.name[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Vəzifə</label>
                                            <input type="text" class="form-control" id="example-price-input" name="position" placeholder="Vəzifə Daxil Edin..." v-model="form.position" />
                                            <div v-if="errors && errors.position" class="bg-red">
                                                <small style="color:red">{{ errors.position[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Linkedin</label>
                                            <input type="url" class="form-control" id="example-price-input" name="linkedin" placeholder="Linkedin Daxil Edin..." v-model="form.linkedin" />
                                            <div v-if="errors && errors.linkedin" class="bg-red">
                                                <small style="color:red">{{ errors.linkedin[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Github</label>
                                            <input type="url" class="form-control" id="example-price-input" name="github" placeholder="Github Daxil Edin..." v-model="form.github" />
                                            <div v-if="errors && errors.github" class="bg-red">
                                                <small style="color:red">{{ errors.github[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Website</label>
                                            <input type="url" class="form-control" id="example-price-input" name="website" placeholder="Website Daxil Edin..." v-model="form.website" />
                                            <div v-if="errors && errors.website" class="bg-red">
                                                <small style="color:red">{{ errors.website[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="form.description"></textarea>
                                            <div v-if="errors && errors.description" class="bg-red">
                                                <small style="color:red">{{ errors.description[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input js-custom-file-input-enabled" data-toggle="custom-file-input" id="example-file-input-multiple-custom" name="img" @change="onFileChange" />
                                                <label class="custom-file-label" for="example-file-input-multiple-custom">Şəkil Əlavə Et</label>
                                            <div v-if="errors && errors.img" class="bg-red">
                                                    <small style="color:red">{{ errors.img[0] }}</small>
                                                </div>
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
	import { ref } from "vue";
    import axiosClient from "../../axiosClient.js";

	const form = ref({
		'name' : '',
		'img' : '',
		'position' : '',
		'linkedin' : '',
		'github' : '',
		'website' : '',
		'description' : ''
	})

	const errors = ref("");
	const success = ref(false);

	const saveWorkers = async () => {
      errors.value = ""
      success.value = false
      try {
           const formdata = new FormData();
           formdata.append('img',form.value.img)
           formdata.append('name',form.value.name)
           formdata.append('description',form.value.description)
           formdata.append('linkedin',form.value.linkedin)
           formdata.append('github',form.value.github)
           formdata.append('website',form.value.website)
           formdata.append('position',form.value.position)
           let config = 
           { headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
            await axiosClient.post("workers", formdata, config)
           success.value = true
           form.value.img = ''
           form.value.name = ''
           form.value.description = ''
           form.value.position = ''
           form.value.linkedin = ''
           form.value.github = ''
           form.value.website = ''
      } catch (error) {
           if(error.response.status === 422) {
                errors.value = error.response.data.errors;
           }
                errors.value = error.response.data.errors;
      }
 };

	const onFileChange = async (e) => {
    	form.value.img = e.target.files[0]
	}

</script>