import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { resetPassword } from "../../store/slices/authSlice";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ token from URL

  const { isUpdatingPassword } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(
        resetPassword({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();

      navigate("/login");
    } catch (error) {
      setErrors({
        general: error || "Failed to reset password. Please try again",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Reset Password
          </h1>

          <p className="text-slate-600">
            Enter your new password below
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-6 rounded-xl shadow">

          <form onSubmit={handleSubmit} className="space-y-6">

            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.password ? "border-red-500" : "border-slate-300"
                }`}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.confirmPassword ? "border-red-500" : "border-slate-300"
                }`}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {isUpdatingPassword ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2 h-5 w-5" />
                  Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;