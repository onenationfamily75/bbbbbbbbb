import { Heart, Plus } from "lucide-react";

export interface Product {
  id: number;
  brand: string;
  name: string;
  sub: string;
  category: string;
  price: number;
  was: number | null;
  rating: number;
  reviews: number;
  img: string;
  isNew: boolean;
  isHot: boolean;
  isBest: boolean;
  isSale: boolean;
  disc: number;
  source: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onWishlist: (p: Product) => void;
}

export default function ProductCard({ product: p, onAddToCart, onWishlist }: ProductCardProps) {
  const stars = "★".repeat(Math.floor(p.rating)) + "☆".repeat(5 - Math.floor(p.rating));

  return (
    <div
      style={{
        background: "#111",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #1e1e1e",
        transition: "all 0.25s",
        position: "relative",
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,85,107,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#1a0a10" }}>
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        {/* Badges */}
        <div style={{ position: "absolute", top: 9, left: 9, display: "flex", flexDirection: "column", gap: 3 }}>
          {p.isNew && <span style={{ background: "#1a1a1a", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700, letterSpacing: 0.5 }}>NEW</span>}
          {p.isSale && <span style={{ background: "#c9556b", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>-{p.disc}%</span>}
          {p.isHot && <span style={{ background: "#c9a84c", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>HOT</span>}
          {p.isBest && <span style={{ background: "#2d9b6f", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>BEST</span>}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => onWishlist(p)}
          style={{ position: "absolute", top: 9, right: 9, width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
          onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#c9556b"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)"; (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
        >
          <Heart size={13} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 14px 16px" }}>
        <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600, marginBottom: 3 }}>
          {p.brand} · {p.source}
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd", lineHeight: 1.4, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {p.name} {p.sub}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
          <span style={{ color: "#c9a84c", fontSize: 11 }}>{stars}</span>
          <span style={{ fontSize: 10, color: "#555" }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: "1rem", fontWeight: 600, color: "#c9556b" }}>${p.price.toFixed(2)}</span>
          {p.was && <span style={{ fontSize: 11, color: "#444", textDecoration: "line-through" }}>${p.was.toFixed(2)}</span>}
          {p.disc > 0 && <span style={{ fontSize: 10, color: "#2d9b6f", fontWeight: 600 }}>Save {p.disc}%</span>}
        </div>
        <button
          onClick={() => onAddToCart(p)}
          style={{ width: "100%", background: "#1a1a1a", color: "#ddd", border: "1px solid #2a2a2a", borderRadius: 8, padding: "9px", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s", fontFamily: "inherit" }}
          onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#c9556b"; (e.currentTarget as HTMLElement).style.borderColor = "#c9556b"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLElement).style.color = "#ddd"; }}
        >
          <Plus size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
