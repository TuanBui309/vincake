import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'
import { HomeReducers } from '../../redux/reducers/HomeReducers'
import { GET_ALL_PRODUCTS_SAGA, GET_PRODUCT_DETAIL } from '../../redux/constants/Home';
import Home from '../../components/GlobalSetting/Main/Home';
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";
import { Editor } from '@tinymce/tinymce-react'
import { DELETE_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../redux/constants/Comment';
import { USER_LOGIN } from '../../util/constants/settingSystem';

export default function ChiTietSanPham(props) {
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visible, setVisible] = useState(false);
  const [historyContent, setHistoryContent] = useState("history");
  const [content, setContent] = useState("history");
  const userLogin=useSelector(state=>state.AuthReducers.userLogin)
  const renderDescription = () => {

    return <div>
      {visibleEditor ? <div> <Editor
        name="contentComment"
        // initialValue={productDetail.tenSP}
        init={{
          selector: 'textarea#myTextArea',
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={(content, editor) => {
          setContent(content);
        }}
      />

        <button className="btn btn-primary m-2" onClick={() => {
          dispatch({
              type:INSERT_COMMENT_SAGA,
              cmtInserModel:{
                productId:productDetail.id,
                contentComment:content
                
              }
              
          })
          console.log(content)
          setVisibleEditor(false);
        }}>Save</button>
        <button className="btn btn-primary m-2" onClick={() => {
          // dispatch({
          //     type:HANDLE_CHANGE_POST_API_SAGA,
          //     actionType:CHANGE_TASK_MODAL,
          //     name: 'description',
          //     value: historyContent
          // })

          //    dispatch({
          //         type: CHANGE_TASK_MODAL,
          //         name: 'description',
          //         value: historyContent
          //     })
          setVisibleEditor(false)
        }}>Close</button>
      </div> : <div> </div>}


    </div>
  }
  


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  let [state, setState] = useState({

    values: {
        
        quantity: 0
    },

});

  const handleChangeProduct = (e) => {
    let { name, value } = e.target;
    let newValues = { ...state.values };
    console.log(state)


    newValues = { ...newValues, [name]: value };
    setState({
        ...state,
        values: newValues,

    })
}
  const { productId } = useParams()
  const dispatch = useDispatch()
  console.log('aaaa', productId)
  useEffect(() => {
    //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga

    dispatch({
      type: GET_PRODUCT_DETAIL,
      productIdModel: productId
    });
  }, [1])
  const productDetail = useSelector(state => state.HomeReducers.productDetail);
  const editComment = useSelector(state => state.CommentReducers.editComment);
  console.log('aaa',editComment)

  return (

    <main className="main-content" >
      {/*== Start Page Title Area ==*/}
      <section className="page-title-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 m-auto">
              <div className="page-title-content text-center">
                <h2 className="title">Product</h2>
                <div className="bread-crumbs"><a > Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Product</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Title Area ==*/}
      {/*== Start Shop Area ==*/}
      <section className="product-single-area">
        <div className="container">
          <div className="row" style={{ marginBottom: 100 }}>
            <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-0">
              <div className="single-product-slider">
                <div className="single-product-thumb">
                  <div className="swiper-container single-product-thumb-slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide zoom zoom-hover">
                        <div className="thumb-item">
                          <a className="lightbox-image" data-fancybox="gallery" href='aaaa'>
                            <img src={productDetail.image} alt="Image-HasTech" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-product-nav">
                  <div className="swiper-container single-product-nav-slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                      </div>
                      <div className="swiper-slide">
                      </div>
                      <div className="swiper-slide">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-product-info">
                <h4 className="title">{productDetail.tenSP}</h4>
                <div className="prices">
                  <span className="price">{productDetail.sale}</span>
                </div>
                <div className="product-rating">
                  <div className="rating">
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                  <div className="review">
                    <a href="#/">( 5 Customer Review )</a>
                  </div>
                </div>
                <div className="single-product-featured">
                  <ul>
                    <li><i className="fa fa-check" /> Miễn Phí Vận Chuyển</li>
                    <li><i className="fa fa-check" /> Hỗ trợ 24/7</li>
                    <li><i className="fa fa-check" /> Hoàn Tiền Nếu Bánh Không Đạt Yêu Cầu</li>
                  </ul>
                </div>
                <p className="product-desc" />
                <div className="quick-product-action">
                  <form>
                    <div className="action-top">
                      <div className="pro-qty">
                        <input type="text" defaultValue={1} name='quantity' onChange={handleChangeProduct} id="quantity" title="Quantity" />
                        <div>

                        </div>
                      </div>
                      <span  className="btn btn-theme" onClick={()=>{dispatch({
                                                                                    type: 'ADD_TO_CART_SAGA',
                                                                                    cart: {
                                                                                        productId: productDetail.id,
                                                                                        quantity: state.values.quantity
                                                                                    }
                                                                                })}} style={{ background: 'antiquewhite', color: 'black' }}>Add to Cart</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="product-description-review">
                  <ul className="nav nav-tabs product-description-tab-menu" id="myTab" role="tablist">


                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="product-review-tab" data-bs-toggle="tab" data-bs-target="#productReview" type="button" role="tab" aria-controls="productReview" aria-selected="true">Reviews (03)</button>
                    </li>
                  </ul>
                  <div className="tab-content product-description-tab-content" id="myTabContent">


                    <div className="tab-pane fade active show" id="productReview" role="tabpanel" aria-labelledby="product-review-tab">
                      <div className="product-review">
                        <div className="review-header" style={{border:'none'}}>
                          <h4 className="title">Customer Reviews</h4>
                          <div className="review-info">
                            <ul className="review-rating">
                              <li><i className="fa fa-star" /></li>
                              <li><i className="fa fa-star" /></li>
                              <li><i className="fa fa-star" /></li>
                              <li><i className="fa fa-star" /></li>
                              <li><i className="fa fa-star-o" /></li>
                            </ul>

                            <span className="review-write-btn" onClick={() => {
                            setVisibleEditor(!visibleEditor);

                          }}>Write a review</span>
                          </div>
                        </div>
                        <div className="product-review-form" style={{ display: 'block' }}>
                       
                          <div className="description">

                            {renderDescription()}
                          </div>


                        </div>
                        <div className="review-content" >
                          {productDetail.lstComment?.map((item, index) => {
                            return <div style={{ borderBottom: '1px solid #ECECEC', marginTop: 30 }} className="review-item" key={index}>

                              <h4 className="title">{item.name}</h4>
                              <h5 className="review-date"><span>{item.name}</span> on <span>{item.created_at}</span></h5>
                              <div className="description">

                               
                                <div>
                                  {visible && item.id===editComment.id ? <div> <Editor
                                    name="description"
                                    initialValue={item.commentContent}
                                    init={{
                                      selector: 'textarea#myTextArea',
                                      height: 500,
                                      menubar: false,
                                      plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                      ],
                                      toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={(content, editor) => {
                                      setContent(content);
                                    }}
                                  />

                                    <button className="btn btn-primary m-2" onClick={() => {
                                      dispatch({
                                          type:UPDATE_COMMENT_SAGA,
                                         
                                          cmtUpdateMOdel:{
                                            productId:productDetail.id,
                                       
                                            id:item.id,
                                            contentComment:content
                                            
                                          }
                                         
                                      })
                                      console.log(productDetail.id)
                                      setVisible(false);
                                    }}>Save</button>
                                    <button className="btn btn-primary m-2" onClick={() => {
                                      // dispatch({
                                      //     type:HANDLE_CHANGE_POST_API_SAGA,
                                      //     actionType:CHANGE_TASK_MODAL,
                                      //     name: 'description',
                                      //     value: historyContent
                                      // })

                                      //    dispatch({
                                      //         type: CHANGE_TASK_MODAL,
                                      //         name: 'description',
                                      //         value: historyContent
                                      //     })
                                      setVisible(false)
                                    }}>Close</button>
                                  </div> : <div onClick={() => {


                                    setHistoryContent("aaaaaa");
                                    setVisible(!visible);

                                  }}>{ReactHtmlParser(item.commentContent)}</div>}


                                </div>
                              </div>
                              {userLogin.id===item.idUser?(   <div style={{display:'flex'}}>
                                
                                <span style={{cursor: 'pointer',marginRight:10}} className="review-report" onClick={() => {
                                  setHistoryContent("aaaaaa");
                                  setVisible(!visible);
                                  dispatch({type:'EDIT_COMMENT',
                                  commentModel:item,
                                })
  
                                }} >Edit</span>
                                      < span style={{cursor: 'pointer'}} className="review-report" onClick={() => {
                                 dispatch({
                                  type:DELETE_COMMENT_SAGA,
                                  idComment:item.id,
                                  productId:productDetail.id
                                 })
  
                                }}>Delete</span>
                                </div>):<div></div>}
                           

                            </div>
                          })}
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

      <section className="product-slider-area related-product-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="section-title text-center">
                <h2 className="title">Sản Phẩm Tương tự</h2>
                <div className="desc">
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-tab1-slider slick-initialized slick-slider">
                <Slider {...settings}>
                  {productDetail.related?.map((item1, index) => {
                    return <div key={index}>
                      <div className="product-item" style={{ width: 350 }}>
                        <div className="product-thumb">
                          <img height="200px" width="300px" src={item1.image} alt="Image" />
                          <div className="product-action">
                            <a onClick={() => {
                              dispatch({
                                type: 'ADD_TO_CART_SAGA',
                                cart: {
                                  productId: item1.id,
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
                          <h4 className="title">    <Link onClick={() => {
                            dispatch({
                              type: GET_PRODUCT_DETAIL,
                              productIdModel: item1.id
                            })
                          }} to={`/chitietsanpham/${item1.id}`}> <h4 className="title">{item1.tenSP}</h4></Link></h4>
                          <div className="prices">
                            <span className="price">{item1.sale.toLocaleString()} Vnd</span>
                          </div>
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
