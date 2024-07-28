import { Box } from "@mui/material";
import AllProductsNavBar from "../components/home/allProductsNavbar";
import HomeCarousel from "../components/home/homeCaruosel";
import AllProducts from "../components/home/allProducts";

const Home = () => {
  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Box
          sx={{
            width: { xs: "100%", md: "900px", lg: "1200px" },
            margin: "0 auto",
          }}
        >
          <AllProductsNavBar />
        </Box>
        <HomeCarousel />
        <AllProducts />
      </Box>
    </>
  );
};

export default Home;
