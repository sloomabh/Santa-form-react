// frontend/src/App.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import FormPage from "../pages/FormPage";
import { fetchUsers, fetchUserProfiles } from "../utils/fetchUserData";
import calculateAge from "../utils/calculateAge";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock fetchUserData and calculateAge
jest.mock("../utils/fetchUserData");
jest.mock("../utils/calculateAge");

const mockUsers = [{ username: "charlie.brown", uid: "user123" }];

const mockUserProfiles = [
  { userUid: "user123", birthdate: "2015-06-01", address: "123 Peanuts St" },
];

describe("FormPage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders form elements", () => {
    render(<FormPage />);
    expect(screen.getByText(/A letter to Santa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Who are you/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/What do you want for Christmas/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  test("displays 'User not found' modal when user does not exist", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue([]);
    render(<FormPage />);
    fireEvent.change(screen.getByLabelText(/Who are you/i), {
      target: { value: "unknown.user" },
    });
    fireEvent.change(screen.getByLabelText(/What do you want for Christmas/i), {
      target: { value: "Gifts!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    await waitFor(() =>
      expect(screen.getByText(/User not found/i)).toBeInTheDocument()
    );
  });

  test("displays 'User profile not found' modal when profile does not exist", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (fetchUserProfiles as jest.Mock).mockResolvedValue([]);
    render(<FormPage />);
    fireEvent.change(screen.getByLabelText(/Who are you/i), {
      target: { value: "charlie.brown" },
    });
    fireEvent.change(screen.getByLabelText(/What do you want for Christmas/i), {
      target: { value: "Gifts!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    await waitFor(() =>
      expect(screen.getByText(/User profile not found/i)).toBeInTheDocument()
    );
  });

  test("displays 'User is older than 10 years' modal when user is too old", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (fetchUserProfiles as jest.Mock).mockResolvedValue(mockUserProfiles);
    (calculateAge as jest.Mock).mockReturnValue(11);
    render(<FormPage />);
    fireEvent.change(screen.getByLabelText(/Who are you/i), {
      target: { value: "charlie.brown" },
    });
    fireEvent.change(screen.getByLabelText(/What do you want for Christmas/i), {
      target: { value: "Gifts!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/User is older than 10 years/i)
      ).toBeInTheDocument()
    );
  });

  test("displays success modal when form is submitted successfully", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (fetchUserProfiles as jest.Mock).mockResolvedValue(mockUserProfiles);
    (calculateAge as jest.Mock).mockReturnValue(8);
    mockedAxios.post.mockResolvedValue({ status: 200 });
    render(<FormPage />);
    fireEvent.change(screen.getByLabelText(/Who are you/i), {
      target: { value: "charlie.brown" },
    });
    fireEvent.change(screen.getByLabelText(/What do you want for Christmas/i), {
      target: { value: "Gifts!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/Request received successfully/i)
      ).toBeInTheDocument()
    );
  });

  test("displays error modal when form submission fails", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (fetchUserProfiles as jest.Mock).mockResolvedValue(mockUserProfiles);
    (calculateAge as jest.Mock).mockReturnValue(8);
    mockedAxios.post.mockRejectedValue(new Error("Network error"));
    render(<FormPage />);
    fireEvent.change(screen.getByLabelText(/Who are you/i), {
      target: { value: "charlie.brown" },
    });
    fireEvent.change(screen.getByLabelText(/What do you want for Christmas/i), {
      target: { value: "Gifts!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/An error occurred while submitting the form/i)
      ).toBeInTheDocument()
    );
  });
});
