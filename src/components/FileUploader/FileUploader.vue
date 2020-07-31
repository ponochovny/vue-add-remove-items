<template lang="pug">
    .file-uploader(
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent
        @drop="onDrop"
        :class="{'dragging': isDragging}"
    )
        .file-uploader__upload-controll(v-show="images.length")
            label.file-uploader__button(for="file") Select a file

        div(v-show="!images.length")
            .file-uploader__title Drag and Drop your picture
            .file-uploader__wrapper
                label.file-uploader__button(for="file") Upload Upload
                input(type="file" id="file" @change="onInpuChange")
        .file-uploader__image.image(v-show="images.length")
            .image__wrapper
                template(v-for="image in images")
                    img(:src="image")
                    .details
                        span.name {{files[0].name}}
                        span.size {{files[0].size}}
</template>

<script>
export default {
	props: ['reset'],
	data: () => ({
		isDragging: false,
		dragCount: 0,
		files: [],
		images: [],
	}),
	methods: {
		onDragEnter(e) {
			console.log('onEnter', this.dragCount);
			e.preventDefault();

			this.dragCount++;
			this.isDragging = true;

			return false;
		},
		onDragLeave(e) {
			console.log('onLeave', this.dragCount);
			e.preventDefault();
			this.dragCount--;

			if (this.dragCount <= 0) {
				this.isDragging = false;
			}
		},
		onInpuChange(e) {
			this.addImage(e.target.files[0]);
		},
		onDrop(e) {
			e.preventDefault();
			e.stopPropagation();

			this.isDragging = false;

			const files = e.dataTransfer.files;

			this.addImage(files[0]);
		},
		addImage(file) {
			if (!file.type.match('image.*')) {
				console.log(`${file.name} is no an image`);
				return;
			}

			this.files = [];
			this.images = [];
			this.files.push(file);

			const reader = new FileReader();

			reader.onload = (e) => this.images.push(e.target.result);

			reader.readAsDataURL(file);

			// >> Instead of upload file
			let myFile = {};
			myFile.name = this.files[0].name;
			myFile.size = this.files[0].size;
			this.$emit('file', myFile);
			// <<
		},
	},
	watch: {
		reset(val) {
			if (val) {
				this.files = [];
				this.images = [];
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.file-uploader {
	box-sizing: border-box;
	padding: 15px 20px;
	color: rgb(111, 111, 255);
	border: 3px dotted rgb(111, 111, 255);
	border-radius: 13px;
	font-weight: bold;
	margin-bottom: 15px;

	transition: color 0.15s ease, border-color 0.15s ease,
		background-color 0.15s ease;

	&__wrapper {
		position: relative;
		height: 35px;
	}
	label,
	input {
		box-sizing: border-box;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 10px;
		border-radius: 4px;
		margin-top: 7px;
		cursor: pointer;

		display: inline-block;
		font-family: 'Arial', serif;
		line-height: 35px;
		font-size: 15px;
		padding: 0 1.5rem;
		margin-bottom: 10px;
		border-radius: 4px;
		box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.225);
		background-color: rgb(111, 111, 255);
		color: white;
		outline: none;
		border: 0;
		transition: all 0.3s ease-out;

		font-weight: 400;
	}

	input {
		opacity: 0;
		z-index: -2;
	}

	&__image {
		display: inline-block;
		text-align: center;
		width: 100px;
		height: 100px;
		img {
			max-width: 100%;
			max-height: 100%;
		}
		.details {
			position: relative;
			.name {
				text-overflow: ellipsis;
				overflow: hidden;
				display: inline-block;
				white-space: nowrap;
				width: 100%;
			}
		}
	}

	&__upload-controll {
		position: relative;
		label {
			position: relative;
			padding: 0;
			margin: 0;
			padding: 0px 15px;
			margin-bottom: 10px;
			&:hover {
				cursor: pointer;
			}
		}
	}

	&.dragging {
		color: rgb(0, 0, 255);
		border-color: rgb(0, 0, 255);
		background-color: #dedeff;
	}
}
</style>
