<template>
  <div class="record-list-item">
    <span class="record-list-item__row">{{ record.name }}</span>
    <span class="record-list-item__row">{{ record.lastName }}</span>
    <span class="record-list-item__row"> {{ record.phone }} </span>
    <button class="record-list-item__remove-btn" @click="removeRecord">
      remove
    </button>
  </div>
</template>

<script>
const EVENTS = {
  remove: "remove",
};

export default {
  name: "record-list-item",

  methods: {
    removeRecord() {
      this.$emit(EVENTS.remove, this.record.phone);
    },
  },

  props: {
    record: {
      type: Object,
      required: true,
    },
  },
};
</script>


<style lang="scss" >
.record-list-item {
  margin-top: 1.5rem;
}

.record-list-item__row {
  display: block;
  & + & {
    margin-top: 0.5rem;
  }
}

.record-list-item__remove-btn {
  margin-top: 0.5rem;
}
</style>