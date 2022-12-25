import Card from "@mui/material/Card";
import { alpha, styled } from "@mui/material/styles";

import { CardActions, CardContent, Chip } from "@mui/material";

const COLORS = {
  RED: "red",
  PINK: "pink",
  PURPLE: "purple",
  DEEP_PURPLE: "deepPurple",
  INDIGO: "indigo",
  BLUE: "blue",
  LIGHT_BLUE: "lightBlue",
  CYAN: "cyan",
  TEAL: "teal",
  GREEN: "green",
  LIGHT_GREEN: "lightGreen",
  LIME: "lime",
  YELLOW: "yellow",
  AMBER: "amber",
  ORANGE: "orange",
  DEEP_ORANGE: "deepOrange",
};

type RoomsColorType = {
  setColor: (params: string) => void;
};

type ChipProps = {
  label: string;
  backgroundColor: string;
};

export function RoomsColor({ setColor }: RoomsColorType) {
  function handleColor(newColor: string) {
    const colorCheck = getEntry(newColor);
    if (colorCheck) {
      setColor(colorCheck);
    }
  }

  function getEntry(entry: string) {
    let upperCaseFont = entry.toUpperCase();
    for (const [key, value] of Object.entries(COLORS)) {
      if (key === upperCaseFont.replace(/ /g, "_")) {
        console.log(upperCaseFont);
        return value;
      }
    }
  }

  const CSSColorChip = styled(({ label, backgroundColor }: ChipProps) => (
    <Chip
      label={label}
      onClick={() => handleColor(label)}
      variant="filled"
      sx={{
        "& .MuiChip-label": {
          color: "white",
        },
        backgroundColor: backgroundColor,
      }}
    />
  ))(({ theme }) => ({}));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "rgba(255,255,255, 0.5)",
        // gap: "10px",
        height: "200px",
      }}
    >
      <CardContent>
        {/* <Typography
          component="div"
          variant="h5"
          sx={{ fontFamily: "Zen Dots, cursive", textAlign: "center" }}
        >
          Choose Color
        </Typography> */}

        <CardActions>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CSSColorChip label="Blue" backgroundColor={COLORS.BLUE} />
            <CSSColorChip label="Cyan" backgroundColor={COLORS.CYAN} />
            <CSSColorChip label="Green" backgroundColor={COLORS.GREEN} />
            <CSSColorChip label="Indigo" backgroundColor={COLORS.INDIGO} />
            <CSSColorChip
              label="Light Blue"
              backgroundColor={COLORS.LIGHT_BLUE}
            />
            <CSSColorChip
              label="Light Green"
              backgroundColor={COLORS.LIGHT_GREEN}
            />
            <CSSColorChip label="Lime" backgroundColor={COLORS.LIME} />
            <CSSColorChip label="Orange" backgroundColor={COLORS.ORANGE} />
            <CSSColorChip label="Pink" backgroundColor={COLORS.PINK} />
            <CSSColorChip label="Purple" backgroundColor={COLORS.PURPLE} />
            <CSSColorChip label="Red" backgroundColor={COLORS.RED} />
            <CSSColorChip label="Teal" backgroundColor={COLORS.TEAL} />
            <CSSColorChip label="Yellow" backgroundColor={COLORS.YELLOW} />
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
}
