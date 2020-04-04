import React, {Fragment, useState, useEffect} from 'react';

import TrackMenu from './TrackMenu';
import TrackerBody from './TrackerBody';
import '../css/tracker.css';

const TrackerMain = () => {

    const handleScroll = () => {
        if(window.location.pathname === "/tracker"){
            window.pageYOffset > 1000
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
        <Fragment>
            <TrackMenu isSticky={isSticky}/>
            <TrackerBody/>
        </Fragment>
    );
};

export default TrackerMain; 