import React, {Component} from 'react';
import {connect} from 'react-redux';

class TagSelector extends Component{

    state = {
        tagToAdd: 0
    };

    addTag = (event) => {
        event.preventDefault();
        console.log("button to add tag has been poked");
        this.props.dispatch({type: 'ADD_NEW_TAG', 
            payload: {image_id: this.props.currentImageIndex, tag_id: this.state.tagToAdd}});
    }

    conditionalOptions = () => {
        return(
            (this.props.tags.data) ?
            this.props.tags.data.map(tag => 
                <option key={tag.id} value={tag.id} label={tag.name} /> ) :
            ''
        )
    }

    handleChange = (event) => {        
        this.setState({
            tagToAdd: event.target.value
        });
    }

    render(){
        console.log('tagToAdd has been changed to:', this.state.tagToAdd);
        return(
            <div>
                <pre>{JSON.stringify(this.props.tags.data)}</pre>
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