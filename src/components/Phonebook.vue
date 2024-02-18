<template>
  <div class="phone-book">
    <h1>The Phone book</h1>
    <form novalidate class="phone-book__form" @submit.prevent="submit">
      <input
        v-model="nameField"
        class="phone-book__form-input"
        name="fname"
        placeholder="First name"
      />
      <input
        v-model="lastNameField"
        class="phone-book__form-input"
        name="lname"
        placeholder="Last name"
      />

      <input
        v-model="phoneField"
        class="phone-book__form-input"
        name="phone"
        placeholder="+380XXYYYYYYY"
      />

      <button
        :disabled="this.$v.$invalid"
        type="submit"
        class="phone-book__form-btn"
      >
        Add entry
      </button>
    </form>

    <div class="phone-book__record-list">
      <RecordsListItem
        v-for="record in sortedPhoneBook"
        :record="record"
        :key="record.phone"
        @remove="removeRecord"
      />
    </div>
  </div>
</template>

<script>
import RecordsListItem from "./RecordsListItem.vue";
import { required } from "vuelidate/lib/validators";
import { isPersonValid, isPhoneValid } from "../validations";

export default {
  name: "phone-book",

  components: {
    RecordsListItem,
  },

  data() {
    return {
      phonebook: [
        {
          name: "Danil",
          lastName: "Kutsenko",
          phone: "+380990194467",
        },
      ],

      nameField: "",
      lastNameField: "",
      phoneField: "",
    };
  },

  validations: {
    nameField: {
      required,
      isPersonValid,
    },

    lastNameField: {
      required,
      isPersonValid,
    },

    phoneField: {
      required,
      isPhoneValid,
      isTheSamePhone() {
        return this.isTheSamePhone;
      },
    },
  },

  computed: {
    sortedPhoneBook: function () {
      return [...this.phonebook].sort(this.sortingFunction);
    },
  },

  methods: {
    submit() {
      const record = {
        name: this.nameField,
        lastName: this.lastNameField,
        phone: this.phoneField,
      };

      this.phonebook.push(record);
      this.formReset();
    },

    formReset() {
      this.nameField = "";
      this.lastNameField = "";
      this.phoneField = "";
    },

    removeRecord(phone) {
      const recordIndex = this.phonebook.findIndex(
        (record) => record.phone === phone
      );
      this.phonebook.splice(recordIndex, 1);
    },

    sortingFunction(prev, next) {
      return prev.lastName.localeCompare(next.lastName, {
        sensitivity: "base",
        ignorePunctuation: true,
      });
    },

    isTheSamePhone(phoneField) {
      return !this.phonebook.some((el) => el.phone === phoneField);
    },
  },
};
</script>

<style lang="scss">
.phone-book__form {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
}

.phone-book__form-input,
.phone-book__form-btn {
  margin-top: 0.5rem;
}
</style>