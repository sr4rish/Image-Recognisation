import React from 'react';
import './Imgsearch.css'

const Imgsearch = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3 fw6 center'>This Image recognisation app can detect faces in your photos. Give it a try.</p>
            <div className='form center pa3'>
                <input type='text' className='w-70 br3 ma2 ba' onChange = {onInputChange}/>
                <button className='f4 pb1 link br3 w-30 mt2 mb2 grow white bg-purple shadow-2' onClick = {onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default Imgsearch;