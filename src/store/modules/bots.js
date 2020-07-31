const state = {
	bots: [],
};

const mutations = {
	ADD_BOT(state, bot) {
		let newBot = { ...bot, date: new Date(), id: Math.random() };
		state.bots.push(newBot);
	},
	REMOVE_BOT(state, id) {
		for (let i in state.bots) {
			if (state.bots[i].id === id) {
				state.bots.splice(i, 1);
			}
		}
	},
	EDIT_BOT(state, bot) {
		console.log(bot);
		let id = bot.id;
		let editBot = {};
		editBot.name = bot.newName;
		editBot.description = bot.newDescription;

		for (let i in state.bots) {
			if (state.bots[i].id === id) {
				if (!state.bots[i].date.edit) {
					state.bots[i].date.edit = [];
				}
				state.bots[i].date.edit.push(new Date());
				state.bots[i].name = editBot.name;
				state.bots[i].description = editBot.description;
			}
		}
	},
};

const actions = {
	addBot: ({ commit }, bot) => {
		commit('ADD_BOT', bot);
	},
	deleteBot: ({ commit }, id) => {
		commit('REMOVE_BOT', id);
	},
	editBot: ({ commit }, bot) => {
		commit('EDIT_BOT', bot);
	},
};

const getters = {
	bots: (state) => {
		return state.bots;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
