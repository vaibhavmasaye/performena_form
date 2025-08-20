# Multi-Step Form Project

A modern, animated multi-step form built with React and Tailwind CSS.

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone or download the project files to your local machine.

2. Navigate to the project directory in your terminal:
   ```bash
   cd your-project-directory
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

## Running the Project

1. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. The application should now be running and you can interact with the multi-step form.

## Building for Production

To create a production build:

```bash
npm run build
```
or
```bash
yarn build
```

This will create a `build` folder with optimized production files.

## Features

- Smooth animations between form steps
- Form validation with visual feedback
- Progress indicator
- Data persistence using localStorage
- Responsive design
- Review step with submission confirmation

## Project Structure

```
src/
  components/
    FormField.jsx
    ProgressBar.jsx
    ReviewStep.jsx
    Step1.jsx
    Step2.jsx
    Step3.jsx
    Step4.jsx
    Step5.jsx
    Step6.jsx
    Step7.jsx
  App.jsx
  index.css
```

## Technologies Used

- React
- Tailwind CSS
- Custom CSS animations
