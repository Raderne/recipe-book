# Recipe Book

**Recipe Book** is a full-stack web application that allows users to explore recipes from the **Tasty Rapid API** and manage their personalized recipe collections. The project leverages modern web development technologies to deliver a seamless and secure user experience, with **JWT authentication** ensuring that users can add and remove recipes to their personal database.

## Live Demo and Repository

- **Live Site**: [Recipe Book](https://recipe-book-kappa-five.vercel.app/)
- **Repository**: [GitHub - Raderne/recipe-book](https://github.com/Raderne/recipe-book)

## Features

- **User Authentication**: Secure user registration and login using **JWT tokens**.
- **Recipe Search**: Fetches recipes dynamically from the **Tasty Rapid API**.
- **Personal Recipe Management**: Authenticated users can add or remove recipes in their personal database also leave comments.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Full-Stack Deployment**: Hosted on **Azure**, including the frontend, backend API, and SQL Server database.

## Technologies Used

### Frontend

- **Language**: TypeScript
- **Framework**: React
- **Styling**: Tailwind CSS

### Backend

- **Language**: C#
- **Framework**: .NET Core with **Entity Framework**
- **Database Management System**: SQL Server

## Screenshots

![Recipe Page](/screenshots/RecipePage.png)
![Home Page](/screenshots/recipes__1.png)
![Login Page](/screenshots/recipes__6.png)

## Installation and Setup

To run the project locally, follow these steps:

### Prerequisites

- **Node.js** and **npm** for the frontend.
- **.NET Core SDK** for the backend.
- **SQL Server** for the database.

### Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/Raderne/recipe-book.git
cd recipe-book
```

#### 2. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

#### 3. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install dependencies and restore the project:

```bash
dotnet restore
```

Set up the database:

- Update the connection string in `appsettings.json` to match your local SQL Server configuration.
- Apply migrations to create the database:
  ```bash
  dotnet ef database update
  ```

Run the API server:

```bash
dotnet run
```

#### 4. Integration

Ensure the frontend `env` file points to your local backend API URL.

### Azure Deployment

The project is fully deployed on **Azure**, with the API, frontend, and database integrated seamlessly. To deploy your own version:

- Deploy the frontend using **Azure Static Web Apps** or a similar service.
- Host the backend API on **Azure App Service**.
- Use **Azure SQL Database** for data storage.

## Contact

Feel free to reach out if you have any questions or feedback about the project. Contact me at [LinkedIn](https://www.linkedin.com/in/reda-elmarzouki-98a89ba0/).
