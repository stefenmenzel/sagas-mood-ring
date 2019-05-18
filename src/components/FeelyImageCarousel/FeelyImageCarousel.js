import React, {Component} from 'react';
import {connect} from 'react-redux';

class FeelyImageCarousel extends Component{

    render(){
        return(
            <div>
                <h2>Blah Blah Blah Feely Image Carousel</h2>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState};
}

export default connect()(FeelyImageCarousel)