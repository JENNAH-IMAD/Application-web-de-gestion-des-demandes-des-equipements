
import { Layout } from 'antd';

import icon1 from '../../../assets/icon1.png'
import inconlink from '../../../assets/iconlink.png'
import './Footer.css';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer">
    <div className="footer-content">
      <div className="footer-text-container">
        <span className="footer-text">© 2024 MunisysEquipe. All Rights Reserved. Terms of Service | Privacy Policy</span>
      </div>
      <div className="footer-icons">
          <a target='_blank' href="https://www.munisys.ma/"><img src={icon1}></img> </a>
          <a target='_blank'  href="https://www.linkedin.com/company/munisys/"><img src={inconlink}></img> </a>
        </div>
    </div>
  </Footer>
);

export default AppFooter;
