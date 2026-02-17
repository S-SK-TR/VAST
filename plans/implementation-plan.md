# 🎯 Implementation Plan — S-M-D_HOME

## Hedef
Projelerin listelendiği, Windows masaüstü temalı bir proje vitrin/launcher sayfası oluşturmak.
Admin panel ile proje ekleme, ziyaretçilerin görüntülemesi ve yönlendirilmesi.

## 📊 Kapsam

### Kapsam İçi
- React + Vite ile modern SPA
- Windows masaüstü temalı UI (app icons, taskbar, start menu feel)
- Admin paneli (proje CRUD: görsel, açıklama, link)
- Ziyaretçi sayfası (proje grid, detay modal, link yönlendirme)
- LocalStorage tabanlı veri yönetimi (backend yok)
- Admin giriş ekranı (basit password protection)
- Responsive tasarım
- Bir adet test projesi eklenmesi

### Kapsam Dışı
- Backend API / veritabanı
- Kullanıcı kayıt sistemi
- Çoklu dil desteği (şimdilik)

## 📋 Görevler

### Faz 1: Proje Kurulumu
| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|-------------|
| 1 | Vite + React projesi oluşturma | Must | 15m |
| 2 | Klasör yapısı ve base CSS | Must | 30m |
| 3 | Router kurulumu | Must | 15m |

### Faz 2: Core UI
| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|-------------|
| 4 | Windows Desktop ana ekran (wallpaper, taskbar) | Must | 1h |
| 5 | App ikonu komponenti (hover, click animasyonları) | Must | 45m |
| 6 | Proje detay modalı (pencere açılma efekti) | Must | 1h |
| 7 | Taskbar / Start menu | Should | 45m |

### Faz 3: Admin Panel
| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|-------------|
| 8 | Admin giriş ekranı | Must | 30m |
| 9 | Proje ekleme formu (görsel URL, açıklama, link) | Must | 1h |
| 10 | Proje düzenleme / silme | Should | 45m |
| 11 | LocalStorage servisi | Must | 30m |

### Faz 4: Polish & Test
| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|-------------|
| 12 | Animasyonlar ve geçişler | Should | 45m |
| 13 | Test projesi ekleme | Must | 15m |
| 14 | Responsive tasarım | Should | 30m |

## ✅ Kabul Kriterleri
- [ ] Ana sayfa Windows masaüstü gibi görünüyor
- [ ] Proje ikonlarına tıklayınca detay penceresi açılıyor
- [ ] Admin panelden proje eklenebiliyor (görsel, açıklama, link)
- [ ] Ziyaretçiler projeleri görebiliyor ve linklere yönlendirilebiliyor
- [ ] En az 1 test projesi mevcut
- [ ] Mobile responsive çalışıyor
