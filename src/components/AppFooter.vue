<template>
  <v-footer padless class="noprint">
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width: 100%; background: #235E8E; border-top: 1px solid #fff"
    >
      <v-card-text>
        <span v-for="link in nav" :key="link.attributes.title" class="flexitem">
          <span>
            <v-btn
              :to="link.path === '/home' ? '/' : `${link.path}`"
              text
              dark
              class="mr-1"
              style="font-weight: 900 !important;"
              :aria-label="link.attributes.title"
            >
              <span v-if="link.attributes.menuTitle" style="font-size: 12px">
                {{ link.attributes.menuTitle }}
              </span>
              <span v-else style="font-size: 12px">
                {{ link.attributes.title }}
              </span>
            </v-btn>
          </span>
        </span>
      </v-card-text>
    </v-card>
    <v-card
      flat
      tile
      class="text-center"
      style="width: 100%; background: #0D4474"
    >
      <v-divider />

      <v-card-text class="white--text">
        <div style="font-size: 12px; color: #fff">
          &copy;&nbsp;{{ new Date().getFullYear() }}
          <strong>
            <a href="http://icjia.illinois.gov" class="footer-link"
              >Illinois Criminal Justice Information Authority</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://archive.icjia.cloud"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Document Archive</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/covid19"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >COVID-19 Response</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/status"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Status</a
            >
          </strong>
          &nbsp;|&nbsp;
          <strong>
            <a
              :href="`${$myApp.config.githubURL}`"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Github</a
            >
          </strong>
        </div>
        <div class="text-center mt-3">
          <div id="google_translate_element"></div>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import _ from "lodash";
export default {
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter"],
    loading: true,
    nav: []
  }),

  created() {
    let nav = [];
    this.siteMeta.forEach(item => {
      if (item.attributes.showInFooter) nav.push(item);
    });
    let sortedNav = _.orderBy(nav, ["attributes.menuRank"], ["asc"]);
    //console.log(nav);

    this.nav = sortedNav;
  },
  methods: {
    getPath(link) {
      console.log(link.path);
      return "/";
    }
  },
  props: {
    siteMeta: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
.footer-link {
  color: #fff !important;
  text-decoration: underline;
}

.footer-link:hover {
  color: #aaa !important;
}
.goog-te-combo {
  background: #aaa;
  color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
}

.goog-te-banner-frame {
  top: 90px !important;
}
</style>
