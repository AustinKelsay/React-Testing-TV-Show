import React from "react";
import {
  render,
  wait,
  fireEvent,
  waitForElement,
  getByTestId
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { fetchShow as mockfetchShow } from "./api/fetchShow";
import App from "./App";
import Episodes from "./components/Episodes";
import { data } from "./data";
import { act } from "react-dom/test-utils";

jest.mock("./api/fetchShow");

test("renders the app ", () => {
  act(() => {
    mockfetchShow.mockResolvedValueOnce(data);
  });
  render(<App />);
});

test("correct episodes populate when you select a season", async () => {
    act(() => {
      mockfetchShow.mockResolvedValueOnce(data);
    });

    const { getByTestId, getByText } = render(<App />);

    await wait(() => {
      getByText(/Select a season/i);
    });
    
    const dropDown = getByText(/Select a season/i);
    userEvent.click(dropDown);

    const text = getByText(/Season 1/i);
    expect(text).toBeInTheDocument();
    userEvent.click(text);
    getByText(/Season 1, Episode 1/i);
  });