<template>
  <div class="rating-container">
    <vue3-star-ratings
      :modelValue="ratingComputed"
      :star-size="25"
      :show-rating="true"
      :disable-click="true"
      :max-rating="5"
      :star-color="'#03DDBD'"
      :inactive-star-color="'#D3D3D3'"
      :show-half-stars="true"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import Vue3StarRatings from "vue3-star-ratings";

export default defineComponent({
  components: {
    Vue3StarRatings,
  },
  props: {
    rating: {
      type: Number,
      required: false,  // Non è obbligatorio
      default:0
    },
  },
  computed: {
    // Computed property che restituisce 0 se rating è undefined
    ratingComputed() {
      return this.rating
    },
  },
});
</script>

<style scoped>
/* Puoi aggiungere eventuali stili personalizzati qui */
</style>
