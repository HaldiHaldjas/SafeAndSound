import React, { Component } from 'react';

class Autocomplete extends Component {
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter a location"
                    ref={this.props.inputRef}
                />
            </div>
        );
    }
}

export default Autocomplete;