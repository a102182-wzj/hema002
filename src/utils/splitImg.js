export function split (data,type){
    if(type=='image'){
        let images=[]
        data.map((item,index)=>{
            let img=item.split('/')[item.split('/').length-1]
            images.push(img)
        })
        return images;
    }else if(type=='audio'){
        let videos=[]
       let video=data.split('//')[data.split('//').length-1]
       videos.push(video)
       return videos
    }

}