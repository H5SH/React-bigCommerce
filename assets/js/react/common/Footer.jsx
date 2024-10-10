

const Footer = ()=> (
    <>
    <h2 className="footer-title-sr-only">title</h2>
    <div className="container">
            <article className="footer-info-col
                footer-info-col--social
                footer-info-col--{{#if theme_settings.social_icon_placement_bottom '===' 'bottom_left'}}left{{else}}right{{/if}}"
                data-section-type="footer-webPages">
                    <h3 className="footer-info-heading">connect</h3>
            </article>
        <section className="footer-info">
            <article className="footer-info-col footer-info-col--small" data-section-type="footer-webPages">
                <h3 className="footer-info-heading">navigate</h3>
                <ul className="footer-info-list">
                        <li>
                        <a className='footer-info-anker' href="{{url}}">Hasham</a>
                        </li>
                    <li>
                        <a className='footer-info-anker' href="{{urls.sitemap}}">page_title</a>
                    </li>
                </ul>
            </article>

            <article className="footer-info-col footer-info-col--small" data-section-type="footer-categories">
                <h3 className="footer-info-heading">categories</h3>
                <ul className="footer-info-list">
                        <li>
                            <a className='footer-info-anker' href="{{url}}">Hasham</a>
                        </li>
                </ul>
            </article>

            {/* {{#and theme_settings.shop_by_brand_show_footer shop_by_brand.length}} */}
            <article className="footer-info-col footer-info-col--small" data-section-type="footer-brands">
                <h3 className="footer-info-heading">footer.brands</h3>
                <ul className="footer-info-list">
                        <li>
                            <a className='footer-info-anker' href="{{url}}">name</a>
                        </li>
                    <li><a className='footer-info-anker' href="{{urls.brands}}">view_all</a></li>
                </ul>
            </article>

            <article className="footer-info-col" data-section-type="newsletterSubscription">
                React
            </article>
        </section>
            <div className="footer-copyright">
                <p className="powered-by">powered_by<a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">BigCommerce</a></p>
            </div>
            <div className="footer-copyright">
                <p className="powered-by">&copy; 2024 Hasham Store </p>
            </div>
    </div>
    </>
)

domRender(Footer, '#react-footer')