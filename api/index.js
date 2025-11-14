/* ====== TEMP: Seed/Wipe endpoints (remove after seeding) ====== */

// GET /__count → কতগুলো সার্ভিস আছে
app.get("/__count", async (req, res) => {
  try {
    const total = await Service.countDocuments();
    res.json({ total });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST /__seed?key=YOUR_SEED_KEY → ডেমো সার্ভিস ইনসার্ট
app.post("/__seed", async (req, res) => {
  try {
    const key = (req.query.key || req.body?.key || "").toString();
    if (!process.env.SEED_KEY || key !== process.env.SEED_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const already = await Service.countDocuments();
    if (already > 0) {
      return res.status(400).json({ message: "DB already has data", total: already });
    }

    const samples = [
      {
        name: "AC Repair & Service",
        category: "Electrical",
        price: 1200,
        description: "Split/Window AC servicing, gas refill, and minor repairs by certified techs.",
        image: "https://images.unsplash.com/photo-1581093588401-16ecce3b9f6b?q=80&w=1200&auto=format&fit=crop",
        providerName: "CoolFix",
        providerEmail: "coolfix@demo.com",
        ratingAvg: 4.7
      },
      {
        name: "Deep Cleaning (2BHK)",
        category: "Cleaning",
        price: 3000,
        description: "Full home deep cleaning with eco-friendly supplies. Kitchen + Bathroom + Balcony.",
        image: "https://images.unsplash.com/photo-1603715749720-5f28b4c81f01?q=80&w=1200&auto=format&fit=crop",
        providerName: "CleanPros",
        providerEmail: "clean@demo.com",
        ratingAvg: 4.8
      },
      {
        name: "Plumbing Fix & Leak Repair",
        category: "Plumbing",
        price: 800,
        description: "Tap replacement, leakage fix, drain unclogging, kitchen/bath plumbing works.",
        image: "https://images.unsplash.com/photo-1581578017423-3b9b6a9a62da?q=80&w=1200&auto=format&fit=crop",
        providerName: "PipeMasters",
        providerEmail: "plumb@demo.com",
        ratingAvg: 4.5
      },
      {
        name: "Electrician On-Demand",
        category: "Electrical",
        price: 600,
        description: "Fan, light, socket, MCB, wiring and more. Quick diagnosis and fix.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
        providerName: "VoltCare",
        providerEmail: "electric@demo.com",
        ratingAvg: 4.6
      },
      {
        name: "Painting (1 Room)",
        category: "Painting",
        price: 2500,
        description: "Premium wall painting with surface prep and cleanup. Color consultation included.",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop",
        providerName: "ColorNest",
        providerEmail: "paint@demo.com",
        ratingAvg: 4.4
      },
      {
        name: "Pest Control (Cockroach/Ant)",
        category: "Pest Control",
        price: 1500,
        description: "Odorless, pet-safe pest control. 30-day service warranty.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
        providerName: "SafeGuard",
        providerEmail: "pest@demo.com",
        ratingAvg: 4.6
      },
      {
        name: "Carpentry (Door/Drawer Repair)",
        category: "Carpentry",
        price: 700,
        description: "Door alignment, hinge replacement, drawer rail fix, custom shelves.",
        image: "https://images.unsplash.com/photo-1504148455329-4f52f1dc5cd8?q=80&w=1200&auto=format&fit=crop",
        providerName: "WoodWorks",
        providerEmail: "carp@demo.com",
        ratingAvg: 4.3
      },
      {
        name: "Gardening & Lawn Care",
        category: "Gardening",
        price: 1200,
        description: "Indoor/outdoor plant care, lawn mowing, soil & fertilizer recommendations.",
        image: "https://images.unsplash.com/photo-1566132123104-4b1c7a02f49a?q=80&w=1200&auto=format&fit=crop",
        providerName: "GreenThumb",
        providerEmail: "garden@demo.com",
        ratingAvg: 4.5
      },
      {
        name: "Appliance Repair (Washing Machine)",
        category: "Appliance",
        price: 900,
        description: "Front/Top-load diagnosis & repair; spare parts billed separately.",
        image: "https://images.unsplash.com/photo-1542842860-c32570d19b5a?q=80&w=1200&auto=format&fit=crop",
        providerName: "FixItAll",
        providerEmail: "appliance@demo.com",
        ratingAvg: 4.2
      },
      {
        name: "Home Sanitization",
        category: "Cleaning",
        price: 2200,
        description: "Hospital-grade disinfectant fogging for full-home sanitization.",
        image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=1200&auto=format&fit=crop",
        providerName: "Sanito",
        providerEmail: "sanitize@demo.com",
        ratingAvg: 4.1
      }
    ];

    let created = 0;
    for (const s of samples) {
      const slug = await uniqueSlugForNew(s.name);
      await Service.create({ ...s, slug });
      created++;
    }

    const total = await Service.countDocuments();
    res.json({ seeded: created, total });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST /__wipe?key=YOUR_SEED_KEY → সব সার্ভিস ডিলিট
app.post("/__wipe", async (req, res) => {
  try {
    const key = (req.query.key || req.body?.key || "").toString();
    if (!process.env.SEED_KEY || key !== process.env.SEED_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const del = await Service.deleteMany({});
    res.json({ deleted: del?.deletedCount || 0 });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});