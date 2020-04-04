import React from 'react';
import photo1 from '../img/security.png';
import photo2 from '../img/access.png';
import photo3 from '../img/any-type.png';
import photo4 from '../img/colloboration.png';

const Features = () => {
    return(
        <section id={'features'}>
        <div className="container">
            <div className="features-title">
                <h1>Features</h1>
            </div>
            <div className="feature">
                <div>
                    <img src={photo1} alt=""/>
                    <h3>Security you can trust</h3>
                    <p>2-factor authentication and user-controlled encryption are just a couple of the security
                        features we allow to help secure your files.</p>
                </div>
                <div>
                    <img src={photo2} alt=""/>
                    <h3>Access your files, anywhere</h3>
                    <p>The ability to use a smartphone, tablet, or computer to access your account means your
                        files follow you everywhere.</p>
                </div>
                <div>
                    <img src={photo3} alt=""/>
                    <h3>Store any type of file</h3>
                    <p>Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all
                        file types to be securely stored and shared.</p>
                </div>
                <div>
                    <img src={photo4} alt=""/>
                    <h3>Real-time collaboration</h3>
                    <p>Securely share files and folders with friends, family and colleagues for live collaboration.
                        No email attachments required.</p>
                </div>
            </div>


        </div>
    </section>
    );
};


export default Features;