import React, {useCallback, useContext, useEffect, useState} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import moment from "moment/moment";
import IconButton from "@material-ui/core/Button";
import Edit from "@material-ui/icons/EditOutlined";
import HighLightOff from "@material-ui/icons/DeleteOutline";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const Table = (props) => {
    const navigate = useNavigate();
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState([]);

    const loadTransactions = async (categoryId, page = 1) => {
        try {
            const fetched = await request(`api/transactions?categoryId=${categoryId}&page=${page}`, "GET", null, {
                Authorization: "Bearer" + " " + token,
            });
            setPaginationInfo(fetched);
            setTransactions(fetched.data);
        } catch (e) {}
    };

    const deleteTransaction = useCallback(
        async (transactionId) => {
            try {
                const data = await request(
                    `api/transactions/${transactionId}`,
                    "DELETE",
                    {},
                    {
                        Authorization: "Bearer" + " " + token,
                    }
                );
            } catch (e) {}
            loadTransactions(props.categoryId);
        },
        [token, request]
    );

    useEffect(() => {
        loadTransactions(props.categoryId);
    }, [props.categoryId]);

    if (loading) {
        return <Loader />;
    }

    const topBottomMargin = {
        marginTop: 15,
        marginBottom: 15,
    };

    return(
        <div className="row">
            <table className="col s12 centered striped highlight">
                <thead>
                <tr>
                    <th className="col s1">№</th>
                    <th className="col s2">Категорія</th>
                    <th className="col s2">Тип операції</th>
                    <th className="col s1">Сума</th>
                    <th className="col s1">Дата</th>
                    <th className="col s3">Опис</th>
                    <th className="col s2 ">Управління</th>
                </tr>
                </thead>

                <tbody>
                {transactions.map((transaction, index) => {
                    return (
                        <tr key={transaction.id} style={{ marginTop: 15 }}>
                            <td className="col s1" style={topBottomMargin}>
                                {(paginationInfo.meta.from) + index}
                            </td>
                            <td className="col s2" style={topBottomMargin}>
                                {transaction.categoryName}
                            </td>
                            <td className="col s2" style={topBottomMargin}>
                                {transaction.type}
                            </td>
                            <td className="col s1" style={topBottomMargin}>
                                {Number(transaction.sum).toFixed(2)} ₴
                            </td>
                            <td className="col s1" style={topBottomMargin}>
                                {moment(transaction.dateInfo).format("DD.MM.YYYY")}
                            </td>
                            <td className="col s3" style={topBottomMargin}>
                                {transaction.description}
                            </td>
                            <td className="col s2">
                                <IconButton>
                                    <Edit
                                        fontSize="large"
                                        onClick={() => {
                                            navigate("/transactions/" + transaction.id);
                                        }}
                                    />
                                </IconButton>
                                <IconButton>
                                    <HighLightOff
                                        fontSize="large"
                                        onClick={() => {
                                            deleteTransaction(transaction.id);
                                        }}
                                    />
                                </IconButton>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <ul className="pagination large" style={{marginTop: "25px"}}>
                {paginationInfo.meta && paginationInfo.meta.links && paginationInfo.meta.links.map((link, index) => {
                    if (link.label === '&laquo; Previous')
                        return (
                            <li>
                                <a class="waves-effect" onClick={() => {
                                    loadTransactions(props.categoryId,link.url.split('=')[1]);
                                }}>
                                    <ChevronLeftIcon style={{color: 'indigo'}} fontSize="large"/>
                                </a>
                            </li>)
                    if (link.label === 'Next &raquo;')
                        return (
                            <li>
                                <a class="waves-effect" onClick={() => {
                                    loadTransactions(props.categoryId,link.url.split('=')[1]);
                                }}>
                                    <ChevronRightIcon style={{color: 'indigo'}} fontSize="large"/>
                                </a>
                            </li>)
                    return (
                        <li className={`waves-effect ${link.active ? 'active indigo' : ''}`}>
                            <a  onClick={() => {
                                loadTransactions(props.categoryId,link.url.split('=')[1]);
                            }}>
                                {link.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}