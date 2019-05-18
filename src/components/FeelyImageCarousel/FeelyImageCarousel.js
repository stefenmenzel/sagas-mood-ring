import React, {Component} from 'react';
import {connect} from 'react-redux';

import TagSelector from '../TagSelector/TagSelector.js';
import '../FeelyImageCarousel/FeelyImageCarousel.css';

class FeelyImageCarousel extends Component{

    state = {
        currentImageIndex: 0
    }

    // componentDidMount(){
    //     this.props.dispatch({type:'FETCH_IMAGES'});
    // }

    //tidies up the image tag we want to render.
    renderImage = () => {
        return(
            <div className='carouselContainer'>
                <div className='carouselImageContainer'>
                    <img className='carouselImage' src={this.props.images[this.state.currentImageIndex].path} alt='' />        
                </div>
                <div className='carouselButtonContainer'>    
                    <button onClick={() => this.adjustIndex('decrease')}>Previous</button>
                    <button onClick={() => this.adjustIndex('increase')}>Next</button>
                </div>
            </div>
        )
    }

    //wait for data from the database before rendering image
    conditionalImage = () => {
        return(
            (this.props.images.length > 0) ?
            this.renderImage() :
            // <img src={this.props.images[this.state.currentImageIndex].path} alt=''/> :
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
                {this.conditionalImage()}
                <TagSelector currentImageIndex={this.state.currentImageIndex}/>                              
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