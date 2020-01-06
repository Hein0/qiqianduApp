const httpUrl = 'http://www.qiqiandu.com/';
const apikey = 'Hein';   //好单库apikey    --选单裤：mrxg77pxk3
const pid = 'mm_79633249_1099850472_109773700406'; // 选单库pid号
const tb_name = 'seven啸'; // 淘宝名称
const taobao_key='28138929'; // 阿里妈妈联盟生成淘宝key
const taobao_secret='b9187752f38844ff0f388bafd69c5afa'; // 淘宝
const footer='粤ICP备19141624号';  // 备案号
const isWeiXin = () => {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
};
export default {
    apikey,
    pid,
    tb_name,
    httpUrl,
    taobao_secret,
    taobao_key,
    footer,
    isWeiXin
}
