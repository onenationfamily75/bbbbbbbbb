import { useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X, MessageCircle } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onSearch: (q: string) => void;
}

const NAV = [
  { label: "Skincare", sub: ["Moisturisers", "Serums & Treatments", "Cleansers", "Eye Care", "SPF & Sun Care", "Face Masks"] },
  { label: "Makeup", sub: ["Foundation & Concealer", "Lip Colour & Gloss", "Eye Makeup", "Blush & Bronzer", "Brushes & Tools"] },
  { label: "Haircare", sub: ["Shampoo & Conditioner", "Treatments & Masks", "Styling Products", "Hair Tools", "Scalp Care"] },
  { label: "Body & Fragrance", sub: ["Body Lotions & Oils", "Bath & Shower", "Perfumes & Mists", "Deodorant", "Scrubs"] },
  { label: "Tools & Devices", sub: ["LED Therapy Devices", "Gua Sha & Rollers", "Electric Cleansers", "Nail Tools"] },
];

export default function Header({ cartCount, onCartOpen, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ background: "#111", borderBottom: "1px solid #222", textAlign: "center", padding: "8px 16px", fontSize: "12px", color: "#aaa", letterSpacing: "0.5px" }}>
        🌍 Free Worldwide Shipping Over{" "}
        <span style={{ color: "#c9a84c" }}>$49</span>{" "}
        &nbsp;·&nbsp; WhatsApp Orders:{" "}
        <a href="https://wa.me/254786781665" style={{ color: "#25D366", fontWeight: 600 }}>+254 786 781 665</a>
      </div>

      {/* Main Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e1e1e",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          {/* Logo */}
          <a href="/" style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.7rem", fontWeight: 400, letterSpacing: 3, color: "#fff" }}>
              LUXE <span style={{ color: "#c9556b" }}>NOIR</span>
            </div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#666", textTransform: "uppercase", marginTop: 1 }}>
              Premium Beauty & Fashion
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: 0, flex: 1, justifyContent: "center" }}>
            {NAV.map(item => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveNav(item.label)}
                onMouseLeave={() => setActiveNav(null)}
              >
                <a
                  href="#"
                  style={{
                    display: "block", padding: "8px 14px",
                    fontSize: 12, letterSpacing: 1, textTransform: "uppercase",
                    color: activeNav === item.label ? "#c9556b" : "#aaa",
                    transition: "color 0.2s", whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </a>
                {activeNav === item.label && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0,
                    background: "#111", border: "1px solid #222",
                    borderRadius: 12, minWidth: 210, padding: "8px 0", zIndex: 200,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                  }}>
                    {item.sub.map(s => (
                      <a key={s} href="#"
                        style={{ display: "block", padding: "9px 18px", fontSize: 13, color: "#888", transition: "all 0.15s" }}
                        onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = "#c9556b"; (e.currentTarget as HTMLElement).style.background = "rgba(201,85,107,0.08)"; }}
                        onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = "#888"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >{s}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", color: "#aaa", padding: 8, cursor: "pointer", borderRadius: 8, transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "#c9556b")} onMouseOut={e => (e.currentTarget.style.color = "#aaa")}>
              <Search size={20} />
            </button>
            <button style={{ background: "none", border: "none", color: "#aaa", padding: 8, cursor: "pointer", borderRadius: 8, transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "#c9556b")} onMouseOut={e => (e.currentTarget.style.color = "#aaa")}>
              <Heart size={20} />
            </button>
            <button onClick={onCartOpen} style={{ background: "none", border: "none", color: "#aaa", padding: 8, cursor: "pointer", borderRadius: 8, transition: "color 0.2s", position: "relative" }}
              onMouseOver={e => (e.currentTarget.style.color = "#c9556b")} onMouseOut={e => (e.currentTarget.style.color = "#aaa")}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 2, right: 2, background: "#c9556b", color: "#fff", fontSize: 9, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
            <a href="https://wa.me/254786781665" target="_blank" rel="noopener noreferrer"
              style={{ background: "#25D366", color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.background = "#1ebe5c")} onMouseOut={e => (e.currentTarget.style.background = "#25D366")}>
              <MessageCircle size={15} /> WhatsApp
            </a>
            <button onClick={() => setMenuOpen(true)} style={{ display: "none", background: "none", border: "none", color: "#aaa", padding: 6, cursor: "pointer" }}
              className="mob-menu-btn">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 300, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh" }}>
          <div style={{ width: "100%", maxWidth: 600, padding: "0 24px" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: 12 }}>
              <input
                autoFocus
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search 40,000+ products…"
                style={{ flex: 1, background: "#111", border: "2px solid #333", borderRadius: 12, padding: "16px 20px", fontSize: 16, color: "#fff", fontFamily: "inherit" }}
              />
              <button type="submit" style={{ background: "#c9556b", color: "#fff", border: "none", borderRadius: 12, padding: "16px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Search
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} style={{ background: "#222", color: "#aaa", border: "none", borderRadius: 12, padding: "16px 16px", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 400 }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: "fixed", top: 0, left: 0, width: 300, height: "100vh", background: "#0d0d0d", zIndex: 500, padding: "24px", overflowY: "auto", borderRight: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#fff" }}>LUXE <span style={{ color: "#c9556b" }}>NOIR</span></div>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer" }}><X size={22} /></button>
            </div>
            {NAV.map(item => (
              <div key={item.label} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#fff", fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                {item.sub.map(s => (
                  <a key={s} href="#" style={{ display: "block", fontSize: 13, color: "#666", padding: "5px 0", transition: "color 0.2s" }}
                    onMouseOver={e => (e.currentTarget.style.color = "#c9556b")} onMouseOut={e => (e.currentTarget.style.color = "#666")}>
                    {s}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
