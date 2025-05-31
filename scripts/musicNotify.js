// Kiểm tra xem fuiToast có tồn tại không
if (typeof fuiToast === 'undefined') {
  console.error('Lỗi: fuiToast không được tải. Đảm bảo fuiToast được tải trước');
}

// Tạo và thêm CSS động
try {
  const style = document.createElement('style');
  style.textContent = `
    .list {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 80px;
      height: 80px;
      background-image: var(--image);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 999;
      display: block;
    }
    .banana-cat-huhu {
      width: 40px;
      height: 40px;
      background-image: var(--image);
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: 10px;
    }
    .footer-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .music-toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      padding: 15px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      max-width: 90%;
      width: 280px;
      text-align: center;
      color: #fff;
      display: none;
      font-family: 'Playpen Sans', sans-serif;
    }
    .toast-content p {
      margin: 0 0 10px;
      font-size: 14px;
    }
    .toast-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .toast-btn {
      padding: 6px 15px;
      border: none;
      border-radius: 5px;
      font-size: 13px;
      cursor: pointer;
      font-family: 'Playpen Sans', sans-serif;
    }
    .toast-btn-yes {
      background: #ff6062;
      color: #fff;
    }
    .toast-btn-no {
      background: #545454;
      color: #fff;
    }
    @media (max-width: 600px) {
      .music-toast {
        width: 90%;
        padding: 10px;
      }
      .toast-content p {
        font-size: 13px;
      }
      .toast-btn {
        padding: 5px 12px;
        font-size: 12px;
      }
    }
  `;
  document.head.appendChild(style);
} catch (error) {
  console.error('Lỗi khi thêm CSS động:', error);
}

// Tạo và thêm HTML động
try {
  const existingToast = document.getElementById('music-toast');
  if (existingToast) {
    existingToast.remove(); // Xóa toast cũ nếu đã tồn tại
  }

  const toastDiv = document.createElement('div');
  toastDiv.id = 'music-toast';
  toastDiv.className = 'music-toast';
  toastDiv.innerHTML = `
    <div class="toast-content">
      <p>Bạn muốn bật nhạc không? 🎵</p>
      <div class="toast-buttons">
        <button id="play-music" class="toast-btn toast-btn-yes">Có</button>
        <button id="skip-music" class="toast-btn toast-btn-no">Không</button>
      </div>
    </div>
  `;
  document.body.appendChild(toastDiv);
} catch (error) {
  console.error('Lỗi khi thêm HTML động:', error);
}

// Logic JavaScript cho thông báo music
try {
  const audio = new Audio('https://files.catbox.moe/w4y4c5.mp3'); // Thay bằng link MP3 của bạn
  audio.loop = true;
  audio.volume = 0.5;

  function showMusicToast() {
    const musicToast = document.getElementById('music-toast');
    if (!musicToast) {
      console.error('Lỗi: Không tìm thấy phần tử music-toast trong DOM.');
      return;
    }
    musicToast.style.display = 'block';

    const playButton = document.getElementById('play-music');
    const skipButton = document.getElementById('skip-music');

    if (!playButton || !skipButton) {
      console.error('Lỗi: Không tìm thấy nút play-music hoặc skip-music.');
      return;
    }

    playButton.onclick = () => {
      musicToast.style.display = 'none';
      audio.play().then(() => {
        if (fuiToast) {
          fuiToast.show({ type: 'success', message: 'Đang phát nhạc! 🎶', duration: 3000 });
        } else {
          console.warn('fuiToast không khả dụng, không thể hiển thị thông báo thành công.');
        }
      }).catch((error) => {
        console.error('Lỗi khi phát nhạc:', error);
        if (fuiToast) {
          fuiToast.show({ type: 'error', message: 'Không thể phát nhạc! 😢', duration: 3000 });
        } else {
          console.warn('fuiToast không khả dụng, không thể hiển thị thông báo lỗi.');
        }
      });
    };

    skipButton.onclick = () => {
      musicToast.style.display = 'none';
      if (fuiToast) {
        fuiToast.show({ type: 'info', message: 'Đã bỏ qua nhạc nền.', duration: 3000 });
      } else {
        console.warn('fuiToast không khả dụng, không thể hiển thị thông báo bỏ qua.');
      }
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showMusicToast, 1000);
  });
} catch (error) {
  console.error('Lỗi trong logic thông báo music:', error);
}
