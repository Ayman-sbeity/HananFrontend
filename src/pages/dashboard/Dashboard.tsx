import { memo } from "react";
import StatsSection from "../../components/dashboard/StatsSection";
import { Typography, Box, Fab, Divider } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = memo(() => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>

      <StatsSection />
      
      <Divider sx={{ my: 3 }} />
      
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => navigate("/dash/add-item")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
