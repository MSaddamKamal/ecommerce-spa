export default
{
    setPageLoader(context, payload) {
        context.commit('updatePageLoader', payload)
    },

    setShowAlert(context, payload) {
        context.commit('updateAlertMsg', payload)
    },

};