import Echo from "laravel-echo";

window.Pusher = require('pusher-js');

const userToken = localStorage.getItem('userToken'); 
const echo = new Echo({
    broadcaster: 'pusher',
    key: 'c18041cdaf44ef9ea74d',
    cluster: 'mt1',
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
    enabledTransports: ['ws'],
//     authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    },
});

export default echo;