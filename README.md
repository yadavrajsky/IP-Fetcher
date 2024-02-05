# 🌐 IP Address Checker

Welcome to the IP Address Checker application! This web-based tool allows users to check whether a particular entered IP address exists in the database. The system ensures that the initial 8 digits of all IPs are not similar, throwing an error if they match. It also has a robust authentication system to ensure secure access.

![Signup](https://github.com/yadavrajsky/IP-Fetcher/assets/70022991/83243f58-1eb7-4eaf-8ecf-c98a9e50b3d9)

![Login](https://github.com/yadavrajsky/IP-Fetcher/assets/70022991/ba69ba9d-04c5-4a77-b712-e7356e728dae)

![IP Form](https://github.com/yadavrajsky/IP-Fetcher/assets/70022991/af9bf93f-2863-471e-b816-e8f0c2252599)

![IP Insertion](https://github.com/yadavrajsky/IP-Fetcher/assets/70022991/57b985ee-4e52-4284-9241-76c213f6cb15)

![IP Found](https://github.com/yadavrajsky/IP-Fetcher/assets/70022991/38f0336c-0068-4c3f-9e38-cccece030973)


## Technologies Used

- **Frontend**: Vite JS, Redux for state management
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## 🚀 Setup Instructions

### Backend

1. Create a `.env` file in the backend root folder with the following content:

    ```env
    DB_USERNAME=user
    DB_PASSWORD=""
    DB_PORT=3306
    DB_DATABASE=db_name
    SECRET_KEY=Secret_key
    PORT=4000
    ```

2. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Install nodemon globally (if not installed):

    ```bash
    npm install nodemon -g
    ```

5. Start the server using nodemon:

    ```bash
    nodemon app.js
    ```

### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Update the `vite.config.js` file with the following proxy configuration to handle API requests:

    ```javascript
    import react from 'vite-plugin-react';

    export default defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome!

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📝 Additional Notes

- Ensure that MySQL is properly set up and running with the provided configuration in the `.env` file.
- Modify the `.env` file according to your preferences, especially the database credentials.
- For any issues or feature requests, please open an [issue](https://github.com/your-username/ip-address-checker/issues).

Happy checking IPs! ✨
