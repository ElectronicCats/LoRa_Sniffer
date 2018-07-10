
<template>
  <a :class="[
    'button',
    'level-item',
    {'is-primary': isPrimary},
    {'is-danger': isDanger}
  ]">
    <span class="icon is-small">
        <i class="material-icons">{{icon}}</i>
    </span>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script>
  export default {
    name: 'icon-buttom',
    props: ['icon', 'label', 'isPrimary', 'isDanger']
  }
</script>
