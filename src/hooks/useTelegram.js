const tg = window.Telegram.WebApp;

export function useTelegram() {

  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if(tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    userTG: tg.initDataUnsafe?.user,
    initDataUnsafe: tg.initDataUnsafe,
    initData: tg.initData
  }
}