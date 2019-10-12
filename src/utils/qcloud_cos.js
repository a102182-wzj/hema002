const COS = require('./cos-wx-sdk-v5')
import request from "./request"

export default class cos {
  constructor() {}
  create_cos(sts_type) {
    console.log('promise3')
    return new COS({
      getAuthorization: function(options, callback) {
        let param={
          url:'qcloud/cos/sts/'+sts_type,
          data:'',
          method:'get'
        }
          request(param,false).then((res => {
          var data = res;
          var credentials = data.credentials;
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
          });
        }))
      }
    })
  }

  post_object(filename, filePath, bucket = "hippo-doctor-1258520047", region = "ap-beijing") {
    console.log('promise2')
    return new Promise((resolve, reject) => {
      console.log('promise4')
      this.create_cos(2).postObject({
        Bucket: bucket,
        Region: region,
        Key: filename,
        FilePath: filePath
      }, function(err, data) {
        if (err) {
          console.log('promise5')
          reject(err)
        }
        console.log('promise6')
        resolve(data)
      });
    })
  }
}