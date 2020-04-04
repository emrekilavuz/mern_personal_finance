import React, {Fragment} from 'react';
import photo1 from '../img/customer.png';
import photo2 from '../img/growing.png';
import photo3 from '../img/security-svg.png';
import photo4 from '../img/access-svg.png';
const About = () => {

    return (
        <Fragment>
                <header className="main-about">
        <h1>About Us</h1>
    </header>

    <section id="about" className="container">

        <section className="card" data-aos="fade-right">
            <img src={photo1} alt="" />
            <div>
                <h3>Customer Satisfaction</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, excepturi nesciunt! Architecto esse
                    adipisci ratione dignissimos vitae! Odit recusandae tenetur et reprehenderit vel cumque quisquam
                    maxime, illo in magni praesentium!
                </p>
            </div>
        </section>

        <section className="card" data-aos="fade-left">
            <img src={photo2} alt="" />
            <div>
                <h3>Grow Together</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod error
                    enim laudantium, animi veniam libero eveniet culpa unde perferendis
                    illo fugit corporis, voluptatibus totam dolorum, maiores magnam
                    officia. Ab, delectus.
                </p>
            </div>
        </section>

        <section className="card" data-aos="fade-right">
            <img src={photo3} alt="" />
            <div>
                <h3>Security Comes First</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod error
                    enim laudantium, animi veniam libero eveniet culpa unde perferendis
                    illo fugit corporis, voluptatibus totam dolorum, maiores magnam
                    officia. Ab, delectus.
                </p>
            </div>
        </section>

        <section className="card" data-aos="fade-left">
            <img src={photo4} alt="" />
            <div>
                <h3>7/24 Accessibility</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod error
                    enim laudantium, animi veniam libero eveniet culpa unde perferendis
                    illo fugit corporis, voluptatibus totam dolorum, maiores magnam
                    officia. Ab, delectus.
                </p>
            </div>
        </section>

    </section>
        </Fragment>
    
    );

}

export default About;