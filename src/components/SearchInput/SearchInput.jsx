import React from "react";

function SearchInput({ placeholder, type, value, onChange }) {
  return (
    <>
      <input placeholder={placeholder} value={value} type={type} onChange={onChange} />
    </>
  );
}

export default SearchInput;
