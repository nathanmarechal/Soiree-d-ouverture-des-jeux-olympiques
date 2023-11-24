<template>
  <div class="full-screen-image">
    <img :src="imageUrl" alt="Full Screen Image"/>
<!--    <h1 class="image-title">Ouverture des jeux de Paris</h1>-->
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet">

    <h1 aria-label="Hi! I'm a developer" class="image-title">
      Cérémonie&nbsp;<span class="typewriter"></span>
    </h1>

  </div>
</template>

<script>
import image1 from '../../assets/HomePage/flamme.jpeg';
export default {
  name: 'FullScreenImage',
  data() {
    return {
      imageUrl: image1,
    }
  }
}
</script>

<style scoped>
body {
  background: #182028;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

h1 {
  font-size: 9vmin;
  color: #8bf;
  text-align: left;
  font-family: Lato, sans-serif;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
}

/* Typewriter effect 1 */
@keyframes typing {
  0.0000%, 27.3488% { content: ""; }
  1.1395%, 26.2093% { content: "d"; }
  2.2791%, 25.0698% { content: "d'"; }
  3.4186%, 23.9302% { content: "d'o"; }
  4.5581%, 22.7907% { content: "d'ou"; }
  5.6977%, 21.6512% { content: "d'ouv"; }
  6.8372%, 20.5116% { content: "d'ouve"; }
  7.9767%, 19.3721% { content: "d'ouver"; }
  9.1163%, 18.2326% { content: "d'ouvert"; }
  10.2558%, 17.0930% { content: "d'ouvertu"; }
  11.3953%, 15.9535% { content: "d'ouvertur"; }
  12.5349%, 14.8140% { content: "d'ouverture"; }

  30.7674%, 51.2791% { content: ""; }
  31.9070%, 50.1395% { content: "o"; }
  33.0465%, 49.0000% { content: "ol"; }
  34.1860%, 47.8605% { content: "oly"; }
  35.3256%, 46.7209% { content: "olym"; }
  36.4651%, 45.5814% { content: "olymp"; }
  37.6047%, 44.4419% { content: "olympi"; }
  38.7442%, 43.3023% { content: "olympiq"; }
  39.8837%, 42.1628% { content: "olympiqu"; }
  41.0233%, 41.0233% { content: "olympique"; }

}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.typewriter {
  --caret: currentcolor;
}

.typewriter::before {
  content: "";
  animation: typing 13.5s infinite;
}

.typewriter::after {
  content: "";
  border-right: 1px solid var(--caret);
  animation: blink 0.5s linear infinite;
}

.typewriter.thick::after {
  border-right: 1ch solid var(--caret);
}

.typewriter.nocaret::after {
  border-right: 0;
}


@media (prefers-reduced-motion) {
  .typewriter::after {
    animation: none;
  }

  @keyframes sequencePopup {
    0%, 100% { content: "d'ouverture"; }
    25% { content: "olympique"; }
  }

  .typewriter::before {
    content: "d'ouverture";
    animation: sequencePopup 12s linear infinite;
  }
}


.full-screen-image {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.full-screen-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
body {
  font-family: 'helvetica', sans-serif;
}

.image-title {
  position: absolute;
  top: 35%;
  right: 20%;
  max-width: 30%; /* Largeur maximale du titre */
}

</style>