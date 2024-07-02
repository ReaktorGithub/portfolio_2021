import React from 'react';

const Modifier = (WrappedComponent) => {

    return props => {
        return <WrappedComponent {...props} secretCode={'Ghqawcfw'}/>
    }
};

export default Modifier;