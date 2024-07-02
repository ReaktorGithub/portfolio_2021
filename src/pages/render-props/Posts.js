import React from 'react';

const Posts = ({ posts }) => {

    return (
        <ul>
            {
                Object.keys(posts).length &&
                posts.map(item => {
                    return <li key={item.id}>
                        {item.title}
                    </li>
                })
            }
        </ul>
    );
};

export default Posts;