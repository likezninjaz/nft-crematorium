import { createCanvas, loadImage } from 'canvas';

const handler = async (req, res) => {
  if (!req.body.nftUrl) {
    res.status(500).json();
  }

  try {
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'overlay';

    const imageURL =
      'https://thumbs.dreamstime.com/b/funerary-urn-cremation-ceremony-object-icon-funerary-urn-cremation-ceremony-object-icon-dust-vase-vector-flat-style-141576646.jpg';
    const urnImage = await loadImage(imageURL);
    ctx.drawImage(urnImage, 0, 0, 800, 800);

    const nftImage = await loadImage(req.body.nftUrl);
    ctx.drawImage(nftImage, 0, 0, 800, 800);

    // ctx.globalCompositeOperation = 'multiply';

    // // TODO: Put the frame

    // ctx.font = '50px Tahoma';
    // ctx.textAlign = 'center';
    // ctx.fillText('23.12.2021 - 6.8.2022', canvas.width / 2, canvas.height - 20);

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
