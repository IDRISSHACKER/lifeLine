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
			APP_URL : 'http://localhost/lifeline/public/server.php',
			APP_FOLDER : 'http://localhost/lifeline/public',
			APP_NAME : 'lifelinesms' 
		}
	}


}

export default settings
