# S-M-D HOME — Project Launcher 🚀

Bu proje, React ve Vite kullanılarak geliştirilmiş, Windows masaüstü görünümüne sahip modern bir proje vitrin uygulamasıdır.

## 🌟 Özellikler

- **Windows Masaüstü Deneyimi:** Görev çubuğu, başlat menüsü, ikonlar ve pencereler.
- **Dinamik Proje Yönetimi:** Admin paneli ile proje ekleme, düzenleme ve silme.
- **Kalıcı Veri:** Tüm veriler `localStorage` üzerinde saklanır, veritabanı gerektirmez.
- **Güvenli Admin Girişi:** Proje yönetimi için şifreli giriş sistemi.
- **Responsive Tasarım:** Mobil ve masaüstü uyumlu.

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için:

1.  Proje dizinine gidin:
    ```bash
    cd app
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

4.  Tarayıcıda açın: `http://localhost:5173`

## 🔐 Admin Paneli

Admin paneline erişmek için:
1.  Görev çubuğundaki **Kilit (🔒)** ikonuna veya Başlat menüsündeki "Giriş Yap" butonuna tıklayın.
2.  **Şifre:** `smd2026`
3.  Giriş yaptıktan sonra masaüstüne sağ tıklayarak veya Başlat menüsünden "Admin Panel"i açabilirsiniz.

## 🛠️ Teknoloji Stack

- **Core:** React 19, Vite
- **Router:** React Router DOM
- **Stil:** CSS3 (CSS Variables, Flexbox, Grid, Animations)
- **Veri:** LocalStorage API, Context API

## 📂 Proje Yapısı

```
app/
├── src/
│   ├── components/      # UI bileşenleri (Taskbar, Window, vb.)
│   ├── context/         # Auth ve Project context yapıları
│   ├── App.jsx          # Ana uygulama mantığı
│   ├── index.css        # Global stiller ve Windows teması
│   └── main.jsx         # Entry point
└── index.html           # HTML şablonu
```
