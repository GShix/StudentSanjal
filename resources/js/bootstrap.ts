import axios from 'axios';
window.axios = axios;


import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY, // or VITE_PUSHER_APP_KEY if using Vite
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, // or VITE_PUSHER_APP_CLUSTER
    encrypted: true,
});
// console.log(import.meta.env.VITE_PUSHER_APP_KEY)
