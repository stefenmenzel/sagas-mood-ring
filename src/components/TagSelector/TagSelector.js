import React, {Component} from 'react';
import {connect} from 'react-redux';

class TagSelector extends Component{

    render(){
        return(
            <div>
                TESTING TAG SELECTOR!
            </div>
        )
    }
}

export default connect()(TagSelector);