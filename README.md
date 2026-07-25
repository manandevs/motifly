<div align="center">

  <img src="public/logo.svg" alt="Motifly Logo" width="120" height="120" />

  # ⚡ Motifly

  **Fast, private, browser-based image compression and optimization.**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

  [**Live Demo**](https://motifly.vercel.app) · [**Report Bug**](https://github.com/your-username/motifly/issues) · [**Request Feature**](https://github.com/your-username/motifly/issues)

</div>

<br />

## ✨ Features

|                                       |                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🔒 **100% Client-Side Privacy**       | Images are processed entirely in your browser using HTML5 Canvas & Web APIs — nothing ever touches a server. |
| ⚡ **Multi-Format Support**           | Compress and convert between **JPEG**, **PNG**, and **WebP**.                                                |
| 🔍 **Real-Time Side-by-Side Preview** | Compare original vs. compressed output instantly, with exact file size and dimension metrics.                |
| 🎛️ **Fine-Grained Control**           | Quality sliders plus quick-scale presets (100% / 75% / 50% / 25%).                                           |
| 💾 **Persistent Local Storage**       | Powered by **IndexedDB**, so your images survive page reloads.                                               |
| 📱 **Responsive & Accessible**        | Fluid drawer navigation and touch-friendly UI for mobile devices.                                            |

<br />

## 🛠️ Tech Stack

<table>
<tr>
  <td><strong>Framework</strong></td>
  <td><a href="https://nextjs.org/">Next.js</a> (App Router)</td>
</tr>
<tr>
  <td><strong>Language</strong></td>
  <td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
</tr>
<tr>
  <td><strong>Styling</strong></td>
  <td><a href="https://tailwindcss.com/">Tailwind CSS</a></td>
</tr>
<tr>
  <td><strong>UI Components</strong></td>
  <td><a href="https://www.radix-ui.com/">Radix UI</a> / <a href="https://ui.shadcn.com/">shadcn/ui</a></td>
</tr>
<tr>
  <td><strong>Storage</strong></td>
  <td>IndexedDB (native Web API)</td>
</tr>
<tr>
  <td><strong>Icons</strong></td>
  <td><a href="https://lucide.dev/">Lucide React</a></td>
</tr>
</table>

<br />

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm**, **pnpm**, or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/motifly.git
cd motifly

# 2. Install dependencies
pnpm install
# or: npm install / yarn install

# 3. Run the development server
pnpm dev
# or: npm run dev / yarn dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

<br />

## 📂 Project Structure

```
motifly/
├── public/                        # Static assets & logos
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── (site)/                # Public marketing & tool routes
│   │   │   └── tools/compressor/  # Main compressor tool page
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── compressor/            # Image compressor core components
│   │   ├── layouts/                # Navbar, Footer
│   │   ├── shared/                 # Reusable UI icons & stars
│   │   └── ui/                     # Base UI elements (buttons, drawers, etc.)
│   └── lib/
│       ├── image-db.ts            # IndexedDB persistence layer
│       └── utils.ts               # Classnames helper (cn)
├── tailwind.config.ts
└── package.json
```

<br />

## 🛡️ Privacy & Performance

Motifly is built **privacy-first**. Your photos often contain personal data — sending them to a remote server for processing creates unnecessary risk and latency that simply isn't needed.

- **Zero Bandwidth Drain** — no uploads, no downloads, no server round-trips.
- **Instant Processing** — compression runs on your device's own hardware for near-instant results.
- **Nothing Leaves Your Browser** — full stop.

<br />

## 🤝 Contributing

Contributions are always welcome!

1. Fork the project
2. Create your feature branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m 'feat: add some amazing feature'`
4. Push to the branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request

<br />

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

<br />

<div align="center">
  <sub>Built with ❤️ using Next.js & TypeScript</sub>
</div>
