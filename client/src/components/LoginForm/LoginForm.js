import React from 'react';

function LoginForm(props) {
	return (
		<div>
			<h1>Log-in to Chevrotain</h1>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={props.onSubmit}>
							<div className="form-group">
								<input
									type="text"
									name="email"
									value={props.value}
									onChange={props.onChangeEmail}
									placeholder="Email"
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									name="password"
									value={props.value}
									onChange={props.onChangePassword}
									placeholder="Password"
								/>
							</div>
							<div className="form-group">
								<input type="submit" value="Log-In" className="btn btn-primary" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
