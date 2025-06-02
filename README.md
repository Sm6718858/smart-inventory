📦 Smart Inventory Management Web App
A Next.js powered web application to efficiently manage inventory products.
This app allows users to view, add, edit, and delete products with features like sorting, filtering, and responsive design for seamless product management.

📌 Project Overview
This Smart Inventory Management Web App is designed to help users maintain product inventories effortlessly.
Built with Next.js, it interacts with a mock REST API to perform CRUD operations on products, showcasing modern frontend development best practices such as:

Dynamic routing

State management

API integration

✅ Features
🧮 Core Features
➤ Dashboard (/)

-> Product image
-> Name
-> Quantity
-> Expiry date

=> Action buttons for editing and deleting products

=> Sort products by expiry date (ascending/descending)

=> Filter products nearing expiry within 7 days

➤ Add Product (/add)
Add new products via:

Manual form input (name, quantity, expiry date)

Form validation

Posts new products to the API

➤ Edit Product (/edit/[id])
Update existing product details

PUT request to update the API

➤ Delete Product
Confirmation prompt before deletion

Deletes product via API call

🎨 UI & UX
UI styled with Tailwind CSS

API integration using Axios

Toast notifications for success and failure

Fully responsive design for mobile and desktop

🛠 Tech Stack
->Next.js (React Framework)
->Axios (API Requests)
->Tailwind CSS (Styling)
->MockAPI.io (Mock Backend)

🚀 Setup Instructions
Clone the repository:
# 1. Clone this in VS Code
git clone https://github.com/Sm6718858/smart-inventory

# 2. Navigate to the directory
cd smart-inventory-app

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
Visit the app at: http://localhost:3000

⚠️ Assumptions & Limitations
The API is a mock endpoint, so data persistence is temporary and resets on server restart.

No authentication or user roles are implemented.

📬 Contact
For any queries or feedback:
Email: sm6718858@gmail.com

