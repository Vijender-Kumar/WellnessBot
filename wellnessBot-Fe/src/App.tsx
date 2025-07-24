// import React from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./firebase";

// const SignUp: React.FC = () => {
//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     // provider.setPrompt('select_account'); // 👈 This forces the account chooser

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential?.accessToken;
//       const user = result.user;

//       console.log("✅ Google Sign-In successful");
//       console.log("User:", user);
//       alert(`Welcome, ${user.displayName}`);
//     } catch (error: any) {
//       console.error("❌ Google Sign-In failed", error);
//       alert("Google Sign-In Failed: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up with Google</h2>
//       <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

interface UserExtraDetails {
  name: string;
  dob: string;
  mobile: string;
}

const SignUp: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [extraDetails, setExtraDetails] = useState<UserExtraDetails | null>(null);
  const [formData, setFormData] = useState<UserExtraDetails>({
    name: "",
    dob: "",
    mobile: "",
  });

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account", // Ensures account chooser shows
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUserEmail(user.email);
      setUserName(user.displayName);
      setShowDetailsForm(true);
    } catch (error: any) {
      console.error("❌ Google Sign-In failed", error);
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExtraDetails(formData);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      {!userEmail && (
        <>
          <h2>Sign Up with Google</h2>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </>
      )}

      {showDetailsForm && !extraDetails && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "2rem" }}>
          <h3>Welcome {userName} 👋</h3>
          <p>Please fill in the following details:</p>

          <div style={{ marginBottom: "1rem" }}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Date of Birth: </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Mobile: </label>
            <input
              type="tel"
              name="mobile"
              pattern="[0-9]{10}"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {extraDetails && (
        <div style={{ marginTop: "2rem" }}>
          <h2>🎉 Welcome to the Application, {extraDetails.name}!</h2>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Date of Birth:</strong> {extraDetails.dob}</p>
          <p><strong>Mobile:</strong> {extraDetails.mobile}</p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
