import React, { PureComponent, createRef } from 'react'
import { Result, Button, Row, Col } from 'antd'
import { history } from 'umi'
import Viewer from 'viewerjs'
import { getMediaList } from '@/services'
import { formatUrl } from '@/utils'
import Affix from './components/Affix'
import { ImageConfig } from './components/Config'
import type { IImageConfigRef } from './components/Config'
import 'viewerjs/dist/viewer.css'
import styles from './index.less'

export { default as Preview } from './components/Click2Preview'

export type TSrc = {
  src: string
  [key: string]: any
}

interface IState {
  values: TSrc[]
}

export const ImageList = ({ value, onClick }: {
  value: TSrc[]
  onClick?: (target: TSrc) => void 
}) => {

  return (
    <div id="image-viewer">
      <Row gutter={24}>
        {
          value.map((item: TSrc, index: number) => {
            return (
              <Col
                xs={12}
                md={8}
                lg={6}
                key={item?.src || index}
                style={{marginBottom: 24}}
                onClick={onClick?.bind(null, item)}
              >
                <div
                  className={styles["image-viewer-item-wrapper"]}
                >
                  <img
                    className={styles["image-viewer-item-content"]}
                    {...item}
                  />
                </div>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )

}

class ImagePreview extends PureComponent<any> {

  configRef = createRef<IImageConfigRef>()

  instance!: Viewer

  public state: IState = {
    values: [],
  }

  public componentDidMount = async () => {
    const urls = this.getUrl()
    this.setState({
      values: urls
    }, () => {
      if(Array.isArray(urls) && urls.length) this.instanceInit()
    })
    // const result = await this.fetchData(urls)
  }

  public componentWillUnmount = () => {
    this.instance?.destroy()
  }

  public instanceInit = () => {
    const element = document.getElementById('image-viewer') as HTMLElement

    if(!element) return 

    const viewer: Viewer = new Viewer(element, {
      inline: false,
      viewed() {
        viewer.zoomTo(1);
      },
      url: 'src',
      title: [4, (image: any, imageData: any) => `${image.alt} (${imageData.naturalWidth} × ${imageData.naturalHeight})`],
    })
    this.instance = viewer
  }

  public handleOpenConfig = () => {
    this.configRef.current?.open()
  }

  public fetchData = async (urls: TSrc[]) => {
    const newValues = await Promise.allSettled(urls.map(item => {
      const { src } = item 
      if(typeof src === 'string') {
        return {
          src: formatUrl(src)
        }
      }
      return getMediaList({
        type: 0,
        _id: src
      })
      .then(data => {
        return {
          src: formatUrl(data.list[0].src)
        }
      })
    }))
    this.setState({
      values: newValues
    })
    return newValues
  }

  public getUrl = () => {
    const { location: { query } } = history
    const { url: videoUrl=[] } = query as { url: string[] | undefined } || {}
    return (Array.isArray(videoUrl) ? videoUrl : [videoUrl])?.map(url => {
      try {
        const { pathname } = new URL(url)
        return {
          src: `/api${pathname}`
        }
      }catch(err) {
        return {
          src: url
        } 
      }
    })
  }

  public goback = () => {
    history.goBack()
  }

  render() {

    const { values } = this.state 

    if(!values || !values.length) return (
      <Result
        status="404"
        title="404"
        subTitle="对不起，当前无图片资源"
        extra={
          <Button onClick={this.goback} type="primary">回到上一页</Button>
        }
      />
    )

  return (
    <div className={styles["image-viewer-wrapper"]}>
      <ImageList
        value={values}
      />
      <Affix onClick={this.handleOpenConfig} />
      <ImageConfig 
        ref={this.configRef}
        instance={this.instance as Viewer}
        mask={false}
        width={400}
      />
    </div>
  )

  }

}

export default ImagePreview