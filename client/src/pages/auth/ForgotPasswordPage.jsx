import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice";
import { KeyRound, Loader } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isRequestingForToken = useSelector(
    (state) => state.auth.isRequestingForToken,
  );

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

  if (isSubmitted) {
    return (
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
    );
  }

  return (
    <div>
      <div className="flex bg-slate-50 px-4 justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full inline-flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Forgot Password?
            </h1>
            <p>Enter your email address to reset your password</p>
          </div>

          {/* Login form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border-red-200 rounded-lg">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`input ${error ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address"
                  disabled={isRequestingForToken}
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isRequestingForToken}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequestingForToken ? (
                  <div className="flex justify-center items-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending...
                  </div>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Remember your password?"{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
