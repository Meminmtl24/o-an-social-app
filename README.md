# 🤪 O An! - Absürt & Komik Anı Paylaşım Sosyal Platformu

İnsanların başlarından geçen komik, garip, utanç verici ve absürt anılarını anonim veya kullanıcı adı ile paylaşabileceği, başkalarının bu anıları okuyup beğenebileceği (like/tepki) ve yorum yapabileceği açık ve modern bir sosyal platform.

![O An! Banner](https://img.shields.io/badge/Platform-Web-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)

---

## 🌟 Öne Çıkan Özellikler

- 🎭 **Esnek Paylaşım Seçenekleri:** Tek tıkla Anonim (Gizli Kullanıcı) veya belirlediğiniz kullanıcı adı ve eğlenceli emoji avatarları ile anı ekleme.
- 🎨 **Modern & Şık Tasarım (Dark Glassmorphic UI):** Canlı neon renkler, yumuşak geçişler, mobil uyumlu (responsive) esnek düzen ve karanlık/aydınlık tema seçeneği.
- ❤️ **Çoklu Tepki Mimarisi:** Sadece "Like" değil; Gülme 🤣, Absürt 🤯, Rezillik 🤦‍♂️ ve Kalp ❤️ tepkileri + Konfeti görsel efektleri.
- 💬 **İnteraktif Yorum Sistemi:** Her anının altında anonim veya isimli yorum yazabilme, tartışabilme.
- 🎲 **"Şansımı Dene" (Rastgele Anı Motoru):** Rastgele absürt anı getiren eğlenceli modal.
- 🔍 **Anlık Arama & Kategori Filtreleme:** Etiket bazlı (#metrobüs, #okul) ve kategori bazlı (`Absürt`, `Kahkaha`, `Utanç Verici`, `Garip`, `İş & Okul`) filtreleme.
- ⭐ **Favoriler & Veri Yedekleme:** Anıları kaydetme (Bookmark) ve tüm verileri JSON formatında bilgisayarınıza yedekleme/içe aktarma imkanı.
- 🚀 **Sıfır Sunucu Maliyeti (GitHub Pages Uyumlu):** `LocalStorage` kalıcılığı ve hazır GitHub Actions CI/CD otomatik canlıya alma iş akışı.

---

## 🛠️ Yerel Geliştirme (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak için:

```bash
# 1. Proje dizinine gidin
cd C:\Users\memin\.gemini\antigravity\scratch\o-an-social-app

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirici sunucusunu başlatın
npm run dev
```

Uygulamanız varsayılan olarak `http://localhost:5173` adresinde açılacaktır!

---

## 🚀 GitHub'a Yükleme ve GitHub Pages Üzerinde Canlıya Alma (Step-by-Step)

Uygulamanızı İnternet üzerinde herkesin erişebileceği ücretsiz canlı ortama almak için aşağıdaki adımları sırasıyla uygulayın:

### 1. Adım: GitHub Üzerinde Yeni Repository Oluşturun
1. [GitHub.com](https://github.com) adresine gidin ve **"New repository"** butonuna tıklayın.
2. Depo adına `o-an-social-app` verin.
3. Public (Açık) olarak işaretleyin ve **"Create repository"** butonuna basın.

### 2. Adım: Projeyi GitHub'a Gönderin (Push)
Terminalinizde (Command Prompt / PowerShell / Git Bash) şu komutları sırasıyla çalıştırın:

```bash
git init
git add .
git commit -m "feat: O An! sosyal platformu ilk sürümü"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/o-an-social-app.git
git push -u origin main
```

*(Lütfen `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin).*

### 3. Adım: GitHub Pages'i Aktifleştirin
Projenizde eklediğimiz `.github/workflows/deploy.yml` dosyası sayesinde depoya her `push` yaptığınızda projeniz otomatik derlenip canlıya alınır!

1. GitHub'daki projenizin **Settings** -> **Pages** sekmesine gidin.
2. **Source** kısmından `Deploy from a branch` seçin.
3. **Branch** kısmından `gh-pages` dalını seçip **Save** butonuna tıklayın.
4. Birkaç dakika sonra canlı adresiniz hazır olacaktır:
   `https://KULLANICI_ADINIZ.github.io/o-an-social-app/`

---

## 📂 Proje Dizin Yapısı

```text
o-an-social-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages Otomatik Dağıtım (CI/CD)
├── public/
├── src/
│   ├── components/             # UI Bileşenleri
│   │   ├── Header.jsx          # Üst Navigasyon & Arama
│   │   ├── FilterBar.jsx       # Kategoriler ve Sıralama
│   │   ├── StoryCard.jsx       # Anı Kartı, Tepkiler & Paylaşım
│   │   ├── CommentSection.jsx  # Yorum Modülü
│   │   ├── NewStoryModal.jsx   # Anı Ekleme & Canlı Önizleme
│   │   ├── RandomStoryModal.jsx# Rastgele Anı Getir (Şansımı Dene 🎲)
│   │   └── UserProfileModal.jsx# Profil, İstatistikler & Veri Yedekleme
│   ├── data/
│   │   └── initialData.js      # Başlangıç Türkçe Örnek Anılar & Kategoriler
│   ├── services/
│   │   └── storage.js          # LocalStorage CRUD & JSON Import/Export
│   ├── App.jsx                 # Ana Uygulama Mantığı
│   ├── index.css               # Premium CSS Tasarım Sistemi & Glassmorphism
│   └── main.jsx                # React Giriş Noktası
├── index.html                  # HTML5 & SEO Meta Etiketleri
├── package.json                # Proje Bağımlılıkları
└── vite.config.js              # Vite & Base Path Yapılandırması
```

---

## 💡 Gelecek Geliştirme (Bulut Veri Tabanı Entegrasyonu)

İleride anonim anıları cihazlar arası senkronize etmek isterseniz, `src/services/storage.js` dosyasındaki metotları doğrudan **Firebase Firestore** veya **Supabase REST API** istekleri ile değiştirebilirsiniz.

İyi eğlenceler ve bol kahkahalı anılar! 🥳
