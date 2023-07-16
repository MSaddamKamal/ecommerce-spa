export default {
    name:'required',
    email:  'required|email',
    password: 'required',
    password_confirmation: 'required|confirmed:@password',
};



