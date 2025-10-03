// This is the Vercel-compatible version of the function.
// It uses the standard `request`, `response` objects.

export default async function handler(request, response) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Vercel automatically parses the JSON body
        const { chatId, otp } = request.body;
        const botToken = process.env.8357889193:AAHsYYveSew5tqN9k_-N2nkGeEDPx-0m7Cw; // Get token securely

        if (!chatId || !otp || !botToken) {
            return response.status(400).json({ error: 'Missing required parameters.' });
        }
        
        const message = `Your Vision for a Better Life verification code is: ${otp}`;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        // Use fetch to send the message
        const telegramResponse = await fetch(telegramUrl);
        const data = await telegramResponse.json();

        if (!data.ok) {
            // If Telegram API returns an error
            throw new Error(data.description);
        }

        // Send a success response back to the front end
        return response.status(200).json({ message: 'OTP sent successfully!' });

    } catch (error) {
        console.error('Error sending OTP:', error);
        // Send a server error response back to the front end
        return response.status(500).json({ error: 'Failed to send OTP.' });
    }
}
