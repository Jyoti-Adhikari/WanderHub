# 🌍 WanderHub

**WanderHub** is a travel listing web app built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

### 🧭 Features
- Browse travel destination listings  
- Add new listings  
- Post and view reviews  
- Form validation using Joi  
- EJS layout templates with `ejs-mate`  
- Friendly and clean error handling  

---

## 📸 Preview

Screenshots showing WanderHub in action (see `images_output/` folder):

![Home Page](images_output/first_page.png)
![Create Listing](images_output/create_new_list.png)
![Listing Detail](images_output/each_list_detail.png)
![Review Page](images_output/review_page.png)
![Footer](images_output/page_footer.png)
 

---

## 📁 Project Structure

WANDERHUB/
├── images_output/ # Screenshots for README
├── init/ # DB seeding scripts
│ ├── data.js
│ └── index.js
├── models/ # Mongoose schemas
│ ├── listing.js
│ └── review.js
├── node_modules/ # Installed packages
├── public/
│ └── css/
│ └── style.css
├── utils/ # Utility files
│ ├── ExpressError.js
│ └── wrapAsync.js
├── validation/ # Joi validation
│ └── listingValidation.js
├── views/ # EJS templates
│ ├── includes/
│ ├── layouts/
│ ├── listings/
│ └── error.ejs
├── app.js # Main Express app
├── package.json
├── package-lock.json
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/wanderhub.git
cd wanderhub

### 2. Install dependencies
npm install
npm install express mongoose ejs ejs-mate method-override joi

### 3. (Optional) Seed the database
node init/index.js


### 4. Open in your browser
http://localhost:3000

📚 Key Dependencies
Package	Purpose
express	Web framework for routing and middleware
mongoose	MongoDB object modeling
ejs	Template engine for dynamic pages
ejs-mate	Layout/partials support for EJS
method-override	Enables PUT/DELETE in forms
joi	Validation for listings and reviews

🛠️ Custom Utilities
wrapAsync.js – Wraps async routes to catch errors

ExpressError.js – Custom error handling class

listingValidation.js – Joi schemas for form validation

🤩 Features
Add, view, and review travel destination listings

Server-side form validation using Joi

Clean and modular codebase with MVC pattern

EJS templating with layout inheritance

Robust error handling using custom classes

Responsive and user-friendly design

🤝 Contributing
Contributions are welcome!
Feel free to fork the project, open issues, or submit pull requests.

📞 Contact
Made with 💻 by Jyoti

Feel free to reach out if you'd like to collaborate or need any help!




