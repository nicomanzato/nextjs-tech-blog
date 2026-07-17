import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LIME = "#d8f34e";

const Sparkle = () => {
  const barStyle = {
    position: "absolute" as const,
    background: LIME,
    borderRadius: 6,
  };

  return (
    <div style={{ position: "relative", width: 220, height: 220 }}>
      <div
        style={{ ...barStyle, width: 40, height: 220, left: 90, top: 0 }}
      />
      <div
        style={{ ...barStyle, width: 220, height: 40, left: 0, top: 90 }}
      />
      <div
        style={{
          ...barStyle,
          width: 40,
          height: 220,
          left: 90,
          top: 0,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          ...barStyle,
          width: 40,
          height: 220,
          left: 90,
          top: 0,
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
};

const OpengraphImage = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "#000000",
        }}
      >
        <Sparkle />
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          lite-tech
        </div>
        <div
          style={{
            display: "flex",
            color: LIME,
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          Tech news, curated.
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OpengraphImage;
