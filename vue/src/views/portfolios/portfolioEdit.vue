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
                            <form @submit.prevent="savePortfolio">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Başlıq</label>
                                            <input type="text" class="form-control" id="example-text-input" name="title" placeholder="Başlıq Daxil Edin..." v-model="portfolio.title" />
                                            <div v-if="errors && errors.title" class="bg-red">
                                                <small style="color:red">{{ errors.title[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Link</label>
                                            <input type="url" class="form-control" id="example-price-input" name="url" placeholder="Link Daxil Edin..." v-model="portfolio.url" />
                                            <div v-if="errors && errors.url" class="bg-red">
                                            	<small style="color:red">{{ errors.url[0] }}</small>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="example-textarea-input">Məzmun</label>
                                            <textarea class="form-control" id="example-textarea-input" name="description" rows="4" placeholder="Məzmun Daxil Edin..." v-model="portfolio.description"></textarea>
                                            <div v-if="errors && errors.description" class="bg-red">
                                            	<small style="color:red">{{ errors.description[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Şəkil</label>
                                            <br />
                                            <img :src="portfolio.img" :alt="portfolio.title" class="mb-2" style="width:150px; height:150px" />
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

    const portfolio = ref([]);
    const router = useRouter();
    const errors = ref("");

    const getPortfolio = async (id) => {
          let response = await axiosClient.get(`portfolios/${id}`);
          portfolio.value = response.data.data;
    }

    const updatePortfolio = async (id) => {
    	try {
    		const formdata = new FormData();
    		formdata.append('title',portfolio.value.title)
    		formdata.append('description',portfolio.value.description)
    		formdata.append('url',portfolio.value.url)
           	formdata.append('_method','put')
    		let config = 
           	{ headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
    		await axiosClient.post(`portfolios/${id}`,formdata,config)
    		await router.push({ name : 'portfolios.index' });
    		portfolio.value.title = ''
    		portfolio.description = ''
    		portfolio.value.url = ''
    	} catch (e) {
        if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
      }
    	}

	onMounted(() => getPortfolio(props.id))

	const savePortfolio = async () => {
        await updatePortfolio(props.id)
    }

</script>