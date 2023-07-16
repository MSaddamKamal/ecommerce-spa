import { globalMixin } from "../../../mixin/global-mixin";

export default
{
    async login(context, payload) 
    {
        return await globalMixin.methods.makeRequest('post', 'api/auth/login', payload.body, payload.options)
            .then(res => {
                if (res  && !res?.error) {
                    const {response: {data: {data}}} = res
                    context.commit("setUser", data)
                    return data
                }
                return null
            });
    },

    async register(context, payload) 
    {
        return await globalMixin.methods.makeRequest('post', 'api/auth/register', payload.body, payload.options)
            .then(res => {
                if (res  && !res?.error) {
                    const {response: {data: {data}}} = res
                    return data
                }
                return null
            });
    },

    async logout(context, payload) 
    {
        return await globalMixin.methods.makeRequest('post', 'api/auth/logout', payload.body, payload.options)
            .then(res => {
                if (res  && !res?.error) {
                    const {response: {data: {data}}} = res;
                    context.commit("setUser", null)
                    localStorage.removeItem('user')
                    localStorage.removeItem('social-spa-token')
                    localStorage.removeItem('cartId')
                    return data
                }
                return null
            });
    },
   

};