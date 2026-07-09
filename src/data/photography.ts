export type PhotographyImage = {
  src: string
  sources?: ImageSource[]
  width: number
  height: number
}

export type ImageSource = {
  srcSet: string
  type: string
  media?: string
  sizes?: string
}

const encodeImagePathSegment = (value: string) => encodeURIComponent(value).replace(/%26/g, '&')

const photographyImage = (fileName: string, width: number, height: number): PhotographyImage => {
  const extension = fileName.match(/\.[^.]+$/)?.[0] ?? ''
  const fileNameWithoutExtension = extension ? fileName.slice(0, -extension.length) : fileName

  return {
    src: `/assets/images/Photography/${fileName}`,
    sources: [
      {
        srcSet: `/assets/images/Photography/optimized/${encodeImagePathSegment(fileNameWithoutExtension)}.webp`,
        type: 'image/webp',
      },
    ],
    width,
    height,
  }
}

export const photographyImages: PhotographyImage[] = [
  photographyImage('1772866867000_R0007957.jpg', 3673, 5510),
  photographyImage('IMG_1283.jpg', 5897, 3317),
  photographyImage('IMG_1495.JPG', 6000, 4000),
  photographyImage('IMG_1547.jpg', 3882, 5823),
  photographyImage('IMG_1566.jpg', 5811, 3874),
  photographyImage('IMG_1976.JPG', 2864, 2864),
  photographyImage('IMG_5360.jpg', 5670, 3780),
  photographyImage('IMG_5892.jpg', 2108, 2810),
  photographyImage('IMG_6985.jpg', 2132, 1170),
  photographyImage('IMG_7883.jpg', 2051, 3077),
  photographyImage('IMG_7886.jpg', 3376, 6000),
  photographyImage('IMG_7993.jpg', 2142, 3213),
  photographyImage('IMG_7999 2.jpg', 1479, 2629),
  photographyImage('IMG_8038.jpg', 1013, 1519),
  photographyImage('IMG_8047.JPG', 2268, 4032),
  photographyImage('IMG_8288.JPG', 3360, 2240),
  photographyImage('IMG_9030.jpg', 3684, 5526),
  photographyImage('R0000072.jpg', 2502, 4448),
  photographyImage('R0000136.JPG', 3360, 2240),
  photographyImage('R0000458.JPG', 3360, 2240),
  photographyImage('R0000626.jpg', 3375, 6000),
  photographyImage('R0000906.jpg', 2700, 4800),
  photographyImage('R0001184.jpg', 6000, 3375),
  photographyImage('R0001351.jpg', 3334, 5929),
  photographyImage('R0001441.jpg', 6000, 3375),
  photographyImage('R0001620.jpg', 5200, 2925),
  photographyImage('R0001770.jpg', 3375, 6000),
  photographyImage('R0002910.jpg', 3262, 5800),
  photographyImage('R0004318.JPG', 6000, 4000),
  photographyImage('R0005220.jpg', 5739, 3826),
  photographyImage('R0006165.jpg', 2105, 1184),
  photographyImage('R0006553.jpg', 3375, 6000),
  photographyImage('R0006593.jpg', 6000, 1966),
  photographyImage('R0006632.jpg', 3360, 1380),
  photographyImage('R0006665.jpg', 3803, 5705),
  photographyImage('R0006720.jpg', 4000, 6000),
  photographyImage('R0006804.jpg', 6000, 3375),
  photographyImage('R0007054.jpg', 6000, 4000),
  photographyImage('fxn 2024-08-19 155728.477.jpg', 4033, 3024),
  photographyImage('fxn 2024-08-19 202304.187.jpg', 3024, 4032),
  photographyImage('fxn 2024-08-20 124111.403.JPG', 3025, 4033),
  photographyImage('fxn 2024-08-20 170210.536.JPG', 3025, 4033),
  photographyImage('fxn 2024-08-20 174127.721.jpg', 3025, 3025),
  photographyImage('fxn 2024-08-21 140313.806.jpg', 3024, 4032),
  photographyImage('fxn 2024-08-22 174638.660.JPG', 3024, 4032),
  photographyImage('fxn 2024-08-23 200039.267.jpg', 3024, 4032),
  photographyImage('ofm 2025-12-29 124411.766.JPG', 2688, 4032),
  photographyImage('ofm 2025-12-31 165444.384.JPG', 2688, 4032),
]
