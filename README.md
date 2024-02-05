# 🌐 IP Address Checker

Welcome to the IP Address Checker application! This web-based tool allows users to check whether a particular entered IP address exists in the database. The system ensures that the initial 8 digits of all IPs are not similar, throwing an error if they match. It also has a robust authentication system to ensure secure access.

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

3. Run the development server:

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
