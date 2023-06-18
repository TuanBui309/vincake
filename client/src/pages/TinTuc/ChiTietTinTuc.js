import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GET_ALL_NEWS_DETAIL_SAGA, GET_ALL_NEWS_SAGA } from '../../redux/constants/Home'
import ReactHtmlParser from "react-html-parser";
export default function ChiTietTinTuc() {
    const { newsId } = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch({
            type:GET_ALL_NEWS_SAGA
        })
        //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga

        dispatch({
            type: GET_ALL_NEWS_DETAIL_SAGA,
            newsId: newsId
        });
    }, [1])
    const newsDetail = useSelector(state => state.HomeReducers.newsDetail);
    const user1 = useSelector(state => state.HomeReducers.user1);
    const newslist = useSelector(state => state.HomeReducers.newslist);
    const content=ReactHtmlParser(newsDetail.moTa)
    
    return (
        <main className="main-content">
  {/*== Start Page Title Area ==*/}
  <section className="page-title-area">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12 m-auto">
          <div className="page-title-content text-center">
            <h2 className="title">Blog</h2>
            <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Blog</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
  <section className="blog-details-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 order-0 order-lg-1">
          <div className="post-details-content">
            <div className="post-details-body">
              <div className="content">
                <div className="meta">By, <a className="author" href="blog.html"> {user1.name}</a><span className="dots" /><span className="post-date">{newsDetail.dateCreated}</span></div>
                <h4 style={{textAlign:'center'}} className="title"> <p>{newsDetail.noiDung}</p></h4>
               
                <div className="thumb">
                  <img className="w-100" src={newsDetail.image} style={{width: 300, height: 500}} alt="Image" />
                </div>
                {content}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 order-1 order-lg-0">
          <div className="sidebar-area blog-sidebar-area">
            <div className="widget-item">
              <div className="widget-body">
                <div className="widget-search-box">
                  <form action="#" method="post">
                    <div className="form-input-item">
                      <label htmlFor="search2" className="sr-only">Search</label>
                      <input type="text" id="search2" placeholder="Search" />
                      <button type="submit" className="btn-src">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="widget-item">
              <div className="widget-title blog-post-title">
                <h3 className="title">Recent Post</h3>
              </div>
              <div className="widget-body">
               {newslist?.map((item,index)=>{
                return  <div key={index} className="widget-blog-post" >
                <div className="thumb">
                  <a ><img src={item.image} alt="Image" style={{width: 98, height: 75}} /></a>
                </div>
                <div className="content">
                  <span>{item.dateCreated}</span>
                  <h4><a >{item.noiDung}</a></h4>
                </div>
              </div>
               })}
              </div>
            </div>
            {/* <div class="widget-item widget-item2">
                      <div class="widget-title blog-post-title">
                          <h3 class="title">Categories</h3>
                      </div>
                      <div class="widget-body">
                          <div class="widget-categories">
                              <ul>
                                  <li><a href="blog.html">Baby Toys</a></li>
                                  <li><a href="blog.html">Baby Dress</a></li>
                                  <li><a href="blog.html">Baby Dayper</a></li>
                                  <li><a href="blog.html">Baby Book</a></li>
                              </ul>
                          </div>
                      </div>
                  </div> */}
            {/* <div class="widget-item">
                      <div class="widget-title blog-post-title">
                          <h3 class="title">Subscribe</h3>
                      </div>
                      <div class="widget-body">
                          <div class="widget-newsletter">
                              <div class="newsletter-form">
                                  <form action="#">
                                      <input class="form-control" type="email" placeholder="Enter Your Email">
                                          <button class="btn btn-theme" type="submit">Subscribe Now</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="widget-item widget-item2 mb-md-0">
                      <div class="widget-title blog-post-title">
                          <h3 class="title">Tags</h3>
                      </div>
                      <div class="widget-body">
                          <div class="widget-tags">
                              <ul>
                                  <li><a href="blog.html">Baby</a></li>
                                  <li><a class="babyfashion" href="blog.html">BabyFashion</a></li>
                                  <li><a class="toy" href="blog.html">Toy</a></li>
                                  <li><a href="blog.html">Baby Toy</a></li>
                              </ul>
                          </div>
                      </div>
                  </div> */}
          </div>
        </div>
      </div>
    </div>
  </section>
  
</main>

    )
}
