import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions/CardActions";
import { styled } from "@mui/material/styles";

const FONTS = {
  SHORT_STACK: "Short Stack, cursive",
  PLAYFAIR: "Playfair Display, serif",
  OSWALD: "Oswald, sans serif",
  NOTO_SERIF: "Noto Serif NP Hmong, serif",
  LOBSTER: "Lobster, cursive",
  CINZEL: "Cinzel Decorative",
  CAVEAT: "Caveat, cursive",
  CARAMEL: "Caramel, cursive",
  ZEN_DOTS: "Zen Dots, cursive",
  SOURCE_CODE: "Source Code Pro, monospace",
};

type RoomsFontProps = {
  setFont: (params: string) => void;
};

type ChipProps = {
  label: string;
  fontFamily: string;
};

export function RoomsFont({ setFont }: RoomsFontProps) {
  function getEntry(entry: string) {
    let upperCaseFont = entry.toUpperCase();
    console.log(upperCaseFont);
    for (const [key, value] of Object.entries(FONTS)) {
      if (key === upperCaseFont.replace(/ /g, "_")) {
        return value;
      }
    }
  }
  function handleFont(newFont: string) {
    const value = getEntry(newFont);
    if (value) {
      console.log(value);
      setFont(value);
    }
  }

  const CSSChip = styled(({ label, fontFamily }: ChipProps) => (
    <Chip
      label={label}
      onClick={() => handleFont(label)}
      variant="filled"
      sx={{
        "& .MuiChip-label": {
          fontFamily: fontFamily,
          fontSize: "1.5rem",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5rem",
        },
        backgroundColor: "gray",
        "&&: hover": {
          color: "black",
        },
      }}
    />
  ))(({ theme, label, fontFamily }) => ({}));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "rgba(255,255,255, 0.5)",
        gap: "50px",
        height: "200px",
      }}
    >
      <CardContent>
        <CardActions>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CSSChip label="Caramel" fontFamily={FONTS.CARAMEL} />
            <CSSChip label="Caveat" fontFamily={FONTS.CAVEAT} />
            <CSSChip label="Cinzel" fontFamily={FONTS.CINZEL} />
            <CSSChip label="Lobster" fontFamily={FONTS.LOBSTER} />
            <CSSChip label="Noto Serif" fontFamily={FONTS.NOTO_SERIF} />
            <CSSChip label="Oswald" fontFamily={FONTS.OSWALD} />
            <CSSChip label="Playfair" fontFamily={FONTS.PLAYFAIR} />
            <CSSChip label="Short Stack" fontFamily={FONTS.SHORT_STACK} />
            <CSSChip label="Source Code" fontFamily={FONTS.SOURCE_CODE} />
            <CSSChip label="Zen Dots" fontFamily={FONTS.ZEN_DOTS} />
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
}
