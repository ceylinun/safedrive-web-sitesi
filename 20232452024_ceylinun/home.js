const logoutButton = document.getElementById("logout-button");

// Giriş yapılmamışsa geri yönlendir
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
    window.location.href = "index.html";
}

const checkLoginStatus = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
        logoutButton.style.display = "block";
    } else {
        logoutButton.style.display = "none";
    }
};

logoutButton.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false"); // Sadece oturumu kapat
    window.location.href = "index.html";
});

checkLoginStatus();

// Saat kutusunu oluştur
const clock = document.createElement("div");
clock.id = "saatKutusu"; // İstediğin ID
document.body.appendChild(clock);

// Saati güncelleyen fonksiyon
function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    clock.textContent = `Saat: ${hours}:${minutes}`;
}

updateClock(); // İlk çağırma
setInterval(updateClock, 1000); // Her saniye güncelle