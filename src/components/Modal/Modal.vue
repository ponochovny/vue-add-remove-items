<template lang="pug">
.modal(:class="[isActive ? 'active' : '']")
  .modal__backdrop(@click.self="closeModal")
    .modal__box
      .modal__title {{ isEdit ? 'Edit the Bot' : 'Add a Bot' }}
      input(
        placeholder="Name",
        type="text",
        @change="botName = $event.target.value",
        :value="botName"
      )
      textarea(
        placeholder="Description",
        @change="botDescription = $event.target.value",
        :value="botDescription"
      )
      input(
        v-if="isEdit",
        type="date",
        @change="date = $event.target.value",
        :value="date"
      )
      file-uploader(@file="addFile", :reset="resetFiles")
      button(@click="isEdit ? editBot() : botAdd()") {{ isEdit ? 'Save' : 'Add' }}
</template>

<script>
import FileUploader from "../FileUploader/FileUploader";

export default {
  props: ["isActive", "isEdit", "editBotVal"],
  data() {
    return {
      botName: "",
      botDescription: "",
      image: null,

      date: "",

      resetFiles: false,
    };
  },
  methods: {
    addFile(file) {
      this.image = file;
    },
    closeModal() {
      this.$emit("close");
    },
    botAdd() {
      let bot = {};
      bot.name = this.botName;
      bot.description = this.botDescription;
      bot.image = this.image;
      this.$store.dispatch("addBot", bot);
      this.closeModal();
    },
    editBot() {
      let bot = {};
      bot.newName = this.botName;
      bot.newDescription = this.botDescription;
      bot.id = this.editBotVal.id;
      bot.image = this.image;
      bot.date = this.date;
      this.$store.dispatch("editBot", bot);
    },
  },
  watch: {
    isActive(val) {
      this.resetFiles = val;
      if (!this.isEdit) {
        this.botName = "";
        this.botDescription = "";

        this.date = null;
      } else {
        this.botName = this.editBotVal.name;
        this.botDescription = this.editBotVal.description;

        let month = this.editBotVal.date.getMonth() + 1;
        this.date = `${this.editBotVal.date.getFullYear()}-${
          month < 10 ? "0" + month : month
        }-${
          this.editBotVal.date.getDate() < 10
            ? "0" + this.editBotVal.date.getDate()
            : this.editBotVal.date.getDate()
        }`;
      }
    },
  },
  components: {
    "file-uploader": FileUploader,
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.15s ease;
  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__box {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(#000, 0.5);
    input,
    textarea {
      font-family: "Arial", serif;
      margin-bottom: 10px;
    }
  }

  button {
    display: inline-block;
    line-height: 35px;
    font-size: 15px;
    padding: 0 1.5rem;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.225);
    background-color: #03a9f4;
    color: white;
    outline: none;
    border: 0;
    transition: all 0.3s ease-out;
    &:hover {
      background-color: #23b9fc;
      cursor: pointer;
    }
  }
  &__title {
    font-family: "Arial", serif;
    font-size: 24px;
    margin-bottom: 20px;
  }

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
