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
                :href="
                  `${$myApp.computedPublicPath}/downloads/${item.attributes.file}`
                "
                >{{ item.attributes.posted | dateFormat }} -
                {{ item.attributes.title }}
                <v-icon class="ml-2" small color="blue darken-2"
                  >cloud_download</v-icon
                ></a
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
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import slugs from "slugs";
export default {
  data() {
    return {
      newsItems: null,
      loading: true,
      slugs
    };
  },
  methods: {
    slugify(str) {
      return slugs("icjia-" + str);
    },
    closeSearch() {
      EventBus.$emit("closeSearch");
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
