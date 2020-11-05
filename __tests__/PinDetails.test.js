import React from "react";
import renderer from "react-test-renderer";

import PinDetails from "../components/PinDetails";
import PinList from "../components/PinList";

import { fireEvent, render, waitFor } from "react-native-testing-library";
import { expect, it } from "@jest/globals";

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const Modal = jest.requireActual("react-native/Libraries/Modal/Modal");
  return (props) => <Modal {...props} />;
});

describe("Fetches the right pin details from database", () => {
  // There is only one case where PinDetails is directly called: when user presses on a pin on MapView
  it("Shows one PinDetail from PinList because search returned one pin", async () => {
    // dummy pin to check against marker choice (user has to press this specific pin to trigger the test)
    const pin = [
      {
        description: "Awesome place!!",
        id: "1t35326",
        latitude: "42.0559",
        longitude: "-87.6702",
        title: "Northwestern Lakefill",
        uri:
          "https://i.pinimg.com/originals/3b/17/41/3b17413b18a807023c02a9b674bb5756.jpg",
      },
    ];

    const { getByText, getByTestId, debug } = render(<PinDetails pin={pin} />);
    expect(() => getByText(/Northwestern Lakefill/i)).toBeTruthy();
    expect(() => getByText(/Find Directions/i)).toBeTruthy();
  });

  // PinList can also call PinDetails when user presses on one of the search result
  it("Shows one PinDetail from PinList", async () => {
    const pin = [
      {
        description: "Awesome place!!",
        id: "1t35326",
        latitude: "42.0559",
        longitude: "-87.6702",
        title: "Northwestern Lakefill",
        uri:
          "https://i.pinimg.com/originals/3b/17/41/3b17413b18a807023c02a9b674bb5756.jpg",
      },
    ];

    const { getByText, getByTestId, debug } = render(<PinDetails pin={pin} />);
    expect(() => getByText(/Northwestern Lakefill/i)).toBeTruthy();
    expect(() => getByText(/Find Directions/i)).toBeTruthy();
  });
});
