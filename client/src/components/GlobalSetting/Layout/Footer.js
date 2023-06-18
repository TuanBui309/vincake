import React from 'react'

export default function Footer() {
  return (
  <footer className="footer-area default-style">
  <div className="footer-main">
    <div className="container">
      <div className="row">
        <div className="col-md-5 col-lg-3">
          <div className="widget-item item-style3">
            <div className="about-widget">
              <a className="footer-logo" href="index.html">
                <img src="/assets/img/logovincake.png" alt="Logo" />
              </a>
              <p>Tên đơn vị: Công ty Cổ phần Bánh ngọt VinCake Số giấy chứng nhận đăng ký kinh doanh: 0104802706 Ngày cấp: 21/07/2010 Nơi cấp: Sở Kế hoạch và Đầu tư Tp. Hà Nội</p>
              <div className="widget-social-icons">
                <a href="#"><i className="ion-social-twitter" /></a>
                <a href="#"><i className="ion-social-tumblr" /></a>
                <a href="#"><i className="ion-social-facebook" /></a>
                <a href="#"><i className="ion-social-instagram-outline" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-2">
          <div className="widget-item item-style1">
            <h4 className="widget-title">Quick Links</h4>
            <h4 className="widget-title widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-1">Quick Links</h4>
            <div id="dividerId-1" className="collapse widget-collapse-body">
              <nav className="widget-menu-wrap">
                <ul className="nav-menu nav item-hover-style">
                  <li><a href="index.html">- Support</a></li>
                  <li><a href="index.html">- Helpline</a></li>
                  <li><a href="index.html">- Courses</a></li>
                  <li><a href="about.html">- About</a></li>
                  <li><a href="index.html">- Event</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="widget-item item-style1">
            <h4 className="widget-title">Other Page</h4>
            <h4 className="widget-title widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-2">Other Page</h4>
            <div id="dividerId-2" className="collapse widget-collapse-body">
              <nav className="widget-menu-wrap item-hover-style">
                <ul className="nav-menu nav">
                  <li><a href="about.html">- About</a></li>
                  <li><a href="blog.html">- Blog</a></li>
                  <li><a href="index.html">- Speakers</a></li>
                  <li><a href="contact.html">- Contact</a></li>
                  <li><a href="index.html">- Tricket</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-lg-2">
          <div className="widget-item item-style2">
            <h4 className="widget-title">Company</h4>
            <h4 className="widget-title widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-3">Company</h4>
            <div id="dividerId-3" className="collapse widget-collapse-body">
              <nav className="widget-menu-wrap item-hover-style">
                <ul className="nav-menu nav">
                  <li><a href="index.html">- Jesco</a></li>
                  <li><a href="shop.html">- Shop</a></li>
                  <li><a href="contact.html">- Contact us</a></li>
                  <li><a href="login-register.html">- Log in</a></li>
                  <li><a href="index.html">- Help</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-3">
          <div className="widget-item">
            <h4 className="widget-title">Store Information.</h4>
            <h4 className="widget-title widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#dividerId-4">Store Information.</h4>
            <div id="dividerId-4" className="collapse widget-collapse-body">
              <p className="widget-address">  Số 09 Trần Thái Tông, P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội</p>
              <ul className="widget-contact-info">
                <li>Phone/Fax: <a href="tel://0123456789">0352368762</a></li>
                <li>Email: <a href="mailto://demo@example.com">kid3092001@gmail.com</a></li>
              </ul>
              <div className="widget-payment-info">
                <div className="thumb">
                  <a href="index.html"><img src="/assets/img/photos/payment1.png" alt="Image" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="container">
      <div className="footer-bottom-content">
        <div className="row text-center">
          <div className="col-sm-12">
            <div className="widget-copyright">
              <p><i className="fa fa-copyright" /> 2021 <span>VinCake. </span> Made with <i className="fa fa-heart" /> by <a target="_blank" href="https://www.hasthemes.com">Dev</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-shape bg-img" data-bg-img="assets/img/photos/footer1.png" />
</footer>

  )
}
