import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const CustomCarousel = () => {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            {" "}
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="/pic1.png"
                  height={350}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3 style={{ color: "black" }}>Register Yourself</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="/pic2.png"
                  height={350}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3 style={{ color: "black" }}>Create Events</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="/pic3.png"
                  height={350}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3 style={{ color: "black" }}>Attend Events</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomCarousel;
