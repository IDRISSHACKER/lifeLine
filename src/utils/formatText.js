export function formatTitle(title="", qtt=30){
	if(title.length > qtt){
		return title.slice(0,qtt)+"..."
	}else{
		return title
	}
}

export function formatDescription(description="", qtt=384){
	if(description.length > qtt){
		return description.slice(0,qtt)+"..."
	}else{
		return description
	}
}

export function getIdInUrl(uri=window.location.href){
	const url = uri.split("/")
	let id = url[url.length-1]

	id = id.match(/[0-9]/gi) != null ? parseInt(id) : id

	return id
	
}

export function replaceSpace(text){
	
		return text.replaceAll(" ", "-")

}