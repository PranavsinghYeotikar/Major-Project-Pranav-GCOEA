import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");

    try {
      await dispatch(forgotPassword(email)).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      setError(error || "Failed to send reset link. Please try again");
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <p>Reset link sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Send Reset Link</button>

          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;