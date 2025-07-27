import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      navigate("/profile-setup"); // ✅ Redirect
    } catch (error: any) {
      console.error("❌ Google Sign-In failed", error);
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Get Started</h2>
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google logo"
          style={{ width: "20px", marginRight: "10px", verticalAlign: "middle" }}
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SignIn;
