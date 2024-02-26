import React, {useState, useContext, useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import Edit from "@material-ui/icons/EditOutlined";
import HighLightOff from "@material-ui/icons/DeleteOutline";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from "@material-ui/core/Button";
import "./style.css";

export const CategoriesPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState("");
    const [paginationInfo, setPaginationInfo] = useState();
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const loadCategories = useCallback(async (page = searchParams) => {
        try {
            const fetched = await request(`api/categories?${page.toString()}`, "GET", null, {
                Authorization: "Bearer" + " " + token,
            });
            setPaginationInfo(fetched);
            setCategories(fetched.data);
        } catch (e) {
        }
    }, [token, request]);

    const deleteCategory = useCallback(
        async (categoryId) => {
            try {
                const data = await request(
                    `api/categories/${categoryId}`,
                    "DELETE",
                    {},
                    {
                        Authorization: "Bearer" + " " + token,
                    }
                );
            } catch (e) {
            }
            loadCategories();
        },
        [token, request]
    );

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    if (loading) {
        return <Loader/>;
    }

    if (!categories.length) {
        return (
            <div className="row">
                <p className="center">Категорії відсутні</p>
                <a
                    class="col s2 offset-s5 waves-effect indigo btn center-align"
                    onClick={() => {
                        navigate("/categories/create");
                    }}
                >
                    Додати Категорію
                </a>
            </div>
        );
    }

    return (
        <div>
            <h3 className=" center-align">Категорії </h3>
            <div style={{paddingTop: 10, marginTop: 15}}>
                <table className="centered striped highlight">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Редагувати</th>
                    </tr>
                    </thead>

                    <tbody>
                    {categories.map((category, index) => {
                        return (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <IconButton>
                                        <Edit
                                            fontSize="large"
                                            onClick={() => {
                                                navigate("/categories/" + category.id);
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton>
                                        <HighLightOff
                                            fontSize="large"
                                            onClick={() => {
                                                deleteCategory(category.id, index);
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
                    {paginationInfo.meta.links.map((link, index) => {
                        if (link.label == '&laquo; Previous')
                            return (
                                <li>
                                    <a class="waves-effect" onClick={() => {
                                        navigate(link.url);
                                        loadCategories(link.url.substring(1));
                                    }}>
                                        <ChevronLeftIcon style={{color: 'indigo'}} fontSize="large"/>
                                    </a>
                                </li>)
                        if (link.label == 'Next &raquo;')
                            return (
                                <li>
                                    <a class="waves-effect" onClick={() => {
                                        navigate(link.url);
                                        loadCategories(link.url.substring(1));
                                        }}>
                                        <ChevronRightIcon style={{color: 'indigo'}} fontSize="large"/>
                                    </a>
                                </li>)
                        return (
                            <li className={`waves-effect ${link.active ? 'active indigo' : ''}`}>
                                <a  onClick={() => {
                                    navigate(link.url);
                                    loadCategories(link.url.substring(1));
                                    }}>
                                    {link.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <a
                    class="waves-effect indigo btn"
                    style={{marginTop: "8px", marginBottom: "2rem", marginLeft: 25}}
                    onClick={() => {
                        navigate("/categories/create");
                    }}
                >
                    Додати Категорію
                </a>
            </div>
        </div>
    );
};
