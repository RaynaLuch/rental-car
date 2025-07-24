import Container from "../../components/Container/Container";
import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";

const CatalogPage = () => {
  return (
    <div>
      <Container>
        <Filters />
        <CarList />
      </Container>
    </div>
  );
};

export default CatalogPage;
