import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PRODUCTS_SAGA, GET_PRODUCT_BY_ID_CATEGORY_SAGA } from '../../redux/constants/Home';
import { NavLink, useParams } from 'react-router-dom';
import Pagination from '../../components/GlobalSetting/Pagination/Pagination';


const PageSize = 3;

export default function SanPham() {
  const [state, setState] = useState('')
  const handleChangeFilter = (e) => {
    let name = e.target.value
   

    dispatch({
      type: GET_ALL_PRODUCTS_SAGA,
      filter: {
        keyWord: '',
        filters: name
      }
    })







  }
  console.log('state', state)
  const listFilter = [{ id: 'new', name: 'Sản Phẩm Mới nhất' }, { id: 'nameAsc', name: 'Tên Từ A-Z' }, { id: 'nameDesc', name: 'Tên Từ Z-A' }, { id: 'priceAsc', name: 'Giá Tăng Dần' }, { id: 'priceDesc', name: 'Giá Giảm Dần' }]
  console.log(listFilter)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const productListByIdCategory = useSelector(state => state.HomeReducers.productListByIdCategory);
  const productsList = useSelector(state => state.HomeReducers.productsList);

  useEffect(() => {
   
    
    

    dispatch({
      type: GET_ALL_PRODUCTS_SAGA,
      filter: {
        keyWord: '',
        filters: ''
      }
    });





  }, [])
  return (
    <main className="main-content">
      {/*== Start Page Title Area ==*/}
      <section className="page-title-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 m-auto">
              <div className="page-title-content text-center">
                <h2 className="title">Product</h2>
                <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Product</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Title Area ==*/}
      {/*== Start Shop Area Wrapper ==*/}
      <div className="product-area product-grid-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-toolbar-wrap">
                <div className="product-showing-status">
                  <p className="count-result"><span></span></p>
                </div>
                <div className="product-view-mode">
                  <nav>
                    <div className="nav nav-tabs active" id="nav-tab" role="tablist">
                      <button className="nav-link active" id="column-three-tab" data-bs-toggle="tab" data-bs-target="#column-three" type="button" role="tab" aria-controls="column-three" aria-selected="true"><i className="fa fa-th" /></button>
                      <button className="nav-link" id="nav-list-tab" data-bs-toggle="tab" data-bs-target="#nav-list" type="button" role="tab" aria-controls="nav-list" aria-selected="false"><i className="fa fa-list" /></button>
                      <button className="nav-link" id="column-two-tab" data-bs-toggle="tab" data-bs-target="#column-two" type="button" role="tab" aria-controls="column-two" aria-selected="true"><i className="fa fa-th-large" /></button>
                    </div>
                  </nav>
                </div>
                <div className="product-sorting-menu product-sorting" >
                <label  style={{float:'left',marginTop:5,marginRight:5}}>Sắp Xếp:</label>
                  <span style={{display:'flex'} }>
                  
                    <select className="form-control" name="id" onChange={handleChangeFilter}>{listFilter?.map((item, index) => {
                      return <option key={index} value={item.id} >
                        {item.name}
                      </option>
                    })}
                    </select></span>

                </div>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="column-three" role="tabpanel" aria-labelledby="column-three-tab">
                  <div className="row" >
                    {productsList?.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => {
                      return <div key={item.id} className="col-lg-3 col-md-4 col-sm-6" >
                        {/* Start Product Item */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <img height="200px" width="300px" src={item.image} alt="Image" />
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
                              <a className="action-quick-view" href=""><i className="ion-arrow-expand" /></a>
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
                            <h4 className="title"><NavLink to={`/chitietsanpham/${item.id}`} >{item.tenSP}</NavLink></h4>
                            <div className="prices">
                              <span className="price">{item.sale?.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    })}
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="pagination-area">

                    <Pagination postsPerPage={postsPerPage}
                      totalPosts={productsList.length}
                      paginate={paginate}></Pagination>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}
