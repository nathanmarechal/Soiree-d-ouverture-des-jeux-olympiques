<template>

<!--  Stands disponibles :-->
<!--  <div v-for="stand in stands" :key="stand.id_stand">-->
<!--    <h3>{{stand.nom_stand}}</h3>-->
<!--    <p>{{stand.description_stand}}</p>-->
<!--    <button>Acheter</button>-->
<!--  </div>-->
<!--  <div class="row row-cols-1 row-cols-md-3 g-4">-->
<!--    <div v-for="i in 4" :key="i">-->
<!--    <div class="col">-->
<!--      <div class="card h-100">-->
<!--        <img :src="getImageSrc(getAllStands[i].image_stand)" class="card-img-top" alt="image qui représente le stand">-->
<!--        <div class="card-body">-->
<!--          <h5 class="card-title">{{getAllStands[i].nom_stand}}</h5>-->
<!--          <p class="card-text">{{getAllStands[i].description_stand}}</p>-->
<!--          <button type="button" class="btn btn-success" @click="goToPrestations">Prestations</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    </div>-->
<!--  </div>-->

  <!--  Thanks to frontendmentor.io for the challenge.  -->

  <main class="setMargin">
    <div v-if="!isDiscoverMore()">

      <section class="row row-cols-1 row-cols-md-3 g-4">


      <div v-for="(stand, index) in firstThreeStands" :key="index" >      <!-- Card: City -->
      <section class="card-section">
        <div class="card" style="margin: 5%">
          <div class="flip-card">
            <div class="flip-card__container">
              <div class="card-front">
                <div class="card-front__tp card-front__tp--city">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" class="card-front__icon">
                               <g>
                                   <path d="M49.7,22c-1.1,0-2,0.9-2,2v32.2c0,1.1,0.9,2,2,2s2-0.9,2-2V24C51.7,22.9,50.8,22,49.7,22z"/>
                                 <path d="M13,29.5c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3h20.8c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3h20.8c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7
                                       V7.1h24.8v15.3c0,1.1,0.9,2,2,2s2-0.9,2-2V5.1c0-1.1-0.9-2-2-2H3.7c-1.1,0-2,0.9-2,2v51c0,1.1,0.9,2,2,2s2-0.9,2-2V36.5H13
                                       c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3H13z"/>
                                 <path d="M58,11.9c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1-0.1-0.2c0-0.1,0-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0,0,0-0.1-0.1-0.1c0,0,0,0,0,0
                                       c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.2-0.1
                                       c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1,0-0.2-0.1c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.2,0c0,0,0,0,0,0
                                       c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1l-12.6,7.8
                                       c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2
                                       c0,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0v5.4H22.1
                                       c-1.1,0-2,0.9-2,2v28.9c0,1.1,0.9,2,2,2s2-0.9,2-2V29.3h17.3v26.9c0,1.1,0.9,2,2,2s2-0.9,2-2V21l8.6-5.3v40.5c0,1.1,0.9,2,2,2
                                       s2-0.9,2-2V12.1C58,12,58,12,58,11.9z"/>
                                 <path d="M28,31L28,31c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S29.1,31,28,31z"/>
                                 <path d="M33.5,31L33.5,31c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S34.6,31,33.5,31z"/>
                                 <path d="M28,36L28,36c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S29.1,36,28,36z"/>
                                 <path d="M33.5,36L33.5,36c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S34.6,36,33.5,36z"/>
                               </g>
                               </svg>

                  <h2 class="card-front__heading">
                    {{ stand.nom_stand }}
                  </h2>

                </div>

                <div class="card-front__bt">
                  <p class="card-front__text-view card-front__text-view--city">
                    Découvrir
                  </p>
                </div>
              </div>
              <div class="card-back">
                <img :src="getImageSrc(stand.image_stand)" class="insideIMG" alt="image qui représente le stand">
              </div>
            </div>
          </div>

          <div class="inside-page">
            <div class="inside-page__container">
              <h3 class="inside-page__heading inside-page__heading--city">
                {{ stand.nom_stand}}
              </h3>
              <p class="inside-page__text">
                {{ stand.description_stand }}
              </p>
              <a @click="goToStore(stand)" class="inside-page__btn inside-page__btn--city">Prestations</a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </section>
      <div class="marginFix">
    <button type="button" class="btn btn-outline-dark centerButton" @click="setDiscoverMoreTrue">Découvrir plus</button>
      </div>
