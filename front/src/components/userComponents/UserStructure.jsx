import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserStructure = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/sign-in");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser(data.body);
          setFirstName(data.body.firstName || "");
          setLastName(data.body.lastName || "");
        } else {
          setError(data.message || "Erreur lors de la récupération du profil");
        }
      } catch (err) {
        setError("Erreur serveur");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Fonction pour sauvegarder les modifications du nom
  const handleSaveName = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Utilisateur non authentifié");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          firstName,
          lastName,
        }));
        setIsEditing(false);
        setError("");
      } else {
        setError(data.message || "Erreur lors de la mise à jour");
      }
    } catch {
      setError("Erreur réseau");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isEditing ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </>
          ) : (
            <>
              {user.firstName} {user.lastName}!
            </>
          )}
        </h1>

        {isEditing ? (
          <>
            <button onClick={handleSaveName} className="edit-button">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="edit-button">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Name
          </button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default UserStructure;
