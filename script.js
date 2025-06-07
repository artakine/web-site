// Navbar Scroll Efekti
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');

// Scroll Eventi
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Aktif Link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Mobil Menü Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tema Değiştirme
let isDark = true;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.body.style.backgroundColor = 'var(--bg-dark)';
        document.body.style.color = 'var(--text-light)';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.style.backgroundColor = 'var(--bg-light)';
        document.body.style.color = 'var(--text-dark)';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // AOS Animasyon başlatma
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});

// Email gönderme fonksiyonu
function sendEmail(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Mesajınız başarıyla gönderildi!');
            event.target.reset();
        } else {
            alert('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
    });
}

// EmailJS başlatma
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("YOUR_PUBLIC_KEY");
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Butonu göster/gizle
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Tıklama olayı
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Sayaç animasyonu
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// İstatistik bölümü görünür olduğunda sayaçları başlat
const statsSection = document.querySelector('#istatistikler');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}