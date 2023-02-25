<script setup>
import ShaderJournal from '../threescene-tools/shader-journal/app';


useHead({
  title: '3D Tools For The Web',
  meta: [
    { hid: 'og-type', property: 'og:type', content: 'website' },
    { hid: 'og-title', property: 'og:title', content: '3Scene.com | Shader Journal' },
    { hid: 'og-desc', property: 'og:description', content: 'Shader Journal allows you to create a journal of different shaders, test them out on different geometries, and share them on the web' },
    {
      hid: 'og-image', property: 'og:image',
      content: 'https://storage.googleapis.com/img-gorillaisms/social-bg-3scene.png'
    },
    { hid: 'twitter-image', property: 'twitter:image', content: 'https://storage.googleapis.com/img-gorillaisms/3scene-twitter-cover-card.png' },
    { hid: 'twitter-image-alt', property: 'twitter:image:alt', content: '3scene cover image for social sharing. It presents the logo which is an icon style 3D box.' },
    { hid: 'twitter-title', property: 'twitter:title', content: 'Shader Journal by 3scene.com' },
    { hid: 'twitter-description', property: 'twitter:description', content: '3scene.com is a collection of 3D tools for the web. Shader Journal is the first tool built on this platform. Shader Journal allows you to test out a collection of glsl shaders on different geometries. It is a lot of fun to look at and a useful tool when developing new shaders. '},
    {hid: 'twitter-creator', property: 'twitter:creator', content: 'cooleyarts'}


  ]
})

const toolbarOpen = ref(true);
const toggleToolbar = () => { 
  toolbarOpen.value = !toolbarOpen.value;
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1);
}
const app = ref(null);


const threeStage = ref(null);

const selectedGeometry = ref('cube');
const geometryList = [
  { title: 'Sphere', value: 'sphere' },
  { title: 'Cube', value: 'cube' },
  { title: 'Torus Knot', value: 'torus-knot' },
  { title: 'Torus', value: 'torus' },
  { title: 'Plane', value: 'plane' },
]

const selectedFragmentShader = ref('starTraveler');
const fragmentShaderList = [
  { title: "Octagon Storm", value: 'octagonStorm' },
  { title: "Star Traveler", value: 'starTraveler' },
  { title: "shader GPT!", value: 'shaderGPT' },
  { title: "Mystical Dark Pond", value: 'mysticalDarkPond' },
  { title: "New Spirit", value: 'newSpirit' }
];

watch(selectedFragmentShader, () => {
  app.value.setFragmentShader(selectedFragmentShader.value);
});

watch(selectedGeometry, () => {
  app.value.setGeometry(selectedGeometry.value);
});

onMounted(() => {
  const shaderJournal = new ShaderJournal(threeStage.value);
  app.value = shaderJournal; 
});

</script>
<template>
  <div class="page-wrapper" :class="{'hidden-toolbar': !toolbarOpen}">
    <div class="three-stage" ref="threeStage">
    </div>
    <div class="toolbar" > 
      <div class="social-bar">
        <a href="https://twitter.com/cooleyarts" target="_blank"><Icon name="grommet-icons:twitter" /></a>
        <a href="https://github.com/SpencerCooley/3scene"  target="_blank"><Icon name="grommet-icons:github" /></a>
      </div>
      <div @click="toggleToolbar" class="toggle mobile" role="button">
        <Icon style="color:#fff;" v-if="toolbarOpen" size="1.5em" name="majesticons:chevron-down-line" />
        <Icon style="color:#fff;" v-else size="1.5em" name="majesticons:chevron-up-line" />
      </div>

      <div @click="toggleToolbar" class="toggle desktop" role="button">
        <Icon size="1.5em" v-if="toolbarOpen" name="majesticons:chevron-right-line" />
        <Icon  size="1.5em" v-else name="majesticons:chevron-left-line" />
      </div>
      
      <div class="toolbar-content">
        <v-select
          label="Geometry"
          v-model="selectedGeometry" 
          :items="geometryList"
        ></v-select>
        <v-select
          label="Fragment Shaders"
          v-model="selectedFragmentShader"
          :items="fragmentShaderList"
        ></v-select>

      </div>
    </div>
  </div>
</template>

<style lang="scss">

$base: #000;

body {
  height:100vh;
}
.page-wrapper {
  overflow:hidden;
  height:100vh;
  display:grid;
  grid-template-rows: 2fr 1fr;
}

.page-wrapper.hidden-toolbar {
  grid-template-rows: 2fr 50px; 
}

.toolbar {
  position:relative;
  background-color: $base; 
  overflow-y:scroll;
  overflow-x: hidden;
  border-top:1px solid lighten($base, 10%);
  border-left:none;
  z-index:0;
  
  .toolbar-content {
    margin-top:60px;
    margin-bottom:100px;
  }
  .toggle.desktop {
    display:none;
  }
  .toggle.mobile {
    position:sticky;
    width:50px;
    height:50px;
    display:flex;
    justify-content: center;
    align-items:center;
    cursor:pointer;
    top:0px;
    margin:0 auto;
    background-color: lighten($base, 10%);
    border-top: 1px solid lighten($base, 20%);
    z-index: 1;


  }
}

.three-stage {
  overflow:hidden;
}

.social-bar {
  display:none;
}

@media (min-width:320px) { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */ }
@media (min-width:480px) { /* smartphones, Android phones, landscape iPhone */ }
@media (min-width:600px) { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ }
@media (min-width:801px) { /* tablet, landscape iPad, lo-res laptops ands desktops */ 
  .social-bar {
    display:block;
    color:#fff;
    background-color:rgba(0,0,0,.6);
    position:absolute;
    bottom:0px;
    right:0px;
    padding:15px;
    a {
      margin-left:15px;
      color:#fff;
      font-size:2em;
    }
  }

  .page-wrapper {
    grid-template-rows: none;
    grid-template-columns: 2fr 1fr;
  }

  .page-wrapper.hidden-toolbar {
    grid-template-columns: 2fr 30px; 
    grid-template-rows: 1fr;
    .social-bar {
      display:none;  
    }
  }
  
  .three-stage {
    overflow:hidden;
  }

  .toolbar {
    border-top:none;
    border-left:1px solid lighten($base, 10%);
    .toolbar-content {
      margin-left:40px;
    }
    .toggle.mobile {
      display:none;
    }
    .toggle.desktop {
      display:flex;
      left: 0px;
      width:30px;
      height:50px;
      justify-content: center;
      align-items:center;
      background-color: lighten($base, 10%);
      border-left: 1px solid lighten($base, 20%);
      position:relative;
      top: calc(50% - 25px);
    }
  }


}
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media (min-width:1281px) { /* hi-res laptops and desktops */ }



</style>