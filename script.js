document.getElementById("bioForm").addEventListener("submit", async function(e){
e.preventDefault();

const data = {
name: document.getElementById("name").value,
address: document.getElementById("address").value,
dob: document.getElementById("dob").value,
phone: document.getElementById("phone").value,
email: document.getElementById("email").value,
occupation: document.getElementById("occupation").value,
income: document.getElementById("income").value,
packageType: document.getElementById("package").value,
gender: document.getElementById("gender").value,
housing: document.getElementById("housing").value
};

try {
const res = await fetch("/api/send", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
});

const result = await res.json();

if(result.success){
alert("✅ Submitted successfully!");
document.getElementById("bioForm").reset();
}else{
alert("❌ Submission failed");
}

} catch (err){
alert("⚠️ Network error");
}
});