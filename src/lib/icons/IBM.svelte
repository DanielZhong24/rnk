<script lang="ts">
  export let className = '';
  export let width: number;
  export let height: number;
  export let ariaLabel = 'IBM';
</script>

<img
  src="/icons/ibm.svg"
  alt={ariaLabel}
  class={className}
  width={width}
  height={height}
  style="display:inline-block; vertical-align:middle;"
/>
