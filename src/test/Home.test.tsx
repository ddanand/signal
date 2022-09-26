import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Home from "../components/Home";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home tests", () => {
  it("should contain the heading", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(
      screen.getByText(/Welcome to your daily healthy meal plan/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our application suggests the best meal plan & servings based on your Gender & Age group/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter your details below/i)
    ).toBeInTheDocument();
  });

  it("should contain link to add family", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByText(/Add Family +/i)).toBeInTheDocument();
  });

  it("should not navigate if errors in Form", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    fireEvent.click(screen.getByText(/Submit/i));
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  // it("should navigate if no errors in Form", () => {
  //   render(
  //     <Router>
  //       <Home />
  //     </Router>
  //   );
  //   fireEvent.change(screen.getByRole('textbox'), {
  //     target: { value: "matti" },
  //   });
  //   fireEvent.change(screen.getByTestId("select-option-age"), {
  //     target: { value: "Male" },
  //   });
  //   fireEvent.change(screen.getByTestId("select-option-gender"), {
  //     target: { value: "2 to 3" },
  //   });

  //   fireEvent.click(screen.getByText(/Submit/i));
  //   expect(mockNavigate).toHaveBeenCalledTimes(1);
  // });
});
