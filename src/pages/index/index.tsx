import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Input, Picker } from '@tarojs/components'
import './index.scss'
import imgtop from './images/img-top.png'
import info from './images/info.png'
import img1 from './images/img1.jpeg'
import Modal from '../../components/Modal/index'

export default class Index extends Component {
  state = {
    selector: ['本科', '专科', '高中', '中学', '小学'],
    degree: '',
    name: '',
    contact: '',
    showModal: false,
    loading: false
  }

  onChange (e) {
    const { selector } = this.state
    this.setState({
      degree: selector[e.detail.value]
    })
  }

  clipboardInfo () {
    Taro.setClipboardData({
      data: `通微信:18804627165 抖音号:120567434`
    })
  }

  inputNameInfo (e) {
    this.setState({
      name: e.detail.value
    })
  }

  inputMobileInfo (e) {
    this.setState({
      contact: e.detail.value
    })
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  onSubmitFn () {
    const { loading, contact, degree, name } = this.state
    if (loading) return
    if (contact) {
      this.setState({
        loading: true
      })
      const queryBoday = {
        degree,
        name,
        contact
      }
      Taro.request({
        url: 'https://kaoyan.iyzliang.cn/api/v1/student',
        data: queryBoday,
        dataType: 'json',
        method: 'POST'
      }).then(() => {
        this.setState({
          showModal: true
        })
      }).finally(() => {
        this.setState({
          loading: true
        })
      })
    } else {
      Taro.showToast({
        title: '请您输入联系方式后提交！',
        icon: 'none',
        duration: 2000
      })
    }
  }

  render () {
    const { selector, degree, showModal } = this.state
    return (
      <View className='index'>
        <Image src={imgtop} mode="widthFix" className="img-top"/>
        <View className="home-container">
          <View className="home-input-form">
            <View className="input-view">
              <Picker mode='selector' className="input-container" range={selector} onChange={this.onChange.bind(this)}>
                <View className='picker'>
                  { degree || '请选择您的最终学历' }
                </View>
              </Picker>
            </View>
            <View className="input-view">
              <Input type='text' placeholder='请输入您的姓名' className="input-container" onInput={this.inputNameInfo.bind(this)}/>
            </View>
            <View className="input-view">
              <Input type='text' placeholder='请输入您的手机号（微信）' className="input-container" onInput={this.inputMobileInfo.bind(this)}/>
            </View>
            <View className="input-btn" onClick={this.onSubmitFn.bind(this)}>免费咨询</View>
          </View>
        </View>
        <Image className="info-container" src={info} mode="widthFix" onClick={this.clipboardInfo.bind(this)}/>
        <Image className="haibao-img" src={img1} mode="widthFix"/>
        <Modal showModal={showModal} onCloseModal={this.closeModal.bind(this)}/>
      </View>
    )
  }
}
