import React, {useEffect, useRef, useState} from 'react';

const DataProvider = ({ url, children }) => {

    const [data, setData] = useState({});
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender) {
            fetch(url)
                .then(response => response.json())
                .then(data => setData(data));
            firstRender.current = false;
        }
    })

    return (
        <>
            { children(data) }
        </>
    );
};

export default DataProvider;