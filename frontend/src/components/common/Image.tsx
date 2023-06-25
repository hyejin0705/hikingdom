import React from 'react'

import styles from './Image.module.scss'

type ImageProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' // 사이즈
  imgUrl: string // 이미지 url
  isSquare?: boolean // 사각형 여부
}

function Image({ size, imgUrl, isSquare = false }: ImageProps) {
  const imgStyle = isSquare ? styles.square : ''

  return (
    <img className={`${styles.img} ${styles[size]} ${imgStyle}`} src={imgUrl} />
  )
}

export default Image
