export default defineAppConfig({
  ui: {
    colors: {
      primary: 'ember',
      secondary: 'volga',
      neutral: 'mist',
      info: 'volga',
      success: 'volga'
    },
    button: {
      slots: {
        base: 'rounded-lg font-medium tracking-wide'
      },
      defaultVariants: {
        color: 'primary'
      }
    }
  }
})
