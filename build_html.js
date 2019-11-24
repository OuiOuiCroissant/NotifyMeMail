module.exports = function buildHtml(date, spot_name, amount_sell_cash, amount_sell_card, products) {
    var header = '';
    var body = '';
    var inner_table = '';

    header = header.concat("<title>" + spot_name + ": отчет за " + date + "</title>");

    header = header.concat(`<style>body{background-color:#edecec}.email-example{max-width:600px;background-color:#fff;padding:20px 40px 40px;display:block;margin-left:auto;margin-right:auto}</style>`)
    products.forEach((item) => {
        inner_table = inner_table.concat(`<tr><th align="right" valign="top" style="border-bottom:2px solid #edecec; border-top:2px solid #ededec;" >${item.product_name}</th><td align="left" valign="top" style="border-bottom:2px solid #edecec; border-top:2px solid #ededec;">${item.count} шт</td><td align="left" valign="top" style="border-bottom:2px solid #edecec; border-top:2px solid #ededec;">${item.payed_sum} грн</td></tr>`)
    });

    body = body.concat(`<body><div class="email-example"><h3 style="font-family:arial;color:#009fc2"> ${spot_name}: отчет за ${date} </h3><h5 style="font-family: arial; color:##1A1B1F;">Сумма выручки наличной оплатой: ${amount_sell_cash} грн.</h5><h5 style="font-family: arial; color:##1A1B1F;">Сумма выручки <u>без</u>наличной оплатой: ${amount_sell_card} грн.</h5><td align="center" valign="top"><table border="0" style="font-family:arial;color:#565458" cellpadding="20" cellspacing="0" width="100%" id="Body">` +
    inner_table +
    "</table></div></body>");

    return header + body;
  };
