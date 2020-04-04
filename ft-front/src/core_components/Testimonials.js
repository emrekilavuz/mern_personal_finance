import React from 'react';
import photo1 from '../img/te1.jpg';
import photo2 from '../img/te2.jpg';
import photo3 from '../img/te3.jpg';
const Testimonials = () => {
    return (
        <section className="testimonials" id="testimonials">
        <div className="inner">
            <h1>Testimonials</h1>
            <div className="border"></div>

            <div className="row">
                <div className="col">
                    <div className="testimonial">
                        <img src={photo1} alt=""/>
                        <div className="name">Adam Jr. Carter</div>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>

                        <p>
                            <q>
                                <i>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat velit provident non
                                    at
                                    amet! Consequatur ab modi, asperiores sit tempore quaerat vitae nisi, voluptate
                                    ipsam,
                                    et
                                    aliquam sequi ducimus suscipit.
                                </i>
                            </q>
                        </p>
                    </div>
                </div>

                <div className="col">
                    <div className="testimonial">
                        <img src={photo2} alt=""/>
                        <div className="name">Allison Smith</div>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>

                        <p>
                            <q>
                                <i>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, veritatis delectus
                                    beatae
                                    iure molestias quia nostrum numquam magni magnam perspiciatis doloribus, expedita id
                                    corporis officia illo quo unde eveniet nisi!
                                </i>
                            </q>
                        </p>
                    </div>
                </div>

                <div className="col">
                    <div className="testimonial">
                        <img src={photo3} alt=""/>
                        <div className="name">Emma Garner</div>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>

                        <p>
                            <q>
                                <i>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ex inventore
                                    similique
                                    dolore necessitatibus a dolorem, cumque maiores amet beatae corrupti, sint vero
                                    vitae, enim
                                    perferendis? Quo impedit enim optio.
                                </i>
                            </q>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Testimonials;