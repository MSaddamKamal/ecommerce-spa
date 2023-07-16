import axios from '../config/request/axios-config.js';


export const globalMixin = {
    methods: {

        async makeRequest(requestType = 'get', url, data = {}, options) {
          
          

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
                    
                }else{
                    responseFormat.error = true;
                    
                }

            }).catch(error => {
             
                responseFormat.error = true;
                responseFormat.response = error;

            }).finally(() => {
                
            });


            return responseFormat;
        },

    },

}