class SettingsManager {
	loadSettings() {
		try {
			this.settings = require("../data/settings");
		} catch(e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				this.settings = {
					date:         null,
					time:         null,
					lotTimeout:   null,
					initialPause: null
				};
				let fs = require("fs");
				fs.writeFile('../data/settings.json', JSON.stringify(this.settings), (err) => {
					if (err) console.log(err);
				});
				console.log("No settings file on server, new empty file was created.");
			} else {
				console.log(e);
			}
		}
		console.log("Loaded settings:");
		console.log(this.settings);
	}

	saveSettings() {
		let fs = require("fs");
		fs.writeFile('./data/settings.json', JSON.stringify(this.settings), (err) => {
			if (err)
			console.log(err);
		});
	}

	changeSettings(date, time, lotTimeout, initialPause) {
		this.settings = { date, time, lotTimeout, initialPause }
		this.saveSettings();
	}
	getSettings() {
		return this.settings;
	}
};

settingsManager = new SettingsManager();
settingsManager.loadSettings();

module.exports = settingsManager;
