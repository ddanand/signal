# Signal

To run the project; run these 2 commands- 
* npm install
* npm run start Or npm start

To run the tests in the project run-
* npm run test

Tech Stack- React v.18.0, React Hooks, TypeScript, Material UI, Jest, React Testing Library, Papaparse.
I am using Papaparse library to pass the .csv files.

The home page of application presents a form to the user to enter their details & their family member's details like Name, Gender, Age & they all are required. User can add their family member's details by clicking on "Add Family +". For this I created the UserDetails.tsx component. I am using the UserDetails.tsx component in Home.tsx. I am using browser validation to make sure the user has filled all the values in the form. When the user fills all the value in the form the user is navigated to the custom /meal-plan page. For this I created MealPlan.tsx component where the user can click on the Food suggestion's category to see the food items. I am displaying maximum of 7 values selected for each food category in random order to show different choices to select everytime.

In this project I have made multiple small commits using Git best practices. I made sure to create mutiple small components following the DRY principle & making sure the components are meaningful & easy to understand. I have made sure to complete the defined user stories in the project.


