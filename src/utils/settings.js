import { Component } from "react"

class settings extends Component {
	state = {
		conf: {}
	}
	constructor() {
		super();
	}

	init = function () {
		return {
			APP_URL: 'https://lifeline.test/server.php',
			APP_FOLDER: 'https://lifeline.test',
			APP_NAME: 'lifelinesms'
		}
	}


}

export default settings
