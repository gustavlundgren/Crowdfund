import axios from "../../api/index";
import { useEffect, useState } from "react";
import FundCard from "../../components/FundCard";

const Home = () => {
  const [funds, setFunds] = useState([]);

  const fetchFunds = async () => {
    try {
      const res = await axios.get("/funds/get-funds");

      setFunds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <div>
      {funds
        ? funds.map((fund) => {
            return (
              <FundCard
                key={fund.id}
                name={fund.name}
                description={fund.description}
                goal={fund.goal}
                balance={fund.balance}
              />
            );
          })
        : ""}
    </div>
  );
};

export default Home;
