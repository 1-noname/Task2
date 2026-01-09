import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
