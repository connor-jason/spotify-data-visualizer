# 🎵 Spotify Data Visualizer 🎵

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/562c3dd2-4fe9-41c3-b8d7-0fea7c14f4e2" />

👋 **Intro:**
- Welcome to **Spotify Data Visualizer**, a web application that transforms your Spotify listening data into insightful and interactive visualizations. Whether you're curious about your most-played artists, genres, or tracks, our tool provides a clear and engaging way to explore your musical preferences.
- Explore the app live at: [https://spotify-visualizer-82789.web.app/](https://spotify-visualizer-82789.web.app/)

📦 **Tech Stack:**
- **React.js:** Frontend library for building user interfaces.
- **TypeScript:** Enhances JavaScript with static typing for better code quality.
- **ECharts:** Powerful charting and visualization library.
- **Firebase:** Real-time database and hosting services.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.

👩🏽‍🍳 **Features:**
- **Interactive Charts:**
  - **Plays Over Time:** Visualize your daily Spotify plays with an optimized line chart.
  - **Top Artists:** Discover your most-listened-to artists through a horizontal bar chart.
  - **Top Genres:** Explore the distribution of your favorite music genres with a pie chart.
  - **Top Songs:** Identify your top tracks using an engaging horizontal bar chart.
- **Date Range Filters:** Customize the time frame for your visualizations to see trends over specific periods.
- **Responsive Design:** Seamlessly view your data on both desktop and mobile devices.
- **Dark Mode:** Enjoy a sleek and modern dark theme that’s easy on the eyes.
- **Data Downsampling:** Efficiently handle large datasets using the Largest Triangle Three Buckets (LTTB) algorithm for optimal chart performance.

💭 **Process:**
- **Project Initialization:** Started by setting up a React environment with TypeScript for robust type-checking.
- **Data Integration:** Connected to Firebase to fetch and store Spotify listening data in real-time.
- **Chart Implementation:** Leveraged ECharts to create dynamic and interactive visualizations, ensuring performance even with extensive datasets.
- **Performance Optimization:** Implemented the LTTB downsampling algorithm to reduce data points without compromising the integrity of the visualizations.
- **UI/UX Design:** Utilized Tailwind CSS to design a clean, responsive, and user-friendly interface, ensuring accessibility across all devices.
- **Deployment:** Deployed the application using Firebase Hosting, making it accessible to users worldwide with seamless scalability.

📚 **What I Learned:**
- **Advanced React Patterns:** Gained deeper insights into state management, component optimization with React.memo and useMemo, and effective use of context for state sharing.
- **Data Visualization with ECharts:** Mastered the configuration and customization of ECharts to create interactive and performant charts tailored to user data.
- **Performance Optimization:** Learned how to implement the LTTB algorithm for data downsampling, significantly enhancing chart rendering speeds with large datasets.
- **Integrating Firebase:** Acquired practical experience in setting up and managing Firebase services, including real-time databases and hosting solutions.
- **Tailwind CSS Proficiency:** Enhanced skills in using Tailwind CSS for rapid and responsive UI development, ensuring consistency and scalability in design.
- **TypeScript Best Practices:** Improved ability to write type-safe code, reducing bugs and improving maintainability through TypeScript's static typing capabilities.

✨ **Improvements:**
- **User Authentication:** Implement user login to personalize visualizations based on individual Spotify accounts.
- **Real-Time Updates:** Enable real-time data synchronization to reflect live changes in listening habits.
- **Enhanced Interactivity:** Add features like drill-down capabilities in charts for more detailed insights.
- **Additional Chart Types:** Incorporate more visualization options such as heatmaps or scatter plots for comprehensive data analysis.
- **Export Options:** Allow users to export their visualizations as images or PDFs for sharing and personal records.
- **Dark Mode Toggle:** Provide a toggle switch for users to switch between light and dark themes based on their preference.

🚦 **Running the Project:**
To run the project locally, follow these steps:
1. **Clone the Repository:**
   - Run ```git clone https://github.com/connor-jason/spotify-data-visualizer.git```
   - Navigate into the project directory with ```cd spotify-data-visualizer```
2. **Install Dependencies:**
   - Run ```npm install``` to install all necessary dependencies.
   - Alternatively, if you're using Yarn, run **yarn install**
3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Hosting and Firestore Database.
   - Replace the Firebase configuration in `src/firebaseConfig.ts` with your project's credentials.
4. **Start the Development Server:**
   - Run ```npm start``` to launch the application locally.
   - Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

📸 **Screenshota of the Website:**

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/a3f16e93-ebd3-4157-afd2-b690f9a337cd" />

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/f143fe1e-422b-417c-b5e4-5f227427f647" />

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/53deb866-9382-406d-b8b3-3cdc2d33faef" />

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/4ea91598-b9a6-49ca-9aa1-74adc297ebb0" />

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/2ace7a76-68c3-4039-a2f5-29e9e2b4f00d" />
