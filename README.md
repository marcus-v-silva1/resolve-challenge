This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
ecommerce-store
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ 4145cddf3f9db91b57b9cb596683c8eb420862
│  │  ├─ 42
│  │  │  └─ fc323e4b835cde834aba978ce44ce65bf8fb71
│  │  ├─ 51
│  │  │  └─ 74b28c565c285e3e312ec5178be64fbeca8398
│  │  ├─ 56
│  │  │  └─ 7f17b0d7c7fb662c16d4357dd74830caf2dccb
│  │  ├─ 5d
│  │  │  └─ 6d9774d82590a3d00df4a224e7d2bf8b199637
│  │  ├─ 5e
│  │  │  └─ f6a520780202a1d6addd833d800ccb1ecac0bb
│  │  ├─ 71
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 77
│  │  │  └─ 053960334e2e34dc584dea8019925c3b4ccca9
│  │  ├─ 83
│  │  │  └─ eb860bbea08fc6792af2f7f63561046c90d9bb
│  │  ├─ 84
│  │  │  └─ af2cb0e607ae0c0820d45757eb35fbfc048e2b
│  │  ├─ b2
│  │  │  └─ b2a44f6ebc70c450043c05a002e7a93ba5d651
│  │  ├─ c1
│  │  │  └─ 334095f876a408c10f2357faaced969ec090ab
│  │  ├─ c8
│  │  │  ├─ 5fb67c463f20d1ee449b0ffee725a61dfb9259
│  │  │  └─ 8f389de09f418da376598c42e8788d4fb6d172
│  │  ├─ e2
│  │  │  └─ 15bc4ccf138bbc38ad58ad57e92135484b3c0f
│  │  ├─ e3
│  │  │  └─ 734be15e1f6fbb4b207761c8e424b77cf3a4eb
│  │  ├─ e9
│  │  │  └─ ffa3083ad279ecf95fd8eae59cb253e9a539c4
│  │  ├─ eb
│  │  │  └─ 0c1595f846050e52424eb3b013a224bb6ebc01
│  │  ├─ ee
│  │  │  └─ 9b8e6339404c1a331833c3db7cc55b4045aab2
│  │  ├─ f1
│  │  │  └─ 5d88154bc4c69b2323efeb8ed179caeb903dcf
│  │  ├─ f3
│  │  │  └─ 48f808730136e0cd8395dda73043d6d025304f
│  │  ├─ fd
│  │  │  └─ be58951aa87ca2f756ab444b244e16424821b8
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ cart
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.module.css
│  │  ├─ page.tsx
│  │  └─ product
│  │     └─ [id]
│  │        └─ page.tsx
│  ├─ lib
│  │  └─ apollo-client.ts
│  ├─ providers
│  │  └─ ApolloProvider.tsx
│  └─ utils
│     └─ FetchProducts.tsx
├─ tsconfig.json
└─ yarn.lock

```