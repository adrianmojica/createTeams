import React from "react";
import TeamDataService from "../services/team.service";
import CustomerDataService from "../services/customer.service";

class Team extends React.Component{
    
    constructor(props) {
        super (props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);
        this.getTemplate = this.getTemplate.bind(this);
        this.getSomeMembers = this.getSomeMembers.bind(this);
        this.removeTeamMember = this.removeTeamMember.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.updateTeamMember = this.updateTeamMember.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.searchName = this.searchName.bind(this);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);

        this.state = {
            customers:[],
            currentTemplate:{
                id:null,
                name: "",
                description:"",
                currentIndex: -1,
                members: [],
            },
            searchName: "",
            selectSearch: "",
            message:""
        };
    }

    componentDidMount(){
        this.getTemplate(this.props.match.params.id);
    }

    onChangeName(e){
        const name = e.target.value;
        this.setState(function(prevState){
            return {
                currentTemplate: {
                    ...prevState.currentTemplate,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(prevState => ({
            currentTemplate: {
                ...prevState.currentTemplate,
                description: description
            }
        }));
    }

    onChangeMembers(e) {
        const members = e.target.value;
        this.setState(prevState => ({
            currentTemplate: {
                ...prevState.currentTemplate,
                members: members
            }
        }));
    }

    getTemplate(id) {
        TeamDataService.get(id)
        .then(response =>{
            this.setState({
                currentTemplate:response.data
            });
            console.log(response.data);
            this.retrieveCustomers(response.data.name);
            this.getSomeMembers(response.data.name);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateTemplate(){
        TeamDataService.update(
            this.state.currentTemplate.id,
            this.state.currentTemplate
        ).then(response =>{
            console.log(response.data);
            this.setState({
                message:"template updated successfully"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    retrieveCustomers(name){
        CustomerDataService.getAll()
        .then(response => {
            console.log("all members but the ones currently on team");
            var customersfiltered =  response.data.filter(function(customer) {
                return customer.team !== name;
            });
            this.setState({
                customers: customersfiltered
            });
            console.log(customersfiltered);
           
        })
        .catch(e => {
            console.log(e);
        });
    }

    getSomeMembers(name) {
        console.log(name);
        CustomerDataService.getSome(name)
        .then(response =>{
            this.setState({
                members:response.data
            });
            console.log("MEMBERS OF THIS TEAM");
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    }

    
    refreshList(name) {
        this.retrieveCustomers(name);
        this.getSomeMembers(name);
    }


    updateTeamMember(customer, index,){
        customer.team = this.state.currentTemplate.name;
        CustomerDataService.update(
            customer.id,
            customer
        ).then(response =>{
            console.log(response.data);
            this.setState({
                message:"team updated successfully"
            });
            this.refreshList(this.state.currentTemplate.name);
        })
        .catch(e => {
            console.log(e);
        });
        
    }

    removeTeamMember(customer,index){
        console.log("Remove team member")
        customer.team = "";
        CustomerDataService.update(
            customer.id,
            customer
        ).then(response =>{
            console.log(response.data);
            this.setState({
                message:"team member deleted successfully"
            });
            this.retrieveCustomers(this.state.currentTemplate.name);
            this.getSomeMembers(this.state.currentTemplate.name);
            
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteTemplate(){
        TeamDataService.delete(this.state.currentTemplate.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/teams')
        })
        .catch(e => {
            console.log(e);
        });
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    onChangeSelect(e) {
        const selectSearch = e.target.value;
        this.setState({
            selectSearch: selectSearch
        });
    }

    searchName(){
        let team = this.state.currentTemplate.name;
        if (this.state.selectSearch === "name") {
            CustomerDataService.findByFirstName(this.state.searchName)
            .then(response => {
                console.log(response);
                var customersfiltered =  response.data.filter(function(customer) {
                    return customer.team !== team;
                });
                console.log(customersfiltered);
                this.setState({
                    customers: customersfiltered
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        } else if (this.state.selectSearch === "email") { 
            CustomerDataService.findByEmail(this.state.searchName)
            .then(response => {
                console.log(response);
                var customersfiltered =  response.data.filter(function(customer) {
                    return customer.team !== team;
                });
                console.log(customersfiltered);
                this.setState({
                    customers: customersfiltered
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        } 
        
    }

    


    render() {
        const { searchName, customers, currentTemplate, members, currentIndex} = this.state;
        return (
            <div>
                <div className="alert alert-light">
                    <b>{this.state.message}</b>
                </div>
                {currentTemplate ? (
                    <div id="edit-form" className="edit-form container">
                        <div className="row">
                            <h4>Template</h4>
                            <form className="col-md-12 editForm">
                                <div className="form-group col-md-12">
                                    <label htmlFor="name">Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentTemplate.name}
                                    onChange={this.onChangeName}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="description">Description</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTemplate.description}
                                    onChange={this.onChangeDescription}
                                    />
                                </div>
                            </form>
                            <div className="col-md-12 text-center">
                                <h4>Add Members</h4>
                            </div>
                            <div id="searchbar-customers" className="col-md-12">
                                <div className="input-group mb-3">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by"
                                    value = {searchName}
                                    onChange={this.onChangeSearchName}
                                    />
                                    <select onChange={this.onChangeSelect} className="custom-select input-group-append">
                                        <option defaultValue="name">Search By</option>
                                        <option value="email">E-Mail</option>
                                        <option value="name">Name</option>
                                    </select>
                                    <div className="input-group-append">
                                        <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={this.searchName}
                                        > Search 
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-md-12">
                                <div className="col-md-6">
                                    <h4>All Customers</h4>
                                    <ul className="list-group template-list">
                                        {customers && customers.map((customer, index) =>(
                                            <li className={"list-group-item " +
                                                (index === currentIndex ? "active" : "")}
                                                key= {index}>
                                                    <div>{customer.firstname}{" "}{customer.lastname}</div>
                                                    <div className="small">{customer.email}</div>
                                                <button onClick={()=> this.updateTeamMember(customer, index)} className="btn btn-success control-btn">Add</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h4>Current Members</h4>
                                    <ul className="list-group template-list">
                                        {members && members.map((member, index) =>(
                                            <li className={"list-group-item "}
                                                key= {index}>
                                                <div>{member.firstname}{" "}{member.lastname}</div>
                                                <div className="small">{member.email}</div>
                                                <button className="btn btn-danger control-btn" onClick={()=> this.removeTeamMember(member, index)}>Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                            <div className="UpdatesDiv">
                                <button
                                className="btn btn-danger btn-in-list"
                                onClick={this.deleteTemplate}>
                                    Delete
                                </button>
                                <button
                                type="submit"
                                className="btn btn-success btn-in-list"
                                onClick={this.updateTemplate}>
                                    Update
                                </button>
                            </div>
                            
                            
                    </div>
                ) : (
                    <div>
                        <p>
                            Please click on a Template...
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
export default Team;