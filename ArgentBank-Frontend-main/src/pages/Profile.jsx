import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, logout } from "../userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = token || localStorage.getItem("token");

      if (!storedToken) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Erreur lors de la récupération");
        }

        dispatch(setProfile(data.body));
      } catch (err) {
        console.error("Erreur profil :", err);
        dispatch(logout());
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, dispatch, navigate]);

  if (!profile) return <p>Chargement...</p>;

  return (
    <div className="profile">
      <h1>
        Bienvenue, {profile.firstName} {profile.lastName} !
      </h1>
    </div>
  );
}
