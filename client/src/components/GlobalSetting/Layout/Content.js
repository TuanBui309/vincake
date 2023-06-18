import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';

export default function Content() {
    
   
    return (

        <div>
           
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
                            <div className="col-sm-6 col-md-4">
                                <div className="category-item">
                                    <div className="thumb thumb-style1">
                                        <a href='s'> <img style={{ height: 200, width: 200 }} src="asdasd" alt='a' /></a>
                                        <div className="content">
                                            <div className="contact-info">
                                                <a href='a'><h2 className="title" /> </a>
                                                <h4 className="price">$32.00</h4>
                                            </div>
                                            <a className="btn-link" href="shop.html">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="our-features-tab" data-bs-toggle="tab" data-bs-target="#our-features" type="button" role="tab" aria-controls="our-features" aria-selected="true">Sản Phẩm Hot</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="best-sellers-tab" data-bs-toggle="tab" data-bs-target="#best-sellers" type="button" role="tab" aria-controls="best-sellers" aria-selected="false">Sản Phẩm Mới</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link mr-0" id="new-items-tab" data-bs-toggle="tab" data-bs-target="#new-items" type="button" role="tab" aria-controls="new-items" aria-selected="false">Sản Phẩm</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="our-features" role="tabpanel" aria-labelledby="our-features-tab">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="product">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                                <div className="product-item">
                                                                    <div className="product-thumb">
                                                                        <img src="" alt="Image" style={{ width: 250, height: 250 }} />
                                                                        <div className="product-action">
                                                                            <a className="action-quick-view"><i className="ion-ios-cart" /></a>
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
                                                                        <h4 className="title"><a /></h4>
                                                                        <div className="prices">
                                                                            <span className="price" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                                                            <a className="action-quick-view" href="javascript:void(0)"><i className="ion-arrow-expand" /></a>
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
                                                                            <a className="action-quick-view" href="javascript:void(0)"><i className="ion-arrow-expand" /></a>
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
                            <div className="shape-style3">
                                <img src="assets/img/4.png" style={{ height: 532, width: 504 }} alt="Image" />
                            </div>
                            <div className="shape-style4">
                                <img src="assets/img/2.jpg" style={{ height: 532, width: 504 }} alt="Image" />
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
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="post-item">
                                    <div className="thumb">
                                        <a><img src="ssdsfs" alt="Image" /></a>
                                    </div>
                                    <div className="content">
                                        <div className="meta">By, <a className="author" href="blog.html">Admin </a><span className="dots" /><span className="post-date">asdasdasdad{'}'}</span></div>
                                        <h4 className="title">
                                            <a />
                                        </h4>
                                        <a className="btn-theme">Đọc Thêm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>

    )
}
