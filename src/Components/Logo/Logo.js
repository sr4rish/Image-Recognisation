import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma3'>
            <Tilt className="Tilt br3 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner">
                    <img alt='Logo' src={logo}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;