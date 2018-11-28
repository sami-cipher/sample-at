import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActivities, getProjects, getTimesheet, updateConfig } from '../../service/action'
import Button from '../../component/presentational/button';
import Select from '../../component/presentational/select';
import ConfigModal from '../../component/container/modal/config';

const tableMeta = [
    { name: 'user', label: 'user', subName: 'name' },
    { name: 'project', label: 'Project', subName: 'name'  },
    { name: 'activity', label: 'Activity', subName: 'name'  },
    { name: 'date', label: 'Date' },
    { name: 'comment', label: 'Comment' },
    { name: 'mentor', label: 'Menatator', subName: 'name' },
    { name: 'worked_hours', label: 'Worked' },
    { name: 'billed_hours', label: 'Billed' },
]
const durationDef = [
	{name: 'this month', label: 'This Month'},
	{name: 'last month', label: 'Last Month'},
	{name: 'this week', label: 'This Week'},
	{name: 'last week', label: 'Last Week'},
]

class Home extends Component {
  	constructor(props){
		super(props);
		this.state = {
			activity_id: null,
			project_id: null,
			duration: 'this month',
			page_no: 1,
			user_id: 20,
			isConfig: false,
			configVal: this.props.configHeader
		}
	}
	
	componentWillReceiveProps(newProps) {
		if(newProps.configHeader !== this.props.configHeader) {
			this.handleRefreshData();
		}
	}
	componentDidMount() {
		const {configHeader, getActivities, getProjects } = this.props;
		
		getActivities(configHeader);
		getProjects(configHeader);
		this.handleRefreshData();
	}

	handleRefreshData = () => {
		const {configHeader, getTimesheet } = this.props;
		const { duration, page_no, user_id, activity_id, project_id } = this.state;
		
		getTimesheet(configHeader, {
			duration, page_no, user_id, activity_id, project_id
		});
	}
	handleActivityChange = (e) => {
		this.setState({ activity_id: e.target.value })
	}
	handleProjectChange= (e) => {
		this.setState({ project_id: e.target.value })
	}
	handleDurationChange= (e) => {
		this.setState({ duration: e.target.value })
	}
	handleConfig = (config) => {
		this.setState({ configVal: config, isConfig: false }, () => {
			this.props.updateConfig(this.state.configVal)
		})
	}
	handleSubmit = () => {
		const {configHeader, getTimesheet } = this.props;
		const { duration, page_no, user_id, activity_id, project_id } = this.state;

		getTimesheet(configHeader, {
			duration, page_no, user_id, activity_id, project_id
		});
	}
	render() {
		const { timesheetList, activityList, projectList } = this.props;
		const { isConfig, configVal, activity_id, project_id, duration } = this.state;


		const renderAddEditModal = isConfig && <ConfigModal
			editData={configVal}
			onHide={() => this.setState({ isConfig: false })}
			onSave={this.handleConfig} />

		return(
				
			<div className="container">
				{renderAddEditModal}
				<br/>

				<Button
					label="config"
					onClick={() => this.setState({ isConfig: true })} />
				<Select
					defaultLabel='select Activity'
					value={activity_id}
					data={activityList}
					onChange={this.handleActivityChange}
					labelAs='name'
					valueAs='id'/>
				<Select
					defaultLabel='select Project'
					value={project_id}
					data={projectList}
					onChange={this.handleProjectChange}
					labelAs='name'
					valueAs='id'/>
				<Select
					defaultLabel='select Duration'
					value={duration}
					data={durationDef}
					onChange={this.handleDurationChange}
					labelAs='label'
					valueAs='name'/>
				<Button
					label="submit"
					onClick={this.handleSubmit} />
			<table className="table table-bordered">
			<thead>
				<tr>
					{tableMeta.map((field, i)=>
						<td key={i}>{field.label}</td>
					)}
				</tr>
			</thead>
			<tbody>
				{timesheetList.map((timesheet, index) =>
					<tr key={index}>
						{tableMeta.map((field, i)=>
							 <td key={i}>
							 	{field.subName
									? timesheet[field.name][field.subName]
									: timesheet[field.name]}</td>
						)}
					</tr>)}
			</tbody>
			</table>
		</div>
		)
	}
}

const mapStateToProps = state => ({
	activityList: state.commonReducer.activityList,
	projectList: state.commonReducer.projectList,
	timesheetList: state.commonReducer.timesheets,
	configHeader: state.commonReducer.configHeader,
})

const mapDispatchToProps  = dispatch => ({
	getActivities: (config) => dispatch(getActivities(config)),
	getProjects: (config) => dispatch(getProjects(config)),
	updateConfig: (config) => dispatch(updateConfig(config)),
	getTimesheet: (config, urlParams) => dispatch(getTimesheet(config, urlParams))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);