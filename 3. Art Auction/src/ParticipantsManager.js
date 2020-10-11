class ParticipantsManager {
	loadParticipants() {
		try {
			this.participants = require("../data/participants");
		} catch(e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				this.participants = [];
				let fs = require("fs");
				fs.writeFile('../data/participants.json', JSON.stringify(this.participants), (err) => {
					if (err) console.log(err);
				});
				console.log("No participants file on server, new file was created.");
			} else {
				console.log(e);
			}
		}
		console.log("Loaded participants:");
		console.log(this.participants);
	}

	saveParticipants() {
		console.log("Saving participants");
		let fs = require("fs");
		fs.writeFile('./data/participants.json', JSON.stringify(this.participants), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}

	changeParticipant(id, name, wealth) {
		console.log(`Changing participant with ${id} with new wealth: ${wealth}`);
		for (let it of this.participants){
			if (it.id == id) {
				it.name   = name;
				it.wealth = wealth;
			}
		}

		this.saveParticipants();
	}

	getParticipant(id) {
		for (let it of this.participants){
			if (it.id == id)
				return it;
		}
	}

	addParticipant(name, wealth) {
		console.log(`Adding participant with name: ${name} and wealth: ${wealth}`);
		let id;
		if (this.participants.length > 0) {
		 	id = this.participants[this.participants.length-1].id + 1
		} else {
			id = 1;
		}

		this.participants[this.participants.length] = {
			id: id,
			name: name,
			wealth: wealth,
		};

		this.saveParticipants();
	}

	removeParticipant(id) {
		console.log("Removing participant with id", id);
		for (let i = 0; i < this.participants.length; ++i) {
			if (this.participants[i].id == id) {
				this.participants.splice(i, 1);
				this.saveParticipants();
			}
		}
	}
};

participantsManager = new ParticipantsManager();
participantsManager.loadParticipants();

module.exports = participantsManager;
