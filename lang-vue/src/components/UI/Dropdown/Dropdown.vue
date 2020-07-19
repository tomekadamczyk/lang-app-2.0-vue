<template>
  <div class="dropdown-box">
    <button
      class="lang-button"
     :class="{ active: showItems }"
      v-on:click="toggleItems"
    >
      {{ chosenValue }}
    </button>
    <div
      class="dropdown-items"
    >
      <DropdownOption 
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :value="item.value"
        class="dropdown-item"
        v-on:selectChange="changeValue"
      />
    </div>
  </div>
</template>

<script>
import DropdownOption from './DropdownOption/DropdownOption.vue';
export default {
  name: 'Dropdown',
  components: {
    DropdownOption
  },
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      chosenValue: 'polish',
      itemId: 1,
      showItems: false,
    };
  },
  methods: {
    changeValue($event) {
      console.log($event)
      this.itemId = $event.id;
      this.chosenValue = $event.value;
      this.$emit('selectChange', this.itemId);
    },
    toggleItems() {
        return this.showItems = !this.showItems;
    }
  },
};
</script>

<style lang="scss" scoped>

    .dropdown-box {
        min-width: 140px;
        display: inline-block;
        box-shadow: 1px 1px 15px 1px #ddd;
        border-radius: 10px;
        position: relative;
        z-index: 99999999;
    }

    .lang-button {
        border: none;
        background: #fff;
        padding: 10px 15px;
        width: 100%;
        font-size: 13px;
        border-radius: 10px;

        &:hover {
            cursor: pointer;
            background: #f9f9f9;
        }

        &.active {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;

            +.dropdown-items {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
    }

    .dropdown-items {
        font-size: 13px;
        position: absolute;
        left: 0;
        top: 100%;
        opacity: 0;
        visibility: hidden;
        transform: translateY(30px);
        transition: opacity .3s, visibility .3s, transform .3s;
        box-shadow: 1px 10px 15px 1px #ddd;
        width: 100%;
        background: #fff;
        overflow: hidden;
    }

    .dropdown-item {
        padding: 10px 15px;

        &:hover {
            background: #f0f0f0;
        }
    }

</style>
