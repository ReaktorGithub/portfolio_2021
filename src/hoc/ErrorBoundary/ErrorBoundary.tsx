import React from 'react'

export default class ErrorBoundary extends React.Component<{}, {hasError: boolean}> {

    constructor(props: {}) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch() {
        this.setState({
            hasError: true,
        })
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{color: 'red'}}>Что-то пошло не так... </h1>
        }

        return this.props.children
    }
}