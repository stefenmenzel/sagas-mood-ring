import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, InputLabel, Button,  MenuItem, Select, FormControl} from '@material-ui/core';

import '../TagSelector/TagSelector.css';

class TagSelector extends Component{

    state = {
        tagToAdd: 0,        
    };

    // componentWillMount(){
    //     this.props.dispatch({type: 'FETCH_APPLIED_TAGS', payload: {id: this.props.currentImageIndex}});
    // }

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
                <option key={tag.id} value={tag.id}>{tag.name}</option>) :
            ''
        )
    }

    handleChange = (event) => {        
        this.setState({            
            tagToAdd: event.target.value,            
        });
    }

    render(){
        console.log('tagToAdd has been changed to:', this.state);
        // this.props.dispatch({type:'FETCH_APPLIED_TAGS', payload: {id: this.props.currentImageIndex}});
        return(
            <div className="tagContainer">
                {/* <pre>{JSON.stringify(this.props.tags.data)}</pre> */}
                <form onSubmit={this.addTag}>                    
                            <div className='tagList'>
                                {/* <pre>{JSON.stringify(this.props.appliedTags)}</pre> */}
                                <h2 classname="tagsHeader">Tags</h2>
                                <ul>
                                    {this.props.appliedTags.map(tag => {
                                        return <li key={tag.id}>{tag.name}</li>
                                    })}
                                </ul>
                            </div>
                            <div className="addTagContainer">
                                <select className='addTagDropDown' onChange={this.handleChange}>
                                    {this.conditionalOptions()}
                                </select>
                                {/* <FormControl className="tagForm">
                                    <InputLabel htmlFor="dropDown">Select a Feeling</InputLabel>
                                        <Select className='addTagDropDown' id='dropDown' value={this.state.tagName} name='tagName' onChange={this.handleChange}>                                            
                                            {this.conditionalOptions()}
                                        </Select>
                                </FormControl> */}
                                <Button variant="contained" type="submit">Add Tag</Button>
                            </div>                                                            
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tags: reduxState.availableTags,
        appliedTags: reduxState.appliedTags,
    };
};

export default connect(mapStateToProps)(TagSelector);