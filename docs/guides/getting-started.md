# 🚀 Getting Started

> Projeyi hızlıca ayağa kaldırmak için adım adım kılavuz.

---

## Prerequisites

Başlamadan önce aşağıdaki araçların kurulu olduğundan emin olun:

| Araç | Minimum Versiyon | İndirme |
|------|-----------------|---------|
| Node.js | 18.x | [nodejs.org](https://nodejs.org) |
| npm | 9.x | Node.js ile birlikte gelir |
| Git | 2.x | [git-scm.com](https://git-scm.com) |

---

## Installation

### 1. Repository'yi Klonla

```bash
git clone [REPO_URL]
cd S-M-D_HOME
```

### 2. Bağımlılıkları Yükle

```bash
npm install
```

### 3. Environment Ayarları

```bash
# .env.example dosyasını kopyala
cp .env.example .env

# .env dosyasını düzenle ve gerekli değerleri gir
```

### 4. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

---

## Project Structure Quick Guide

```
src/
├── core/          # Temel altyapı — önce burayı oku
├── features/      # İş modülleri — ana geliştirme alanın
├── shared/        # Paylaşılan araçlar — ihtiyaç oldukça bak
└── config/        # Yapılandırma — başlangıçta bir kez ayarla
```

---

## Common Tasks

### Yeni Feature Ekleme
```bash
# 1. Feature branch oluştur
git checkout -b feature/my-feature

# 2. Feature dizinini oluştur
mkdir -p src/features/my-feature

# 3. Geliştir, test et, commit et
# 4. PR oluştur
```

### Test Çalıştırma
```bash
npm run test           # Tüm testler
npm run test:unit      # Sadece unit testler
npm run test:watch     # Watch modunda
```

### Build Oluşturma
```bash
npm run build          # Production build
npm run preview        # Build preview
```

---

## Troubleshooting

| Problem | Çözüm |
|---------|-------|
| `node_modules` hataları | `rm -rf node_modules && npm install` |
| Port çakışması | `.env` dosyasında `PORT` değiştir |
| Build hatası | `npm run clean && npm run build` |

---

## Next Steps

1. 📖 [Architecture Overview](../architecture/overview.md) dokümanını oku
2. 📋 [Coding Standards](../../.instructions/coding-standards.md) belgesini incele
3. 🔀 [Git Conventions](../../.instructions/git-conventions.md) kurallarını öğren
4. 🧪 İlk testini yaz
5. ✨ İlk feature'ını ekle

---

*Sorun mu var? [Contributing Guide](./contributing.md) dosyasına göz at veya bir issue oluştur.*