</div>
    <div v-else>


    <section class="row row-cols-1 row-cols-md-3 g-4">

      <div v-for="stand in stands" :key="stand">

        <!-- Card: City -->
        <section class="card-section">
          <div class="card" style="margin-top: 7%; margin-left: 10%;margin-right: 10%;">
            <div class="flip-card">
              <div class="flip-card__container">
                <div class="card-front">
                  <div class="card-front__tp card-front__tp--city">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" class="card-front__icon">
                               <g>
                                   <path d="M49.7,22c-1.1,0-2,0.9-2,2v32.2c0,1.1,0.9,2,2,2s2-0.9,2-2V24C51.7,22.9,50.8,22,49.7,22z"/>
                                 <path d="M13,29.5c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3h20.8c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3h20.8c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7
                                       V7.1h24.8v15.3c0,1.1,0.9,2,2,2s2-0.9,2-2V5.1c0-1.1-0.9-2-2-2H3.7c-1.1,0-2,0.9-2,2v51c0,1.1,0.9,2,2,2s2-0.9,2-2V36.5H13
                                       c1.1,0,2-0.9,2-2s-0.9-2-2-2H5.7v-3H13z"/>
                                 <path d="M58,11.9c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1-0.1-0.2c0-0.1,0-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0,0,0-0.1-0.1-0.1c0,0,0,0,0,0
                                       c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.2-0.1
                                       c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1,0-0.2-0.1c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.2,0c0,0,0,0,0,0
                                       c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1l-12.6,7.8
                                       c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2
                                       c0,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0v5.4H22.1
                                       c-1.1,0-2,0.9-2,2v28.9c0,1.1,0.9,2,2,2s2-0.9,2-2V29.3h17.3v26.9c0,1.1,0.9,2,2,2s2-0.9,2-2V21l8.6-5.3v40.5c0,1.1,0.9,2,2,2
                                       s2-0.9,2-2V12.1C58,12,58,12,58,11.9z"/>
                                 <path d="M28,31L28,31c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S29.1,31,28,31z"/>
                                 <path d="M33.5,31L33.5,31c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S34.6,31,33.5,31z"/>
                                 <path d="M28,36L28,36c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S29.1,36,28,36z"/>
                                 <path d="M33.5,36L33.5,36c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S34.6,36,33.5,36z"/>
                               </g>
                               </svg>

                    <h2 class="card-front__heading">
                      {{stand.nom_stand}}
                    </h2>
                  </div>

                  <div class="card-front__bt">
                    <p class="card-front__text-view card-front__text-view--city">
                      Découvrir
                    </p>
                  </div>
                </div>
                <div class="card-back">
                  <img :src="getImageSrc(stand.image_stand)" class="insideIMG" alt="image qui représente le stand">
                </div>
              </div>
            </div>

            <div class="inside-page">
              <div class="inside-page__container">
                <h3 class="inside-page__heading inside-page__heading--city">
                  {{stand.nom_stand}}
                </h3>
                <p class="inside-page__text">
                  {{stand.description_stand}}
                </p>
                <a @click="goToStore(stand)" class="inside-page__btn inside-page__btn--city">Prestations</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
      <div class="marginFix">
    <button type="button" class="btn btn-outline-dark centerButton" @click="setDiscoverMoreFalse">Réduire</button>
      </div>
    </div>
  </main>
</template>


<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      stands : [],
      selectedStand: [],
      discoverMore : false
    };
  },
  async mounted() {
    try {
      //await this.$store.dispatch('getStands');
      this.stands = await this.getStands();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    //...mapGetters(['getAllStand']),
    firstThreeStands() {
      return this.stands.slice(0, 3);
    },
  },
  methods: {
    ...mapActions(['getStands']),
    updateFilterH(stand) {
      let newSelection = [...this.selectedStand];

      const index = newSelection.findIndex(t => t.id_stand === stand.id_stand);
      if (index === -1) {
        newSelection.push(stand.id_stand);
      } else {
        newSelection.splice(index, 1);
      }

      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', []);
      this.$store.commit('SET_SELECTED_STANDS', []);
      this.$store.commit('SET_SELECTED_STANDS', newSelection);

    },

    goToStore(stand){
      this.updateFilterH(stand)
      this.$store.commit('SET_PROVENANCE', 1)
      this.$router.push({ name: 'shopView'});
    },
    getImageSrc(imageName) {
      try {
        return require('@/assets/stand/' + imageName);
      } catch {
        return require('@/assets/' + "4.png");
      }
    },
    goToPrestations() {
      this.$router.push(`/shop`);
    },
    isDiscoverMore() {
      return this.discoverMore;
    },

    setDiscoverMoreTrue() {
      this.discoverMore = true;
    },
    setDiscoverMoreFalse() {
      this.discoverMore = false;
    }
  }
};
</script>

<style scoped>
/* CSS reset */
*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

.marginFix{
  margin-top: 5%;
}

.setMargin {
  margin-top: 5%;
  margin-left: 25%;
  padding: 0 0 0 0;
  width: 100vh; /* Assurez-vous qus'il n'y a pas de largeur excessive */
}


.centerButton {
  display: block;
  margin: auto;
}


.insideIMG{
  width: 100%;
  height: 100%;
}

html { font-size: 62.5%; }

body {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  position: relative;
}

/* Typography =======================*/

/* Headings */

/* Main heading for card's front cover */
.card-front__heading {
  font-size: 1.5rem;
  margin-top: .25rem;
}

/* Main heading for inside page */
.inside-page__heading {
  padding-bottom: 1rem;
  width: 100%;
}

/* Mixed */

/* For both inside page's main heading and 'view me' text on card front cover */
.inside-page__heading,
.card-front__text-view {
  font-size: 1.3rem;
  font-weight: 800;
  margin-top: .2rem;
}

.inside-page__heading--city,
.card-front__text-view--city { color: darkgray; }


