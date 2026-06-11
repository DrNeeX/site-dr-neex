// api/request-access.js
// Vercel Serverless Function to handle production email registration.

export default async function handler(req, res) {
  // Ensure we only process POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Email invalide.' });
    }

    // In Vercel serverless environments, local storage (fs) is read-only and ephemeral.
    // We integrate Vercel KV (Redis) or another database for production persistence.
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const url = `${process.env.KV_REST_API_URL}/sadd/leads/${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Database write failed: ${errorText}`);
      }
    } else {
      // Log for debugging if database credentials are not configured yet
      console.warn(`[Vercel API Warning]: KV Database variables are not set. Lead not saved: ${email}`);
    }

    return res.status(200).json({ status: 'success', message: 'Email enregistré avec succès.' });
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ status: 'error', message: 'Erreur interne du serveur.' });
  }
}
