import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard, { Product } from "../components/ProductCard";
import { MessageCircle, X, Minus, Plus, ChevronRight } from "lucide-react";

// ─── Product Data Engine ───────────────────────────────────────────────────
const BRANDS = ["GlowLab","LuxeBeauty","PureGlow","NaturElle","SkinGlow","RadiantRose","VelvetSkin","BellaBotanica","CelesteSkin","OpalBeauty","AuraSkin","MossRose","BloomCosmetics","PetalSoft","ZenGlow","ElixirBeauty","SilkDew","CloudSkin","FernGlow","IvoryLux","CoralBeauty","AmberGlow","QuartzSkin","JadeBeauty","CrystalClear","SunriseSkin","MidnightLux","DawnBeauty","PrismGlow","VioletSkin"];
const CATS = [
  { name:"Skincare", subs:["Moisturisers","Serums","Cleansers","Eye Care","SPF","Face Masks","Toners","Exfoliators","Retinol","Vitamin C"] },
  { name:"Makeup", subs:["Foundation","Lip Gloss","Eye Makeup","Blush","Makeup Tools","Setting Spray","Concealer","Highlighter","Bronzer","Brow"] },
  { name:"Haircare", subs:["Shampoo","Hair Treatments","Hair Styling","Hair Tools","Conditioner","Scalp Care","Hair Oils","Hair Masks","Heat Protection","Dry Shampoo"] },
  { name:"Body Lotion", subs:["Body Lotion","Bath","Scrubs","Body Oil","Cellulite","Firming","Self Tan","Body Butter","Stretch Marks","Dry Skin"] },
  { name:"Perfume", subs:["Perfume","Body Mist","Deodorant","Fragrance Oil","Roll-On","Solid Perfume","Hair Fragrance","Gift Sets","Travel Size","Diffuser"] },
  { name:"Tools", subs:["Gua Sha","LED Device","Electric Cleanser","Nail Art","Facial Roller","Dermaplaning","Ice Roller","Sonic Cleanser","Beauty Fridge","Microneedler"] },
];
const IMGS = ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=70","https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=70","https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=70","https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=70","https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=70","https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=70","https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=70","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=70","https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=70","https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=70","https://images.unsplash.com/photo-1585232351006-c3a9cfd3c23a?w=400&q=70","https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=400&q=70","https://images.unsplash.com/photo-1567721913486-6585f069b131?w=400&q=70","https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&q=70","https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&q=70","https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&q=70","https://images.unsplash.com/photo-1527799820374-87591a16f715?w=400&q=70","https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=70","https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=70","https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&q=70"];
const WORDS = ["Radiant","Glow","Silky","Luxe","Pure","Velvet","Bloom","Crystal","Pearl","Golden","Rose","Jade","Midnight","Dawn","Prism","Ivory","Coral","Amber","Fern","Cloud","Hydrating","Brightening","Anti-Aging","Nourishing","Repairing","Soothing","Firming","Plumping","Revitalising","Clarifying"];
const TYPES = ["Serum","Cream","Oil","Mask","Cleanser","Toner","Mist","Balm","Gel","Lotion","Essence","Elixir","Treatment","Moisturiser","Foundation","Blush","Highlighter","Lip Gloss","Setting Spray","Eye Cream","Shampoo","Conditioner","Hair Mask","Body Butter","Exfoliator","Scrub","Roller","Device","Perfume","Nail Polish"];
const SOURCES = ["USA","EU","Asia","Africa"];

function sr(seed: number) { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); }

