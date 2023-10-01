import React from 'react';

const MainPage = () => {
    return (
    
        <div className='main-page'>
            <h3> This is index page! </h3>
            <div className='btn-group'>
                <p> put your github repository link to see issues. </p>
                
            </div>
            <input placeholder='repository link!'/>
            <button> submit! </button>
        </div>

    )
}

export default MainPage;