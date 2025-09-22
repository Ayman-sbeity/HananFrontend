import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomLabel from "../../components/common/CustomLabel";
import CustomButton from "../../components/CustomButton";

const AboutUsSection: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const imgs = [
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  ];

  const titleStyle: React.CSSProperties = {
    marginBottom: isMdUp ? 24 : 12,
    fontWeight: 800,
    fontSize: isMdUp ? "3rem" : "2rem",
    color: "#333",
    lineHeight: 1.05,
  };

  const subtitleStyle: React.CSSProperties = {
    marginBottom: isMdUp ? 24 : 16,
    fontWeight: 600,
    fontSize: isMdUp ? "1.5rem" : "1.05rem",
    color: "#263241",
    lineHeight: 1.15,
    maxWidth: isMdUp ? "520px" : "100%",
  };

  const paragraphStyle: React.CSSProperties = {
    color: "#70757f",
    fontSize: isMdUp ? "0.95rem" : "0.92rem",
    lineHeight: 1.7,
    marginBottom: 12,
    maxWidth: isMdUp ? "520px" : "100%",
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, md: 8 },
        mt: { xs: 4, md: 6 },
        py: { xs: 6, md: 12 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: { xs: 6, md: 6 },
        background: "linear-gradient(180deg, #f6f8ff 0%, #f2f6fc 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: { xs: "-120px", md: "-240px" },
          top: { xs: "-120px", md: "-80px" },
          width: { xs: 300, md: 680 },
          height: { xs: 300, md: 680 },
          background:
            "radial-gradient(circle at 30% 30%, rgba(144,127,255,0.16), rgba(144,127,255,0.06) 40%, transparent 60%)",
          filter: "blur(36px)",
          zIndex: 0,
        }}
      />

      <Box sx={{ zIndex: 2, flex: 1, width: { xs: "100%", md: "58%" } }}>
        <CustomLabel text="About Us" style={titleStyle} />

        <CustomLabel
          text="A New Way For Working For Many Of Professionals."
          style={subtitleStyle}
        />

        <Box>
          <CustomLabel
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer."
            style={paragraphStyle}
          />
          <CustomLabel
            text="It took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            style={paragraphStyle}
          />
          <CustomLabel
            text="It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop."
            style={paragraphStyle}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomButton
            label="Learn More"
            onClick={() => (window.location.href = "/about")}
          />
        </Box>
      </Box>

      <Box
        sx={{
          zIndex: 2,
          width: { xs: "100%", md: "40%" },
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, md: 3 },
          alignItems: "center",
          flexWrap: { xs: "nowrap", md: "nowrap" },
          mt: { xs: 2, md: 0 },
        }}
        role="group"
        aria-label="About images"
      >
        <Card
          sx={{
            display: "block",
            width: { xs: 88, md: 140 },
            height: { xs: 220, md: 420 },
            borderRadius: 2,
            transform: { xs: "translateY(-10px)", md: "translateY(-30px)" },
            boxShadow: "0 8px 18px rgba(24,39,75,0.10)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <a
            href={imgs[0]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open necklace image in new tab"
            style={{ display: "block", height: "100%" }}
          >
            <CardMedia
              component="img"
              src={imgs[0]}
              alt="Decorative"
              loading="lazy"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </a>
        </Card>

        <Card
          sx={{
            width: { xs: 160, md: 160 },
            height: { xs: 320, md: 520 },
            borderRadius: 3,
            transform: { xs: "translateY(0)", md: "translateY(40px)" },
            boxShadow: "0 14px 26px rgba(24,39,75,0.14)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <a
            href={imgs[1]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open pendant image in new tab"
            style={{ display: "block", height: "100%" }}
          >
            <CardMedia
              component="img"
              src={imgs[1]}
              alt="Decorative"
              loading="lazy"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </a>
        </Card>

        <Card
          sx={{
            display: "block",
            width: { xs: 88, md: 140 },
            height: { xs: 220, md: 420 },
            borderRadius: 2,
            transform: { xs: "translateY(-6px)", md: "translateY(-10px)" },
            boxShadow: "0 8px 18px rgba(24,39,75,0.10)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <a
            href={imgs[2]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open decorative image in new tab"
            style={{ display: "block", height: "100%" }}
          >
            <CardMedia
              component="img"
              src={imgs[2]}
              alt="Decorative"
              loading="lazy"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </a>
        </Card>
      </Box>
    </Box>
  );
};

export default AboutUsSection;
