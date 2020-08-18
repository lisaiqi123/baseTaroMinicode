// 名片分享样式
export default class Card {
    cardInfo = {}

    do(cardInfo) {

        this.cardInfo = JSON.parse(JSON.stringify(cardInfo));
        console.log(this.cardInfo);
        
        return this._template(this.cardInfo)
    }

    TEXT_SMALL = {
        fontSize: '48rpx'
    }

    _template(cardInfo) {
        switch (cardInfo.type) {
            case 'activity5':
                return ({
                    background: cardInfo.bg,
                    width: '544rpx',
                    height: '857rpx',
                    views: [{
                            type: 'image',
                            url: cardInfo.avatar_img,
                            css: {
                                right: '15rpx',
                                bottom: '93rpx',
                                width: '81rpx',
                                height: '81rpx',
                                borderRadius:'40rpx',
                            }
                        },{
                            type: 'text',
                            text: cardInfo.nickname,
                            css: {
                                right: '109rpx',
                                bottom: '123rpx',
                                fontSize:'23rpx',
                                color:'#010000',
                            }
                        },{
                            type: 'image',
                            url: cardInfo.banner,
                            css: {
                                right: '0rpx',
                                top: '390rpx',
                                width: '510rpx',
                                height: '255rpx',
                            }
                        },{
                            type: 'image',
                            url: cardInfo.mini_code,
                            css: {
                                left: '18rpx',
                                bottom: '17rpx',
                                width: '142rpx',
                                height: '142rpx',
                                borderRadius:'71rpx'
                            }
                        },
                    ]
                })
                break;
            default:
                break;
        }

    }
}