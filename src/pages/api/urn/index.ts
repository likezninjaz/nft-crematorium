import { createCanvas, loadImage } from 'canvas';

import { urnImageBase64 } from './urnImage';
import { urnBackgroundBase64 } from './urnBackground';

const handler = async (req, res) => {
  if (!req.body.nftUrl || !req.body.nftTitle) {
    res.status(500).json();
  }

  try {
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'overlay';
    const urnImage = await loadImage(urnImageBase64);
    ctx.drawImage(urnImage, 0, 0, 800, 800);

    const nftImage = await loadImage(req.body.nftUrl);
    ctx.drawImage(nftImage, 0, 0, 800, 800);

    ctx.globalCompositeOperation = 'source-over';

    const urnBackground = await loadImage(urnBackgroundBase64);
    ctx.drawImage(urnBackground, 0, 0, 800, 800);

    ctx.font = '20px Lato';
    ctx.fillText(
      `NFT CREMATORIUM / ${req.body.nftTitle.toUpperCase()}`,
      15,
      30,
      canvas.width - 30
    );

    const data = canvas.toDataURL();
    const arr = data.split(',');
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export default handler;
