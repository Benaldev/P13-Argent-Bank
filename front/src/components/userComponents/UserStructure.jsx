import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  setIsEditing,
} from "../../feature/userSlice";

const UserStructure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isEditing, error, loading } = useSelector(
    (state) => state.user
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/sign-in");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleSaveName = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
  };

  if (error) return <p className="error">{error}</p>;
  if (loading || !user) return <p>Chargement...</p>;

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
            <button
              onClick={() => dispatch(setIsEditing(false))}
              className="edit-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => dispatch(setIsEditing(true))}
            className="edit-button"
          >
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
