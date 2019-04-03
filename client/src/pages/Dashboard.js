import React, { Component } from 'react';
//import axios from 'axios';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardBody from '../components/Dashboard/DashboardBody';

class Dashboard extends Component {
	state = {};

	render() {
		return (
			<div>
				<DashboardHeader {...this.state} />
				<DashboardBody {...this.state}/>
			</div>
		);
	}
}

export default Dashboard;
