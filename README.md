# Globetrotters

Explore the beauty of Indian tourist destinations through Globetrotters, a MERN Stack web application that empowers users to discover, create, and review captivating escapes. Whether you're a travel enthusiast or seeking inspiration for your next adventure, Globetrotters offers a seamless platform to engage with unique travel experiences.

🔗 **[Visit Globetrotters](https://globetrotters-star.vercel.app/)**

## Features

- **Discover Escapes**: Browse through a collection of captivating Indian tourist escapes, each with detailed information, reviews, and user-contributed images.

- **Create Your Own Escape**: Share your travel experiences by creating your own escapes. Upload stunning images and provide informative descriptions to inspire fellow travelers.

- **User Reviews**: Leave reviews on escapes you've experienced. Rate and comment on the places you've visited to help others plan their journeys.

- **CRUD Operations**: Seamlessly manage your escapes and reviews. Edit, delete, and update your entries as you explore new destinations.

- **User Authentication**: Securely authenticate and manage user accounts. Register, log in, and stay signed in to make the most of Globetrotters' features.

## Tech Stack

- **Frontend**: Built with React 18.2.0, Globetrotters offers an intuitive and responsive user interface for an enhanced browsing experience.

- **Form Handling**: Leverage the power of React Final Form 6.5.9 for smooth form handling, ensuring hassle-free escape creation and review submission.

- **User Notifications**: React Toastify 9.1.3 adds a touch of elegance to user interactions by providing customizable and visually appealing notifications.

- **Backend**: The backend is powered by Node.js and Express, following a RESTful MVC architecture. Utilize Joi 17.9.2 for data validation and Passport 0.6.0 for user authentication.

- **Database**: MongoDB is employed as the database, facilitating efficient storage and retrieval of escapes, reviews, and user data.

## Inspiration and Modifications

Globetrotters draws inspiration from Colt Steele's iconic YelpCamp project, which originally utilized EJS view engine and server-side rendering. In the spirit of innovation, this project has been reimagined using modern technologies. React was chosen for the frontend, providing a dynamic and engaging user interface, while React Final Form offers robust form handling capabilities. User experience is further elevated with the integration of React Toastify for user notifications.

## Challenges

While developing Globetrotters, I encountered several challenges that required creative solutions:

1. **Image Handling with React Final Form**: Integrating Cloudinary image uploads with React Final Form posed challenges due to controlled input behavior. Overcoming this involved careful manipulation of form state and handling image uploads with precision.

2. **User Authentication**: Adapting Passport, primarily designed for backend authentication, to work seamlessly with the frontend was a significant challenge. Leveraging the Context API helped manage user authentication states effectively.

3. **CORS Configuration**: During deployment, resolving CORS issues required fine-tuning the server's CORS configuration. Ensuring proper origin URLs and credentials were configured in the CORS options helped achieve a smooth user experience.

4. **Migration to React**: Migrating Colt Steele's YelpCamp project from EJS view engine to React while maintaining feature parity required thoughtful UI/UX design and integration of modern React libraries.

These challenges were opportunities for growth and learning, ultimately resulting in a more robust and feature-rich Globetrotters platform.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HarshArora-1205/Globetrotters.git
   ```
2. Navigate to the project directory:
   ```bash
   cd globetrotters
   ```
3. Navigate to the backend directory:
   ```bash
   cd server
   ```
4. Set Up MONGO_URL key in .env:
   ```bash
   MONGO_URL='YOUR-MONGO-DB-URL'
   ```
5. Install Backend Dependencies:
   ```bash
   npm install
   ```
6. Start backend server:
   ```bash
   npm run dev
   ```
7. Navigate to the frontend directory (new terminal):
   ```bash
   cd ../client
   ```
8. Install Frontend Dependencies:
   ```bash
   npm install
   ```
9. Start frontend server:
   ```bash
   npm start
   ```
10. Open your browser and navigate to http://localhost:3000 to access Globetrotters.

## Contribution

Contributions are welcome! Feel free to create a new branch, implement new features, and submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/HarshArora-1205/Globetrotters/blob/main/LICENSE) file for details.
