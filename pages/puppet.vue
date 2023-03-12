<script setup>
import Puppet from '../threescene-tools/puppet/app';

const toolbarOpen = ref(true);
const toggleToolbar = () => {
  toolbarOpen.value = !toolbarOpen.value;
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1);
}
const app = ref(null);


const threeStage = ref(null);

onMounted(() => {
  const shaderJournal = new Puppet(threeStage.value);
  app.value = shaderJournal;
});

</script>
<template>
  <div class="page-wrapper" :class="{'hidden-toolbar': !toolbarOpen}">
    <div class="three-stage" ref="threeStage">
    </div>
    <div class="toolbar">

      <div @click="toggleToolbar" class="toggle mobile" role="button">
        <Icon v-if="toolbarOpen" size="1.5em" name="majesticons:chevron-down-line" />
        <Icon v-else size="1.5em" name="majesticons:chevron-up-line" />
      </div>

      <div @click="toggleToolbar" class="toggle desktop" role="button">
        <Icon size="1.5em" v-if="toolbarOpen" name="majesticons:chevron-right-line" />
        <Icon size="1.5em" v-else name="majesticons:chevron-left-line" />
      </div>

      <div class="toolbar-content">

      </div>
    </div>
  </div>
</template>

<style lang="scss">
$base: #000;

body {
  height: 100vh;
}

.page-wrapper {
  overflow: hidden;
  height: 100vh;
  display: grid;
  grid-template-rows: 2fr 1fr;
}

.page-wrapper.hidden-toolbar {
  grid-template-rows: 2fr 30px;
}

.toolbar {
  background-color: $base;
  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid lighten($base, 10%);
  border-left: none;

  .toolbar-content {
    margin-top: 60px;
  }

  .toggle.desktop {
    display: none;
  }

  .toggle.mobile {
    position: absolute;
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    right: calc(50% - 25px);
    background-color: lighten($base, 10%);
    border-top: 1px solid lighten($base, 20%);

  }
}

.three-stage {
  overflow: hidden;
}

@media (min-width:320px) {
  /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
}

@media (min-width:480px) {
  /* smartphones, Android phones, landscape iPhone */
}

@media (min-width:600px) {
  /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
}

@media (min-width:801px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */

  .page-wrapper {
    grid-template-rows: none;
    grid-template-columns: 2fr 1fr;
  }

  .page-wrapper.hidden-toolbar {
    grid-template-columns: 2fr 30px;
    grid-template-rows: 1fr;
  }

  .three-stage {
    overflow: hidden;
  }

  .toolbar {
    border-top: none;
    border-left: 1px solid lighten($base, 10%);

    .toolbar-content {
      margin-left: 40px;
    }

    .toggle.mobile {
      display: none;
    }

    .toggle.desktop {
      display: flex;
      left: 0px;
      width: 30px;
      height: 50px;
      justify-content: center;
      align-items: center;
      background-color: lighten($base, 10%);
      border-left: 1px solid lighten($base, 20%);
      position: relative;
      top: calc(50% - 25px);
    }
  }


}

@media (min-width:1025px) {
  /* big landscape tablets, laptops, and desktops */
}

@media (min-width:1281px) {
  /* hi-res laptops and desktops */
}</style>