<template>
  <button class="button__item">
    <span class="button__text">{{ buttonName }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonName: {
      type: String,
      default: "null",
    },
  },
};
</script>

<style lang="scss">
.button {
  &__item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    overflow: hidden;
    padding: 0.5rem 2rem;
    @media screen and (min-width: 440px) {
      padding: 0.75rem 3rem;
    }

    color: #fff;
    background: #333;
    position: relative;
    width: 220px;

    & + & {
      margin-top: 8px;
      @media screen and (min-width: 440px) {
        margin-left: 8px;
        margin-top: 0;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      width: 150%;
      height: 600%;

      content: "";
      transition: all 0.5s ease-in-out;
      transform: translateX(-70%) translateY(-25%) rotate(45deg);
      @media screen and (min-width: 440px) {
        transform: translateX(-80%) translateY(-25%) rotate(45deg);
      }

      background: #1db954;
    }

    &:hover::before {
      transform: translateX(-9%) translateY(-25%) rotate(45deg);
    }
  }

  &__text {
    position: relative;
    font-size: 0.75rem;
  }
}
</style>
