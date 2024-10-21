import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import Echo from 'laravel-echo'; // Import Echo if you have a specific type for it
import Pusher from 'pusher-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        route: typeof ziggyRoute;
        Echo: Echo; // Replace `Echo` with the actual type if you have it
        Pusher: typeof Pusher;
    }
}

export {};
