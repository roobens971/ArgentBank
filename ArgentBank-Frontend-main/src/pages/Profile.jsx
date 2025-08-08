import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/sign-in");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Erreur lors de la récupération");
        }

        setUserData(data.body);
      } catch (err) {
        console.error("Erreur profil :", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!userData) return <p>Chargement...</p>;

  return (
    <div className="profile">
      <h1>
        Bienvenue, {userData.firstName} {userData.lastName} !
      </h1>
    </div>
  );
}