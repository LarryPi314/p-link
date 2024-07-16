## p-link

p-link is an AI-powered web application that connects students and alumni using natural language. Students enter prompts in natural language and obtain
a list of alumni fitting the description. Students can also request a coffeechat with an alumni by sending them an AI-generated message. 

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Features

- Vector-powered search functionality
- Connect students and alumni
- User-friendly interface
- Real-time data processing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Python 3.8+ and pip installed on your machine.
- An instance of a Supabase database and Pinecone database (visit https://supabase.com/ and https://pinecone.io to set that up)

## Installation

Follow these steps to get the application up and running.

### Backend Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/vector-search-backend.git
    cd backend
    ```

2. **Create and Activate a Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add the necessary environment variables, i.e.:
    ```env
    DATABASE_URL=<your-database-url>
    SECRET_KEY=<your-secret-key>
    ```

5. **Run server**:
    ```bash
    python main.py
    ```


### Frontend Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/LarryPi314/p-link.git
    cd p-link
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add the necessary environment variables

4. **Start the Frontend Server**:
    ```bash
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application in your web browser at `http://localhost:3000`.

Made with love at P-ai 🤝
