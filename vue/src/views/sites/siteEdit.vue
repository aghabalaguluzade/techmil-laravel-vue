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
                            <form @submit.prevent="saveSite">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Başlıq</label>
                                            <input type="text" class="form-control" id="example-text-input" name="title" placeholder="Başlıq Daxil Edin..." v-model="site.title" />
                                            <div v-if="errors && errors.title" class="bg-red">
                                                <small style="color:red">{{ errors.title[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Qiymət</label>
                                            <input type="number" class="form-control" id="example-price-input" name="price" placeholder="Qiymət Daxil Edin..." v-model="site.price" />
                                            <div v-if="errors && errors.price" class="bg-red">
                                                <small style="color:red">{{ errors.price[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="site.description"></textarea>
                                            <div v-if="errors && errors.description" class="bg-red">
                                                <small style="color:red">{{ errors.description[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                            <br />
                                            <img :src="site.img" :alt="site.title" class="mb-2" style="width:150px; height:150px" />
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input js-custom-file-input-enabled" data-toggle="custom-file-input" id="example-file-input-multiple-custom" name="img"  @change="onFileChange" />
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
    import { ref, onMounted } from 'vue';
    import { useRouter } from "vue-router";
    import axiosClient from "../../axiosClient.js";

    const props = defineProps({
        id: {
            required: true,
            type: String
        }
    });

    const site = ref([]);
    const errors = ref("");
    const router = useRouter();


    const getSite = async (id) => {
          let response = await axiosClient.get(`sites/${id}`);
          site.value = response.data.data;
    }


    const updateSite = async (id) => {
      try {
           const formdata = new FormData();
           formdata.append('img',site.value.img)
           formdata.append('title',site.value.title)
           formdata.append('description',site.value.description)
           formdata.append('price',site.value.price)
           formdata.append('_method','put')
           let config = 
           { headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
            await axiosClient.post(`sites/${id}`, formdata, config);
            await router.push({ name : 'sites.index' });
      } catch (e) {
        if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
      }
 };

    const onFileChange = async (e) => {
        site.value.img = e.target.files[0]
    };


    onMounted(() => getSite(props.id))
    
    const saveSite = async () => {
        await updateSite(props.id)
    }

</script>