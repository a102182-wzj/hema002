const globalData = {
    isloggin:false,
    user:'',
    record:[],
    item:''
}

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}
export function messageAdd(chatMessage){
  globalData.record.push(chatMessage)
}
