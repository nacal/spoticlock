<template>
  <div class="clock">
    <p class="clock__date">{{ date }}</p>
    <p class="clock__time">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data: function () {
    return {
      date: "",
      time: "",
      week: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
    };
  },
  mounted: function () {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime: function () {
      let currentDate = new Date();
      this.time =
        this.zeroPadding(currentDate.getHours(), 2) +
        ":" +
        this.zeroPadding(currentDate.getMinutes(), 2) +
        ":" +
        this.zeroPadding(currentDate.getSeconds(), 2);
      this.date =
        this.zeroPadding(currentDate.getFullYear(), 4) +
        "-" +
        this.zeroPadding(currentDate.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(currentDate.getDate(), 2) +
        " " +
        this.week[currentDate.getDay()];
    },
    zeroPadding: function (num, len) {
      let zero = "";

      for (var i = 0; i < len; i++) {
        zero += "0";
      }

      return (zero + num).slice(-len);
    },
  },
};
</script>

<style lang="scss">
.clock {
  position: absolute;
  font-family: bc-sklonar, sans-serif;
  font-weight: 700;
  text-align: center;
  -webkit-text-stroke-color: white;

  &__date {
    font-size: 2rem;
    -webkit-text-stroke-width: 2px;

    @media screen and (min-width: 440px) {
      font-size: 2.5rem;
    }
  }

  &__time {
    font-size: 4rem;
    -webkit-text-stroke-width: 4px;

    @media screen and (min-width: 440px) {
      font-size: 5rem;
    }
  }

  &.fullScreen {
    .clock__date {
      @media screen and (min-width: 1024px) {
        font-size: 4rem;
      }
    }

    .clock__time {
      @media screen and (min-width: 1024px) {
        font-size: 8rem;
      }
    }
  }
}
</style>
