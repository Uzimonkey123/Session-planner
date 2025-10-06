import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

// Create transporter on first use
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    return transporter;
}

export const sendManagementEmail = async (
    recipientEmail: string,
    sessionTitle: string,
    managementCode: string,
    sessionId: string,
    accessCode?: string
) => {
    const transporter = getTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `Your Session Management Codes - ${sessionTitle}`,
        html: `
            <h2>Session Created Successfully!</h2>
            <p>Your session "${sessionTitle}" has been created.</p>
            
            <h3>Management Codes:</h3>
            <p><strong>Management Code:</strong> ${managementCode}</p>
            ${accessCode ? `<p><strong>Access Code (for private session):</strong> ${accessCode}</p>
                <br />
                <p>To access your private session: http://localhost:5173/sessions/${sessionId}?code=${accessCode}</p>` : ''}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Management email sent to ${recipientEmail}`);
        return true;

    } catch (error) {
        console.error('Error sending management email:', error);
        return false;
    }
};

export const sendAttendanceEmail = async (
    recipientEmail: string,
    sessionTitle: string,
    attendeeName: string,
    attendanceCode: string
) => {
    const transporter = getTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `Your Attendance Code - ${sessionTitle}`,
        html: `
            <h2>Registration Confirmed!</h2>
            <p>Hi ${attendeeName},</p>
            <p>You've successfully registered for "${sessionTitle}".</p>
            
            <h3>Your Attendance Code:</h3>
            <p><strong>${attendanceCode}</strong></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Attendance email sent to ${recipientEmail}`);
        return true;
        
    } catch (error) {
        console.error('Error sending attendance email:', error);
        return false;
    }
};
