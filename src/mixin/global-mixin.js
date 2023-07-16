import axios from '../config/request/axios-config.js';
import store from '../store/index.js';

export const globalMixin = {

    methods: {
        // global request maker
        async makeRequest(requestType = 'get', url, data = {}, options) {
          
            // set loader
            if (options.loader)  store.dispatch('common/setPageLoader',options.loader)

            let responseFormat = {}
            let requestObj = null;
            switch (requestType) {
                case 'get':

                    requestObj = axios.get(url, {params: data});
                    break;

                case 'post':
                    requestObj = axios.post(url, data);
                    break;

                case 'put':
                    requestObj = axios.put(url, data);
                    break;

                case 'delete':
                    requestObj = axios.delete(url, data);
                    break;

                default:
                    /*if no params matches in switch case*/
                    requestObj = axios.get(url, data);

            }
          
            await requestObj.then(callResponse => {
                /*success*/
                responseFormat.error = false;
                responseFormat.response = callResponse;
                let success = callResponse.data.success

                if (success) {
                    store.dispatch('common/setShowAlert',{error:false,msg:callResponse.data.message})
                    setTimeout(()=>store.dispatch('common/setShowAlert',false),2000)

                }else{
                    responseFormat.error = true;
                }

            }).catch(error => {
           
                let msg = error?.response?.data?.message ?? 'Error! Something Went Wrong'
                store.dispatch('common/setShowAlert',{error:true,msg:msg})
                setTimeout(()=>store.dispatch('common/setShowAlert',false),2000)
                responseFormat.error = true;
                responseFormat.response = error;

            }).finally(() => {
                store.dispatch('common/setPageLoader',false)
            });


            return responseFormat;
        },

    },

}