function generateProducts(): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < 40000; i++) {
    const cat = CATS[Math.floor(sr(i * 7) * CATS.length)];
    const sub = cat.subs[Math.floor(sr(i * 11) * cat.subs.length)];
    const brand = BRANDS[Math.floor(sr(i * 13) * BRANDS.length)];
    const price = Math.round((sr(i * 23) * 60 + 3) * 100) / 100;
    const discRate = sr(i * 29) < 0.4 ? Math.round((sr(i * 31) * 0.5 + 0.1) * 100) / 100 : 0;
    products.push({
      id: i, brand,
      name: WORDS[Math.floor(sr(i * 17) * WORDS.length)] + " " + TYPES[Math.floor(sr(i * 19) * TYPES.length)],
      sub, category: cat.name, price,
      was: discRate > 0 ? Math.round(price / (1 - discRate) * 100) / 100 : null,
      rating: parseFloat((sr(i * 37) * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(sr(i * 41) * 4800 + 12),
      img: IMGS[Math.floor(sr(i * 59) * IMGS.length)],
      isNew: sr(i * 43) < 0.12, isHot: sr(i * 47) < 0.08, isBest: sr(i * 53) < 0.15,
      isSale: discRate > 0, disc: Math.round(discRate * 100),
      source: SOURCES[Math.floor(sr(i * 61) * SOURCES.length)],
    });
  }
  return products;
}

const ALL_PRODUCTS = generateProducts();
const PAGE_SIZE = 40;

interface CartItem extends Product { qty: number; }

// ─── Component ────────────────────────────────────────────────────────────
export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [orderRef] = useState("LN" + Math.floor(100000 + Math.random() * 900000));
  const [formData, setFormData] = useState({ first: "", last: "", email: "", phone: "", addr: "", city: "", country: "Uganda", notes: "", ccName: "", ccNum: "", ccExp: "", ccCvv: "" });
  const [toastMsg, setToastMsg] = useState("");

  // Cart helpers
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const shipping = cartTotal >= 49 ? 0 : 5.99;
  const orderTotal = cartTotal + shipping;

  const addToCart = useCallback((p: Product) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    showToast("✦ Added: " + p.name);
  }, []);

  const removeFromCart = (id: number) => setCart(prev => prev.filter(x => x.id !== id));
  const changeQty = (id: number, d: number) => setCart(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(0, x.qty + d) } : x).filter(x => x.qty > 0));

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  // Filter + sort products
  const getFiltered = useCallback(() => {
    let f = ALL_PRODUCTS;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    } else if (filter === "bestsellers") f = f.filter(p => p.isBest);
    else if (filter === "new") f = f.filter(p => p.isNew);
    else if (filter === "sale") f = f.filter(p => p.isSale);
    else if (filter === "Skincare") f = f.filter(p => p.category === "Skincare");
    else if (filter === "Makeup") f = f.filter(p => p.category === "Makeup");
    else if (filter === "Haircare") f = f.filter(p => p.category === "Haircare");
    else if (filter === "Body") f = f.filter(p => p.category === "Body Lotion");
    else if (filter === "Tools") f = f.filter(p => p.category === "Tools");
    else if (filter === "Fragrance") f = f.filter(p => p.category === "Perfume");
    if (sort === "price-asc") f = [...f].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") f = [...f].sort((a, b) => b.price - a.price);
    else if (sort === "rating") f = [...f].sort((a, b) => b.rating - a.rating);
    return f;
  }, [filter, sort, searchQuery]);

  const filtered = getFiltered();
  const displayed = filtered.slice(0, page * PAGE_SIZE);

  // WhatsApp message
  const sendWhatsApp = () => {
    const items = cart.map((i, n) => `${n + 1}. ${i.name} (${i.brand}) ×${i.qty} = $${(i.price * i.qty).toFixed(2)}`).join("\n");
    const msg = `Hello Luxe Noir Beauty! I would like to confirm my order.\n\n*Order Ref:* ${orderRef}\n*Customer:* ${formData.first} ${formData.last}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Address:* ${formData.addr}, ${formData.city}, ${formData.country}\n${formData.notes ? `*Notes:* ${formData.notes}\n` : ""}\n*Items:*\n${items}\n\n*Subtotal:* $${cartTotal.toFixed(2)}\n*Shipping:* ${shipping === 0 ? "FREE" : "$" + shipping.toFixed(2)}\n*TOTAL:* $${orderTotal.toFixed(2)}\n\nPlease confirm my order and send payment details. Thank you!`;
    window.open("https://wa.me/254786781665?text=" + encodeURIComponent(msg), "_blank");
    setTimeout(() => { setCart([]); setCartOpen(false); setCheckoutStep(0); showToast("🎉 Order sent via WhatsApp!"); }, 800);
  };

  const FILTERS = [["all","All"],["bestsellers","Best Sellers"],["new","New Arrivals"],["sale","On Sale"],["Skincare","Skincare"],["Makeup","Makeup"],["Haircare","Haircare"],["Body","Body & Bath"],["Tools","Tools"],["Fragrance","Fragrance"]];
  const CATS_DISPLAY = [
    { name:"Skincare", count:"12,400+", img:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80", badge:"🔥 Top Seller" },
    { name:"Makeup", count:"9,800+", img:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80", badge:"" },
    { name:"Haircare", count:"7,200+", img:"https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&q=80", badge:"✨ New" },
    { name:"Body & Fragrance", count:"10,600+", img:"https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500&q=80", badge:"" },
  ];
  const TESTIMONIALS = [
    { stars:5, text:"Ordered a full skincare set — arrived in 10 days to Kampala. The gua sha tool is gorgeous and works beautifully!", name:"Amara Nakigozi", loc:"Kampala, Uganda 🇺🇬", img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=70" },
    { stars:5, text:"Best affordable beauty shop online. My Korean skincare routine has never been cheaper. Fast shipping to London — 6 days!", name:"Sophie Chamberlain", loc:"London, UK 🇬🇧", img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=70" },
    { stars:5, text:"WhatsApp confirmation made everything feel trustworthy. Ordered 12 products — all arrived perfectly packaged!", name:"Yuna Park", loc:"Seoul, South Korea 🇰🇷", img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=70" },
    { stars:5, text:"I run a salon in Lagos and order wholesale here regularly. Unbeatable prices, quality always exceeds expectations!", name:"Chidinma Okafor", loc:"Lagos, Nigeria 🇳🇬", img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=70" },
    { stars:5, text:"The vitamin C serum is a game changer! WhatsApp updates kept me informed throughout. Recommending to all friends.", name:"María José Rodríguez", loc:"Madrid, Spain 🇪🇸", img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=70" },
    { stars:5, text:"Fastest beauty store I've used. New York to my door in 5 days! Packaging is gorgeous — like opening a luxury gift.", name:"Destiny Williams", loc:"New York, USA 🇺🇸", img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=70" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5" }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onSearch={(q) => { setSearchQuery(q); setPage(1); }} />

      {/* ── HERO ── */}
      <section style={{ minHeight: "90vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.28 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(10,10,10,0.94) 40%, rgba(201,85,107,0.15) 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
          <div style={{ display: "inline-block", background: "rgba(201,85,107,0.15)", border: "1px solid rgba(201,85,107,0.4)", color: "#f5d0da", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", padding: "6px 20px", borderRadius: 50, marginBottom: 28 }}>
            ✦ Global Beauty · Affordable Prices
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 400, lineHeight: 1.05, marginBottom: 20, color: "#fff" }}>
            Beauty Without<br /><em style={{ color: "#c9556b", fontStyle: "italic" }}>Boundaries</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 500, margin: "0 auto 32px", fontWeight: 300 }}>
            40,000+ premium women's beauty products sourced from top global suppliers. Delivered worldwide at prices you'll love.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#shop" style={{ background: "#c9556b", color: "#fff", border: "none", borderRadius: 50, padding: "14px 36px", fontSize: 13, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Shop Now ✦
            </a>
            <a href="https://wa.me/254786781665" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 50, padding: "14px 36px", fontSize: 13, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MessageCircle size={15} /> Order via WhatsApp
            </a>
          </div>
          <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
            {[["40K+","Products"],["180+","Countries"],["250K+","Customers"],["4.9★","Rating"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.9rem", color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "14px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          {[["📦","Free shipping $49+"],["🔄","30-day returns"],["✅","100% authentic"],["💳","Secure card & virtual card"],["💬","WhatsApp confirmation"]].map(([icon, text]) => (
            <div key={text as string} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#666", fontWeight: 500 }}>
              <span>{icon}</span> {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "80px 32px", background: "#0d0d0d" }} id="categories">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#c9556b", fontWeight: 600, marginBottom: 8 }}>Shop By Category</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400 }}>Find Your Beauty Ritual</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
            {CATS_DISPLAY.map(cat => (
              <div key={cat.name} onClick={() => { setFilter(cat.name === "Body & Fragrance" ? "Body" : cat.name); setPage(1); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "3/4", cursor: "pointer", border: "1px solid #1e1e1e", transition: "transform 0.3s" }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}>
                <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,10,10,0.88) 0%,transparent 55%)", display: "flex", alignItems: "flex-end", padding: 20 }}>
                  <div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#fff" }}>{cat.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{cat.count} products</div>
                  </div>
                </div>
                {cat.badge && <div style={{ position: "absolute", top: 12, right: 12, background: "#c9556b", color: "#fff", fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{cat.badge}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOP ── */}
      <section id="shop" style={{ padding: "60px 32px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#c9556b", fontWeight: 600, marginBottom: 8 }}>Our Products</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 400 }}>40,000+ Beauty Products</h2>
            {searchQuery && <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>Results for: <strong style={{ color: "#c9556b" }}>"{searchQuery}"</strong> <button onClick={() => { setSearchQuery(""); setPage(1); }} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", marginLeft: 8, fontSize: 12, textDecoration: "underline" }}>Clear</button></p>}
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {FILTERS.map(([val, lbl]) => (
                <button key={val} onClick={() => { setFilter(val); setPage(1); }}
                  style={{ border: filter === val ? "none" : "1.5px solid #222", background: filter === val ? "#c9556b" : "#111", color: filter === val ? "#fff" : "#666", borderRadius: 50, padding: "6px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                  {lbl}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
              style={{ border: "1.5px solid #222", borderRadius: 8, padding: "7px 12px", fontSize: 12, background: "#111", color: "#aaa", fontFamily: "inherit", cursor: "pointer" }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
            {displayed.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} onWishlist={() => showToast("♡ Saved to wishlist")} />
            ))}
          </div>
          <p style={{ textAlign: "center", color: "#444", fontSize: 12, marginTop: 20 }}>
            Showing {displayed.length.toLocaleString()} of {filtered.length.toLocaleString()} products
          </p>
          {displayed.length < filtered.length && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={() => setPage(p => p + 1)}
                style={{ background: "#111", color: "#aaa", border: "2px solid #222", borderRadius: 50, padding: "12px 36px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.25s", fontFamily: "inherit" }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#c9556b"; (e.currentTarget as HTMLElement).style.color = "#c9556b"; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "#222"; (e.currentTarget as HTMLElement).style.color = "#aaa"; }}>
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 32px", background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#c9556b", fontWeight: 600, marginBottom: 8 }}>Customer Love</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 400 }}>What Our Customers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "24px", position: "relative" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "3rem", color: "rgba(201,85,107,0.2)", position: "absolute", top: 8, right: 16, lineHeight: 1 }}>❝</div>
                <div style={{ color: "#c9a84c", fontSize: 14, marginBottom: 12 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16, fontWeight: 300 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={t.img} alt={t.name} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,85,107,0.3)" }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{t.loc}</div>
                    <div style={{ fontSize: 10, color: "#2d9b6f", fontWeight: 600 }}>✓ Verified Purchase</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section style={{ background: "linear-gradient(135deg,#0d0005 0%,#0a0a0a 100%)", padding: "80px 32px", textAlign: "center", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#c9556b", marginBottom: 16 }}>Order Confirmation</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, marginBottom: 16 }}>Instant WhatsApp Confirmation</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
            Every order is personally confirmed via WhatsApp at <strong style={{ color: "#25D366" }}>+254 786 781 665</strong>. Fast, personal, and secure.
          </p>
          <a href="https://wa.me/254786781665?text=Hello%20Luxe%20Noir%20Beauty!%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", borderRadius: 12, padding: "16px 40px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            <MessageCircle size={20} /> Chat with Us on WhatsApp
          </a>
          <p style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Average response time: under 30 minutes</p>
        </div>
      </section>

      <Footer />

      {/* ── CART DRAWER ── */}
      {cartOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 400 }} onClick={() => setCartOpen(false)} />}
      <div style={{ position: "fixed", top: 0, right: cartOpen ? 0 : -490, width: "100%", maxWidth: 460, height: "100vh", background: "#0d0d0d", zIndex: 401, transition: "right 0.35s cubic-bezier(.4,0,.2,1)", display: "flex", flexDirection: "column", borderLeft: "1px solid #1e1e1e" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid #1e1e1e" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 400 }}>🛍 Your Cart ({cartCount})</h2>
          <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer" }}><X size={22} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 22px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#444" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12, opacity: 0.4 }}>🛍</div>
              <p>Your cart is empty</p>
            </div>
          ) : cart.map(i => (
            <div key={i.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #1a1a1a" }}>
              <img src={i.img} alt={i.name} style={{ width: 68, height: 68, borderRadius: 10, objectFit: "cover", border: "1px solid #1e1e1e", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{i.brand}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#ccc", margin: "2px 0 5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i.name} {i.sub}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#c9556b" }}>${i.price.toFixed(2)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <button onClick={() => changeQty(i.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid #222", background: "#111", color: "#aaa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Minus size={12} /></button>
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 18, textAlign: "center" }}>{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid #222", background: "#111", color: "#aaa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={12} /></button>
                  <button onClick={() => removeFromCart(i.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 18, transition: "color 0.2s" }}
                    onMouseOver={e => (e.currentTarget.style.color = "#c9556b")} onMouseOut={e => (e.currentTarget.style.color = "#444")}>×</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "16px 22px", borderTop: "1px solid #1e1e1e" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}><span style={{ color: "#666" }}>Subtotal</span><span style={{ fontWeight: 600 }}>${cartTotal.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}><span style={{ color: "#666" }}>Shipping</span><span style={{ color: shipping === 0 ? "#2d9b6f" : "#aaa" }}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, marginBottom: 12, paddingTop: 8, borderTop: "1px solid #1a1a1a" }}><span>Total</span><span style={{ color: "#c9556b" }}>${orderTotal.toFixed(2)}</span></div>
            {cartTotal < 49 && <p style={{ fontSize: 11, color: "#2d9b6f", textAlign: "center", marginBottom: 10 }}>Add ${(49 - cartTotal).toFixed(2)} more for FREE shipping!</p>}
            <button onClick={() => { setCartOpen(false); setCheckoutStep(1); }}
              style={{ width: "100%", background: "#c9556b", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8, fontFamily: "inherit" }}>
              🔒 Secure Checkout <ChevronRight size={16} />
            </button>
            <button onClick={() => setCartOpen(false)} style={{ width: "100%", background: "none", border: "none", color: "#555", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>← Continue Shopping</button>
          </div>
        )}
      </div>

      {/* ── CHECKOUT MODAL ── */}
      {checkoutStep > 0 && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 500, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px", overflowY: "auto" }}>
          <div style={{ background: "#0d0d0d", borderRadius: 20, width: "100%", maxWidth: 640, border: "1px solid #222", overflow: "hidden", margin: "auto" }}>
            <div style={{ background: "#080808", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a1a" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 400 }}>🔒 Secure Checkout</h2>
              <button onClick={() => setCheckoutStep(0)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#aaa", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>×</button>
            </div>
            {/* Steps */}
            <div style={{ display: "flex", background: "#111", borderBottom: "1px solid #1a1a1a" }}>
              {["1. Delivery","2. Payment","3. Confirm"].map((s, i) => (
                <div key={s} style={{ flex: 1, textAlign: "center", fontSize: 11, padding: "10px", background: checkoutStep === i + 1 ? "rgba(201,85,107,0.15)" : "transparent", color: checkoutStep === i + 1 ? "#c9556b" : checkoutStep > i + 1 ? "#f5d0da" : "#444", fontWeight: checkoutStep === i + 1 ? 600 : 400 }}>{s}</div>
              ))}
            </div>

            <div style={{ padding: "24px" }}>
              {checkoutStep === 1 && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    {([["first","First Name *","Jane"],["last","Last Name *","Smith"],["email","Email *","jane@email.com"],["phone","Phone / WhatsApp *","+254 786 781 665"],["addr","Street Address *","123 Beauty Lane"],["city","City *","Nairobi"]] as [keyof typeof formData, string, string][]).map(([key, lbl, ph]) => (
                      <div key={key} style={{ gridColumn: key === "email" || key === "phone" || key === "addr" ? "1/-1" : "auto" }}>
                        <label style={{ fontSize: 11, color: "#555", fontWeight: 600, display: "block", marginBottom: 4 }}>{lbl}</label>
                        <input value={formData[key]} onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                          style={{ width: "100%", background: "#111", border: "1.5px solid #222", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "#fff", fontFamily: "inherit" }} />
                      </div>
                    ))}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label style={{ fontSize: 11, color: "#555", fontWeight: 600, display: "block", marginBottom: 4 }}>Country</label>
                      <select value={formData.country} onChange={e => setFormData(f => ({ ...f, country: e.target.value }))}
                        style={{ width: "100%", background: "#111", border: "1.5px solid #222", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "#fff", fontFamily: "inherit" }}>
                        {["Uganda","Kenya","Tanzania","Nigeria","Ghana","South Africa","United Kingdom","United States","Germany","France","India","South Korea","Japan","Australia","Canada","UAE","Other"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <label style={{ fontSize: 11, color: "#555", fontWeight: 600, display: "block", marginBottom: 4 }}>Notes (optional)</label>
                      <textarea value={formData.notes} onChange={e => setFormData(f => ({ ...f, notes: e.target.value }))} rows={2} placeholder="Gate code, apartment no., special instructions…"
                        style={{ width: "100%", background: "#111", border: "1.5px solid #222", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "#fff", fontFamily: "inherit", resize: "none" }} />
                    </div>
                  </div>
                  {/* Mini order summary */}
                  <div style={{ background: "rgba(201,85,107,0.06)", border: "1px solid rgba(201,85,107,0.15)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                    {cart.map(i => <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", padding: "3px 0" }}><span>{i.name} ×{i.qty}</span><span>${(i.price * i.qty).toFixed(2)}</span></div>)}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#c9556b", borderTop: "1px solid rgba(201,85,107,0.15)", marginTop: 8, paddingTop: 8 }}><span>Total</span><span>${orderTotal.toFixed(2)}</span></div>
                  </div>
                  <button onClick={() => { if (!formData.first || !formData.last || !formData.email || !formData.phone || !formData.addr || !formData.city) { showToast("Please fill in all required fields."); return; } setCheckoutStep(2); }}
                    style={{ width: "100%", background: "#c9556b", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Continue to Payment →
                  </button>
                </>
              )}

              {checkoutStep === 2 && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 12 }}>Payment Method</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                      {[["💳 Credit / Debit Card","card"],["🔒 Virtual Card","virtual"],["🅿 PayPal","paypal"],["🍎 Apple / Google Pay","apple"]].map(([lbl]) => (
                        <div key={lbl} style={{ border: lbl.includes("Credit") ? "2px solid #c9556b" : "2px solid #1e1e1e", borderRadius: 10, padding: "12px", cursor: "pointer", background: lbl.includes("Credit") ? "rgba(201,85,107,0.08)" : "#111", fontSize: 13, color: lbl.includes("Credit") ? "#c9556b" : "#666" }}>
                          {lbl}
                        </div>
                      ))}
                    </div>
                    <div style={{ border: "1px solid #222", borderRadius: 12, padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {([["ccName","Cardholder Name *","Jane Smith","1/-1"],["ccNum","Card Number *","•••• •••• •••• ••••","1/-1"],["ccExp","Expiry *","MM/YY","auto"],["ccCvv","CVV *","•••","auto"]] as [keyof typeof formData, string, string, string][]).map(([key, lbl, ph, span]) => (
                        <div key={key} style={{ gridColumn: span }}>
                          <label style={{ fontSize: 11, color: "#555", fontWeight: 600, display: "block", marginBottom: 4 }}>{lbl}</label>
                          <input value={formData[key]} onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} type={key === "ccCvv" ? "password" : "text"}
                            style={{ width: "100%", background: "#0a0a0a", border: "1.5px solid #1e1e1e", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "#fff", fontFamily: "inherit" }} />
                        </div>
                      ))}
                      <p style={{ gridColumn: "1/-1", fontSize: 11, color: "#444", textAlign: "center" }}>🔒 256-bit SSL. We never store full card details.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setCheckoutStep(1)} style={{ background: "none", border: "1.5px solid #222", borderRadius: 10, padding: "13px 16px", fontSize: 13, color: "#666", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
                    <button onClick={() => setCheckoutStep(3)} style={{ flex: 1, background: "#c9556b", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Review Order →</button>
                  </div>
                </>
              )}

              {checkoutStep === 3 && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, background: "rgba(201,85,107,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 34 }}>✓</div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: 8 }}>Order Ready to Confirm!</h2>
                  <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, maxWidth: 380, margin: "0 auto 16px" }}>Tap below to send your order directly to Luxe Noir Beauty via WhatsApp for instant confirmation.</p>
                  <div style={{ background: "rgba(201,85,107,0.08)", border: "1px solid rgba(201,85,107,0.2)", borderRadius: 10, padding: "8px 20px", display: "inline-block", fontSize: "1rem", fontWeight: 700, color: "#c9556b", letterSpacing: 1, marginBottom: 16 }}>
                    Order #{orderRef}
                  </div>
                  <div style={{ border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden", marginBottom: 20, textAlign: "left" }}>
                    {[["Customer", `${formData.first} ${formData.last}`],["Delivery to", `${formData.city}, ${formData.country}`],["Items", `${cart.length} product(s), ${cartCount} unit(s)`],["Shipping", shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`],["Total Charged", `$${orderTotal.toFixed(2)}`]].map(([lbl, val], i) => (
                      <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", fontSize: 13, borderBottom: "1px solid #1a1a1a", background: i % 2 === 0 ? "#0d0d0d" : "#111" }}>
                        <span style={{ color: "#555" }}>{lbl}</span>
                        <span style={{ fontWeight: lbl === "Total Charged" ? 700 : 500, color: lbl === "Total Charged" ? "#c9556b" : "#ccc" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={sendWhatsApp}
                    style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10, fontFamily: "inherit" }}>
                    <MessageCircle size={20} /> Send Order via WhatsApp — +254 786 781 665
                  </button>
                  <button onClick={() => setCheckoutStep(2)} style={{ background: "none", border: "none", color: "#555", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>← Back to Payment</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div style={{ position: "fixed", bottom: "28px", left: "50%", transform: `translateX(-50%) translateY(${toastMsg ? 0 : 80}px)`, background: "#111", color: "#fff", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, zIndex: 600, transition: "transform 0.3s", boxShadow: "0 8px 28px rgba(0,0,0,0.4)", whiteSpace: "nowrap", border: "1px solid #222" }}>
        {toastMsg}
      </div>
    </div>
  );
}
