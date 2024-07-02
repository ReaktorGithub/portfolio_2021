import React from 'react';
import DataProvider from "./DataProvider";
import Posts from "./Posts";

const url = 'https://jsonplaceholder.typicode.com/posts';

const RenderProps = () => {
    return (
        <div style={{ margin: '60px auto', width: '60%'}}>
            <p>работает</p>
            <DataProvider url={url}>
                { (data) => <Posts posts={data}/> }
            </DataProvider>
        </div>
    );
};

export default RenderProps;