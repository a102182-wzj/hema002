export function sendMessage(data, content_type, doctor, no, order, type,callback) {
    let dt = new Date();
    let hh = dt.getHours();
    let mi = dt.getMinutes();
    let sd = "上午";
    if (hh > 12) {
        hh = hh - 12;
        sd = "下午";
    }
    let date =sd+hh+":"+mi
        let params = {
            attach: [],
            baby: '',
            content: data,
            content_type: content_type,
            create:date,
            doctor:doctor,
            is_doctor:true,
            my:true,
            no:no+1,
            order:order,
            type:type
    }
    callback(params)
}