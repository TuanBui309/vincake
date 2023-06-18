import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_ALL_CATEGORIES_SAGA, GET_ALL_NEWS, GET_ALL_NEWS_SAGA, GET_ALL_PRODUCTS_SAGA } from '../../redux/constants/Home';
import { Link, NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import Pagination from '../../components/GlobalSetting/Pagination/Pagination';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
};

export default function TrangChu() {
    const categoriesList = useSelector(state => state.HomeReducers.categoriesList);
    const productsList = useSelector(state => state.HomeReducers.productsList);
    const newslist = useSelector(state => state.HomeReducers.newslist);
    console.log('a',productsList)
    //pagi
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: GET_ALL_CATEGORIES_SAGA })
        dispatch({
            type:GET_ALL_PRODUCTS_SAGA,
            filter:{
                keyWord:'',
                filters:''
            }
        })
        dispatch({ type: GET_ALL_NEWS_SAGA })
        

    }, [])
    return (
        <main className="main-content">
            <section className="home-slider-area slider-default" style={{ paddingTop: 50, paddingBottom: 1 }}>
                <div className="home-slider-content">
                    <div className="swiper-container home-slider-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="home-slider-item">
                                    <div className="thumb-one bg-img" data-bg-img="assets/img/banner.jpg" />
                                    <div className="slider-content-area">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="content">
                                                        <div className="inner-content">
                                                            <h2>Cửa Hàng Bánh Online Tốt Thất Mọi Thời Đại</h2>
                                                            <p>Phục Vụ Những Chiếc Bánh thơm Ngon Nhất Đến Mọi Nhà</p>
                                                            <a href="shop.html" className="btn-theme">Shop This Now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="category-area product-category1-area">
                <div className="container">
                    <div className="row category-items1">
                        {categoriesList.map((item, index) => {
                            return <div className="col-sm-6 col-md-4" key={index}>
                                <div className="category-item">
                                    <div className="thumb thumb-style1">
                                        <NavLink to={`/sanpham/${item.id}`}> <img style={{ height: 200, width: 180 }} src={item.image} alt='a' /></NavLink>
                                        <div className="content">
                                            <div className="contact-info">
                                                <NavLink to={`/sanpham/${item.id}`} className='title'>{item.tenLoai}</NavLink>
                                                <h4 className="price"></h4>
                                            </div>
                                            <a className="btn-link" href="shop.html">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
            <section className="product-area product-style1-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="section-title text-center">
                                <h2 className="title">Sản Phẩm </h2>
                                <div className="desc">
                                    <p>Đa dạng các loại bánh, làm bánh theo yêu cầu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-tab-content">

                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="our-features" role="tabpanel" aria-labelledby="our-features-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="product">
                                                    <div className="row">
                                                        {productsList?.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => {
                                                            return <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                                                                <div className="product-item">
                                                                    <div className="product-thumb">
                                                                        <img src={item.image} alt="Image" style={{ width: 250, height: 250 }} />
                                                                        <div className="product-action">
                                                                            <a onClick={() => {
                                                                                dispatch({
                                                                                    type: 'ADD_TO_CART_SAGA',
                                                                                    cart: {
                                                                                        productId: item.id,
                                                                                        quantity: 1
                                                                                    }
                                                                                })
                                                                            }} className="action-quick-view"><i className="ion-ios-cart" /></a>
                                                                            <a className="action-quick-view"><i className="ion-arrow-expand" /></a>
                                                                            <a className="action-quick-view"><i className="ion-heart" /></a>
                                                                            <a className="action-quick-view"><i className="ion-shuffle" /></a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-info">
                                                                        <div className="rating">
                                                                            <span className="fa fa-star" />
                                                                            <span className="fa fa-star" />
                                                                            <span className="fa fa-star" />
                                                                            <span className="fa fa-star" />
                                                                            <span className="fa fa-star" />
                                                                        </div>
                                                                        <NavLink to={`/chitietsanpham/${item.id}`}> <h4 className="title">{item.tenSP}</h4></NavLink>
                                                                        <div className="prices">
                                                                            <span className="price"  >{item.sale?.toLocaleString()} </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <Pagination postsPerPage={postsPerPage}
                                            totalPosts={productsList.length}
                                            paginate={paginate}></Pagination>
                                    </div>
                                    <div className="tab-pane fade" id="best-sellers" role="tabpanel" aria-labelledby="best-sellers-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="product">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                                            <div className="product-item">
                                                                <div className="product-thumb">
                                                                    <img src="asdsd" alt="Image" style={{ width: 250, height: 250 }} />
                                                                    <div className="product-action">
                                                                        <a className="action-quick-view"><i className="ion-ios-cart" /></a>
                                                                        <a className="action-quick-view" ><i className="ion-arrow-expand" /></a>
                                                                        <a className="action-quick-view" href="shop-wishlist.html"><i className="ion-heart" /></a>
                                                                        <a className="action-quick-view" href="shop-compare.html"><i className="ion-shuffle" /></a>
                                                                    </div>
                                                                </div>
                                                                <div className="product-info">
                                                                    <div className="rating">
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                    </div>
                                                                    <h4 className="title"><a>sadasdasda new</a></h4>
                                                                    <div className="prices">
                                                                        <span className="price">3000001</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="new-items" role="tabpanel" aria-labelledby="new-items-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="product">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                                            <div className="product-item">
                                                                <div className="product-thumb">
                                                                    <img src="sdfsdfsf" alt="Image" style={{ width: 250, height: 250 }} />
                                                                    <div className="product-action">
                                                                        <a className="action-quick-view"><i className="ion-ios-cart" /></a>
                                                                        <a className="action-quick-view" ><i className="ion-arrow-expand" /></a>
                                                                        <a className="action-quick-view" href="shop-wishlist.html"><i className="ion-heart" /></a>
                                                                        <a className="action-quick-view" href="shop-compare.html"><i className="ion-shuffle" /></a>
                                                                    </div>
                                                                </div>
                                                                <div className="product-info">
                                                                    <div className="rating">
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                        <span className="fa fa-star" />
                                                                    </div>
                                                                    <h4 className="title"><a>asdasdadad</a></h4>
                                                                    <div className="prices">
                                                                        <span className="price">231231231</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="divider-area divider-style1-area bg-img" data-bg-img="assets/img/divider/bg1.png">
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="divider-content">
                                <h2 className="title">Giao Dịch Trong Ngày</h2>
                                <p><span>Giảm giá 10% </span> Cho tất cả sản phẩm</p>
                                <div className="countdown-content">
                                    <ul className="countdown-timer">
                                        <li><span className="days">00</span>
                                            <p className="days_text">Days</p>
                                        </li>
                                        <li><span className="hours">00</span>
                                            <p className="hours_text">Hours</p>
                                        </li>
                                        <li><span className="minutes">00</span>
                                            <p className="minutes_text">MINUTES</p>
                                        </li>
                                        <li><span className="seconds">00</span>
                                            <p className="seconds_text">SECONDS</p>
                                        </li>
                                    </ul>
                                </div>
                                <a className="btn-theme" href="shop.html">Shop Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="shape-group">
                        <div className="shape-style3" style={{left:'-207px'}}>
                            <img src="/assets/img/4.png" style={{ height: 532, width: 504 }} alt="Image" />
                        </div>
                        <div className="shape-style4" style={{right:'-188px'}}>
                            <img src="/assets/img/2.jpg" style={{ height: 532, width: 504 }} alt="Image" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-area blog-default-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-6 m-auto">
                            <div className="section-title text-center">
                                <h2 className="title">Tin Tức</h2>
                                <div className="desc">
                                    <p>Tin Tức và khuyến mãi cực sốc mà bạn không thể bỏ qua </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-tab1-slider slick-initialized slick-slider">
                                <Slider {...settings}>
                                    {newslist?.map((item, index) => {
                                        return <div key={index}>

                                            <div className="post-item" style={{ width: 280 }}>
                                                <div className="thumb">
                                                    <a><img src={item.image} alt="Image" /></a>
                                                </div>
                                                <div className="content">
                                                    <div className="meta">By, <a className="author" href="blog.html">{item.user1.name} </a></div>
                                                    <span className="dots" /><span className="post-date">{item.dateCreated}</span>
                                                    <h4 className="title">
                                                        {item.noiDung}
                                                    </h4>
                                                    <a className="btn-theme">Đọc Thêm</a>
                                                </div>
                                            </div>

                                        </div>
                                    })}


                                </Slider>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
