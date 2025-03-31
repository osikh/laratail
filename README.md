# Laravel Dashboard Starter Kit

A Laravel dashboard starter kit built with **Vue.js** and **Tailwind CSS**. This project includes **Jetstream**, with **team support** and **API token authentication** enabled.

## Features

- ⚡ **Laravel** – Powerful PHP framework for web applications.
- 🎨 **Vue.js** – Reactive frontend framework for a seamless user experience.
- 🎨 **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- 🔑 **Jetstream** – Pre-configured authentication system with team support.
- 🔒 **API Token Authentication** – Secure API access with token-based authentication.

## Installation

### Prerequisites
Ensure you have the following installed:
- PHP (>=8.0)
- Composer
- Node.js & npm
- Laravel CLI

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/laravel-dashboard-starter.git
   cd laravel-dashboard-starter
   ```

2. **Install dependencies**
   ```sh
   composer install
   npm install
   ```

3. **Set up environment**
   ```sh
   cp .env.example .env
   php artisan key:generate
   ```
   Configure your database and other environment settings in `.env`.

4. **Run migrations**
   ```sh
   php artisan migrate
   ```

5. **Start the development server**
   ```sh
   php artisan serve
   npm run dev
   ```

## Usage
- Register and log in with Jetstream authentication.
- Create and manage teams.
- Use API tokens for secure access to the backend.

## Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
