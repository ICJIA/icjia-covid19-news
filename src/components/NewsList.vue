<template>
  <div @click="closeSearch">
    <v-container fluid style="margin-top: -55px;" class="mb-12">
      <div v-for="category in $myApp.categories" :key="category">
        <h2 :id="slugify(category)">{{ category }}</h2>
        <ul>
          <div
            v-for="item in $myApp.news"
            :key="item.attributes.title"
            class="px-5"
          >
            <li
              v-if="
                item.attributes.category === category &&
                  item.attributes.status === 'live' &&
                  item.attributes.file
              "
              class="news-list"
            >
              <a
                @click="registerEvent(item.attributes.file)"
                :href="
                  `${$myApp.computedPublicPath}/downloads/${item.attributes.file}`
                "
              >
                <!-- <span v-if="isItNew(item)">
                  <v-chip dark class="ma-2" x-small color="green">
                    NEW!
                  </v-chip></span
                > -->
                {{ item.attributes.posted | dateFormat }} -
                {{ item.attributes.title }}

                <v-icon class="ml-2" small color="blue darken-2"
                  >cloud_download</v-icon
                ></a
              >
              <span v-if="isItNew(item)">
                <v-chip dark class="ma-2" x-small color="green">
                  NEW!
                </v-chip></span
              >

              <ul class="summary" v-if="item.attributes.displaySummaryOnHome">
                <li>{{ item.attributes.summary }}</li>
              </ul>
            </li>
            <li
              v-else-if="
                item.attributes.category === category &&
                  item.attributes.url &&
                  item.attributes.status === 'live'
              "
              class="news-list"
            >
              <a :href="`${item.attributes.url}`"
                >{{ item.attributes.posted | dateFormat }} -
                {{ item.attributes.url }}
                <v-icon class="ml-2" small color="blue darken-2"
                  >open_in_new</v-icon
                ></a
              >
              <ul class="summary" v-if="item.attributes.displaySummaryOnHome">
                <li>{{ item.attributes.summary }}</li>
              </ul>
            </li>
            <li
              v-else-if="
                item.attributes.category === category &&
                  item.attributes.status === 'live'
              "
              class="news-list"
            >
              <router-link :to="item.path"
                >{{ item.attributes.posted | dateFormat }} -
                <span v-if="item.attributes.linkTitle">{{
                  item.attributes.linkTitle
                }}</span>
                <span v-else>{{ item.attributes.title }}</span></router-link
              >
              <ul class="summary" v-if="item.attributes.displaySummaryOnHome">
                <li>{{ item.attributes.summary }}</li>
              </ul>
            </li>
          </div>
        </ul>
      </div>
      <h2 id="follow-us">Follow Us</h2>
      <ul>
        <li style="margin-left: 5px;">
          Follow us on <a href="https://www.facebook.com/ICJIA/">Facebook</a>,
          <a href="">LinkedIn</a>, and
          <a href="https://twitter.com/ICJIA_Illinois">Twitter</a>
        </li>
        <li style="margin-left: 5px;">
          <a
            href="https://visitor.r20.constantcontact.com/manage/optin?v=001MqUcqqvjwLCJXlLMSWbTe3zHHmEQgFeBuHvBcJWTbwgrxFbDSGx4HSUPpI6DJWMUPgbljtLxffqIcGFTgCnr-auak88ybvRxpoJlTMGPtZs%3D"
            >Subscribe</a
          >
          to ICJIA’s CJ Dispatch email list and get the latest research, grant
          opportunities, and other news delivered to your inbox.
        </li>
      </ul>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import slugs from "slugs";
import moment from "moment";
export default {
  data() {
    return {
      newsItems: null,
      loading: true,
      slugs
    };
  },
  methods: {
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.attributes.posted); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= 14) {
        return true;
      } else {
        return false;
      }
    },
    slugify(str) {
      return slugs("icjia-" + str);
    },
    closeSearch() {
      EventBus.$emit("closeSearch");
    },
    registerEvent(file) {
      console.log("register event:", file);
      this.$ga.event({
        eventCategory: "File",
        eventAction: "Download",
        eventLabel: file
      });
    }
  },

  mounted() {
    this.loading = false;
  }
};
</script>

<style>
ul.summary {
  list-style-type: none;
  margin-left: -30px !important;
  margin-top: 3px !important;
}

ul.summary li {
  font-size: 14px;
  margin-bottom: 20px;
}

li.news-list {
  margin-bottom: 8px;
  margin-left: -15px;
}
</style>
