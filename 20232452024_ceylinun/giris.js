alert("Fiyat Almak İçin Giriş Yap");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerConfirmPasswordInput = document.getElementById("register-confirm-password");
const loginErrorMessage = document.getElementById("login-error-message");
const registerErrorMessage = document.getElementById("register-error-message");
const registerSuccessMessage = document.getElementById("register-success-message");
const showRegisterButton = document.getElementById("show-register");
const showLoginButton = document.getElementById("show-login");

// Kayıt ve giriş görünümünü değiştir
showRegisterButton.addEventListener("click", () => {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "block";
    registerErrorMessage.textContent = "";
    registerSuccessMessage.textContent = "";
});

showLoginButton.addEventListener("click", () => {
    document.getElementById("register-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    loginErrorMessage.textContent = "";
});

// Kayıt işlemi
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim();
    const confirmPassword = registerConfirmPasswordInput.value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email) {
        registerErrorMessage.textContent = "Bu e-posta ile zaten kayıt oldunuz!";
        return;
    }

    if (!email || !password || !confirmPassword) {
        registerErrorMessage.textContent = "Tüm alanlar doldurulmalıdır!";
        return;
    }

    if (password !== confirmPassword) {
        registerErrorMessage.textContent = "Şifreler eşleşmiyor!";
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        registerErrorMessage.textContent = "Geçersiz e-posta formatı!";
        return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "false"); // Oturum başlangıçta kapalı

    registerErrorMessage.textContent = "";
    registerSuccessMessage.textContent = "Kayıt Başarılı! Giriş yapabilirsiniz.";

    setTimeout(() => {
        document.getElementById("register-container").style.display = "none";
        document.getElementById("login-container").style.display = "block";
    }, 2000);
});

// Giriş işlemi
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!email || !password) {
        loginErrorMessage.textContent = "E-posta ve şifre boş olamaz!";
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        loginErrorMessage.textContent = "Geçersiz e-posta formatı!";
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        loginErrorMessage.textContent = "";
        localStorage.setItem("isLoggedIn", "true"); // Oturum açık
        window.location.href = "home.html";
    } else {
        loginErrorMessage.textContent = "E-posta veya şifre hatalı!";
    }
});


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