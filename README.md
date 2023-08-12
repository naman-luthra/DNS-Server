# DNS-Server Project

Welcome to the DNS-Server project! This guide will walk you through the steps to set up and run the DNS Server application locally on your machine.

## Table of Contents

- Introduction
- Getting Started
  - Prerequisites
  - Installation
  - Configuration
- Usage
  - Running the Server
- Accessing the Application

## Introduction

DNS-Server is a lightweight and efficient application that enables you to run your own DNS server locally. With this project, you can gain insights into DNS protocol handling and experiment with custom configurations.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (including npm)
- [MySQL](https://www.mysql.com/)

### Installation

Follow these steps to set up the project:

1. Clone the repository to your local machine using the following command:
   ```sh
   git clone https://github.com/naman-luthra/DNS-Server
2. Navigate to the project directory:
   ```sh
   cd DNS-Server
3. Install the required npm packages by running:
   ```sh
   npm install

### Configuration

1. Open the Setup.sql file and execute all the queries to set up the necessary database schema.
2. Create a .env file in the project directory and populate it with the following keys:
   ```
   DB_HOST=your_db_host
   DB_USER=root
   DB_PASSWORD=your_db_password
   DB_PORT=3306
   DB_NAME=DNSServer
   ```
## Usage

### Running the Server

To start the DNS server, use the following commands:

- For production mode:
  ```sh
     npm run start
- For development mode:
  ```sh
     npm run dev

### Accessing the Application

Once the server is running, you can access the DNS Server application by opening your web browser and navigating to `localhost:3000`
