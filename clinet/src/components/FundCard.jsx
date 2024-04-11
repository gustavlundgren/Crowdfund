import React from "react";

const FundCard = ({ name, description, goal, balance }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <strong>
        {balance}/{goal}
      </strong>
      <br />
      <button>Donate</button>
    </div>
  );
};

export default FundCard;
