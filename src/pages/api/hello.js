// Next.js API route support: https://nextjs.org/docs/api-routes/introductio

export default async function handler(req, res) {
  const api_key = process.env.GEMINI_API_KEY;
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + api_key
    , {method:"POST", headers: { 'Content-Type': 'application/json' }, body : JSON.stringify({ "contents": [{ "parts": [{ "text": req.body.message }] }] })});
  const resp = await response.json();
  res.status(200).json({ message:resp.candidates[0].content.parts[0].text });
}