/* Front cover */

.card-front__tp { color: white; }

/* For pricing text on card front cover */
.card-front__text-price {
  font-size: 1.2rem;
  margin-top: -.2rem;
}

/* Back cover */

/* For inside page's body text */
.inside-page__text {
  color: #333;
}

/* Icons ===========================================*/

.card-front__icon {
  fill: #fafbfa;
  font-size: 3vw;
  height: 3.25rem;
  margin-top: -.5rem;
  width: 3.25rem;
}

/* Buttons =================================================*/

.inside-page__btn {
  background-color: transparent;
  border: 3px solid;
  border-radius: .5rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
  overflow: hidden;
  padding: .7rem .75rem;
  position: relative;
  text-decoration: none;
  transition: all .3s ease;
  width: 90%;
  z-index: 10;
}

.inside-page__btn::before {
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: scaleY(0);
  transition: all .3s ease;
  width: 100%;
  z-index: -1;
}

.inside-page__btn--city {
  border-color: darkgray;
  color: darkgray;
}

.inside-page__btn--city::before {
  background-color: darkgray;
}

.inside-page__btn:hover {
  color: #fafbfa;
}

.inside-page__btn:hover::before {
  transform: scaleY(1);
}

/* Layout Structure=========================================*/

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

/* Container to hold all cards in one place */
.card-area {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-evenly;
  padding: 1rem;

}

/* Card ============================================*/

/* Area to hold an individual card */
.card-section {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  width: 100%;
  max-width: 100%;
}

/* A container to hold the flip card and the inside page */
.card {
  background-color: rgba(0,0,0, .05);
  box-shadow: -.1rem 1.7rem 6.6rem -3.2rem rgba(0,0,0,0.5);
  height: 15rem;
  position: relative;
  transition: all 1s ease;
  width: 15rem;
}

/* Flip card - covering both the front and inside front page */

/* An outer container to hold the flip card. This excludes the inside page */
.flip-card {
  height: 15rem;
  perspective: 100rem;
  position: absolute;
  right: 0;
  transition: all 1s ease;
  visibility: hidden;
  width: 15rem;
  z-index: 100;
}

/* The outer container's visibility is set to hidden. This is to make everything within the container NOT set to hidden  */
/* This is done so content in the inside page can be selected */
.flip-card > * {
  visibility: visible;
}

/* An inner container to hold the flip card. This excludes the inside page */
.flip-card__container {
  height: 100%;
  position: absolute;
  right: 0;
  transform-origin: left;
  transform-style: preserve-3d;
  transition: all 1s ease;
  width: 100%;
}

.card-front,
.card-back {
  backface-visibility: hidden;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

/* Styling for the front side of the flip card */

/* container for the front side */
.card-front {
  background-color: #fafbfa;
  height: 15rem;
  width: 15rem;
}

/* Front side's top section */
.card-front__tp {
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 57% 90%, 50% 100%, 43% 90%, 0 90%);
  display: flex;
  flex-direction: column;
  height: 12rem;
  justify-content: center;
  padding: .75rem;
}

.card-front__tp--city {
  background: linear-gradient(
      to bottom,
      darkgray,
      lightgray
  );
}

.card-front__tp--ski {
  background: linear-gradient(
      to bottom,
      #47c2d7,
      #279eb2
  );
}

.card-front__tp--beach {
  background: linear-gradient(
      to bottom,
      #fb9b88,
      #f86647
  );
}

.card-front__tp--camping {
  background: linear-gradient(
      to bottom,
      #00db93,
      #00b97d
  );
}

/* Front card's bottom section */
.card-front__bt {
  align-items: center;
  display: flex;
  justify-content: center;
}

/* Styling for the back side of the flip card */

.card-back {
  background-color: #fafbfa;
  transform: rotateY(180deg);
}

/* Specifically targeting the <video> element */
.video__container {
  clip-path: polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%);
  height: auto;
  min-height: 100%;
  object-fit: cover;
  width: 100%;
}

/* Inside page */

.inside-page {
  background-color: #fafbfa;
  box-shadow: inset 20rem 0px 5rem -2.5rem rgba(0,0,0,0.25);
  height: 100%;
  padding: 1rem;
  position: absolute;
  right: 0;
  transition: all 1s ease;
  width: 15rem;
  z-index: 1;
}

.inside-page__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  width: 100%;
}

/* Functionality ====================================*/

/* This is to keep the card centered (within its container) when opened */
.card:hover {
  box-shadow:
      -.1rem 1.7rem 6.6rem -3.2rem rgba(0,0,0,0.75);
  width: 30rem;
}

/* When the card is hovered, the flip card container will rotate */
.card:hover .flip-card__container {
  transform: rotateY(-180deg);
}

/* When the card is hovered, the shadow on the inside page will shrink to the left */
.card:hover .inside-page {
  box-shadow: inset 1rem 0px 5rem -2.5rem rgba(0,0,0,0.1);
}

/* Footer ====================================*/

.footer {
  background-color: #333;
  margin-top: 3rem;
  padding: 1rem 0;
  width: 100%;
}

.footer-text {
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
}
</style>