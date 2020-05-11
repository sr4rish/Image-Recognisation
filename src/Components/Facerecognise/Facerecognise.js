import React from 'react';
import './Facerecognise.css';

const Facerecognise = ({faceBox, imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500rem' height='auto'/>
                <div className='bounding-box' style={{top: faceBox.topRow, left:faceBox.leftCol, right:faceBox.rightCol, bottom:faceBox.bottomRow}}></div>
            </div>
        </div>
    );
}

export default Facerecognise;
