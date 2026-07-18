# 🏢 CNPJ Finder Pro - Enterprise Application

**Enterprise-grade CNPJ lookup system with geolocation, real-time alerts, multi-platform support (Web, iOS, Android), and advanced security features.**

## ✨ Features

- 🔍 **CNPJ Lookup**: Real-time CNPJ search across multiple databases
- 📍 **Geolocation**: Search companies by location with radius filtering
- ⚡ **Real-time Alerts**: Get notified about new companies and updates
- 🏦 **Bank Account Opening**: Integration for financial account setup
- 📊 **Company Ratings**: Rating and score system with AI-enhanced data
- 🔐 **Enterprise Security**: MFA, RBAC, HTTPS/SSL, encryption
- 📱 **Multi-platform**: Web, iOS, Android with responsive design
- 🌐 **Offline-First**: Progressive Web App with offline capabilities
- 🔄 **Real-time Communication**: WebSocket support for live updates

## 🛠️ Technology Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- TanStack Query (Server state)
- Zustand (Client state)
- Mapbox GL & Google Maps

### Backend
- Node.js + Express.js
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Elasticsearch
- Redis

### Mobile
- React Native + Expo
- React Navigation
- Geolocation API

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- SonarQube (Code quality)
- Sentry (Error tracking)

## 📦 Installation

```bash
git clone https://github.com/MarcosArtes/Ambima-pro.git
cd Ambima-pro
npm install
cp .env.example .env
npm run docker:run
npm run dev
```

## 🚀 Running

```bash
# Development
npm run dev

# Production
npm run build
npm start

# Mobile
npm run mobile:android
npm run mobile:ios
```

## 🐳 Docker

```bash
npm run docker:build
npm run docker:run
```

Access:
- Web: http://localhost:3000
- API: http://localhost:3001
- Elasticsearch: http://localhost:9200

## 🔐 Security

- JWT Authentication
- MFA (Multi-Factor Authentication)
- RBAC (Role-Based Access Control)
- AES-256-GCM Encryption
- HTTPS/SSL Support
- Rate Limiting
- CORS Protection

## 📝 Testing

```bash
npm run test
npm run test:coverage
npm run test:e2e
```

## 📊 Monitoring

- Sentry: Error tracking
- Winston: Logging
- Analytics: User behavior

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - See LICENSE file

## 🆘 Support

For issues: https://github.com/MarcosArtes/Ambima-pro/issues

---

**Built with ❤️ by the CNPJ Finder Pro Team**
