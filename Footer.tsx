export default function Footer() {
  const cols = [
    { title: "Shop", links: ["Skincare", "Makeup", "Haircare", "Body & Bath", "Fragrance", "Tools & Devices"] },
    { title: "Information", links: ["Shipping Policy", "Returns & Refunds", "Privacy Policy", "Terms & Conditions", "Dropshipping Info"] },
    { title: "Help", links: ["FAQ", "Track My Order", "Wholesale / Bulk", "Affiliate Program", "Beauty Quiz"] },
  ];

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #1a1a1a", padding: "60px 32px 24px", color: "rgba(255,255,255,0.45)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#fff", letterSpacing: 3, marginBottom: 12 }}>
              LUXE <span style={{ color: "#c9556b" }}>NOIR</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, maxWidth: 240, marginBottom: 20 }}>
              Premium women's beauty products sourced from the world's finest suppliers. Delivered worldwide at prices you'll love.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["📸", "🎵", "📘", "📌"].map(icon => (
                <a key={icon} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "all 0.2s" }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#c9556b"; (e.currentTarget as HTMLElement).style.borderColor = "#c9556b"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}>
                  {icon}
                </a>
              ))}
              <a href="https://wa.me/254786781665" style={{ width: 34, height: 34, borderRadius: 8, background: "#25D366", border: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💬</a>
            </div>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <a href="https://wa.me/254786781665" style={{ color: "#25D366", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                💬 +254 786 781 665
              </a>
              <span>📧 support@luxenoirbeauty.store</span>
            </div>
          </div>

          {/* Nav Cols */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", transition: "color 0.2s", fontWeight: 300 }}
                      onMouseOver={e => (e.currentTarget.style.color = "#c9556b")}
                      onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11 }}>© 2026 Luxe Noir Beauty. All rights reserved.</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["VISA", "MC", "AMEX", "VIRTUAL CARD", "PAYPAL", "APPLE PAY", "GOOGLE PAY"].map(p => (
              <span key={p} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "3px 8px", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
