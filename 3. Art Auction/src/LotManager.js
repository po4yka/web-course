class LotManager {	
	loadLots() {
		try {
			this.lots = require("../data/lots.json");
		} catch(e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				this.lots = [];
				let fs = require("fs");
				fs.writeFile('../data/lots.json', JSON.stringify(this.lots), (err) => {
					if (err) console.log(err);
				});
				console.log("No library file on server, new file was created.");
			} else {
				console.log(e);
			}
		}
		console.log("Loaded lots:");
		console.log(this.lots);
	}

	saveLots() {
		let fs = require("fs");
		fs.writeFile('./data/lots.json', JSON.stringify(this.lots), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}

	changeLot(index, newData) {
		console.log(`Updating lot with: ${JSON.stringify(newData)}`);
		newData.id = this.lots[index].id;
		this.lots[index] = newData;
		this.saveLots();
	}
	
	addLot(data) {
		if (data.title !== "") {
			let id;
			if (this.lots.length > 0) {
				id = this.lots[this.lots.length - 1].id + 1;
			} else {
				id = 1;
			}
			data.id = id;
			this.lots[this.lots.length] = data;
			this.saveLots();
		}
	}
};

lotter = new LotManager();
lotter.loadLots();

module.exports = lotter;
