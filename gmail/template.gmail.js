

// Email HTML Generators
export function otpHtml(otp) {
  // otp = 123456
  const otpHtmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
      <style>
          body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f9fc; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #4285f4; padding: 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .otp-code { background: #f8f9fa; border: 2px dashed #dee2e6; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4285f4; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6c757d; }
          .button { background: #4285f4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Email Verification</h1>
          </div>
          <div class="content">
              <h2>Hello,</h2>
              <p>Please use the following One-Time Password (OTP) to complete your verification process. This code will expire in 2 minutes.</p>
              
              <div class="otp-code">${otp}</div>
              
              <p>If you didn't request this code, please ignore this email or contact our support team immediately.</p>
              
              <p>Best regards,<br>Onlinewithbeta Team</p>
          </div>
          <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  return otpHtmlTemplate;
}
export function otpText(otp) {
  return `
Email Verification

Hello,

Please use the following One-Time Password (OTP) to complete your verification process. This code will expire in 2 minutes.

Your OTP: ${otp}

If you didn't request this code, please ignore this email or contact our support team immediately.

Best regards,
Onlinewithbeta Team

---
This is an automated message. Please do not reply to this email.
© ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.
  `.trim();
}


export function welcomeHtml(username, password) {
  const welcomeHtmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Platform!</title>
      <style>
          body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f9fc; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #34a853; padding: 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .credentials { background: #f8f9fa; border-left: 4px solid #34a853; padding: 15px; margin: 20px 0; }
          .credential-item { margin: 10px 0; }
          .label { font-weight: bold; color: #555; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6c757d; }
          .button { background: #34a853; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome Aboard!</h1>
          </div>
          <div class="content">
              <h2>Hello ${username},</h2>
              <p>Welcome to our platform! We're excited to have you join our community.</p>
              
              <div class="credentials">
                  <h3>Your Login Credentials:</h3>
                  <div class="credential-item">
                      <span class="label">Username:</span> ${username}
                  </div>
                  <div class="credential-item">
                      <span class="label">Password:</span> ${password}
                  </div>
              </div>
              
              <p><strong>Important:</strong> For security reasons, we recommend changing your password after your first login.</p>
              
              <a href="#" class="button">Get Started</a>
              
              <p>If you have any questions, feel free to reach out to our support team.</p>
              
              <p>Best regards,<br>Onlinewithbeta Team</p>
          </div>
          <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  return welcomeHtmlTemplate;
}
export function welcomeText(username, password) {
  return `
Welcome to Our Platform!

Hello ${username},

Welcome to our platform! We're excited to have you join our community.

Your Login Credentials:
Username: ${username}
Password: ${password}

Important: For security reasons, we recommend changing your password after your first login.

Get started by visiting our platform.

If you have any questions, feel free to reach out to our support team.

Best regards,
Onlinewithbeta Team

---
This is an automated message. Please do not reply to this email.
© ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.
  `.trim();
}


export function newPasswordHtml(username, password) {
  const newPasswordHtmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Confirmation</title>
      <style>
          body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f9fc; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #ea4335; padding: 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .credentials { background: #f8f9fa; border-left: 4px solid #ea4335; padding: 15px; margin: 20px 0; }
          .credential-item { margin: 10px 0; }
          .label { font-weight: bold; color: #555; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6c757d; }
          .button { background: #ea4335; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          .security-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Password Reset</h1>
          </div>
          <div class="content">
              <h2>Hello ${username},</h2>
              <p>Your password has been successfully reset as requested.</p>
              
              <div class="credentials">
                  <h3>Your New Credentials:</h3>
                  <div class="credential-item">
                      <span class="label">Username:</span> ${username}
                  </div>
                  <div class="credential-item">
                      <span class="label">New Password:</span> ${password}
                  </div>
              </div>
              
              <div class="security-note">
                  <strong>Security Notice:</strong> 
                  <ul>
                      <li>Keep your password secure and don't share it with anyone</li>
                      <li>Consider changing your password regularly</li>
                      <li>Use a strong, unique password</li>
                  </ul>
              </div>
              
              <a href="#" class="button">Login to Your Account</a>
              
              <p>If you didn't request this password reset, please contact our support team immediately.</p>
              
              <p>Best regards,<br>Onlinewithbeta Team</p>
          </div>
          <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  return newPasswordHtmlTemplate;
}
export function newPasswordText(username, password) {
  return `
Password Reset Confirmation

Hello ${username},

Your password has been successfully reset as requested.

Your New Credentials:
Username: ${username}
New Password: ${password}

SECURITY NOTICE:
• Keep your password secure and don't share it with anyone
• Consider changing your password regularly
• Use a strong, unique password

Login to your account to get started.

If you didn't request this password reset, please contact our support team immediately.

Best regards,
Onlinewithbeta Team

---
This is an automated message. Please do not reply to this email.
© ${new Date().getFullYear()} Onlinewithbeta. All rights reserved.
  `.trim();
}


