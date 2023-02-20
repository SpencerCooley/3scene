<script setup>
  const toolbarOpen = ref(true);
const toggleToolbar = () => { 
  toolbarOpen.value = !toolbarOpen.value;
}
</script>
<template>
  <div class="page-wrapper" :class="{'hidden-toolbar': !toolbarOpen}">
    <div class="three-stage">
      <h1>The actual three.js scene will go here.</h1>
    </div>
    <div class="toolbar" > 

      <div @click="toggleToolbar" class="toggle mobile" role="button">
        <Icon v-if="toolbarOpen" name="majesticons:chevron-down-line" />
        <Icon v-else name="majesticons:chevron-up-line" />
      </div>

      <div @click="toggleToolbar" class="toggle desktop" role="button">
        <Icon v-if="toolbarOpen" name="majesticons:chevron-right-line" />
        <Icon v-else name="majesticons:chevron-left-line" />
      </div>
      
      <div class="toolbar-content">
        <v-select
          label="Geometry"
          :items="['Monkey', 'Some Other Thing', 'Another', 'Torus Knot', 'Cube', 'Sphere']"
        ></v-select>
        <v-select
          label="Fragment Shaders"
          :items="['Magic Hat', 'Fractal Journey', 'Spiral Galaxy', 'Monster Eyes', 'Space Ice Cream', 'Monkey Village']"
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
  height:100vh;
  display:grid;
  grid-template-rows: 2fr 1fr;
}

.page-wrapper.hidden-toolbar {
  grid-template-rows: 2fr 30px; 
}

.toolbar {
  background-color: $base; 
  overflow-y:scroll;
  overflow-x: hidden;
  
  .toolbar-content {
    margin-top:60px;
  }
  .toggle.desktop {
    display:none;
  }
  .toggle.mobile {
    position:absolute;
    width:50px;
    height:30px;
    display:flex;
    justify-content: center;
    align-items:center;
    cursor:pointer;
    right: calc(50% - 25px);
    background-color: lighten($base, 10%);
    border-top: 1px solid lighten($base, 20%);

  }
}

@media (min-width:320px) { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */ }
@media (min-width:480px) { /* smartphones, Android phones, landscape iPhone */ }
@media (min-width:600px) { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ }
@media (min-width:801px) { /* tablet, landscape iPad, lo-res laptops ands desktops */ 

  .page-wrapper {
    grid-template-rows: none;
    grid-template-columns: 2fr 1fr;
  }

  .page-wrapper.hidden-toolbar {
    grid-template-columns: 2fr 30px; 
    grid-template-rows: 1fr;
  }

  .toolbar {
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