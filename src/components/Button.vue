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
    width: 220px;
    padding: .5rem 2rem;
    overflow: hidden;
    color: #fff;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background: #333;
    transition: all .3s;

    @media screen and (min-width: 440px) {
      padding: .75rem 3rem;
    }

    & + & {
      margin-top: 8px;

      @media screen and (min-width: 440px) {
        margin-top: 0;
        margin-left: 8px;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 600%;
      content: "";
      background: #1db954;
      transition: all .5s ease-in-out;
      transform: translateX(-70%) translateY(-25%) rotate(45deg);

      @media screen and (min-width: 440px) {
        transform: translateX(-80%) translateY(-25%) rotate(45deg);
      }
    }

    &:hover::before {
      transform: translateX(-9%) translateY(-25%) rotate(45deg);
    }
  }

  &__text {
    position: relative;
    font-size: .75rem;
  }
}
</style>
