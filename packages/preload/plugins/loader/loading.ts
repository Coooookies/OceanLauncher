
export function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  0% { width: 0px }
  100% { width: 90% }
}
.${className} > div {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  width: 160px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.05);
}

.${className} > div::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #4B69FF;
  animation-fill-mode: both;
  animation: square-spin 4s forwards cubic-bezier(.07,.66,.31,1);
}

.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EAEAEA;
  z-index: 1000;
}

.app-loading-wrap.fadeOut {
  animation: square-spin-fadeOut 0.15s forwards;
}

@keyframes square-spin-fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

`;
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      document.head.appendChild(oStyle)
      document.body.appendChild(oDiv)
    },
    removeLoading() {
      oDiv.classList.add('fadeOut');
      setTimeout(() => {
        document.head.removeChild(oStyle)
        document.body.removeChild(oDiv)
      }, 150);
    },
  }
}
