import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_NEWS_SAGA } from '../../redux/constants/Home'
import { NavLink } from 'react-router-dom';

export default function TinTuc() {
    const newslist = useSelector(state => state.HomeReducers.newslist);
    console.log(newslist)
     const dispatch=useDispatch()
     useEffect(() => {
       
        
        dispatch({ type: GET_ALL_NEWS_SAGA })
        

    }, [])
 
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
  {/*== End Page Title Area ==*/}
  {/*== Start Blog Area Wrapper ==*/}
  <section className="blog-area blog-grid-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-content-area">
            <div className="row">
                {newslist?.map((item,index)=>{
                    return   <div className="col-sm-6 col-md-4" key={index} >
                    {/*== Start Blog Post Item ==*/}
                    <div className="post-item">
                      <div className="thumb">
                        <NavLink to={`/chitiettintuc/${item.id}`} ><img src={item.image} height={269} alt="Image" /></NavLink>
                      </div>
                      <div className="content">
                        <div className="meta">By, <a className="author" href="blog.html">{item.user1.name} </a><span className="dots" /><span className="post-date">{item.dateCreated}</span></div>
                        <h4 className="title">
                          <NavLink to={`/chitiettintuc/${item.id}`}>{item.noiDung}</NavLink>
                        </h4>
                        <NavLink to={`/chitiettintuc/${item.id}`} className="btn-theme" >Read More</NavLink>
                      </div>
                    </div>
                    {/*== End Blog Post Item ==*/}
                  </div>
                })}
                
           
            </div>
            {/* <div class="row">
          <div class="col-lg-12">
            <div class="pagination-area">
              <nav>
                <ul class="page-numbers">
                  <li>
                    <a class="page-number active" href="blog.html">1</a>
                  </li>
                  <li>
                    <a class="page-number" href="blog.html">2</a>
                  </li>
                  <li>
                    <a class="page-number" href="blog.html">3</a>
                  </li>
                  <li>
                    <a class="page-number next" href="blog.html">
                      <i class="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</div>
    </section>
    
  </main>
*/}</div></div></div></div></section></main>

  )
}
