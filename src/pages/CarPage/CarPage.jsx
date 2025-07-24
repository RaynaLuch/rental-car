import Container from "../../components/Container/Container";
import CarDetails from "../../components/CarDetails/CarDetails";
import css from "./CarPage.module.css";

const CarPage = () => {
  return (
    <div>
      <Container>
        <CarDetails className={css.carDetails} />
      </Container>
    </div>
  );
};

export default CarPage;
