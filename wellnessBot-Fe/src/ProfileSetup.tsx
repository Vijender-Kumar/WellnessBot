// ProfileSetup.tsx
import React, { useState } from "react";

interface UserProfile {
  name: string;
  dob: string;
  mobile: string;
}

const ProfileSetup: React.FC = () => {
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    dob: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Details Saved\nName: ${formData.name}\nDOB: ${formData.dob}\nMobile: ${formData.mobile}`);
    // 👉 Later: Save to Firebase/DB
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Profile Setup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Date of Birth:</label><br />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Mobile Number:</label><br />
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>Save</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
