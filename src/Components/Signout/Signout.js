import React from 'react';

const Signout = ({onRouteChange}) => {
    return (
        <nav style = {{display: 'flex', justifyContent:'flex-end'}}>
            <h2 onClick={()=>onRouteChange('signin')} className='underline link dim pa3 pointer blue'>Sign Out</h2>
        </nav>
    );
}

export default Signout;