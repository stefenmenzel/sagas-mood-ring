import React, {Component} from 'react';
import {connect} from 'react-redux';

class FeelyImageCarousel extends Component{

    state = {
        currentImageIndex: 0
    }

    // componentDidMount(){
    //     this.props.dispatch({type:'FETCH_IMAGES'});
    // }

    renderImage = () => {
        return(
            (this.props.images.length > 0) ?
            <img src={this.props.images[this.state.currentImageIndex].path} alt=''/> :
            <div></div>
        )
    }

    adjustIndex = (incrementOrDecrement) => {
        if(incrementOrDecrement === 'increase'){
            if(this.state.currentImageIndex+1 > this.props.images.length-1)
            this.setState({
                currentImageIndex: 0
            });
            else{
                this.setState({
                    currentImageIndex: this.state.currentImageIndex+1
                })
            }
        }
        else{
            if(this.state.currentImageIndex-1 < 0){
                this.setState({
                    currentImageIndex: this.props.images.length-1
                });
            }
            else{
                this.setState({
                    currentImageIndex: this.state.currentImageIndex - 1
                });
            }            
        }
    }

    render(){
        console.log("image 0 path is:", this.props.images[0]);
        return(
            <div>
                <pre>{JSON.stringify(this.props.images[0])}</pre>
                <button onClick={() => this.adjustIndex('decrease')}>Previous</button>
                {this.renderImage()}
                <button onClick={() => this.adjustIndex('increase')}>Next</button>
                {/* <img src={this.props.images[this.state.currentImageIndex].path} alt=''/> */}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        images: reduxState.images,
        tags: reduxState.tags
    };
};

export default connect(mapStateToProps)(FeelyImageCarousel)