export const generateForgotPaswordEmailTemplate = (resetPasswordUrl) => {

  return `
  <div style="font-family: Arial, sans-serif; padding:20px">

    <h2>Password Reset Request</h2>

    <p>You requested to reset your password.</p>

    <p>Click the button below to reset it:</p>

    <a href="${resetPasswordUrl}" 
       style="
       display:inline-block;
       padding:10px 20px;
       background-color:#4CAF50;
       color:white;
       text-decoration:none;
       border-radius:5px;
       margin-top:10px;
       ">
       Reset Password
    </a>

    <p>${resetPasswordUrl}</p>

    <p style="margin-top:20px">
      If you did not request this, please ignore this email.
    </p>

    <p>This link will expire in <b>15 minutes</b>.</p>

  </div>
  `;
};