import React, {Component} from 'react';
import {connect} from 'react-redux';

import TagSelector from '../TagSelector/TagSelector.js';
import '../FeelyImageCarousel/FeelyImageCarousel.css';

class FeelyImageCarousel extends Component{

    state = {
        currentImageIndex: 0
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_APPLIED_TAGS', payload: { id: this.state.currentImageIndex+1 } });
    }

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
            <div></div>
        )
    }

    adjustIndex = (incrementOrDecrement) => {
        let newIndex = this.state.currentImageIndex;
        if(incrementOrDecrement === 'increase'){
            if(this.state.currentImageIndex+1 > this.props.images.length-1)
            newIndex = 0;
            else{
                newIndex++;
            }            
        }
        else{
            if(this.state.currentImageIndex-1 < 0){
                newIndex = this.props.images.length-1;
            }
            else{
                newIndex--;
            }            
        }
        this.setState({
            currentImageIndex: newIndex
        });
        this.props.dispatch({ type: 'FETCH_APPLIED_TAGS', payload: { id: newIndex+1 } });
    }

    render(){
        console.log('the current image index is:', this.state.currentImageIndex);
        // this.props.dispatch({type: 'FETCH_APPLIED_TAGS', payload: {id: this.state.currentImageIndex+1}});
        return(
            <div>
                <pre>{JSON.stringify(this.props.images)}</pre>                
                {this.conditionalImage()}
                <TagSelector currentImageIndex={this.state.currentImageIndex+1}/>                              
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        images: reduxState.images,
        tags: reduxState.appliedTags
    };
};

export default connect(mapStateToProps)(FeelyImageCarousel)