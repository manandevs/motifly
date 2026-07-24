
├── public
│   ├── avatars
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── 4.jpg
│   ├── app-image-1.png
│   ├── background-blur-desktop.png
│   ├── background-blur-mobile.png
│   ├── footer-blur-desktop.png
│   ├── footer-blur-mobile.png
│   ├── logo.svg
│   └── radial-blur.png
├── src
│   ├── app
│   │   ├── (site)
│   │   │   ├── blog
│   │   │   │   ├── [slug]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── legal
│   │   │   │   ├── privacy-policy
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── terms-and-conditions
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── tools
│   │   │   │   ├── compressor
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (studio)
│   │   │   ├── studio
│   │   │   │   └── [[...tool]]
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── archive
│   │   ├── checkout
│   │   │   └── page.tsx
│   │   ├── checkout_redirect
│   │   │   ├── success
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   └── pricing
│   │       └── page.tsx
│   ├── components
│   │   ├── blog
│   │   │   ├── BlogArticle.tsx
│   │   │   ├── BlogBreadcrumb.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogListClient.tsx
│   │   │   ├── BlogPortableText.tsx
│   │   │   └── blog-data.ts
│   │   ├── compressor
│   │   │   ├── image-item.tsx
│   │   │   ├── preview.tsx
│   │   │   ├── settings.tsx
│   │   │   └── stats.tsx
│   │   ├── home
│   │   │   ├── hero.tsx
│   │   │   ├── showcase.tsx
│   │   │   └── testimonials.tsx
│   │   ├── layouts
│   │   │   ├── Navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── shared
│   │   │   ├── faqs.tsx
│   │   │   ├── icons.tsx
│   │   │   ├── star.tsx
│   │   │   └── wreath.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── avatar.tsx
│   │       ├── background-blur.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── choicebox.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── infinite-slider.tsx
│   │       ├── input.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pill.tsx
│   │       ├── radio-group.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       └── tabs.tsx
│   ├── lib
│   │   ├── image-db.ts
│   │   └── utils.ts
│   └── sanity
│       ├── lib
│       │   ├── client.ts
│       │   ├── image.ts
│       │   ├── live.ts
│       │   └── sanity-icons.ts
│       ├── schemaTypes
│       │   ├── blockContentType.ts
│       │   ├── blogAuthorType.ts
│       │   ├── blogCategoryType.ts
│       │   ├── blogPostType.ts
│       │   └── index.ts
│       ├── env.ts
│       └── structure.ts
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── sanity.cli.ts
├── sanity.config.ts
└── tsconfig.json