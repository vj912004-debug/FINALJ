import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jagdamba Procut Pvt. Ltd. — Precision in Steel. Strength in Every Cut.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(135deg, #0f1115 0%, #014d6e 55%, #1a1d23 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#ff6a00", fontWeight: 700 }}>
          JAGDAMBA PROCUT
        </div>
        <div style={{ marginTop: 18, fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          Precision in Steel. Strength in Every Cut.
        </div>
        <div style={{ marginTop: 20, fontSize: 26, color: "#c5d0da" }}>
          Steel plates · CNC · 12 kW laser · UT · Vadodara
        </div>
      </div>
    ),
    { ...size },
  );
}
