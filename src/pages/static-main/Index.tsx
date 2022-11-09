import * as React from 'react';
import "../../style/page/index/style.scss";

const IndexPage = () => {
    return <div className='index-page'>
        <div className='top'>
            <div className='navbar'>
                <div className='logo'></div>
                <div className='items'>
                    <a className='link' href='/'>Home</a>
                    <a className='link' href='/about'>About</a>
                </div>
                <a className='go-to-app link' href='/app'>Open DiscDoor</a>
            </div>
            <div className='banner'>
                <div className='middle'>
                    <div className='main'>It's time to use DiscDoor.</div>
                    <div className='sub'>Free text and community chat from the DiscDoor team.</div>
                </div>
            </div>
        </div>
    </div>
}

export default IndexPage