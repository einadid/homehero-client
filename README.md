# HomeHero – Local Household Service Finder

Live: https://healthmayo.netlify.app  
API: https://homehero-server.vercel.app

Key Features
- Browse all local services with search, price filter ($gte/$lte), and sort
- Auth (Email/Password + Google), private routes persist after reload
- Providers: Add/Update/Delete services, see provider stats
- Customers: Book services (with date), view/cancel bookings
- Ratings & Reviews (booked users only), Top 6 rated on Home
- Theme toggle (light/dark), fully responsive, custom 404
- Toast/SweetAlert2 notifications, loading states/skeletons

Tech
- Client: React, Vite, React Router, TailwindCSS + DaisyUI, Framer Motion, Firebase Auth, Axios, React Hot Toast
- Server: Express, Mongoose (MongoDB), Vercel serverless
- Deploy: Client (Netlify), Server (Vercel)