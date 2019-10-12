import cos from '../utils/qcloud_cos'
class cosUtils {

    requestUploadAudiosClouds(files, key = "replyAudio") {
        return new Promise((resolve, reject) => {
            let attach = []

            if (files.length == 0) {
                resolve(attach)
            } else {
                for (let i in files) {
                    delete files[i].isPlay
                    let file = files[i].path
                    console.log('file',file)
                    let filename = "audio/" + file.split('/')[file.split('/').length - 1]
                    console.log('filename',filename)
                    new cos().post_object(filename, file).then(res => {
                        console.log(res)
                        files[i].path = filename
                        attach.push(files[i])
                        if (attach.length == files.length) {
                            resolve(attach)
                        }
                    }).catch(err => {
                        console.log(err)
                        if (err.statusCode = 403) {
                            // 其他错误，直接提示用户上传失败
                            console.log("授权错误，重试1次，在错误就提示用户刷新重试")
                            reject(err)
                        } else {
                            reject(err)
                        }
                    })

                }
            }
        })
    }

    requestUploadClouds(files, key = "replyImage/") {
        // console.log('promise1')
        return new Promise((resolve, reject) => {
            let attach = []
            if (files.length == 0) {
                resolve(attach)
            } else {
                for (let i in files) {
                    // console.log(files[i])
                    // wx.cloud.uploadFile({
                    //   cloudPath: key + files[i].replace('=', '').replace('wxfile://', '').replace('http://tmp/', ''),
                    //   filePath: files[i]
                    // }).then(res => {
                    //   attach.push(res.fileID)
                    //   if (attach.length == files.length) {
                    //     console.log(attach)
                    //     resolve(attach)
                    //   }
                    // }).catch(err => {
                    //   console.log(err)
                    //   reject(err)
                    // })
                    let file = files[i]
                    let filename = "image/" + file.split('/')[file.split('/').length - 1]
                    new cos().post_object(filename, file).then(res => {
                        // console.log(res)
                        attach.push(filename)
                        if (attach.length == files.length) {
                            resolve(attach)
                        }
                    }).catch(err => {
                        console.log(err)
                        if (err.statusCode = 403) {
                            // 其他错误，直接提示用户上传失败
                            console.log("授权错误，重试1次，在错误就提示用户刷新重试")
                        } else {
                            reject(err)
                        }
                    })
                }
            }
        })
    }
}
export default cosUtils