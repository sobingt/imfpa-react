function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function getProductVariationPrice(
  w,
  h,
  matt,
  frameSize,
  paintingCost,
  mattCost,
  frameCost
) {
  w = w / 2.54;
  h = h / 2.54;

  const paintingPerimeter = 2 * w + 2 * h;
  const paintingMattPerimeter = 2 * (matt + w) + 2 * (matt + h);
  const paintingFramePerimeter =
    2 * (frameSize + matt + w) + 2 * (frameSize + matt + h);
  const totalMattCost = paintingMattPerimeter * mattCost;
  const totalPaintingCost = paintingPerimeter * paintingCost;
  const totalFrameCost = paintingFramePerimeter * frameCost;
  return roundUp(totalPaintingCost + totalFrameCost + totalMattCost, 2);
}

function getProductVariation(data) {
  const {
    description,
    price,
    width,
    height,
    paintingType,
    frameColor,
    paintingFormat,
  } = data;
  const paintingSize = `${width} cm x ${height} cm`;
  return {
    description: `${description}`,
    price: `${price}`,
    regular_price: `${price}`,
    dimensions: {
      length: "",
      width: `${width}`,
      height: `${height}`,
    },
    attributes: [
      {
        id: 4,
        name: "Painting Type",
        option: `${paintingType}`,
      },
      {
        id: 0,
        name: "Painting Size",
        option: `${paintingSize}`,
      },
      {
        id: 3,
        name: "Frames",
        option: `${frameColor}`,
      },
      {
        id: 0,
        name: "Painting Format",
        option: `${paintingFormat}`,
      },
    ],
  };
}
function createAllProductVariation(product, cost) {
  const paintingTypeArray = ["Paper Print", "Canvas Print"];
  const paintingFormatArray = ["Print", "Framed", "Wrap"];
  const colorArray = ["Black", "Brown", "Burgundy", "Natural", "No", "White"];
  const canvasFrameColorArray = ["Black", "Brown", "Natural"];
  const paperFrameColorArray = [
    "Black",
    "Brown",
    "Burgundy",
    "Natural",
    "White",
  ];
  var cost = {
    matt: 15,
    frame: {
      paper: {
        black: 22,
        brown: 22,
        burgundy: 20,
        natural: 21,
        white: 20,
      },
      canvas: {
        black: 25,
        brown: 25,
        natural: 25,
        no: 0,
        wrap: 7,
      },
    },
    paper: 25,
    canvas: 34,
  };
  const mattCost = cost.matt;
  const frameCostArray = {
    "Paper Print": {
      Black: cost.frame.paper.black,
      Brown: cost.frame.paper.brown,
      Burgundy: cost.frame.paper.burgundy,
      Natural: cost.frame.paper.natural,
      No: 0,
      White: cost.frame.paper.white,
    },
    "Canvas Print": {
      Black: cost.frame.canvas.black,
      Brown: cost.frame.canvas.brown,
      Natural: cost.frame.canvas.natural,
      No: 0,
      Wrap: cost.frame.canvas.wrap,
    },
  };

  let count = 0;
  let variations = [];
  const sizeStrArray = [
    `${product.w1} cm x ${product.h1} cm`,
    `${product.w2} cm x ${product.h2} cm`,
    `${product.w3} cm x ${product.h3} cm`,
    `${product.w4} cm x ${product.h4} cm`,
    `${product.w5} cm x ${product.h5} cm`,
    `${product.w6} cm x ${product.h6} cm`,
  ];
  const sizeArray = [
    { w: product.w1, h: product.h1 },
    { w: product.w2, h: product.h2 },
    { w: product.w3, h: product.h3 },
    { w: product.w4, h: product.h4 },
    { w: product.w5, h: product.h5 },
    { w: product.w6, h: product.h6 },
  ];
  const sku = product.sku;
  const id = product.id;
  for (
    let paintingTypeCount = 0;
    paintingTypeCount < paintingTypeArray.length;
    paintingTypeCount++
  ) {
    let paintingType = paintingTypeArray[paintingTypeCount];
    let frameColorArray;
    let paintingTypeCost;
    let frameSize;
    if (paintingType == "Paper Print") {
      frameColorArray = paperFrameColorArray;
      paintingTypeCost = cost.paper;
      frameSize = 0.75;
    } else {
      frameColorArray = canvasFrameColorArray;
      paintingTypeCost = cost.canvas;
      frameSize = 0.5;
    }

    //Select Painting Type
    for (let sizeCount = 0; sizeCount < sizeArray.length; sizeCount++) {
      let size = sizeArray[sizeCount];
      let matt;
      if (size.w == 30) {
        matt = 1;
      } else if (size.w == 40) {
        matt = 1;
      } else if (size.w == 50) {
        matt = 2;
      } else if (size.w == 60) {
        matt = 2;
      } else if (size.w == 70) {
        matt = 3;
      } else if (size.w == 80) {
        matt = 3;
      }
      for (
        let paintingFormatCount = 0;
        paintingFormatCount < paintingFormatArray.length;
        paintingFormatCount++
      ) {
        let paintingFormat = paintingFormatArray[paintingFormatCount];
        if (paintingType == "Paper Print" && paintingFormat == "Wrap") {
          break;
        }
        if (paintingFormat == "Framed") {
          for (
            let frameColorCount = 0;
            frameColorCount < frameColorArray.length;
            frameColorCount++
          ) {
            let frameColor = frameColorArray[frameColorCount];
            let frameCost = frameCostArray[paintingType][frameColor];
            count++;
            //console.log(count, paintingType, size.w + ' cm x ' + size.h +' cm',  matt, paintingFormat, frameColor)
            let price = getProductVariationPrice(
              size.w,
              size.h,
              matt,
              frameSize,
              paintingTypeCost,
              mattCost,
              frameCost
            );
            let description = `Painting Type: ${paintingType}, Painting Size: ${size.w} cm x ${size.h} cm, Frames: ${frameColor}, Painting Format: ${paintingFormat}`;
            let data = getProductVariation({
              description,
              sku,
              price,
              width: size.w,
              height: size.h,
              paintingType,
              frameColor,
              paintingFormat,
            });
            //console.log(count, data)
            variations.push(data);
          }
        } else {
          let frameColor = "No";
          let frameCost = frameCostArray[paintingType][frameColor];
          count++;
          let price = getProductVariationPrice(
            size.w,
            size.h,
            matt,
            frameSize,
            paintingTypeCost,
            mattCost,
            frameCost
          );
          let description = `Painting Type: ${paintingType}, Painting Size: ${size.w} cm x ${size.h} cm, Frames: ${frameColor}, Painting Format: ${paintingFormat}`;
          let data = getProductVariation({
            description,
            sku,
            price,
            width: size.w,
            height: size.h,
            paintingType,
            frameColor,
            paintingFormat,
          });
          //console.log(count, data)
          variations.push(data);
        }
      }
    }
  }

  return {
    id,
    variations,
  };
}

