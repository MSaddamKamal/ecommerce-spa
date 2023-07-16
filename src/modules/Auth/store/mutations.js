export default
    {
        setUser(state, payload) {
            state.user = payload 
            localStorage.setItem('user',JSON.stringify(payload))
        },

    };