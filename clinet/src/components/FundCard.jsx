import React from "react";
import Popup from "reactjs-popup";
import "../styles/FundCard.css";

const FundCard = ({ name, description, goal, balance, view }) => {
  return (
    <div className='fund-info-container'>
      <h2>{name}</h2>
      <p>{description}</p>
      <div className='fund-goal'>
        <p>Mål: {goal} SEK</p>
        <p>Insamlat: {balance} SEK</p>
        <progress value={balance / goal}></progress>
      </div>

      {view ? (
        ""
      ) : (
        <Popup
          trigger={<button className='donate-button'>Donate Now</button>}
          modal
          nested
        >
          {(close) => (
            <div className='modal'>
              <h2 className='content'>{name}</h2>
              <p>{description}</p>
              <div className='donate-form'>
                <input type='number' placeholder='Enter amount to donate' />
                <button onClick={() => close()}>Cancel</button>
                <button>Confirm Donation</button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default FundCard;