function createPreVariationObject(data) {
  var product = {};
  product.sku = data.sku;
  product.id = data.id;
  product.w1 = 30;
  product.w2 = 40;
  product.w3 = 50;
  product.w4 = 60;
  product.w5 = 70;
  product.w6 = 80;

  product.h1 = Math.round((data.meta_data.h / data.meta_data.w) * 30, 2);
  product.h2 = Math.round((data.meta_data.h / data.meta_data.w) * 40, 2);
  product.h3 = Math.round((data.meta_data.h / data.meta_data.w) * 50, 2);
  product.h4 = Math.round((data.meta_data.h / data.meta_data.w) * 60, 2);
  product.h5 = Math.round((data.meta_data.h / data.meta_data.w) * 70, 2);
  product.h6 = Math.round((data.meta_data.h / data.meta_data.w) * 80, 2);
  return product;
}

// var product = createPreVariationObject({
//   sku: "5510.443.43",
//   id: 196236,
//   variations: [],
//   meta_data: {
//     w: 800,
//     h: 600,
//   },
// });
// var v = createAllProductVariation(product, {
//   matt: 15,
//   frame: {
//     paper: {
//       black: 22,
//       brown: 22,
//       burgundy: 20,
//       natural: 21,
//       white: 20,
//     },
//     canvas: {
//       black: 25,
//       brown: 25,
//       natural: 25,
//       no: 0,
//       wrap: 7,
//     },
//   },
//   paper: 25,
//   canvas: 34,
// });
// console.log(v);

export default {
  createAllProductVariation,
  createPreVariationObject,
};
