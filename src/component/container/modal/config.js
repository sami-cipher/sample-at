import React, { Component } from 'react';
import * as propTypes from 'prop-types';

import Input from '../../presentational/input';

class ConfigHeader extends Component {
    static propTypes ={
        editData: propTypes.any,
        onHide: propTypes.func.isRequired,
        onSave: propTypes.func.isRequired
    }

    static defaultProps = {
        editData: null
    }
    state = {
        access_token: this.props.editData['access-token'],
        client: this.props.editData.client,
        expiry: this.props.editData.expiry,
        uid: this.props.editData.uid,       
    }

    componentWillReceiveProps(newProps) {
        if(newProps !== this.props) {
            this.setState({            
                "access_token": newProps.editData['access-token'],
                "client": newProps.editData.client,
                "expiry": newProps.editData.expiry,
                "uid": newProps.editData.uid,       
            })
        }
    }
  
    handleSave = () => {
        const { editData, onSave } = this.props;
        onSave({
            ...editData,
            access_token: this.state.access_token,
            ...this.state
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { access_token, client, expiry, uid  } = this.state;

        return (
            <div id="myModal" className="modal fade in" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog">

                    {/* <!-- Modal content--> */}
                    <div className="modal-content popupCont">

                        <div className="modal-body" style={{height: '500px'}}>
                                                   
                            <div className="col-md-12">
                            <h4>config Details </h4>
                            <form >
                                <Input
                                    label='access_token'
                                    name='access_token'
                                    value={access_token}
                                    onChange={this.handleChange}/>
                                <Input
                                    label='client'
                                    name='client'
                                    value={client}
                                    onChange={this.handleChange}/>
                                <Input
                                    label='expiry'
                                    name='expiry'
                                    value={expiry}
                                    onChange={this.handleChange}/>
                                <Input
                                    label='uid'
                                    name='uid'
                                    value={uid}
                                    onChange={this.handleChange}/>
                            </form>
                            
                            <div className="col-md-12 margintpDn">
                                <button type="button" className="btn btn-default" onClick={this.props.onHide} >cancel</button>
                                <button type="submit" className="btn btn-default pull-right"
                                    onClick={this.handleSave}>save</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfigHeader;