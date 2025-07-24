import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/filtersSlice";
import { getBrands } from "../../services/carApi.jsx";
import css from "./Filters.module.css";
import Select, { components } from "react-select";
import { customSelectStyles } from "./selectStyles.js";

const formatNumber = (value) => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="16"
        fill="var(--main)"
        style={{ pointerEvents: "none" }}
      >
        <use
          href={`/icons.svg#${
            menuIsOpen ? "icon-arrow-top" : "icon-arrow-bottom"
          }`}
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const customComponents = {
  IndicatorSeparator: () => null,
  DropdownIndicator,
};

const Filters = () => {
  const [brands, setBrands] = useState([]);
  const [mileageMin, setMileageMin] = useState("");
  const [mileageMax, setMileageMax] = useState("");
  const [mileageMinError, setMileageMinError] = useState("");
  const [mileageMaxError, setMileageMaxError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };
    fetchBrands();
  }, []);

  const handleMileageMinChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^\d\s]/g, "");

    if (input !== cleaned) {
      setMileageMinError("Вводити можна лише цифри");
    } else {
      setMileageMinError("");
    }

    setMileageMin(formatNumber(cleaned));
  };

  const handleMileageMaxChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^\d\s]/g, "");

    if (input !== cleaned) {
      setMileageMaxError("Вводити можна лише цифри");
    } else {
      setMileageMaxError("");
    }

    setMileageMax(formatNumber(cleaned));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    if (mileageMinError || mileageMaxError) {
      alert("Виправте помилки у полях пробігу");
      return;
    }

    const cleanMileageMin = mileageMin.replace(/\s/g, "");
    const cleanMileageMax = mileageMax.replace(/\s/g, "");

    const filters = {
      brand: selectedBrand,
      rentalPrice: selectedPrice,
      mileageMin: /^\d+$/.test(cleanMileageMin)
        ? Number(cleanMileageMin)
        : undefined,
      mileageMax: /^\d+$/.test(cleanMileageMax)
        ? Number(cleanMileageMax)
        : undefined,
    };

    dispatch(setFilters(filters));
  };

  return (
    <form onSubmit={handleFilterSubmit} className={css.filterForm}>
      <div className={css.labelLocation}>
        <label htmlFor="brand" className={css.label}>
          Car brand
        </label>
        <Select
          id="brand"
          name="brand"
          classNamePrefix="custom-select"
          options={[
            { value: "", label: "Choose a brand" },
            ...brands.map((brand) => ({ value: brand, label: brand })),
          ]}
          styles={customSelectStyles}
          components={customComponents}
          onChange={(option) => setSelectedBrand(option.value)}
          value={{
            value: selectedBrand,
            label: selectedBrand || "Choose a brand",
          }}
        />
      </div>

      <div className={css.labelLocation}>
        <label className={css.label}>Price / 1 hour</label>
        <Select
          id="price"
          name="price"
          classNamePrefix="custom-select"
          options={[
            { value: "", label: "Choose a price" },
            ...[...Array(6)].map((_, idx) => {
              const value = 30 + idx * 10;
              return { value, label: `${value}` };
            }),
          ]}
          styles={customSelectStyles}
          components={customComponents}
          onChange={(option) => setSelectedPrice(option.value)}
          value={{
            value: selectedPrice,
            label: selectedPrice ? `To $${selectedPrice}` : "Choose a price",
          }}
        />
      </div>

      <div className={css.labelLocation}>
        <label htmlFor="mileageMin" className={css.label}>
          Сar mileage / km
        </label>
        <div className={css.inputs}>
          <div className={css.inputGroup}>
            <div
              className={`${css.inputWrapper} ${css.inputMinWrapper}`}
              data-label="From:"
            >
              <input
                type="text"
                id="mileageMin"
                name="mileageMin"
                inputMode="numeric"
                value={mileageMin}
                onChange={handleMileageMinChange}
                placeholder=""
              />
            </div>
            <div className={css.error}>{mileageMinError || "\u00A0"}</div>
          </div>

          <div className={css.inputGroup}>
            <div
              className={`${css.inputWrapper} ${css.inputMaxWrapper}`}
              data-label="To:"
            >
              <input
                type="text"
                id="mileageMax"
                name="mileageMax"
                inputMode="numeric"
                value={mileageMax}
                onChange={handleMileageMaxChange}
                placeholder=""
              />
            </div>
            <div className={css.error}>{mileageMaxError || "\u00A0"}</div>
          </div>
        </div>
      </div>

      <div className={css.labelLocation}>
        <label style={{ visibility: "hidden" }}>Search</label>
        <button className={css.buttonSearch} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default Filters;
