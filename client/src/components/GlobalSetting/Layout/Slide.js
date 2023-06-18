import React, { Component } from 'react'
import Carousel from 'react-elastic-carousel';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
export default class Slide extends Component {
  state = {
    items: [
      { id: 1, title: 'item #1' },
      { id: 2, title: 'item #2' },
      { id: 3, title: 'item #3' },
      { id: 4, title: 'item #4' },
      { id: 5, title: 'item #5' }
    ]
  }
  render() {
    const { items } = this.state;

    return (

      <div>
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
                              <Carousel breakPoints={breakPoints}>

                                {items.map(item => <div key={item.id}>
                                  <div className="col-lg-3 col-md-4 col-sm-6" style={{width:250}}>

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

                                </div>)}
                              </Carousel>

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
      </div>
    )
  }
}
