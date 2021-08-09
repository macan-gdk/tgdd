import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class FooterComponent extends React.Component {
    render() {
        return (
            <Footer id="footer">
                <div className="row">
                    <div className="col-8 col-md footmargin">
                        <h5>Thế giới di động<small className="d-block mb-4 text-muted">&copy;2020</small></h5>

                    </div>
                    <div className="col-2 col-md">
                        <p>Giới thiệu công ty </p>
                        <p>Tuyển dụng </p>
                        <p>Góp ý </p>
                        <p>Khiếu nại </p>
                    </div>
                    <div className="col-2 col-md">
                        <p>Gọi mua hàng : <a id="a">18001060 </a> </p>
                        <p>Gọi khiếu nại :<a id="a">18001060 </a></p>
                        <p>Gọi bảo hành :<a id="a">18001060 </a></p>
                        <p>Gọi kĩ thuật :<a id="a">18001060 </a></p>
                    </div>
                    <div className="col-2 col-md">
                        <ul className="list-unstyled text-small">
                            <br />
                            <li><img src="./bocongthuong.png" width="150px" alt="bocongthuong" /></li>
                            <li><img src="./sanphamchinhhang.png" width="150px" alt="sanphamchinhhang" /></li>
                        </ul>
                    </div>
                </div>
            </Footer>
        );
    }
}