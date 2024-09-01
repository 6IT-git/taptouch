function Alertx(liveAlertPlaceholderID) {
   const alertPlaceholder = document.getElementById(liveAlertPlaceholderID)
   const close = function (delay) {
      const timer = setTimeout(function () {
         clearTimeout(timer);
         const elts = alertPlaceholder.querySelectorAll('.alert');
         for(let i = 0; i < elts.length; i++){
            // const alert = bootstrap.Alert.getOrCreateInstance(elts[i]);
            // const alert = bootstrap.Alert.getInstance(elts[i]);
            const alert = new bootstrap.Alert(elts[i]);
            alert.close();
         }
      }, delay)
   }

   return {
      alert: (message, type, delay = 1800) => {
         const wrapper = document.createElement('div')
         wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
         ].join('')

         alertPlaceholder.append(wrapper);
         close(delay);
      }
   }
}