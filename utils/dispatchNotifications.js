export const dispatchErrorNotification = (toast, message, redirect=true) => {
  toast.error(message)
  if (redirect) {
    setTimeout(() => {
      window.location.reload()
    }, 6000);
  }
}

export const dispatchSuccessNotification = (toast, message, redirect=true) => {
  toast.success(message)
  if (redirect) {
    setTimeout(() => {
      window.location.reload()
    }, 6000);
  }
}