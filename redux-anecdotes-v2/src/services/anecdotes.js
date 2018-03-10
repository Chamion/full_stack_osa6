import axios from 'axios'

class Client {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
	}
	
	getAll() {
		return axios.get(this.baseUrl)
	}
	
	addNew(henkilo) {
		return axios.post(this.baseUrl, henkilo)
	}
	
	delete(id) {
		return axios.delete(this.baseUrl+"/"+id)
	}
	
	update(id, henkilo) {
		return axios.put(this.baseUrl+"/"+id, henkilo)
	}
}

const anecdoteService = new Client('http://localhost:3001/anecdotes')

export default anecdoteService