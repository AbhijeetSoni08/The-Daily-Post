import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import config from "../config/config.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import authService from "../appwrite/auth.js";

const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const account = new Account(client);


export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (!userId || !secret) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    account
      .updateVerification({ userId, secret })
      .then(() => {
        toast.success("Email verified successfully! You can now log in.");
        setMessage("🎉 Email verified successfully!");
        setLoading(false);
          authService.getCurrentUser().then((userData) => {
            if (userData && userData.emailVerification) {
              dispatch(login({ userData }) );
            }
          })
        
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(() => {
        toast.error("Verification failed or link expired.");
        setMessage("❌ Verification failed or link expired.");
        setLoading(false);
      });
  }, [location.search, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px 28px",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        {loading && (
          <div
            style={{
              width: 36,
              height: 36,
              margin: "0 auto 12px",
              border: "3px solid #ddd",
              borderTopColor: "#4f46e5",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        )}

        <h2 style={{ marginBottom: 6, fontSize: "1.25rem" }}>Email Verification</h2>
        <p style={{ color: "#555" }}>{message}</p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
