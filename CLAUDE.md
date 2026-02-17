# CLAUDE.md — Project Intelligence Hub

> **Bu dosya, AI asistanların projeyi anlaması ve etkili bir şekilde çalışması için merkezi referans noktasıdır.**

---

## 🏗️ Project Overview

- **Proje Adı**: S-M-D_HOME
- **Açıklama**: A new project built with Form4Ever template
- **Teknoloji Stack**: HTML, CSS, JavaScript
- **Versiyon**: 0.1.0
- **Başlangıç Tarihi**: 2026-02-18

---

## 📁 Directory Structure

```
├── .agent/                    # Agent workflows & skills
│   ├── workflows/             # Otomatik iş akışları
│   └── skills/                # Agent yetenekleri (planning, analysis, implementation, testing, docs, ccd)
├── .instructions/             # Proje geneli talimatlar ve standartlar
├── .collections/              # Prompt ve şablon koleksiyonları
├── docs/                      # Proje dokümantasyonu (architecture, api, guides, decisions, changelog)
├── plans/                     # Planlama dokümanları (implementation, backlog, milestones)
├── src/                       # Kaynak kod (core, features, shared, config)
├── tests/                     # Testler (unit, integration, e2e, fixtures)
└── scripts/                   # Yardımcı scriptler
```

---

## 🔑 Core Principles

### 1. Plan → Analyze → Implement → Test → Document → Deliver
Her özellik bu döngüyü takip eder. Asla doğrudan koda atlamayın.

### 2. Single Responsibility
Her dosya, modül ve fonksiyon tek bir sorumluluğa sahip olmalıdır.

### 3. Convention Over Configuration
İsimlendirme ve yapılandırma kurallarına `/.instructions/` altından ulaşabilirsiniz.

### 4. Documentation First
Kod yazılmadan önce plan ve API dokümanı hazırlanır.

---

## 📋 Development Workflow

### Yeni Özellik Ekleme
1. `plans/backlog.md` dosyasında özelliği tanımla
2. `plans/implementation-plan.md` şablonunu kullanarak plan oluştur
3. `docs/decisions/` altında gerekiyorsa ADR yaz
4. `src/features/` altında özelliği uygula
5. `tests/` altında testleri yaz
6. `docs/` altında dokümantasyonu güncelle
7. `docs/changelog/CHANGELOG.md` dosyasını güncelle

### Bug Fix
1. `.collections/prompts/bug-fix.md` şablonunu kullan
2. `tests/` altında hatayı reproduse eden test yaz
3. Düzeltmeyi uygula
4. Tüm testlerin geçtiğini doğrula

---

## 🤖 Available Skills

| Skill | Konum | Açıklama |
|-------|-------|----------|
| Planning | `.agent/skills/planning/SKILL.md` | Proje planlama ve yol haritası oluşturma |
| Analysis | `.agent/skills/analysis/SKILL.md` | Kod analizi, performans ve güvenlik denetimi |
| Implementation | `.agent/skills/implementation/SKILL.md` | Kod yazma standartları ve best practice |
| Testing | `.agent/skills/testing/SKILL.md` | Test stratejisi ve yazım kuralları |
| Documentation | `.agent/skills/documentation/SKILL.md` | Dokümantasyon standartları |
| CCD | `.agent/skills/ccd/SKILL.md` | Continuous Code Delivery pipeline |

---

## 🔄 Available Workflows

| Workflow | Komut | Açıklama |
|----------|-------|----------|
| Setup | `/setup` | Proje ilk kurulumu |
| Dev | `/dev` | Geliştirme sunucusu başlatma |
| Test | `/test` | Test suite çalıştırma |
| Deploy | `/deploy` | Deployment pipeline |
| Review | `/review` | Kod inceleme süreci |

---

## ⚙️ Configuration

### Environment
- **Node.js**: >= 18.x (eğer JS/TS projesi ise)
- **Package Manager**: npm / yarn / pnpm
- **OS**: Windows / macOS / Linux

### Döküman Referansları
- Kodlama Standartları: `.instructions/coding-standards.md`
- İsimlendirme Kuralları: `.instructions/naming-conventions.md`
- Git Kuralları: `.instructions/git-conventions.md`
- Mimari Prensipler: `.instructions/architecture-principles.md`

---

## 🚨 Important Rules

1. **Asla üretim veritabanına doğrudan bağlanma** — her zaman mock/staging kullan
2. **Sensitive data'yı commit etme** — `.env` dosyaları `.gitignore`'da
3. **Her PR en az bir test içermeli**
4. **Breaking change'ler ADR ile belgelenmeli**
5. **Tüm public API'ler JSDoc/TDoc ile belgelenmeli**

---

## 📝 Notes

- Bu dosya proje büyüdükçe güncellenmelidir
- Yeni skill veya workflow eklendiğinde bu dosyaya referans ekleyin
- Proje bazlı özel kurallar bu dosyanın sonuna eklenebilir

---

*Son Güncelleme: 2026-02-18*
