import axios from "../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "../../components/FundCard";
import TransactionsCard from "../../components/TransactionsCard";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [funds, setFunds] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const getUser = async () => {
    if (localStorage.getItem("id") == null) {
      navigate("/login");
    }

    const id = localStorage.getItem("id");

    try {
      const res = await axios.get(`/user/get-user/${id}`);
      console.log(res);

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserFunds = async () => {
    if (localStorage.getItem("id") == null) {
      navigate("/login");
    }

    const id = localStorage.getItem("id");

    try {
      const res = await axios.get(`/funds/get-user-funds/${id}`);
      console.log(res.data);

      setFunds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserTransactions = async () => {
    if (localStorage.getItem("id") == null) {
      navigate("/login");
    }

    const id = localStorage.getItem("id");

    try {
      const res = await axios.get(`/funds/get-user-transactions/${id}`);
      console.log(res.data);

      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getUserFunds();
    getUserTransactions();
  }, []);

  return (
    <div>
      <h1>Välkommen {user.username}!</h1>
      <h3>Saldo: {user.balance} SEK</h3>

      <h3>Mina funds</h3>
      {funds
        ? funds.map((fund) => {
            return (
              <FundCard
                key={fund.id}
                name={fund.name}
                description={fund.description}
                goal={fund.goal}
                balance={fund.balance}
                view={true}
              />
            );
          })
        : ""}
      <h3>Transaktions Historik</h3>
      <div className='transactions-container'>
        {transactions ? (
          transactions.map((transaction) => {
            return (
              <TransactionsCard
                key={transaction.id}
                name={transaction.name}
                date={transaction.date}
                ammount={transaction.ammount}
              />
            );
          })
        ) : (
          <h3>Ingen historik ännu</h3>
        )}
      </div>

      <button onClick={() => navigate("/")}>Tillbaka</button>
    </div>
  );
};

export default Profile;
