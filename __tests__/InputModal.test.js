import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { expect, it } from "@jest/globals";
import UserInput from "../components/UserInput";
import InputModal from "../components/InputModal";

it("hides input modal initially", async () => {
  const { getByText, getByTestId, debug } = render(<UserInput />);

  expect(() => getByTestId("chooseImage")).toThrow(
    /no instances found/i
  ); //modal is initially closed

});

it("renders input modal correctly", async () => {
  const { getByText, getByTestId, debug } = render(<InputModal />);

  expect(() => getByTestId("chooseImage"))
});
