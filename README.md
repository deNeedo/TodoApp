# Todo App

## Project Description

This Todo App is a web-based application that allows users to manage their tasks efficiently. Users can add, edit, delete, and mark tasks as complete or incomplete. The app also provides features such as sorting tasks by different criteria and assigning tasks to projects.

The application is built using React for the front end, and Firebase for the backend. It leverages Docker Compose for easy setup and deployment.

## Features

 - Add, edit, delete, and mark tasks as complete or incomplete
 - Assign tasks to projects
 - Sort tasks by title, description, date, and priority
 - Responsive design for a seamless experience on different devices
 - Search functionality with dynamic updates
 - User authentication and registration

 ## Getting Started

 ### Prerequisites

 - Docker and Docker Compose installed on your machine

 ### Installation

 1. **Clone the repository**

    ```sh
    git clone <repository_url>
    cd <repository_directory>
    ```

 2. **Start Docker Compose**

    Run the following command to start the services defined in your `docker-compose.yml`:

    ```sh
    docker compose up -d
    ```

 3. **Access the Docker container**

    Execute an interactive shell session into the running Docker container:

    ```sh
    docker exec -it vite_docker sh
    ```

 4. **Install dependencies**

    Inside the Docker container, run the following command to install all necessary dependencies:

    ```sh
    npm i
    ```

 5. **Run the development server**

    Start the development server with the following command:

    ```sh
    npm run dev
    ```

. 6. **Access the application**

    Open your web browser and go to `http://localhost:8000` to see the Todo App in action.

 ## Usage

 - **Add Task**: Click the "Add Todo" button to open a modal where you can enter the task details and set a priority.
 - **Edit Task**: Click the "Edit" button on a task to open a modal where you can update the task details.
 - **Delete Task**: Click the "Delete" button on a task to remove it..
 - **Toggle Complete**: Click the "Toggle state" button to mark a task as complete or incomplete.
 - **Move Task to Project**: Click the "Move to project" button to assign the task to a project.
 - **Sort Tasks**: Use the sort dropdown to sort tasks by title, description, date, or priority.
 - **Search Tasks**: Use the search bar to dynamically filter tasks based on the search criteria.

 *Made by Jeremi Sadkowski, Jacek Kudrys & Stanisław Pilch*
