<template lang="pug">
.page
	.page__title Bots List
	button(@click="openModal") Add
	.bots
		ul
			li(v-for="bot in bots" @click.self="editBot(bot)")
				| {{bot.name}}
				.bots__delete(@click="deleteBot(bot.id)") X
	Modal(
		:isActive="isModalActive"
		:isEdit="isModalEdit"
		:editBotVal="editBotVal"
		@close="closeModal"
	)
</template>

<script>
import Modal from './components/Modal/Modal.vue';
// import { mapState } from 'vuex';
export default {
	name: 'App',
	data() {
		return {
			isModalActive: false,
			isModalEdit: false,
			editBotVal: {},
		};
	},
	components: {
		Modal,
	},
	methods: {
		closeModal() {
			this.isModalActive = false;
		},
		openModal() {
			this.isModalActive = true;
			this.isModalEdit = false;
		},
		editBot(bot) {
			this.openModal();
			this.isModalEdit = true;

			this.editBotVal = bot;
		},
		deleteBot(id) {
			this.$store.dispatch('deleteBot', id);
		},
	},
	computed: {
		bots() {
			return this.$store.getters.bots;
		},
		// ...mapState([bots]),
	},
};
</script>

<style lang="scss" scoped>
.page {
	text-align: center;
	&__title {
		font-family: 'Arial', serif;
		font-size: 36px;
		margin-bottom: 20px;
	}
	button {
		display: inline-block;
		line-height: 35px;
		font-size: 15px;
		padding: 0 1.5rem;
		margin-bottom: 10px;
		background-color: #fff;
		color: white;
		border-radius: 4px;
		box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.225);
		background-color: #03a9f4;
		outline: none;
		border: 0;
		transition: all 0.3s ease-out;
		&:hover {
			background-color: #23b9fc;
			cursor: pointer;
		}
	}
}
.bots {
	display: block;
	margin: 0 auto;
	max-width: 500px;
	width: 80%;
	text-align: left;
	&__delete {
		display: inline-block;
		float: right;
		background-color: #e60000;
		padding: 2px 4px;
		border-radius: 3px;
		color: white;
		font-size: 11px;
		font-family: 'Arial', serif;
		&:hover {
			cursor: pointer;
		}
	}
	ul {
		margin: 0;
		padding: 0;
		li {
			padding: 5px 10px;
			margin-bottom: 5px;
			background-color: #ccc;
			list-style-type: none;
		}
	}
}
</style>
