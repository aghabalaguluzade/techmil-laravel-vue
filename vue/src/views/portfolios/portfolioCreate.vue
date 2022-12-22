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
                            <form @submit.prevent="savePortfolio">
                                <!-- Basic Elements -->
                                <h2 class="content-heading pt-0">Basic</h2>
                                <div class="row push">
                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label for="example-text-input">Başlıq</label>
                                            <input type="text" class="form-control" id="example-text-input" name="title" placeholder="Başlıq Daxil Edin..." v-model="form.title" />
                                            <div v-if="errors && errors.title" class="bg-red">
                                                <small style="color:red">{{ errors.title[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="tags-basic">Taq</label>
                                            <vue3-tags-input
                                                placeholder="Taq Daxil Edin..."
                                                @on-tags-changed="handleChangeTag"/>
                                            <div v-if="errors && errors.tags" class="bg-red">
                                                <small style="color:red">{{ errors.tags[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-price-input">Link</label>
                                            <input type="url" class="form-control" id="example-price-input" name="url" placeholder="Link Daxil Edin..." v-model="form.url" />
                                            <div v-if="errors && errors.url" class="bg-red">
                                            	<small style="color:red">{{ errors.url[0] }}</small>
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
	import { ref, defineComponent } from "vue";
    import axiosClient from "../../axiosClient.js";
    import Vue3TagsInput from 'vue3-tags-input';

components: {
    Vue3TagsInput
  };
    const form = ref({
        'title' : '',
        'description' : '',
        'url' : '',
        'tags' : [],
    });

    const handleChangeTag = (tags) => {
      form.value.tags = tags
    }

    const errors = ref("");
    const success = ref(false);

    const savePortfolio = async () => {
    	try {
    		const formdata = new FormData();
    		formdata.append('title',form.value.title)
    		formdata.append('description',form.value.description)
    		formdata.append('url',form.value.url)
            formdata.append('tags',form.value.tags)
    		let config = 
           	{ headers: { 
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            } }
    		await axiosClient.post("portfolios",formdata,config)
    		success.value = true
    		form.value.title = ''
    		form.description = ''
    		form.value.tags = []
    		form.value.url = ''
    	} catch(error) {
    		if(error.response.status === 422) {
                errors.value = error.response.data.errors;
           }
                errors.value = error.response.data.errors;
      }
    	}
</script>