var deferedPrompt

if('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/service-worker.js')
  .then(() => {
    console.log('Service work is register')
  }).catch(error => {
    console.log(error)
  })
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired')
  event.preventDefault()
  deferedPrompt = event
  return false
})

