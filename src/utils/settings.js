import {Component} from "react"

class settings extends Component{ 
	state = {
		conf: {}
	}
	constructor() {
		super();
	}

	init = function(){
		return {
			APP_URL : 'https://lifelinesms.org/server.php',
			APP_FOLDER : 'https://lifelinesms.org',
			APP_NAME : 'lifelinesms' 
		}
	}


}

export default settings
