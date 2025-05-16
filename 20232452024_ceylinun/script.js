// Hava durumu API'si ve konum bilgisi
function getWeather() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "68cd2be18304373a05285439ec1a8572"; // OpenWeatherMap API Key
  
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.cod === 200) {
              const weather = data.weather[0].description;
              const temp = Math.round(data.main.temp);
              const city = data.name;
              const icon = data.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
              document.getElementById("weather").innerHTML = `
              <div class="weather-info">
                <img src="${iconUrl}" alt="${weather}" class="weather-icon">
                <div class="weather-text">${city}: ${weather}, ${temp}°C</div>
              </div>
            `;
            } else {
              console.error("API Hatası:", data.message);
              document.getElementById("weather").textContent =
                "Hava durumu alınamadı. API hatası.";
            }
          })
          .catch((error) => {
            console.error("Fetch Hatası:", error);
            document.getElementById("weather").textContent =
              "Hava durumu alınamadı.";
          });
      },
      function (error) {
        console.error("Geolocation Hatası:", error);
        document.getElementById("weather").textContent = "Konum alınamadı.";
      }
    );
  }
  
  getWeather();
  
// Buton ve stil dosyasını seç
const toggleButton = document.getElementById("dark-mode-toggle");
const darkStyle = document.getElementById("dark-style");

// Karanlık mod açma ve kapama işlevi
toggleButton.addEventListener("click", function () {
    // Karanlık mod sınıfını ekle/çıkar
    document.body.classList.toggle("dark-mode");

    // Eğer karanlık mod aktifse, dark.css dosyasını yükle
    if (document.body.classList.contains("dark-mode")) {
        darkStyle.setAttribute('href', 'dark.css');
        toggleButton.innerText = 'Aydınlık Mod'; // Buton metnini değiştir
    } else {
        darkStyle.setAttribute('href', '');
        toggleButton.innerText = 'Karanlık Mod'; // Buton metnini değiştir
    }
});

// Sayfa yüklendiğinde her zaman aydınlık modda başlasın
window.onload = function() {
    document.body.classList.remove("dark-mode"); // Karanlık mod sınıfını temizle
    darkStyle.setAttribute('href', ''); // dark.css dosyasını kaldır
    toggleButton.innerText = 'Karanlık Mod'; // Başlangıçta "Karanlık Mod" butonu olsun
};




  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Formun varsayılan gönderme işlemini engelle
  
    // Form verilerini al
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    
    if (name === "" || email === "" || message === "") {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
  
    // Verileri LocalStorage'e kaydet
    const formData = {
      name: name,
      email: email,
      message: message,
    };
    
    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(formData);
    localStorage.setItem("submissions", JSON.stringify(submissions));
  
    // Başarı mesajı
    alert("Mesajınız başarıyla gönderildi.");
  
    // Formu sıfırlama
    document.getElementById("contactForm").reset();
  });
  


// LED Simülasyonu menüsüne tıklama işlevi
document.getElementById("led-simulation-btn").addEventListener("click", function() {
    // Sayfanın arka planını yanıp söndürme animasyonu başlat
    document.body.classList.add("led-background");
    document.querySelector("header").classList.add("led-background"); // Header'ı da ekledik
    
    setTimeout(function() {
      document.body.classList.remove("led-background");
      document.querySelector("header").classList.remove("led-background"); // Header'ı da animasyondan çıkarıyoruz
    }, 5000); // 5 saniye sonra arka plan animasyonu durur
  });
  


//yorum sistemi oluşturulur ve yorumları localstrogede saklayarak verilerin korunması sağlanır
// Sayfa yüklendiğinde yorumları localStorage'tan al ve ekrana yazdır
window.onload = function() {
    loadComments();
  };
  
  // Yorum gönderildiğinde
  document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun sayfa yenilemesini engelle
  
    // Kullanıcıdan veri al
    const name = document.getElementById('userName').value;
    const surname = document.getElementById('userSurname').value;
    const comment = document.getElementById('commentText').value;
  
    // Yorum objesini oluştur
    const newComment = {
      name: name,
      surname: surname,
      comment: comment,
      date: new Date().toLocaleString() // Yorumun yapıldığı tarih
    };
  
    // LocalStorage'tan yorumları al
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Yeni yorumu listeye ekle
    comments.push(newComment);
  
    // Yorumları localStorage'a kaydet
    localStorage.setItem('comments', JSON.stringify(comments));
  
    // Formu sıfırla
    document.getElementById('commentForm').reset();
  
    // Yorumları tekrar yükle
    loadComments();
  });
  
  // Yorumları ekrana yazdıran fonksiyon
  function loadComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Önceden eklenmiş yorumları temizle
  
    // LocalStorage'tan yorumları al
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Yorumları tarihe göre sıralıyoruz (en yeni yorum başta olacak)
    comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // Son 10 yorumu listele
    const lastComments = comments.slice(0, 10);  // Son 10 yorumu al
  
    // Yorumları ekle
    lastComments.forEach(function(comment) {
      const li = document.createElement('li');
      li.innerHTML = `
        <p><strong>${comment.name} ${comment.surname}</strong></p>
        <p>${comment.comment}</p>
        <p class="date">${comment.date}</p>
      `;
      commentsList.appendChild(li);
    });
  }


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
