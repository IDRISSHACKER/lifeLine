import { Component } from "react"

class settings extends Component {
	state = {
		conf: {}
	}
	constructor() {
		super();
	}

	init = function () {
		const prod = 	false;
		if(prod) {
			return {
				APP_URL: 'https://lifelinesms.org/server.php',
				APP_FOLDER: 'https://lifelinesms.org',
				APP_NAME: 'lifelinesms'
			}
		}else{
			return {
				APP_URL: 'https://lifeline.test/server.php',
				APP_FOLDER: 'https://lifeline.test',
				APP_NAME: 'lifelinesms'
			}
		}
	}


}

export default settings
