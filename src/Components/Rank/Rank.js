import React from 'react';

const Rank = ({name, entries}) => {
    return (
            <div>
                <div className='f6 fw5 white center'>
                    {`${name} , your current entries count is...`}
                </div>
                <div className='white f1 center'>
                    {entries}
                </div>
            </div>
    );
}

export default Rank;