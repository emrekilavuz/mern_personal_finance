import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Menu from './Menu';
import SVGPart from './SVGPart';

import Features from './Features';
import About from './About';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Loading from './Loading';
import '../css/style.css';


const Home = () => {

    const my_aos_init_function = () => {
        AOS.init({
            offset: 200,
            delay: 0,
            duration: 800
        });
    };

    useEffect(() => {
       my_aos_init_function();
    }, []);

    const handleScroll = () => {
        if(window.location.pathname === "/"){
            //window.pageYOffset > stickyRef.current.getBoundingClientRect().top 
            window.pageYOffset > 0
        ? setSticky(true) : setSticky(false);
        }
    
    };

    

  useEffect(() => {
    
    return () => {
        window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

    const [isSticky, setSticky] = useState(false);

  window.addEventListener('scroll', handleScroll);

    return (
        <div>
            <Loading />
            <header>
            <Menu isSticky={isSticky}/>
            <SVGPart/>
            </header>
            <Features/>
            <About/>
            <Testimonials/>
            <Contact/>
        </div>

    );
}


export default Home;