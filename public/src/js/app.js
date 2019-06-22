var deferedPrompt

if('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/service-worker.js')
  .then(() => {
    console.log('Service work is register')
  })
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired')
  event.preventDefault()
  deferedPrompt = event
  return false
})