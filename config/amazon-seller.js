const SellingPartnerAPI = require('amazon-sp-api');

let sellingPartner = new SellingPartnerAPI({
    region: 'na',
    refresh_token: 'Atzr|IwEBIFmnAfY0c9jNBBDKhLeMUHT869SC7W8W41FzLlcyRssWdfVBvLrZ8oO9UIe66SExRlhy3OjJ-QUqUmZMMT2hnxHRKhvbCUyOE-0fd5rsV1ZrhwLrvOdi89r9V5Z4U9G5monaaRGxH9ytRvyvzsXh2B9ENEhDxpzkQ7XBKE0rMcoY2imvE4bJsfSsNWPTtgOcNoY-YCwULfyXWmXBX1m7nzuhkjSaId4SyuxdyXEq5-huNL41HoQHsfhAe7kqgQvt23_VP82d4QTj15m4ixsy-UGXvG0K9_UgOZ-rsalp8D7ziPEkYlWaXdjjkIf4hcTBOJE',
    options: {
        only_grantless_operations: false
    }

})

module.exports = {
    sellingPartner
}