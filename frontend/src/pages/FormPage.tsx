import React from "react";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../components/Modal";
import calculateAge from "../utils/calculateAge";
import { fetchUserProfiles, fetchUsers } from "../utils/fetchUserData";

interface FormData {
  userid: string;
  wish: string;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ userid: "", wish: "" });
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const users = await fetchUsers();
      const userProfiles = await fetchUserProfiles();
      const user = users.find((user) => user.username === formData.userid);
      if (!user) {
        setModalMessage("User not found");
        setModalType("error");
        setModalOpen(true);
        setFormData({ userid: "", wish: "" }); // Reset form data
        return;
      }
      const userProfile = userProfiles.find(
        (profile) => profile.userUid === user.uid
      );
      if (!userProfile) {
        setModalMessage("User profile not found");
        setModalType("error");
        setModalOpen(true);
        setFormData({ userid: "", wish: "" }); // Reset form data
        return;
      }
      const age = calculateAge(userProfile.birthdate);
      if (age > 10) {
        setModalMessage("User is older than 10 years");
        setModalType("error");
        setModalOpen(true);
        setFormData({ userid: "", wish: "" }); // Reset form data
        return;
      }

      const response = await axios.post("/api/submit-form", {
        userid: formData.userid,
        wish: formData.wish,
        address: userProfile.address,
      });

      if (response.status === 200) {
        setModalMessage("Request received successfully");
        setModalType("success");
        setModalOpen(true);
        setFormData({ userid: "", wish: "" }); // Reset form data
      }
    } catch (error) {
      setModalMessage("An error occurred while submitting the form");
      setModalType("error");
      setModalOpen(true);
      setFormData({ userid: "", wish: "" }); // Reset form data
    }
  };

  return (
    <div className="container">
      <header className="form-page__header">
        <h1>A letter to Santa</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userid" className="bold">
            Who are you?
          </label>
          <input
            id="userid"
            name="userid"
            type="text"
            value={formData.userid}
            onChange={handleChange}
            placeholder="charlie.brown"
            required
          />
        </div>
        <div>
          <label htmlFor="wish" className="bold">
            What do you want for Christmas?
          </label>
          <textarea
            id="wish"
            name="wish"
            rows={10}
            cols={45}
            maxLength={100}
            value={formData.wish}
            onChange={handleChange}
            placeholder="Gifts!"
            required
          ></textarea>
        </div>
        <div>
          <button type="submit" id="submit-letter">
            Send
          </button>
        </div>
      </form>
      <footer>
        Made with <a href="https://glitch.com">Glitch</a>!
      </footer>
      {modalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setModalOpen(false)}
          type={modalType}
        />
      )}
    </div>
  );
};

export default FormPage;
