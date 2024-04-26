import "../styles/TransactionsCard.css";

const TransactionsCard = ({ name, date, ammount }) => {
  return (
    <div className='container'>
      <div className='header'>
        <h4 className='fund-name-txt'>{name}</h4>
        <p className='date-txt'>{date}</p>
      </div>
      <p className='ammount-txt'>- {ammount} SEK</p>
    </div>
  );
};

export default TransactionsCard;
