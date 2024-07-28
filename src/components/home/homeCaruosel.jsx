import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography } from "@mui/material";

import AdidasImage from "../../assets/adidas.jpeg";
import AirpodsImage from "../../assets/airpods.png";
import AppleLogoImage from "../../assets/apple logo.png";

const items = [
  {
    img: AdidasImage,
    discount: "20% OFF",
    content: "Adidas shoes, comfortable and stylish.",
    header: "Adidas",
  },
  {
    img: AirpodsImage,
    discount: "15% OFF",
    content: "Apple AirPods, immersive sound quality.",
    header: "AirPods",
  },
  {
    img: AppleLogoImage,
    discount: "10% OFF",
    content: "Apple products, innovative and high quality.",
    header: "Apple",
  },
];

const HomeCarousel = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "900px", lg: "1200px" },
        margin: "0 auto",
        mt: 10,
      }}
    >
      <Carousel
        autoPlay
        interval={5000}
        navButtonsAlwaysVisible
        indicatorContainerProps={{ style: { position: "relative" } }}
        indicatorIconButtonProps={{ style: { padding: "0" } }}
        activeIndicatorIconButtonProps={{ style: { color: "#000" } }}
      >
        {items.map((item, i) => (
          <Paper
            key={i}
            sx={{
              height: { xs: "400px", md: "600px", lg: "600px" },
              position: "relative",
              background: "linear-gradient(to bottom, white, silver)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" component="div" sx={{ color: "black" }}>
                {item.discount}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ mt: 1, color: "black" }}
              >
                {item.header}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{ mt: 1, color: "black" }}
              >
                {item.content}
              </Typography>
            </Box>
            <Box
              component="img"
              src={item.img}
              alt={item.header}
              sx={{
                width: { xs: "200px", sm: "300px", md: "400px" },
                height: { xs: "200px", sm: "300px", md: "400px" }, // Fixed height for images
                objectFit: "cover",
                mt: 2,
              }}
            />
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomeCarousel;
