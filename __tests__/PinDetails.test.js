import React from "react";
import renderer from "react-test renderer";

import PinDetails from "../components/PinDetails";

import { fireEvent, render, waitFor } from "react-native-testing-library";
import { expect, it } from "@jest/globals";

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const Modal = jest.requireActual("react-native/Libraries/Modal/Modal");
  return (props) => <Modal {...props} />;
});
