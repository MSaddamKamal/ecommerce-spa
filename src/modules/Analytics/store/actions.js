import { globalMixin } from "../../../mixin/global-mixin";

export default {

    // log stats
    async logStat(context, payload) {

        let url = 'api/analytics'
        let user = this.state.auth.user
        if (user) {
            return await globalMixin.methods.makeRequest('post', url, payload.body, payload.options)
                .then(res => {
                    // Browser print
                    console.log(`Analytic ${payload.body.event_type} logged successfully`)
                    return null
                });
        }

    },


};