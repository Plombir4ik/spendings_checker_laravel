import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/TransactionsTable";
import "./style.css";

export const TransactionsPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [showTable, setShowTable] = useState(false)
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const dataChange = async (event) => {
    setCategoryId(event.target.value);
  };

  const loadData = useCallback(async () => {
    try {
      const fetched = await request("api/categories/all", "GET", null, {
        Authorization: "Bearer" + " " + token,
      });
      setCategories(fetched);
    } catch (e) {}
  }, [token, request]);


  useLayoutEffect(() => {
    window.M.AutoInit();
  });

  useEffect(() => {
    loadData();
    setShowTable(true);
  }, [loadData]);


  if (loading) {
    return <Loader />;
  }
  
  return (
    <div>
      <h3 className=" center-align">Транзакції </h3>
      <div style={{ paddingTop: 10, marginTop: 15 }}>
        <div className="row">
          <div class="input-field col s3 offset-s1">
            <select onChange={dataChange} style={{ color: "black" }}>
              <option value="" selected>
                Виберіть категорію
              </option>
              {categories.map((category, index) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>
        </div>

        {showTable && <Table categoryId={categoryId} />}

        <a
          class="waves-effect indigo btn"
          style={{ marginTop: "8px", marginBottom: "2rem", marginLeft: 25 }}
          onClick={() => {
            navigate("/transactions/create");
          }}
        >
          Додати Транзакцію
        </a>
      </div>
    </div>
  );
};
