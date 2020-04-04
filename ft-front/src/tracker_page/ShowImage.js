import React from 'react';
import {API} from '../config';

const ShowImage = ({item, url}) => {
    return(
        <div>
        <img src={`${API}/${url}/photo/${item._id}`} alt="tranImage" style={{maxWidth: "80%", maxHeight: "160px"}}/>
        </div>
    );
    
};

export default ShowImage;