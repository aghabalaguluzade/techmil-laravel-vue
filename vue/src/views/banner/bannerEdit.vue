<template>
	<div class="content">
                    <!-- Elements -->
                    <div class="block block-rounded">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Elements</h3>
                        </div>
                        <div class="block-content">
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
                                            <input type="text" class="form-control" id="example-text-input" name="title" placeholder="Başlıq Daxil Edin..." v-model="banner.title" />
                                        </div>
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="banner.description"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Nömrə</label>
                                            <input type="number" class="form-control" id="example-price-input" name="number" placeholder="Nömrəni Daxil Edin..." v-model="banner.number" />
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Whatsapp</label>
                                            <input type="url" class="form-control" id="example-price-input" name="whatsapp" placeholder="Link Daxil Edin..." v-model="banner.whatsapp" />
                                        </div>
                                        <div class="form-group">
                                            <label for="example-select">Status</label>
                                            <select class="form-control" id="example-select" name="status" @change="changeStatus($event)">
                                                <template v-if="banner.status == '1'">
                                                    <option value="1">Aktiv</option>
                                                    <option value="0">Deaktiv</option>
                                                </template>
                                                <template v-else>
                                                    <option value="0">Deaktiv</option>
                                                    <option value="1">Aktiv</option>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                            <br />
                                            <div id="preview" class="mb-3 float-left">
                                                <img :src="banner.previewImg" />
                                            </div>
                                            <div id="preview" class="mb-3 float-left">
                                                <img v-if="banner.backgroundImage" :src="banner.backgroundImage" />
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
	import { ref, onMounted } from 'vue';
    import { useRouter } from "vue-router";
    import axiosClient from "../../axiosClient.js";


    const props = defineProps({
    	id : {
    		required : true,
    		type : String
    	}
    });

    const banner = ref([]);
    const router = useRouter();
    const errors = ref("");

    const getBanner = async (id) => {
    	let response = await axiosClient.get(`banners/${id}`);
    	banner.value = response.data.data;
    };

    const updateBanner = async (id) => {
      errors.value = ""
      try {
           const formdata = new FormData();
           formdata.append('backgroundImage',banner.value.backgroundImage)
           formdata.append('title',banner.value.title)
           formdata.append('description',banner.value.description)
           formdata.append('number',banner.value.number)
           formdata.append('whatsapp',banner.value.whatsapp)
           formdata.append('status',banner.value.status)
           formdata.append('_method', "put")
           let config = 
           { headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
            await axiosClient.post(`banners/${id}`, formdata, config)
           	await router.push({ name : 'banners.index' });
           banner.value.backgroundImage = ''
           banner.value.title = ''
           banner.value.description = ''
           banner.value.number = ''
           banner.value.whatsapp  = ''
           banner.value.status = ''
      } catch (error) {
           if(error.response.status === 422) {
                errors.value = error.response.data.errors;
           }
                errors.value = error.response.data.errors;
      }
 };

	const onFileChange = async (e) => {
	    banner.value.backgroundImage = e.target.files[0]
        banner.value.previewImg = URL.createObjectURL(banner.value.backgroundImage);
	};

	onMounted(() => getBanner(props.id))

	const saveBanner = async () => {
		await updateBanner(props.id)
	}

    const changeStatus = async (e) => {
        banner.value.status = e.target.value;
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