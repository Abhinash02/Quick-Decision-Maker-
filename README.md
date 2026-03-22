# Decision Polls App
A simple voting/polling app built with Next.js and MongoDB.  
Users can create polls, vote on options, and see live results including which option wins after expiry.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 🌐 Live Features

- Create polls with a question, 2–4 options, and an expiry time.
- Vote on active polls.
- View results after a poll expires.
- Filter polls by All / Active / Expired.
- Delete and edit your own polls (admin‑like UI).

## 🛠 Tech Stack

- Next.js 14+ (App Router, Client Components)
- React & Tailwind CSS
- MongoDB (Mongoose)
- `@/` path aliases (`src/components/`, `src/app/`, `src/lib/`, etc.)

## 🚀 How to Run Locally

### 1. Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- `git` installed

### 2. Clone the Repository


git clone https://github.com/ABHINASH-ABHI/your-repo-name.git
cd your-repo-name


git clone https://github.com/ABHINASH-ABHI/your-repo-name.git
cd your-repo-name

##3. Install Dependencies

npm install
# or
yarn install

##4. Set Up .env.local
Create a file .env.local at the root:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name
 or for local MongoDB:
 MONGODB_URI=mongodb://localhost:27017/decision-polls
 
##5. Start the Development Server
npm run dev
# or
yarn dev

Then open:
http://localhost:3000

###Output

1. Home Page

<img width="1717" height="886" alt="Screenshot 2026-03-22 161652" src="https://github.com/user-attachments/assets/b7131759-1204-4294-be37-5cb62a2e1929" />

2. Creating Poll Form 
   <img width="1631" height="895" alt="image" src="https://github.com/user-attachments/assets/69b50e0e-5cff-4141-9a33-9274e6536dd6" />

3. All Polls With Fillters
  <img width="1234" height="869" alt="image" src="https://github.com/user-attachments/assets/a68629c1-8229-4a66-94ed-52648819cd5d" />

4. Winner Announcement

  <img width="697" height="829" alt="image" src="https://github.com/user-attachments/assets/e945452b-881c-4883-8841-299db97725f3" />
