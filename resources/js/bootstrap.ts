// import axios from 'axios';
// window.axios = axios;


// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY, // or VITE_PUSHER_APP_KEY if using Vite
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, // or VITE_PUSHER_APP_CLUSTER
//     encrypted: true,
// });
// // console.log(import.meta.env.VITE_PUSHER_APP_KEY)

import axios from 'axios';

// Configure axios to include CSRF token
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Get CSRF token from meta tag
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// You can also set the base URL if needed (optional)
axios.defaults.baseURL = window.location.origin;

// Add response interceptor for handling common responses (optional)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 419) {
            // Handle expired CSRF token
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
