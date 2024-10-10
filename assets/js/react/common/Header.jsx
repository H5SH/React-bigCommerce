const Header = () => (
    <>
        <div className="banners">
            <div className="banner">
                HANDMADE FOR YOUR HOME
            </div>
        </div>
        <a href="#" className="mobileMenu-toggle" data-mobile-menu-toggle="menu">
            <span className="mobileMenu-toggleIcon">Toggle menu</span>
        </a>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', margin: '0.5%' }}>{'Render by React'}</h1>
        <div className="banners" style={{ backgroundColor: '#F0E8DF', color: 'black'}}>
            <div className="banner">
                <ul className="navPages-list">
                    <li className="navPages-item">
                        <a className="navPages-action">
                            COLLECTIONS
                        </a>
                    </li>
                    <li className="navPages-item">
                        <a className="navPages-action">
                            PILLOWS
                        </a>
                    </li>
                    <li className="navPages-item">
                        <a className="navPages-action">
                            CUSHIONS
                        </a>
                    </li>
                    <li className="navPages-item navPages-item-page">
                        <a className="navPages-action">
                            FABRIC & TRIM
                        </a>
                    </li>
                    <li className="navPages-item navPages-item-page">
                        <a className="navPages-action">
                            RESOURCES
                        </a>
                    </li>
                    <li className="navPages-item navPages-item-page">
                        <a className="navPages-action">
                            INSPIRATION
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </>
)

domRender(Header, '#react-header');

