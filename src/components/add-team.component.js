import React, { Component } from "react";
import TeamDataService from "../services/team.service";
import CustomerDataService from "../services/customer.service";


class AddTeam extends React.Component{
     
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeMembers = this.onChangeContent.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);
        this.newTemplate = this.newTemplate.bind(this);
    

        this.state = {
            id:null,
            name: "",
            description: "",
            members: [],
            submitted: false 
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onChangeMembers(e){
        this.setState({
            members:e.target.value
        });
    }

    retrieveCustomers(){
        CustomerDataService.getAll()
        .then(response => {
            this.setState({
                customers: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    saveTemplate(){
        let data = {
            name: this.state.name,
            description: this.state.description,
            content: this.state.content
        };

        TeamDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                description: response.data.description,
                content: response.data.content,
                submitted: true

            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newTemplate() {
        this.setState({
            id:null,
            title:"",
            description: "",
            content: "",
            submitted: false
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.submitted? (
                    <div className="container">
                        <div className="row">
                            <h4>Submitted Successfully!</h4>
                            <button className="btn btn-success" onClick={this.newTutorial}>
                                Add
                            </button>
                        </div>
                    </div>
                ) : (
                    <div id="formContainerAdd" className="container">
                        <div className="row">
                            <h4>Add a new template</h4>
                            <div className="form-group col-md-12">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeName}
                                    name="name"
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>   
                        </div>
                        
                       <div className="form-group col-md-12">
                            <button onClick={this.saveTemplate} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default AddTeam;