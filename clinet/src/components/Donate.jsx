import React from "react";
import axios from "../api/index";

const Donate = ({ onClose, fundID, userID }) => {
  const [amount, setAmount] = useState(0);

  const onDonate = async () => {
    try {
      const res = await axios.post("/funds/donate", { amount, fundID, userID });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const handleDonate = () => {
    onDonate(amount);
    onClose();
  };

  return (
    <div className='donation-modal'>
      <div className='donation-modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Donera</h2>
        <p>Skriv summan du vill donera:</p>
        <input type='number' value={amount} onChange={handleChange} />
        <button onClick={handleDonate}>Donate</button>
      </div>
    </div>
  );
};

export default Donate;
