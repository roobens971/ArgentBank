import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../userSlice";
import Account from "../components/Account";

export default function HomePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.user.token);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile?.userName || "");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  // 🔹 Synchronise le username si le profile est mis à jour (ex: après un fetch)
  useEffect(() => {
    if (profile?.userName) {
      setUsername(profile.userName);
    }
  }, [profile]);

  // 🔹 Donne le focus automatique à l’input quand on passe en édition
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!username.trim()) {
      setError("Le username ne peut pas être vide");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userName: username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur API");
      }

      // 🔹 On met à jour le store Redux avec les données renvoyées par l’API
      dispatch(setProfile(data.body));

      setIsEditing(false);
      setError("");
    } catch (err) {
      console.error("Erreur API update :", err);
      setError(err.message || "Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div className="bg-dark">
      <div className="header">
        {isEditing ? (
          <div className="edit-user-form">
            <h1>Edit user info</h1>
            <div className="container-form">
              <label>
                User name:
                <input
                  ref={inputRef}
                  className="inputSpace"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                />
              </label>
              <label>
                First name:
                <input
                  className="inputSpace"
                  type="text"
                  value={profile?.firstName}
                  disabled
                />
              </label>
              <label>
                Last name:
                <input
                  className="inputSpace"
                  type="text"
                  value={profile?.lastName}
                  disabled
                />
              </label>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setError("");
                    setUsername(profile?.userName || "");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>
              Welcome back
              <br />
              {profile?.firstName} {profile?.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </div>
  );
}
