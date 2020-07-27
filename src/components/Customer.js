import React,{Component} from "react";
import CustomerDataService from "../services/customer.service";

export default class Template extends Component {
    
    constructor(props) {
        super (props);
        this.getCustomer= this.getCustomer.bind(this);

        this.state = {
            currentCustomer:{
                id:null,
                name: "",
                email:"",
                last_order:"",
            },
            message:""
        };
    }

    componentDidMount(){
        this.getCustomer(this.props.match.params.id);
    }


    getCustomer(id) {
        CustomerDataService.get(id)
        .then(response =>{
            this.setState({
                currentCustomer:response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }


    render() {
        const { currentCustomer } = this.state; 
        return (
            <div>
                {currentCustomer ? (
                    <div className="show-customer">
                        <h4>Customer</h4>
                            <div className="">
                               {currentCustomer.firstname}
                            </div>
                            <div className="">
                                {currentCustomer.lastname}
                            </div>
                            <div className="form-group">
                                {currentCustomer.team}
                            </div>
                    </div>
                ) : (
                    <div>
                        <p>
                            Please click on a Customer...
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
    