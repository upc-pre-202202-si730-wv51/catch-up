<template>
  <div class="w-full">
    <div>
      <pv-menubar class="sticky bg-primary">
        <template #start>
          <pv-button label="CatchUp"
                     icon="pi pi-bars"
                     @click="toggleSidebar"/>
          <side-menu v-model:visible="sidebarVisible"
                     v-on:source-selected="setSource"></side-menu>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </div>
    <div>
      <unavailable-content v-if="errors" :errors="errors"></unavailable-content>
      <main-content v-else :articles="articles"></main-content>
    </div>
    <footer-content/>
  </div>
</template>

<script>
import { NewsApiService } from "@/news/services/news-api.service";
import SideMenu from "@/components/side-menu.component.vue";
import LanguageSwitcher from "@/components/language-switcher.component.vue";
import UnavailableContent from "@/components/unavailable-content.component.vue";
import MainContent from "@/components/main-content.component.vue";
import FooterContent from "@/components/footer-content.component.vue";

export default {
  name: 'App',
  components: {FooterContent, MainContent, UnavailableContent, LanguageSwitcher, SideMenu},
  data() {
    return {
      sidebarVisible: false,
      articles: [],
      errors: [],
      newsApi: new NewsApiService()
    }
  },

  created() {
    console.log('created');
    this.getArticlesForSource('bbc-news');
  },

  methods: {

    // Fetch Articles for selected Source

    getArticlesForSource(sourceId) {
      this.newsApi.getArticlesForSource(sourceId)
          .then(response => {
            this.articles = response.data.articles;
            console.log(response.data);
          })
          .catch(e => {
            this.errors.push(e);
          });
    },

    // Fetch Articles for selected Source with Logo URL

    getArticlesForSourceWithUrl(source) {
      this.newsApi.getArticlesForSource(source.id)
          .then(response => {
            this.articles = response.data.articles;
            this.articles.map(article => article.source.url = source.url);
            console.log(response.data);
          })
          .catch(e => {
            this.errors.push();
          });
    },

    // On Source selected

    setSource(source) {
      this.getArticlesForSourceWithUrl(source);
      this.toggleSidebar();
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
}

</script>

