import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MealPlan from "../src/components/MealPlan"
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/meal-plan" element={<MealPlan />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
