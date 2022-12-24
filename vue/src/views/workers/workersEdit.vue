<template>
	<div class="content">
                    <!-- Elements -->
                    <div class="block block-rounded">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Elements</h3>
                        </div>
                            <div v-if="errors">
                                <div v-for="(v,k) in errors" :key="k">
                                    <p v-for="error in v" :key="error" class="text-sm alert alert-danger">
                                        {{ error }}
                                    </p>
                                </div>
                            </div>
                        <div class="block-content">
                            <form @submit.prevent="saveWorker">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Ad</label>
                                            <input type="text" class="form-control" id="example-text-input" name="name" placeholder="Ad Soyad Daxil Edin..." v-model="worker.name" />
                                        	<div v-if="errors && errors.name" class="bg-red">
                                                <small style="color:red">{{ errors.name[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Vəzifə</label>
                                            <input type="text" class="form-control" id="example-price-input" name="position" placeholder="Vəzifə Daxil Edin..." v-model="worker.position" />
                                            <div v-if="errors && errors.position" class="bg-red">
                                                <small style="color:red">{{ errors.position[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Linkedin</label>
                                            <input type="url" class="form-control" id="example-price-input" name="linkedin" placeholder="Linkedin Daxil Edin..." v-model="worker.linkedin" />
                                            <div v-if="errors && errors.linkedin" class="bg-red">
                                                <small style="color:red">{{ errors.linkedin[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Github</label>
                                            <input type="url" class="form-control" id="example-price-input" name="github" placeholder="Github Daxil Edin..." v-model="worker.github" />
                                            <div v-if="errors && errors.github" class="bg-red">
                                                <small style="color:red">{{ errors.github[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Website</label>
                                            <input type="url" class="form-control" id="example-price-input" name="website" placeholder="Website Daxil Edin..." v-model="worker.website" />
                                            <div v-if="errors && errors.website" class="bg-red">
                                                <small style="color:red">{{ errors.website[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="worker.description"></textarea>
                                            <div v-if="errors && errors.description" class="bg-red">
                                                <small style="color:red">{{ errors.description[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                            <br />
                                            <div id="preview" class="mb-3 float-left">
                                                <img :src="worker.previewImg" />
                                            </div>
                                            <div id="preview" class="mb-3 float-left">
                                                <img v-if="worker.img" :src="worker.img" />
                                            </div>
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
	import { ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
    import axiosClient from "../../axiosClient.js";

    const props = defineProps({
        id: {
            required: true,
            type: String
        }
    });

	const worker = ref([])
	const errors = ref("");
	const router = useRouter();

	const getWorker = async (id) => {
          let response = await axiosClient.get(`workers/${id}`);
          worker.value = response.data.data;
    }

	const updateWorkers = async (id) => {
      errors.value = ""
      try {
           const formdata = new FormData();
           formdata.append('img',worker.value.img)
           formdata.append('name',worker.value.name)
           formdata.append('description',worker.value.description)
           formdata.append('linkedin',worker.value.linkedin)
           formdata.append('github',worker.value.github)
           formdata.append('website',worker.value.website)
           formdata.append('position',worker.value.position)
           formdata.append('_method','put')
           let config = 
           { headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
            await axiosClient.post(`workers/${id}`, formdata, config)
            await router.push({ name : 'workers.index' });
           worker.value.img = ''
           worker.value.name = ''
           worker.value.description = ''
           worker.value.position = ''
           worker.value.linkedin = ''
           worker.value.github = ''
           worker.value.website = ''
           worker.value.previewImg = ''
      } catch (error) {
           if(error.response.status === 422) {
                errors.value = error.response.data.errors;
           }
                errors.value = error.response.data.errors;
      }
 };

	const onFileChange = async (e) => {
    	worker.value.img = e.target.files[0]
        worker.value.previewImg = URL.createObjectURL(worker.value.img);
	}

	onMounted(() => getWorker(props.id))

	const saveWorker = async () => {
        await updateWorkers(props.id)
    }


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