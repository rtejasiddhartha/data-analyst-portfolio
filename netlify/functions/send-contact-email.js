const nodemailer = require('nodemailer');
    const querystring = require('querystring');

    exports.handler = async function(event, context) {
      // Only allow POST requests
      if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }

      // Parse the URL-encoded form data
      const formData = querystring.parse(event.body);
      const { name, email, message } = formData;

      // Basic validation
      if (!name || !email || !message) {
        return { statusCode: 400, body: JSON.stringify({ message: 'Please fill in all required fields.' }) };
      }

      // --- START Gmail Specific Configuration ---
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Special service name for Gmail
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address from Netlify ENV
          pass: process.env.GMAIL_APP_PASSWORD, // Your generated App Password from Netlify ENV
        },
      });
      // --- END Gmail Specific Configuration ---

      // Email options for YOU (the portfolio owner)
      const mailOptionsToOwner = {
        from: process.env.SENDER_EMAIL, // Your verified sender email (your Gmail)
        to: process.env.RECEIVER_EMAIL, // Your personal email to receive messages (your Gmail)
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      // Optional: Email options for the sender (confirmation email)
      const mailOptionsToSender = {
        from: process.env.SENDER_EMAIL, // Your verified sender email (your Gmail)
        to: email, // Sender's email address (from the form)
        subject: `Thank you for contacting me`,
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to Teja Siddhartha Rajam. Your message has been received and I will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <hr>
          <p><em>${message}</em></p>
          <hr>
          <p>Best regards,</p>
          <p>Teja Siddhartha Rajam</p>
        `,
      };

      try {
        // Send email to owner
        await transporter.sendMail(mailOptionsToOwner);
        console.log('Email sent to owner successfully.');

        // Send confirmation email to sender (optional, controlled by ENV var)
        if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
          await transporter.sendMail(mailOptionsToSender);
          console.log('Confirmation email sent to sender successfully.');
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Message sent successfully!' }),
        };
      } catch (error) {
        console.error('Error sending email:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Failed to send message.', error: error.message }),
        };
      }
    };