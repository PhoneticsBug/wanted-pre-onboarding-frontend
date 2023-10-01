import React from 'react';

const MainPage = () => {
    return (
    
        <div className='main-page'>
            <h3> This is index page! </h3>
            <p> put your github repository link to see issues. </p>
            <div className='btn-group'>
                <input placeholder='repository link!'/>
                <button> submit! </button>
            </div>
            
        </div>

    )
}

export default MainPage;