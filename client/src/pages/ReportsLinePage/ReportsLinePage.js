import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Materialize from "materialize-css";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { Loader } from "../../components/Loader";
import faker from "faker"; //?????????????????????????????????

export const ReportsLinePage = () => {

  const [transactions, setTransactions] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const dateFrom =  moment(searchParams.get('date_from')).subtract(1, 'days').format();
  const dateTo =  moment(searchParams.get('date_to')).format();
  const type = searchParams.get('type');

  const loadCategories = useCallback(async () => {
    try {
      const fetched = await request(`/api/reports/line?date_from=${dateFrom}&date_to=${dateTo}&type=${type}`, "GET", null, {
        Authorization: "Bearer" + " " + token,
      });
      setTransactions(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: transactions.map((tran) => moment(tran.date).format("DD.MM.YYYY")),
    datasets: [
      {
        label: type,
        data: transactions.map((tran) => tran.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="row">
        <h3 className="center-align">Звіт по дням</h3>
      </div>
      <div className="row">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};
