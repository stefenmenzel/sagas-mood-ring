import React, {Component} from 'react';
import {connect} from 'react-redux';

class TagSelector extends Component{

    state = {
        tagToAdd: ''
    };

    addTag = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_NEW_TAG', 
            payload: {image_id: this.props.currentImageIndex, tag_id: this.state.tagToAdd}});
    }

    conditionalOptions = () => {
        return(
            (this.props.tags.length) ?
            (this.props.tags.data.map(tag => 
                <option key={tag.id} value={tag.name} label={tag.name} /> )) :
            ''
        )
    }

    handleChange = (event) => {
        this.setState({
            tagToAdd: event.target.value
        });
    }

    render(){

        console.log('tags.data:', this.props.tags);
        return(
            <div>
                <form onSubmit={this.addTag}>
                    <div>
                        <p>Tags</p>
                        <p>tags will go here</p>
                    </div>
                    <select onChange={this.handleChange}>
                        {this.conditionalOptions()}
                    </select>
                    <button type="submit">Add Tag</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tags: reduxState.tags
    };
};

export default connect(mapStateToProps)(TagSelector);