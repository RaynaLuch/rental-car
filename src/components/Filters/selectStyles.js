export const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "12px",
    border: "none",
    padding: "4px 8px",
    backgroundColor: "var(--inputs)",
    fontSize: "16px",
    fontWeight: 500,
    color: "var(--main)",
    minHeight: "48px",
    boxShadow: "none",
    width: "204px",
  }),
  menu: (base) => ({
    ...base,
    width: "204px",
    marginTop: "4px",
    borderRadius: "12px",
    backgroundColor: "var(--white)",
    border: "1px solid var(--inputs)",
    zIndex: 100,
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: "thin",
    scrollbarColor: "var(--gray-light) transparent",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "var(--gray-light)",
      border: "2px solid transparent",
      backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
      WebkitAppearance: "none",
    },
  }),

  option: (base, state) => ({
    ...base,
    fontSize: "16px",
    fontWeight: 500,
    backgroundColor: state.isFocused ? "var(--inputs)" : "var(--white)",
    color: state.isFocused ? "var(--main)" : "var(--gray)",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--main)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--gray)",
  }),
};
